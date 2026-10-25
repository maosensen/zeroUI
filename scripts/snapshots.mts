/**
 * Screenshot regression: photographs every docs demo (each `[data-demo]` box) and compares it with
 * its baseline in tests/snapshots/, pixel by pixel. A change to a token (the slant, an outline
 * weight, a colour) shows up here as the demos it moved. Needs the dev server.
 *
 *   pnpm snapshots                      compare every demo with its baseline
 *   pnpm snapshots --update             write the baselines (after a change you meant)
 *   pnpm snapshots button-variants      only these demos
 *   pnpm snapshots --base http://localhost:4378
 *   pnpm snapshots --mobile             at a phone's width (375), against tests/snapshots/375/
 *
 * Motion is held still (reduced motion, no transitions or animations) so a photo is the same each
 * time. A few demos change by themselves (a progress bar on a timer, a calendar that marks today)
 * and are left out. Differences are written as images to $TMPDIR/zeroui-snapshots/.
 */
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9336;
const args = process.argv.slice(2);
const MOBILE = args.includes("--mobile");
const WIDTH = MOBILE ? 375 : 1280;
const DIR = MOBILE ? "tests/snapshots/375" : "tests/snapshots";
const DIFFS = join(tmpdir(), "zeroui-snapshots");
/** Demos that move by themselves. */
const SKIP = new Set(["progress-kinds", "calendar-shift"]);
/** Share of a demo's pixels that may differ (anti-aliasing) before it counts as changed. */
const TOLERANCE = 0.001;

const UPDATE = args.includes("--update");
const baseFlag = args.indexOf("--base");
const BASE = baseFlag >= 0 ? args[baseFlag + 1] : "http://localhost:4374";
const only = new Set(
  args.filter((arg, i) => !arg.startsWith("--") && args[i - 1] !== "--base"),
);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function docsPages(): Promise<string[]> {
  const sitemap = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname)
    .filter((path) => path.startsWith("/docs/"));
}

mkdirSync(DIR, { recursive: true });
mkdirSync(DIFFS, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "zeroui-snap-"));
const chrome = spawn(
  CHROME,
  [
    "--headless",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    `--window-size=${WIDTH},900`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const changed: string[] = [];
const added: string[] = [];
let checked = 0;
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
    height: 900,
    deviceScaleFactor: 1,
    mobile: MOBILE,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  // with names given, only the pages they can be on: a demo is named after its page ("button-variants")
  const pages = (await docsPages()).filter(
    (path) =>
      only.size === 0 ||
      [...only].some((name) =>
        name.startsWith(`${path.slice("/docs/".length)}-`),
      ),
  );
  for (const path of pages) {
    await send("Page.navigate", { url: `${BASE}${path}` });
    await wait(2500);
    await evaluate(
      "(async () => { const s = document.createElement('style'); s.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; } nextjs-portal { display: none !important; }'; document.head.append(s); await document.fonts.ready; })()",
    );
    await wait(1200); // charts and carousels settle
    const demos = await evaluate<
      { name: string; x: number; y: number; w: number; h: number }[]
    >(
      "[...document.querySelectorAll('[data-demo]')].map((el) => { const r = el.getBoundingClientRect(); return { name: el.getAttribute('data-demo'), x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; })",
    );
    for (const demo of demos) {
      if (SKIP.has(demo.name)) continue;
      if (only.size > 0 && !only.has(demo.name)) continue;
      const { data } = await send<{ data: string }>("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
          x: demo.x,
          y: demo.y,
          width: Math.ceil(demo.w),
          height: Math.ceil(demo.h),
          scale: 1,
        },
      });
      const shot = Buffer.from(data, "base64");
      const file = join(DIR, `${demo.name}.png`);
      checked++;
      if (UPDATE || !existsSync(file)) {
        if (!existsSync(file)) added.push(demo.name);
        writeFileSync(file, shot);
        continue;
      }
      const before = PNG.sync.read(readFileSync(file));
      const after = PNG.sync.read(shot);
      if (before.width !== after.width || before.height !== after.height) {
        changed.push(
          `${demo.name} (size ${before.width}×${before.height} → ${after.width}×${after.height})`,
        );
        writeFileSync(join(DIFFS, `${demo.name}.after.png`), shot);
        continue;
      }
      const diff = new PNG({ width: after.width, height: after.height });
      const pixels = pixelmatch(
        before.data,
        after.data,
        diff.data,
        after.width,
        after.height,
        { threshold: 0.1 },
      );
      if (pixels / (after.width * after.height) > TOLERANCE) {
        changed.push(`${demo.name} (${pixels} px)`);
        writeFileSync(
          join(DIFFS, `${demo.name}.diff.png`),
          PNG.sync.write(diff),
        );
        writeFileSync(join(DIFFS, `${demo.name}.after.png`), shot);
      }
    }
    process.stdout.write(".");
  }
  process.stdout.write("\n");
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

if (UPDATE) console.log(`${checked} baselines written to ${DIR}`);
else {
  if (added.length) console.log(`new baselines: ${added.join(", ")}`);
  if (changed.length) {
    console.log(`changed (diffs in ${DIFFS}):\n  ${changed.join("\n  ")}`);
    console.log(`\n${checked} demos · ${changed.length} changed`);
    process.exit(1);
  }
  console.log(`${checked} demos · none changed`);
}
