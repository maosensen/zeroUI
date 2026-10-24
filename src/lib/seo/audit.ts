/**
 * SEO / GEO 体检(yPulse docs/seo-geo.md §2、§10):对一个站的地址跑分级契约的 L0、L1 两组检查。
 * 同一套规则两处用 —— 源仓库发版前对本地构建跑(`scripts/seo/audit.mjs`),yPulse 夜间对线上跑(`seo-probe`)。
 *
 * 不依赖任何包,只用 fetch 和正则:要能被 node 直接读(不经构建),也要能原样搬进 yPulse。
 * 爬虫名单由调用方传进来(`crawlers.ts`),这个文件不 import 别的文件。
 */

export type Level = "L0" | "L1";

export interface Finding {
  level: Level;
  check: string;
  ok: boolean;
  /** 失败时说清楚哪里不对;成功时可以是一个读数。 */
  detail?: string;
  url?: string;
}

export interface AuditCrawler {
  token: string;
  kind: string;
  userAgent?: string;
}

export interface AuditOptions {
  /** 被体检的站点地址(本地 `http://localhost:4379`,或线上地址)。 */
  base: string;
  /**
   * 页面里写的规范域名(canonical、sitemap 用的那个)。体检本地的生产构建时它和 `base` 不同:
   * sitemap 里的地址换成 `base` 去取,canonical 仍对照规范域名。默认等于 `base`。
   */
  canonicalOrigin?: string;
  crawlers: readonly AuditCrawler[];
  /** 全矩阵共用的品牌节点 `@id`;JSON-LD 里必须有它。 */
  orgId: string;
  /** 只抽查 sitemap 里的前几页(默认全部)。 */
  limit?: number;
  /** 关掉 JS 时一页至少要有多少字的正文(默认 200)。 */
  minText?: number;
  /** 爬虫策略(robots.ts 的 CrawlerPolicy):`no-training` 时训练爬虫与控制令牌被整站挡住才算对。默认 `allow-all`。 */
  policy?: "allow-all" | "no-training";
  /** 站点有多种语言:有译本的页要求 hreflang 互指、带 x-default(只有一种语言的页不要求)。 */
  multilingual?: boolean;
  /** 同时取几页(默认 6)。 */
  concurrency?: number;
}

const ok = (level: Level, check: string, detail?: string, url?: string) => ({
  level,
  check,
  ok: true,
  detail,
  url,
});
const bad = (level: Level, check: string, detail: string, url?: string) => ({
  level,
  check,
  ok: false,
  detail,
  url,
});

async function get(url: string, userAgent?: string) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: userAgent ? { "user-agent": userAgent } : undefined,
  });
  return { status: res.status, text: await res.text(), url: res.url };
}

/** robots.txt 拆成组:每组一串 user-agent 和它们的规则。 */
export function parseRobots(text: string) {
  const groups: { agents: string[]; allow: string[]; disallow: string[] }[] =
    [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  const sitemaps: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (key === "sitemap") sitemaps.push(value);
    else if (current && key === "allow") current.allow.push(value);
    else if (current && key === "disallow") current.disallow.push(value);
  }
  return { groups, sitemaps };
}

/** 某个爬虫实际读哪一组:点了它名字的组优先,没有就读 `*`。 */
export function groupFor(
  robots: ReturnType<typeof parseRobots>,
  token: string,
) {
  const t = token.toLowerCase();
  return (
    robots.groups.find((g) => g.agents.includes(t)) ??
    robots.groups.find((g) => g.agents.includes("*"))
  );
}

const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i"))?.[1] ??
  tag.match(new RegExp(`\\b${name}\\s*=\\s*'([^']*)'`, "i"))?.[1];

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

/** 两个地址是否同一个(根地址带不带 `/` 算同一个)。 */
function sameUrl(a: string, b: string) {
  try {
    return new URL(a).href === new URL(b).href;
  } catch {
    return a === b;
  }
}

function tags(html: string, name: string) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function meta(html: string, key: string) {
  for (const t of tags(html, "meta"))
    if (attr(t, "name") === key || attr(t, "property") === key)
      return decode(attr(t, "content") ?? "");
  return undefined;
}

function links(html: string, rel: string) {
  return tags(html, "link").filter((t) => attr(t, "rel") === rel);
}

/** 关掉 JS 时读得到的正文:去掉脚本、样式、标签,压空白。 */
export function visibleText(html: string) {
  return decode(
    html
      .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function jsonLdBlocks(html: string) {
  const out: unknown[] = [];
  const re =
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      out.push(Symbol.for("invalid"));
    }
  }
  return out;
}

