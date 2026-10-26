# Deploying zzzUI

Production: https://zzzui.catforest.dev, on Cloudflare Workers through OpenNext. The same Worker
serves the showcase, the docs and the registry (`/r/*.json`).

```sh
pnpm cf:build    # registry, next build, the OpenNext adapter (.open-next/)
pnpm cf:preview  # the production bundle in the Workers runtime, on http://localhost:4378
pnpm cf:deploy   # build and `wrangler deploy`
```

- `wrangler.jsonc` owns the custom domains (routes with `custom_domain`): `zzzui.catforest.dev`,
  the site, and `zeroui.catforest.dev`, the name until 2026-10-26. The first deploy after the
  rename creates the new hostname's DNS record. On the old one, every page redirects for good to
  the same path on the new (`redirects` in `next.config.ts`, matched by host); static files, the
  registry's JSON among them, are served before that and still answer there, so a project set up
  with the old namespace keeps installing. Search Console covers both through the catforest.dev
  domain property; Bing needs the new sitemap submitted (the author's step).
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
pnpm seo:audit --base https://zzzui.catforest.dev   # L0 and L1 all green
pnpm seo:indexnow                                     # push the sitemap to IndexNow (a failure is not fatal)
```

## Going live the first time

Done 2026-10-24 (version `bdfd755c`); kept as the checklist for a full re-check.

1. `pnpm cf:deploy` (after the user's go-ahead).
2. Check the live site: the home page, a docs page, `/studio` (404), `/r/button.json` (JSON).
3. Install from the live registry into a fresh `shadcn init -d -b base` project, the same test as
   the local one, with the namespace pointing at `https://zzzui.catforest.dev/r/{name}.json`.
4. yPulse `config/projects.yaml`: add `productionUrl`, `platform: cloudflare-workers`,
   `seo: pending`.
5. SEO level 0 through the matrix module (yPulse `matrix:seo`; robots, sitemap, canonical, OG
   image), then `seo: public` — a step of its own, see yPulse `docs/seo-geo.md`.
