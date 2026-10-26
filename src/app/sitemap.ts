import type { MetadataRoute } from "next";
import { HTML_LANG, LANGS } from "@/lib/i18n/locale";
import { publicUrls } from "@/seo/graph";
import { pageUrl } from "@/seo/site";

/** Every public page in both languages, each listing the other as its alternate. */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicUrls().map(({ path, lang }) => ({
    url: pageUrl(path, lang),
    alternates: {
      languages: {
        ...Object.fromEntries(
          LANGS.map((other) => [HTML_LANG[other], pageUrl(path, other)]),
        ),
        "x-default": pageUrl(path),
      },
    },
  }));
}
