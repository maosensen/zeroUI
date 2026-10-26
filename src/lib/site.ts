/**
 * The canonical address of the public site, declared in code (yPulse docs/seo-geo.md: never from
 * an environment variable, which once let metadataBase fall back to localhost unnoticed). The
 * layout's metadataBase, the registry URL in the docs, and scripts/build-registry.mts all read it;
 * wrangler.jsonc routes the same domain.
 */
export const SITE_URL = "https://zzzui.catforest.dev";

/** Where shadcn finds @zzzui items. */
export const REGISTRY_URL = `${SITE_URL}/r/{name}.json`;
