#!/usr/bin/env node
/**
 * Pushes every address in the live sitemap to IndexNow (yPulse docs/seo-geo.md §8). Run once
 * after a deploy; try --dry-run first. The key is in src/seo/site.ts, and public/<key>.txt holds
 * the same string (public, not a secret).
 *
 *   node scripts/seo/indexnow.mjs [--site https://zeroui.catforest.dev] [--dry-run]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const { submitIndexNow } = await import(join(ROOT, "src/lib/seo/indexnow.ts"));

const { values } = parseArgs({
  options: {
    site: { type: "string", default: "https://zeroui.catforest.dev" },
    "dry-run": { type: "boolean", default: false },
  },
});
const site = values.site.replace(/\/$/, "");

// read the key from src/seo/site.ts (that file imports @/ paths node cannot load; take one line)
const key = readFileSync(join(ROOT, "src/seo/site.ts"), "utf8").match(
  /INDEXNOW_KEY = "([0-9a-f]+)"/,
)?.[1];
if (!key) throw new Error("no INDEXNOW_KEY in src/seo/site.ts");

// the key file must be live first: search engines check it
const keyFile = await fetch(`${site}/${key}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== key)
  throw new Error(
    `${site}/${key}.txt is not live or is wrong (${keyFile.status})`,
  );

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urls.length) throw new Error("the sitemap has no addresses");

if (values["dry-run"]) {
  console.log(`${urls.length} addresses, key ${key} (dry run, nothing sent)`);
  for (const u of urls.slice(0, 5)) console.log(`  ${u}`);
  process.exit(0);
}
const results = await submitIndexNow({ siteUrl: site, key, urls });
for (const r of results)
  console.log(`IndexNow ${r.status}: ${r.count} addresses`);
// 200 accepted, 202 accepted pending the key check; anything else failed
process.exit(
  results.every((r) => r.status === 200 || r.status === 202) ? 0 : 1,
);
