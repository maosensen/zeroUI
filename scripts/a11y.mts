/**
 * Accessibility check: opens every page in the sitemap in headless Chrome, runs axe-core on it
 * once it has hydrated, and lists what fails, grouped by rule. Needs the dev server
 * (`~/github/catforest/dev start zzzUI`), or pass another base.
 *
 *   pnpm a11y                                   every page, against http://localhost:4374
 *   pnpm a11y --base http://localhost:4378      against the Workers preview
 *   pnpm a11y /docs/button /docs/select         only these paths
 *   pnpm a11y --focus                           also Tab through each page and list every stop
 *                                               that shows no focus frame (the yellow, --color-zero-focus)
 *   pnpm a11y --mobile                          at a phone's width (375 × 812), touch on, and also list any
 *                                               page that scrolls sideways, with what sticks out
 *
 * Exits 1 when anything fails. Like og:capture, it drives Chrome over the DevTools protocol with a
 * throwaway profile, so it stays off the user's own Chrome.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9335;

const args = process.argv.slice(2);
const baseFlag = args.indexOf("--base");
const BASE = baseFlag >= 0 ? args[baseFlag + 1] : "http://localhost:4374";
const FOCUS = args.includes("--focus");
const MOBILE = args.includes("--mobile");
const [WIDTH, HEIGHT] = MOBILE ? [375, 812] : [1280, 900];
const only = args.filter(
  (arg, i) => !arg.startsWith("--") && args[i - 1] !== "--base",
);

const AXE = readFileSync("node_modules/axe-core/axe.min.js", "utf8");

type Violation = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: string[]; colours?: string }[];
};

async function pages(): Promise<string[]> {
  if (only.length > 0) return only;
  const sitemap = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => new URL(url).pathname,
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const profile = mkdtempSync(join(tmpdir(), "zzzui-a11y-"));
const chrome = spawn(
  CHROME,
  [
    "--headless",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let failed = false;
try {
  let target: { webSocketDebuggerUrl: string } | undefined;
  for (let i = 0; i < 100 && !target; i++) {
    await wait(200);
    target = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, {
      method: "PUT",
    })
      .then((r) => r.json())
      .catch(() => undefined);
  }
  if (!target) throw new Error("Chrome's DevTools endpoint never came up");

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve));
  let next = 0;
  const pending = new Map<number, (result: unknown) => void>();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    pending.get(message.id)?.(message.result);
  });
  const send = <T,>(method: string, params: object = {}) =>
    new Promise<T>((resolve) => {
      const id = ++next;
      pending.set(id, resolve as (result: unknown) => void);
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async <T,>(expression: string) =>
    (
      await send<{ result: { value: T } }>("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      })
    ).result.value;

  await send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: MOBILE,
  });
  // a phone has a touch screen, so a page that hides something on a coarse pointer is checked as
  // a phone would show it
  if (MOBILE)
    await send("Emulation.setTouchEmulationEnabled", {
      enabled: true,
      maxTouchPoints: 5,
    });

  const byRule = new Map<
    string,
    { impact: string | null; help: string; where: Set<string> }
  >();
  // colour pairs that fail contrast, with how often each turns up
  const pairs = new Map<string, number>();
  const paths = await pages();
  for (const path of paths) {
    await send("Page.navigate", { url: `${BASE}${path}` });
    // wait for the page itself, not a fixed time: a slow server must not hand a half-loaded page on
    for (let i = 0; i < 60; i++) {
      if ((await evaluate<string>("document.readyState")) === "complete") break;
      await wait(250);
    }
    await wait(1500); // fonts, hydration, the first placements
    await evaluate(AXE);
    const found = await evaluate<Violation[] | undefined>(
      "axe.run(document, { resultTypes: ['violations'] }).then((r) => r.violations.map(({ id, impact, help, nodes }) => ({ id, impact, help, nodes: nodes.map(({ target, any }) => { const d = any?.[0]?.data; return { target, colours: d?.fgColor ? d.fgColor + ' on ' + d.bgColor + ' (' + d.contrastRatio + ':1)' : undefined }; }) })))",
    );
    // a page that never came up is a failure of its own, not a crash of the run
    const violations: Violation[] = found ?? [
      {
        id: "page-load",
        impact: "serious",
        help: "The page did not load in time for the check",
        nodes: [{ target: ["document"] }],
      },
    ];
    for (const v of violations) {
      const entry = byRule.get(v.id) ?? {
        impact: v.impact,
        help: v.help,
        where: new Set<string>(),
      };
      for (const node of v.nodes) {
        entry.where.add(`${path}  ${node.target.join(" ")}`);
        if (node.colours)
          pairs.set(node.colours, (pairs.get(node.colours) ?? 0) + 1);
      }
      byRule.set(v.id, entry);
    }
    if (MOBILE) {
      // a page wider than the phone: name what sticks out past its edge, outside any box that
      // scrolls or clips it (a code block or a table scrolling inside itself is fine)
      const out = await evaluate<string[]>(`(() => {
        const w = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth <= w) return [];
        const found = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.right <= w + 1) continue;
          let p = el.parentElement, clipped = false;
          while (p && p !== document.body) {
            if (getComputedStyle(p).overflowX !== "visible") { clipped = true; break; }
            p = p.parentElement;
          }
          if (clipped) continue;
          found.push((el.getAttribute("data-slot") || el.getAttribute("data-demo") || el.tagName.toLowerCase()) + " " + Math.round(r.right - w) + "px over");
        }
        return found.slice(0, 4);
      })()`);
      if (out.length > 0) {
        const entry = byRule.get("page-overflow") ?? {
          impact: "serious",
          help: "The page scrolls sideways at a phone's width",
          where: new Set<string>(),
        };
        entry.where.add(`${path}  ${out.join(", ")}`);
        byRule.set("page-overflow", entry);
      }
    }
    if (FOCUS) {
      // real Tab presses, so focus-visible applies; a stop counts as framed when the yellow shows
      // on it or on one of its two nearest ancestors (a well frames the input inside it)
      // start from the page's own content (the header and docs nav are checked on the first page)
      const fromMain = paths.indexOf(path) > 0;
      // read the focused state, not a colour halfway through its transition
      await evaluate(
        "(() => { const s = document.createElement('style'); s.textContent = '*, *::before, *::after { transition: none !important; }'; document.head.append(s); })()",
      );
      await evaluate(
        fromMain
          ? "(() => { const main = document.querySelector('main') ?? document.body; main.setAttribute('tabindex', '-1'); main.focus(); })()"
          : "document.activeElement?.blur(); window.scrollTo(0, 0)",
      );
      for (let stop = 0; stop < (fromMain ? 80 : 160); stop++) {
        for (const type of ["keyDown", "keyUp"])
          await send("Input.dispatchKeyEvent", {
            type,
            key: "Tab",
            code: "Tab",
            windowsVirtualKeyCode: 9,
          });
        await wait(60);
        const seen = await evaluate<string | null>(`(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          if (el.tagName === "NEXTJS-PORTAL") return "";
          if (${fromMain} && !document.querySelector("main")?.contains(el)) return null;
          const focus = getComputedStyle(document.documentElement).getPropertyValue("--color-zero-focus").trim();
          const probe = document.createElement("i"); probe.style.color = focus; document.body.append(probe);
          const yellow = getComputedStyle(probe).color; probe.remove();
          const framed = [el, el.parentElement, el.parentElement?.parentElement].some((node) => {
            if (!node) return false;
            const s = getComputedStyle(node);
            return (s.outlineStyle !== "none" && s.outlineColor === yellow) || s.borderTopColor === yellow || s.borderLeftColor === yellow || s.borderBottomColor === yellow || s.backgroundColor === yellow ||
              s.getPropertyValue("--slab-line").trim() === focus || s.getPropertyValue("--slab-line").includes("zero-focus") || s.color === yellow ||
              // an invalid control frames focus in red, with the ink gap opened
              (s.getPropertyValue("--slab-gap").trim() !== "" && s.getPropertyValue("--slab-gap").trim() !== "0px");
          });
          return framed ? "" : (el.getAttribute("data-slot") || el.tagName.toLowerCase()) + " " + (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30);
        })()`);
        if (seen === null) break;
        if (seen) {
          const entry = byRule.get("focus-frame") ?? {
            impact: "serious",
            help: "A focused element shows no focus frame",
            where: new Set<string>(),
          };
          entry.where.add(`${path}  ${seen}`);
          byRule.set("focus-frame", entry);
        }
      }
    }
    process.stdout.write(violations.length ? "✗" : "·");
  }
  process.stdout.write("\n");

  if (byRule.size === 0) {
    console.log(`${paths.length} pages · no violations`);
  } else {
    failed = true;
    for (const [id, { impact, help, where }] of byRule) {
      console.log(`\n${impact ?? "?"}  ${id}: ${help} (${where.size})`);
      const all = id === "focus-frame" || id === "page-overflow";
      for (const line of [...where].slice(0, all ? 200 : 8))
        console.log(`  ${line}`);
      if (!all && where.size > 8) console.log(`  … ${where.size - 8} more`);
    }
    if (pairs.size > 0) {
      console.log("\ncontrast, by colour pair:");
      for (const [pair, count] of [...pairs].sort((a, b) => b[1] - a[1]))
        console.log(`  ${String(count).padStart(4)}  ${pair}`);
    }
    console.log(`\n${paths.length} pages · ${byRule.size} rules failing`);
  }
  socket.close();
} finally {
  const exited = new Promise((resolve) => chrome.once("exit", resolve));
  chrome.kill();
  await exited;
  rmSync(profile, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 200,
  });
}
process.exit(failed ? 1 : 0);
