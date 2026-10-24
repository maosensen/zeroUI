import type { MetadataRoute } from "next";
import { publicPaths } from "@/seo/graph";
import { pageUrl } from "@/seo/site";

/** Every public page; one language, so no hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths().map((path) => ({ url: pageUrl(path) }));
}
