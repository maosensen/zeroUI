import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered (the docs read their demo files at build time), so they are served
// from the static-assets cache. Keep it even though nothing revalidates.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
