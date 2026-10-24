/**
 * 已知的 AI 爬虫与控制令牌(yPulse docs/seo-geo.md §5.3、§11)。robots 按这张表逐个列出,体检拿各家的 UA 去取页。
 *
 * 这张表会过时:`checked` 超过三个月的,用之前先去 `source` 再核一次,核完改日期。第三方博客不算源头。
 * 本模块只用相对路径 import,node 脚本能直接读(体检的命令行就是这么用的)。
 */

export type CrawlerKind =
  /** 搜索收录:决定 AI 回答时能不能引用、链接我们。 */
  | "search"
  /** 用户提问时现场抓页;厂商说可能不守 robots。 */
  | "user"
  /** 训练数据。 */
  | "training"
  /** 不是爬虫,只是 robots 里的开关(内容能否用于某家模型)。没有自己的 UA。 */
  | "control";

export interface Crawler {
  token: string;
  vendor: string;
  kind: CrawlerKind;
  /** 体检取页用的 UA(控制令牌没有)。 */
  userAgent?: string;
  source: string;
  checked: string;
}

const OPENAI = "https://developers.openai.com/api/docs/bots";
const ANTHROPIC = "https://support.claude.com/en/articles/8896518";
const PERPLEXITY = "https://docs.perplexity.ai/guides/bots";
const GOOGLE =
  "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers";
const APPLE = "https://support.apple.com/en-us/119829";

export const AI_CRAWLERS: readonly Crawler[] = [
  {
    token: "OAI-SearchBot",
    vendor: "OpenAI",
    kind: "search",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
    source: OPENAI,
    checked: "2026-10-14",
  },
  {
    token: "Claude-SearchBot",
    vendor: "Anthropic",
    kind: "search",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)",
    source: ANTHROPIC,
    checked: "2026-10-14",
  },
  {
    token: "PerplexityBot",
    vendor: "Perplexity",
    kind: "search",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
    source: PERPLEXITY,
    checked: "2026-10-14",
  },
  {
    token: "ChatGPT-User",
    vendor: "OpenAI",
    kind: "user",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
    source: OPENAI,
    checked: "2026-10-14",
  },
  {
    token: "Claude-User",
    vendor: "Anthropic",
    kind: "user",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)",
    source: ANTHROPIC,
    checked: "2026-10-14",
  },
  {
    token: "Perplexity-User",
    vendor: "Perplexity",
    kind: "user",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)",
    source: PERPLEXITY,
    checked: "2026-10-14",
  },
  {
    token: "GPTBot",
    vendor: "OpenAI",
    kind: "training",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    source: OPENAI,
    checked: "2026-10-14",
  },
  {
    token: "ClaudeBot",
    vendor: "Anthropic",
    kind: "training",
    userAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
    source: ANTHROPIC,
    checked: "2026-10-14",
  },
  {
    token: "Google-Extended",
    vendor: "Google",
    kind: "control",
    source: GOOGLE,
    checked: "2026-10-14",
  },
  {
    token: "Applebot-Extended",
    vendor: "Apple",
    kind: "control",
    source: APPLE,
    checked: "2026-10-14",
  },
];

/** 体检时顺带取一次页的传统搜索爬虫(不进 robots 的单独分组:它们读 `*` 组就够了)。 */
export const SEARCH_ENGINES: readonly Pick<Crawler, "token" | "userAgent">[] = [
  {
    token: "Googlebot",
    userAgent:
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  },
  {
    token: "bingbot",
    userAgent:
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  },
];