function nodesOf(block: unknown): Record<string, unknown>[] {
  if (!block || typeof block !== "object") return [];
  const b = block as Record<string, unknown>;
  if (Array.isArray(b["@graph"]))
    return b["@graph"] as Record<string, unknown>[];
  return [b];
}

async function pool<T, R>(
  items: readonly T[],
  size: number,
  run: (item: T) => Promise<R>,
) {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await run(items[i]);
      }
    }),
  );
  return out;
}

export async function audit(o: AuditOptions): Promise<Finding[]> {
  const base = o.base.replace(/\/$/, "");
  const canonical = (o.canonicalOrigin ?? base).replace(/\/$/, "");
  const fetchable = (url: string) =>
    url.startsWith(canonical) ? base + url.slice(canonical.length) : url;
  const found: Finding[] = [];

  // ---- robots.txt
  const robotsRes = await get(`${base}/robots.txt`);
  if (robotsRes.status !== 200) {
    found.push(bad("L0", "robots", `robots.txt 返回 ${robotsRes.status}`));
  } else {
    const robots = parseRobots(robotsRes.text);
    found.push(
      robots.sitemaps.length
        ? ok("L0", "robots", `sitemap: ${robots.sitemaps.join(", ")}`)
        : bad("L0", "robots", "robots.txt 没有 Sitemap 行"),
    );
    const star = groupFor(robots, "*");
    for (const c of o.crawlers) {
      const g = groupFor(robots, c.token);
      const named = g?.agents.includes(c.token.toLowerCase());
      const shut = g?.disallow.includes("/");
      const mustShut =
        o.policy === "no-training" &&
        (c.kind === "training" || c.kind === "control");
      if (mustShut)
        found.push(
          shut
            ? ok("L1", `robots:${c.token}`, "按策略挡住")
            : bad("L1", `robots:${c.token}`, "策略是挡训练,它却没被挡"),
        );
      else if (shut)
        found.push(bad("L1", `robots:${c.token}`, "整站 Disallow: /"));
      else if (!named)
        found.push(bad("L1", `robots:${c.token}`, "没有单独列出(只读 * 组)"));
      else if (star?.disallow.some((d) => d && !g?.disallow.includes(d)))
        found.push(
          bad(
            "L1",
            `robots:${c.token}`,
            `* 组的 disallow 没有在它的组里重复(${star.disallow.join(", ")})`,
          ),
        );
      else found.push(ok("L1", `robots:${c.token}`));
    }
  }

  // ---- sitemap
  const mapRes = await get(`${base}/sitemap.xml`);
  let urls: string[] = [];
  const alternatesOf = new Map<string, Map<string, string>>();
  if (mapRes.status !== 200) {
    found.push(bad("L0", "sitemap", `sitemap.xml 返回 ${mapRes.status}`));
  } else {
    for (const m of mapRes.text.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
      if (!loc) continue;
      urls.push(decode(loc));
      const alts = new Map<string, string>();
      for (const a of m[1].matchAll(/<xhtml:link\b[^>]*>/g)) {
        const lang = attr(a[0], "hreflang");
        const href = attr(a[0], "href");
        if (lang && href) alts.set(lang, decode(href));
      }
      alternatesOf.set(decode(loc), alts);
    }
    found.push(
      urls.length
        ? ok("L0", "sitemap", `${urls.length} 个地址`)
        : bad("L0", "sitemap", "sitemap 里没有地址"),
    );
    if (o.multilingual) {
      const broken: string[] = [];
      for (const [loc, alts] of alternatesOf) {
        // 只有一种语言的页(没有译本)不需要 hreflang
        if (!alts.size) continue;
        if (!alts.has("x-default")) broken.push(`${loc}:没有 x-default`);
        if (![...alts.values()].includes(loc))
          broken.push(`${loc}:hreflang 里没有自己`);
        for (const [lang, href] of alts) {
          if (lang === "x-default") continue;
          const back = alternatesOf.get(href);
          if (back && ![...back.values()].includes(loc))
            broken.push(`${loc} → ${href}(${lang})没有指回来`);
        }
      }
      found.push(
        broken.length
          ? bad("L1", "sitemap:hreflang", broken.slice(0, 5).join(";"))
          : ok("L1", "sitemap:hreflang", `${alternatesOf.size} 个地址互指`),
      );
    }
  }
  if (o.limit) urls = urls.slice(0, o.limit);

  // ---- AI 爬虫真的能取到首页(只能排除最明显的拦截:伪造的 UA 不等于真爬虫的 IP)
  const ua = [...o.crawlers].filter((c) => c.userAgent);
  const uaResults = await pool(ua, o.concurrency ?? 6, async (c) => {
    const r = await get(`${base}/`, c.userAgent);
    return { c, status: r.status };
  });
  for (const { c, status } of uaResults)
    found.push(
      status === 200
        ? ok("L1", `fetch:${c.token}`)
        : bad("L1", `fetch:${c.token}`, `首页返回 ${status}`),
    );

  // ---- llms.txt
  const llms = await get(`${base}/llms.txt`);
  if (llms.status !== 200) {
    found.push(bad("L1", "llms.txt", `返回 ${llms.status}`));
  } else {
    const targets = [...llms.text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map(
      (m) => m[1],
    );
    const dead = (
      await pool(targets, o.concurrency ?? 6, async (u) => ({
        u,
        s: (await get(fetchable(u))).status,
      }))
    ).filter((x) => x.s !== 200);
    found.push(
      !llms.text.startsWith("# ")
        ? bad("L1", "llms.txt", "第一行不是 `# 站名`")
        : dead.length
          ? bad(
              "L1",
              "llms.txt",
              `打不开的链接:${dead
                .slice(0, 5)
                .map((d) => `${d.u}(${d.s})`)
                .join(", ")}`,
            )
          : ok("L1", "llms.txt", `${targets.length} 条链接都能打开`),
    );
  }

  // ---- 每一页
  const minText = o.minText ?? 200;
  const pages = await pool(urls, o.concurrency ?? 6, async (url) => {
    const r = await get(fetchable(url));
    return { ...r, url };
  });
  for (const p of pages) {
    const out: Finding[] = [];
    if (p.status !== 200) {
      found.push(bad("L0", "page", `返回 ${p.status}`, p.url));
      continue;
    }
    const h = p.text;
    const head = h.split(/<\/head>/i)[0];
    const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
    const description = meta(head, "description");
    const canon = links(head, "canonical")
      .map((t) => attr(t, "href"))
      .find(Boolean);
    const lang = attr(tags(h, "html")[0] ?? "", "lang");
    const robotsMeta = meta(head, "robots");
    const og = meta(head, "og:image");
    const text = visibleText(h.split(/<\/head>/i)[1] ?? h);

    if (!title) out.push(bad("L0", "title", "没有 <title>", p.url));
    if (!description)
      out.push(bad("L0", "description", "没有 meta description", p.url));
    if (!canon) out.push(bad("L0", "canonical", "没有 canonical", p.url));
    else if (sameUrl(decode(canon), p.url) === false)
      out.push(
        bad("L0", "canonical", `canonical 指向 ${decode(canon)}`, p.url),
      );
    if (!lang) out.push(bad("L0", "lang", "<html> 没有 lang", p.url));
    if (!og) out.push(bad("L0", "og:image", "没有 og:image", p.url));
    if (robotsMeta && /noindex/i.test(robotsMeta))
      out.push(bad("L0", "noindex", "公开页带了 noindex", p.url));
    if (text.length < minText)
      out.push(
        bad("L0", "text", `关掉 JS 只有 ${text.length} 字的正文`, p.url),
      );

    if (o.multilingual) {
      // 有译本的页:<head> 里的 hreflang 要带 x-default;只有一种语言的页可以一条都没有
      const hl = links(head, "alternate").filter((t) => attr(t, "hreflang"));
      const expected = alternatesOf.get(p.url)?.size ?? 0;
      if (expected && !hl.some((t) => attr(t, "hreflang") === "x-default"))
        out.push(bad("L1", "hreflang", "<head> 里没有 x-default", p.url));
      if (expected && hl.length < 2)
        out.push(bad("L1", "hreflang", "<head> 里没有 hreflang", p.url));
    }

    const blocks = jsonLdBlocks(h);
    if (!blocks.length) out.push(bad("L1", "json-ld", "没有 JSON-LD", p.url));
    else if (blocks.some((b) => b === Symbol.for("invalid")))
      out.push(bad("L1", "json-ld", "有一段 JSON-LD 解析不了", p.url));
    else {
      const nodes = blocks.flatMap(nodesOf);
      if (nodes.some((n) => !n["@type"]))
        out.push(bad("L1", "json-ld", "有节点没有 @type", p.url));
      if (!nodes.some((n) => n["@id"] === o.orgId))
        out.push(bad("L1", "json-ld", `没有品牌节点 ${o.orgId}`, p.url));
    }

    if (!out.length) out.push(ok("L0", "page", `${text.length} 字正文`, p.url));
    found.push(...out);
  }
  return found;
}
