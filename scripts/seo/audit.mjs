#!/usr/bin/env node
/**
 * The SEO / GEO audit (yPulse docs/seo-geo.md §2, §10): runs the L0 and L1 checks of the tiered
 * contract against a site and prints what failed, plus one summary line per level.
 *
 *   node scripts/seo/audit.mjs                                    # local dev (:4374)
 *   node scripts/seo/audit.mjs --base http://localhost:4378 --canonical https://zzzui.catforest.dev
 *                                                                 # the Workers preview (pnpm cf:preview)
 *   node scripts/seo/audit.mjs --base https://zzzui.catforest.dev  # live
 *
 * --limit <n> checks only the first n sitemap pages; --all prints passes too; --json prints
 * everything. Exits 1 on any failure, so it can gate a release. The rules are in
 * src/lib/seo/audit.ts, shared with yPulse's nightly seo-probe.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const { audit } = await import(join(ROOT, "src/lib/seo/audit.ts"));
const { AI_CRAWLERS, SEARCH_ENGINES } = await import(
  join(ROOT, "src/lib/seo/crawlers.ts")
);
const { ORG_ID } = await import(join(ROOT, "src/lib/seo/identity.ts"));

const { values } = parseArgs({
  options: {
    base: { type: "string", default: "http://localhost:4374" },
    canonical: { type: "string" },
    limit: { type: "string" },
    all: { type: "boolean", default: false },
    json: { type: "boolean", default: false },
  },
});

const findings = await audit({
  base: values.base,
  canonicalOrigin: values.canonical,
  // search engines are only used to fetch pages; robots need not name them (filtered below)
  crawlers: [
    ...AI_CRAWLERS,
    ...SEARCH_ENGINES.map((c) => ({ ...c, kind: "engine" })),
  ],
  orgId: ORG_ID,
  limit: values.limit ? Number(values.limit) : undefined,
  multilingual: false,
});

const results = findings.filter(
  (f) =>
    !(
      !f.ok &&
      SEARCH_ENGINES.some((e) => f.check === `robots:${e.token}`) &&
      f.detail?.startsWith("没有单独列出")
    ),
);

if (values.json) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const f of results) {
    if (f.ok && !values.all) continue;
    console.log(
      `${f.ok ? "✓" : "✗"} ${f.level} ${f.check}${f.url ? `  ${f.url}` : ""}${f.detail ? `  — ${f.detail}` : ""}`,
    );
  }
  const failed = results.filter((f) => !f.ok);
  const pages = new Set(results.filter((f) => f.url).map((f) => f.url)).size;
  for (const level of ["L0", "L1"]) {
    const all = results.filter((f) => f.level === level);
    console.log(
      `${level}: ${all.length - all.filter((f) => !f.ok).length}/${all.length} passed`,
    );
  }
  console.log(`${pages} pages · ${failed.length} failed · ${values.base}`);
}
process.exit(results.some((f) => !f.ok) ? 1 : 0);
