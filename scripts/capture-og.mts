/**
 * Captures the share card (public/og.png) from /studio/og, a 1200 × 630 page drawn with the
 * components themselves. Needs the dev server (`~/github/catforest/dev start zeroUI`).
 *
 *   pnpm og:capture
 *
 * Chrome's own `--screenshot` fires before the page hydrates, so the tab slab is missing; this
 * drives headless Chrome over the DevTools protocol instead and waits for it. A throwaway profile
 * keeps it off the user's Chrome profile.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL_TO_CAPTURE = "http://localhost:4374/studio/og";
const PORT = 9333;
const OUT = "public/og.png";

const profile = mkdtempSync(join(tmpdir(), "zeroui-og-"));
const chrome = spawn(
  CHROME,
  [
    "--headless",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--hide-scrollbars",
    "--window-size=1200,630",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: URL_TO_CAPTURE });
  // long enough for fonts, hydration and the tab slab's first placement
  await wait(4000);
  const { data } = await send<{ data: string }>("Page.captureScreenshot", {
    format: "png",
  });
  writeFileSync(OUT, Buffer.from(data, "base64"));
  console.log(`${OUT} written`);
  socket.close();
} finally {
  // Chrome keeps writing to its profile while it shuts down: wait for it before removing it
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
