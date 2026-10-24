/**
 * robots.txt 的策略(yPulse docs/seo-geo.md §5.3)。矩阵的默认是全部放行(作者 2026-10-14 定),
 * 但 AI 爬虫仍逐个列出来:放行的意思写在文件里,体检才能核对。
 *
 * 坑:一个爬虫一旦在某组里被点名,它就**只**读那一组,不再读 `*` 组 —— 所以每一组都重复同样的 disallow。
 */

import type { MetadataRoute } from "next";
import { AI_CRAWLERS } from "./crawlers";

export type CrawlerPolicy =
  /** 搜索引擎与 AI(检索、训练)都放。矩阵默认。 */
  | "allow-all"
  /** 放搜索与检索,挡训练(训练爬虫与控制令牌 Disallow: /)。 */
  | "no-training"
  /** 内部站:谁都不放,不给 sitemap。页面另外要带 noindex。 */
  | "private";

export function robotsFor({
  siteUrl,
  policy = "allow-all",
  disallow = [],
}: {
  siteUrl: string;
  policy?: CrawlerPolicy;
  /** 所有爬虫都不该进的路径(开发专用的页面之类)。 */
  disallow?: string[];
}): MetadataRoute.Robots {
  if (policy === "private")
    return { rules: [{ userAgent: "*", disallow: "/" }] };

  const blocked = (kind: string) =>
    policy === "no-training" && (kind === "training" || kind === "control");
  const open = AI_CRAWLERS.filter((c) => !blocked(c.kind)).map((c) => c.token);
  const shut = AI_CRAWLERS.filter((c) => blocked(c.kind)).map((c) => c.token);
  const rest = disallow.length ? { disallow } : {};

  return {
    rules: [
      { userAgent: "*", allow: "/", ...rest },
      { userAgent: open, allow: "/", ...rest },
      ...(shut.length ? [{ userAgent: shut, disallow: "/" }] : []),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
