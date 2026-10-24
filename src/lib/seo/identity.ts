/**
 * 品牌身份:全矩阵 JSON-LD 共用的一个 Organization 节点,以及社交名片的账号清单
 * (yPulse docs/seo-geo.md §4)。
 *
 * **生成文件,不要手改。**源头是 yPulse `config/identity.yaml`,由 `pnpm matrix:seo --write` 写进每个
 * 公开站和 yPulse 自己。对外只用品牌 catforest,不建 Person(作者 2026-10-14 定)。
 */

export const ORG_ID = "https://catforest.dev/#org";

export const IDENTITY = {
  id: ORG_ID,
  name: "catforest",
  alternateName: ["猫森", "cat-forest", "CatForest"],
  url: "https://catforest.dev",
  /** 方形 logo;空着就不输出。 */
  logo: "https://catforest.dev/brand/catforest.png",
  description: {
    en: "An independent studio making mathematical short films, interactive tools and design systems — every frame computed in code.",
    zh: "独立工作室，做数学短片、交互工具与设计系统 —— 每一帧都由代码计算。",
  },
  /** 公开的、确实属于这个品牌的主页。 */
  sameAs: [
    "https://space.bilibili.com/10681170",
    "https://www.xiaohongshu.com/user/profile/5a04e952b1da140871adc011",
    "https://www.douyin.com/user/MS4wLjABAAAARMdrvnWst3FdxaDl59HSTYbF1M3KBdDPvmN8udwUJ_c",
    "https://x.com/catforestai",
    "https://github.com/maosensen",
    "https://www.youtube.com/@catforestai",
  ],
} as const;

/** 社交名片的平台 id。平台名是界面文案,归各站自己。 */
export type ProfileId =
  | "site"
  | "bilibili"
  | "xiaohongshu"
  | "douyin"
  | "x"
  | "github"
  | "youtube";

/** 名片的一行:平台 id、账号在那个平台上显示的名字、主页地址。 */
export type Profile = { id: ProfileId; name: string; url: string };

/** 名片的顺序:官网在最前,其余照 identity.yaml。 */
export const PROFILES: readonly Profile[] = [
  {
    id: "site",
    name: "catforest.dev",
    url: "https://catforest.dev",
  },
  {
    id: "bilibili",
    name: "猫森CatForest",
    url: "https://space.bilibili.com/10681170",
  },
  {
    id: "xiaohongshu",
    name: "猫森",
    url: "https://www.xiaohongshu.com/user/profile/5a04e952b1da140871adc011",
  },
  {
    id: "douyin",
    name: "猫森",
    url: "https://www.douyin.com/user/MS4wLjABAAAARMdrvnWst3FdxaDl59HSTYbF1M3KBdDPvmN8udwUJ_c",
  },
  {
    id: "x",
    name: "@catforestai",
    url: "https://x.com/catforestai",
  },
  {
    id: "github",
    name: "maosensen",
    url: "https://github.com/maosensen",
  },
  {
    id: "youtube",
    name: "catforest",
    url: "https://www.youtube.com/@catforestai",
  },
];
