import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { DocHeader, DocSection, Prose } from "../_components/doc";

export const generateMetadata = metadataFor("/docs/blocks");

const blocks = [
  {
    href: "/docs/blocks/settings-menu",
    title: "Settings menu",
    line: {
      en: "Tabs of settings, apply or hold to restore.",
      zh: "按分页排列的设置，可应用更改，也可按住恢复默认。",
    },
  },
  {
    href: "/docs/blocks/mission-briefing",
    title: "Mission briefing",
    line: {
      en: "A contract, its route, its reward; held to accept.",
      zh: "委托、路线与报酬，按住接受委托。",
    },
  },
  {
    href: "/docs/blocks/loadout",
    title: "Loadout",
    line: {
      en: "The hold, an item's details, a belt.",
      zh: "货舱、物品详情与腰带栏。",
    },
  },
  {
    href: "/docs/blocks/leaderboard",
    title: "Leaderboard",
    line: {
      en: "Periods, the top three by tier, your row.",
      zh: "按周期分页，前三名使用传说、史诗、稀有三档配色，并显示本人所在行。",
    },
  },
  {
    href: "/docs/blocks/hud",
    title: "HUD",
    line: {
      en: "Gauges, objectives, a hotbar that works.",
      zh: "数值条、任务目标，以及可实际使用的快捷栏。",
    },
  },
  {
    href: "/docs/blocks/title-screen",
    title: "Title screen",
    line: { en: "The name, a menu, the news.", zh: "游戏名、主菜单与公告。" },
  },
  {
    href: "/docs/blocks/pause-menu",
    title: "Pause menu",
    line: {
      en: "The run so far, and the ways out.",
      zh: "本局战绩，以及继续、设置、地图与放弃本局。",
    },
  },
  {
    href: "/docs/blocks/character-select",
    title: "Character select",
    line: {
      en: "A roster, ratings, a perk.",
      zh: "角色名单、能力评级与专长。",
    },
  },
  {
    href: "/docs/blocks/community-feed",
    title: "Community feed",
    line: {
      en: "A board of posts, a post in a sheet.",
      zh: "帖子瀑布流，点开的帖子在侧滑面板中查看。",
    },
  },
  {
    href: "/docs/blocks/level-rewards",
    title: "Level rewards",
    line: {
      en: "Rank, experience, rewards to claim.",
      zh: "等级、经验值与待领取的奖励。",
    },
  },
  {
    href: "/docs/blocks/daily-schedule",
    title: "Daily schedule",
    line: {
      en: "Four shifts, the current one framed.",
      zh: "四个时段，当前时段加框标出。",
    },
  },
];

export default async function BlocksPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks")} />
      <DocHeader
        title={pick({ en: "Blocks", zh: "区块" })}
        lead={pick({
          en: "Whole game screens built from zzzUI's components, installed with one command: a title screen, a settings menu, a pause menu, a mission briefing, a character select, a loadout, a leaderboard, a HUD, a community feed, level rewards and a daily schedule.",
          zh: "由 zzzUI 组件组合而成的完整游戏界面，一条命令即可安装：标题画面、设置菜单、暂停菜单、任务简报、角色选择、装备配置、排行榜、HUD、社区留言板、等级奖励与每日日程。",
        })}
      />
      <DocSection
        id="about"
        title={pick({ en: "About blocks", zh: "关于区块" })}
      >
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A block is one file in <code>components/blocks/</code> that
                  puts the components together into a screen, with its state
                  written out so you can see how the pieces talk. Installing a
                  block installs the components it uses. Change it freely: it is
                  yours once copied.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  区块是 <code>components/blocks/</code>{" "}
                  中的一个文件，把多个组件组合成一整屏界面，状态逻辑直接写在文件里，各部分如何联动一目了然。安装区块时，会一并安装它用到的组件。区块复制到项目后即归项目所有，可自由修改。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="list" title={pick({ en: "The blocks", zh: "全部区块" })}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {blocks.map((block) => (
            <li key={block.href}>
              <Link
                href={link(block.href)}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between font-black font-zero text-zero-lg italic">
                  {block.title}
                  <ArrowRightIcon className="text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {pick(block.line)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
