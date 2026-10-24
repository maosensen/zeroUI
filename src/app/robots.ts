import type { MetadataRoute } from "next";
import { robotsFor } from "@/lib/seo/robots";
import { SITE_URL } from "@/lib/site";

/** Search engines and AI crawlers all allowed (yPulse docs/seo-geo.md §1). The studio is a 404 in production; it is shut here too. */
export default function robots(): MetadataRoute.Robots {
  return robotsFor({ siteUrl: SITE_URL, disallow: ["/studio"] });
}
