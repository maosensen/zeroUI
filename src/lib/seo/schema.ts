/**
 * JSON-LD 的公共零件(yPulse docs/seo-geo.md §4、§5.1):品牌、站点、网页、面包屑,以及把它们拼成一张 `@graph`。
 * 各页自己的类型(`CreativeWork`、`VideoObject`、`WebApplication`……)由站点在 `src/seo/` 里用 schema-dts 的类型拼,
 * 这里只放每个站都一样的部分。
 *
 * 节点之间用 `@id` 互指:站点是 `<站点>/#website`,网页是 `<地址>#webpage`,品牌是 `ORG_ID`。
 * 每页都内嵌完整的品牌节点 —— 爬虫不会去别的站解引用。
 */

import type {
  BreadcrumbList,
  Graph,
  Organization,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";
import { IDENTITY, ORG_ID } from "./identity";

export type LangTag = string;

/** 只带 `@id` 的引用。 */
export const ref = (id: string) => ({ "@id": id });

export const websiteId = (siteUrl: string) => `${siteUrl}/#website`;
export const webpageId = (url: string) => `${url}#webpage`;

/** 品牌节点。`lang` 决定描述用哪种语言(没有那种就用英文)。 */
export function organization(lang?: string): Organization {
  const description =
    (lang && (IDENTITY.description as Record<string, string>)[lang]) ??
    IDENTITY.description.en;
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: IDENTITY.name,
    alternateName: [...IDENTITY.alternateName],
    url: IDENTITY.url,
    ...(IDENTITY.logo ? { logo: IDENTITY.logo } : {}),
    description,
    sameAs: [...IDENTITY.sameAs],
  };
}

export function website(site: {
  url: string;
  name: string;
  alternateName?: string[];
  description: string;
  inLanguage: LangTag | LangTag[];
}): WebSite {
  return {
    "@type": "WebSite",
    "@id": websiteId(site.url),
    url: site.url,
    name: site.name,
    ...(site.alternateName?.length
      ? { alternateName: site.alternateName }
      : {}),
    description: site.description,
    inLanguage: site.inLanguage,
    publisher: ref(ORG_ID),
  };
}

/** 一页本身。`about` 指向这一页讲的那件东西(短片、工具……)的 `@id`。 */
export function webPage(page: {
  siteUrl: string;
  url: string;
  name: string;
  description: string;
  inLanguage: LangTag;
  type?: "WebPage" | "AboutPage" | "CollectionPage";
  about?: string;
  image?: string;
  breadcrumb?: boolean;
}): WebPage {
  return {
    "@type": page.type ?? "WebPage",
    "@id": webpageId(page.url),
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: page.inLanguage,
    isPartOf: ref(websiteId(page.siteUrl)),
    ...(page.about ? { about: ref(page.about) } : {}),
    ...(page.image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: page.image } }
      : {}),
    ...(page.breadcrumb ? { breadcrumb: ref(`${page.url}#breadcrumb`) } : {}),
  } as WebPage;
}

/** 面包屑:从首页到这一页,最后一项是这一页自己。 */
export function breadcrumbs(
  url: string,
  items: readonly { name: string; url: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** 一页的全部节点拼成一张图。 */
export function graph(nodes: readonly (Thing | false | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean) as Thing[],
  } as Graph;
}

/** 写进 `<script type="application/ld+json">` 的字符串:`<` 转义,防止内容里的 `</script>` 提前闭合。 */
export function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** 秒数 → ISO 8601 时长(`PT7M42S`),给 `VideoObject.duration`。 */
export function isoDuration(seconds: number) {
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${r || (!h && !m) ? `${r}S` : ""}`;
}
