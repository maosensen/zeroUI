# Deploying zeroUI

Production: https://zeroui.catforest.dev, on Cloudflare Workers through OpenNext. The same Worker
serves the showcase, the docs and the registry (`/r/*.json`).

```sh
pnpm cf:build    # registry, next build, the OpenNext adapter (.open-next/)
pnpm cf:preview  # the production bundle in the Workers runtime, on http://localhost:4378
pnpm cf:deploy   # build and `wrangler deploy`
```

- `wrangler.jsonc` owns the custom domain (`zeroui.catforest.dev`, a route with `custom_domain`).
  It is a new hostname, so the first deploy creates its DNS record; there is nothing to cut over.
- The domain is also written in `src/lib/site.ts` (`SITE_URL`): `metadataBase`, the registry URL
  in the docs and the registry's homepage all read it. Change both together.
- Every page is prerendered; `open-next.config.ts` serves them from the static-assets incremental
  cache. Keep it even though nothing revalidates.
- `/studio` is a 404 in any production build, the Workers one included.
- Deploying needs wrangler logged in to the catforest Cloudflare account (`wrangler login`, a
  one-time browser authorisation), or `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` for a
  Workers deployment token. Never the matrix DNS administration token.

## After every deploy

```sh
pnpm seo:audit --base https://zeroui.catforest.dev   # L0 and L1 all green
pnpm seo:indexnow                                     # push the sitemap to IndexNow (a failure is not fatal)
```

## Going live the first time

Done 2026-10-24 (version `bdfd755c`); kept as the checklist for a full re-check.

1. `pnpm cf:deploy` (after the user's go-ahead).
2. Check the live site: the home page, a docs page, `/studio` (404), `/r/button.json` (JSON).
3. Install from the live registry into a fresh `shadcn init -d -b base` project, the same test as
   the local one, with the namespace pointing at `https://zeroui.catforest.dev/r/{name}.json`.
4. yPulse `config/projects.yaml`: add `productionUrl`, `platform: cloudflare-workers`,
   `seo: pending`.
5. SEO level 0 through the matrix module (yPulse `matrix:seo`; robots, sitemap, canonical, OG
   image), then `seo: public` — a step of its own, see yPulse `docs/seo-geo.md`.
