import Link from "next/link";
import type { ReactNode } from "react";
import { Hud } from "@/components/blocks/hud";
import { Button } from "@/components/zero/button";
import { ArrowRightIcon } from "@/components/zero/icons";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { REGISTRY_URL } from "@/lib/site";
import { homeGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { ComponentIndex } from "./_showcase/component-index";
import { Console } from "./_showcase/console";
import { JobBoard } from "./_showcase/job-board";
import { SlantDial } from "./_showcase/slant-dial";
import { SiteHeader } from "./_site/site-header";
import { CodeBlock } from "./docs/_components/code-block";

/** The showcase: what zzzUI looks like at work, and the way into the docs. */

export const generateMetadata = metadataFor("/");

function Heading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <p className="font-bold font-zero text-zero-accent text-zero-xs uppercase italic tracking-[0.12em]">
        {eyebrow}
      </p>
      <h2 className="font-black font-zero text-zero-2xl italic">{children}</h2>
    </div>
  );
}

const rules = [
  {
    title: { en: "Cut, never rounded", zh: "只切角，不倒圆" },
    text: {
      en: "Every block is a slab with an edge cut on one slant. Slabs set side by side nest into each other.",
      zh: "每一块都是斜切块，边缘按同一角度斜切；并排放置时，彼此嵌合。",
    },
  },
  {
    title: { en: "Lifted by outline", zh: "以描边分层" },
    text: {
      en: "No shadows. Thick ink outlines and a quiet second line do the work, and a yellow frame marks focus.",
      zh: "不用阴影。层次由墨黑粗描边和一道暗色副线撑起，焦点由黄色焦点框标出。",
    },
  },
  {
    title: { en: "Moves on purpose", zh: "动效各有其用" },
    text: {
      en: "A fast press and a springing release, a slab that slides, popups that grow and fold. All of it holds still for reduced motion.",
      zh: "按下迅速、松开回弹，斜切块滑动，弹出层展开又收起。系统开启「减少动态效果」时，全部静止。",
    },
  },
];

const blocks = [
  ["/docs/blocks/settings-menu", "Settings menu"],
  ["/docs/blocks/mission-briefing", "Mission briefing"],
  ["/docs/blocks/loadout", "Loadout"],
  ["/docs/blocks/leaderboard", "Leaderboard"],
  ["/docs/blocks/title-screen", "Title screen"],
  ["/docs/blocks/pause-menu", "Pause menu"],
  ["/docs/blocks/character-select", "Character select"],
  ["/docs/blocks/community-feed", "Community feed"],
  ["/docs/blocks/level-rewards", "Level rewards"],
  ["/docs/blocks/daily-schedule", "Daily schedule"],
] as const;

export default async function Home({ params }: LangProps) {
  await enter(params);
  return (
    <div className="relative min-h-svh overflow-x-clip bg-zero-ground">
      <JsonLd data={homeGraph()} />

      {/* the hatching: drifting on the first screen, then fading into the still hatching below,
          so it settles where the content to be read begins */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-svh overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
      >
        <div className="absolute inset-y-0 left-0 right-[calc(-1*var(--zero-drift-step))] animate-zero-drift bg-(image:--zero-hatch) motion-reduce:animate-none" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[65svh] bottom-0 bg-(image:--zero-hatch) [mask-image:linear-gradient(to_bottom,transparent,black_35svh)]"
      />
      <SiteHeader
        end={
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href={link("/docs")} />}
          >
            {pick({ en: "Get started", zh: "快速开始" })}
          </Button>
        }
      />

      {/* lettering in the ground, barely lighter than it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-[52rem] overflow-hidden"
      >
        <p className="absolute -left-8 top-24 rotate-(--zero-tilt) whitespace-nowrap font-black font-zero text-[clamp(7rem,18vw,15rem)] text-zero-surface italic leading-none">
          CUT ON THE SLANT
        </p>
        <p className="absolute top-[30rem] left-[20%] rotate-(--zero-tilt) whitespace-nowrap font-black font-zero text-[clamp(5rem,12vw,10rem)] text-zero-surface italic leading-none">
          ZZZ
        </p>
      </div>

      <main className="relative mx-auto grid max-w-6xl gap-28 px-4 pt-14 pb-24 sm:px-8 sm:pt-20">
        <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pt-6">
          <div className="grid justify-items-start gap-7">
            <p className="font-bold font-zero text-zero-text-2 text-zero-xs uppercase italic tracking-[0.12em]">
              {pick({
                en: "Components for shadcn, on Base UI",
                zh: "基于 Base UI 的 shadcn 组件",
              })}
            </p>
            <h1 className="origin-left rotate-(--zero-tilt) font-black font-zero text-zero-3xl italic">
              {pick({
                en: (
                  <>
                    Cut on
                    <br />
                    <span className="text-zero-accent">the slant.</span>
                  </>
                ),
                zh: (
                  <>
                    一切
                    <br />
                    <span className="text-zero-accent">皆斜切。</span>
                  </>
                ),
              })}
            </h1>
            <p className="max-w-md font-medium text-zero-lg text-zero-text-2">
              {pick({
                en: "zzzUI is a dark-only component library with a strong game-UI look: black bars, a charcoal ground, one fluorescent accent, slabs with thick outlines.",
                zh: "zzzUI 是一套仅暗色的组件库，游戏 UI 风格鲜明：黑色横条、炭灰底色、一种荧光强调色，以及粗描边的斜切块。",
              })}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={link("/docs")} />}
              >
                {pick({ en: "Get started", zh: "快速开始" })}
                <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href={link("/docs/button")} />}
              >
                {pick({ en: "Components", zh: "组件" })}
              </Button>
            </div>
            <CodeBlock
              lang="bash"
              title="terminal"
              className="w-full"
              code={`pnpm dlx shadcn@latest registry add @zzzui=${REGISTRY_URL}
pnpm dlx shadcn@latest add @zzzui/button`}
            />
          </div>
          <JobBoard />
        </section>

        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid gap-5">
            <Heading eyebrow={pick({ en: "The foundation", zh: "地基" })}>
              {pick({ en: "One angle, everywhere", zh: "一个角度，贯穿全局" })}
            </Heading>
            <p className="max-w-md font-medium text-zero-md text-zero-text-2 leading-relaxed">
              {pick({
                en: "Every slanted cut comes from a single token, set to sit with the italic. Turn it and the buttons, the tabs and the wells all re-cut together, with their outlines still even.",
                zh: "所有斜切都出自同一个设计令牌，角度与斜体字的倾角一致。调整它，按钮、标签页和输入框会一起重新切角，描边依旧均匀。",
              })}
            </p>
            <ul className="grid gap-4">
              {rules.map(({ title, text }) => (
                <li key={title.en} className="grid gap-1">
                  <span className="flex items-center gap-2.5 font-black font-zero text-zero-md italic before:h-[0.9em] before:w-[0.4em] before:-skew-x-(--zero-slant) before:bg-zero-accent">
                    {pick(title)}
                  </span>
                  <span className="max-w-md font-medium text-zero-sm text-zero-text-2">
                    {pick(text)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <SlantDial />
        </section>

        <section className="grid gap-8">
          <div className="grid gap-4">
            <Heading eyebrow={pick({ en: "At work", zh: "实战" })}>
              {pick({ en: "A dispatch console", zh: "调度控制台" })}
            </Heading>
            <p className="max-w-xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
              {pick({
                en: "A command palette, a channel and a chart, built from the same slabs. Run a command, or say something to the district.",
                zh: "命令面板、频道与图表，都由同一套斜切块搭成。可以执行命令，也可以在街区频道里发言。",
              })}
            </p>
          </div>
          <Console />
        </section>

        <section className="grid gap-8">
          <div className="grid gap-4">
            <Heading eyebrow={pick({ en: "In the game", zh: "游戏内" })}>
              {pick({ en: "A HUD that works", zh: "能实际操作的 HUD" })}
            </Heading>
            <p className="max-w-xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
              {pick({
                en: "Gauges that leave a trail, a hotbar with cooldowns, objectives that strike through. Use the hotbar: the kit patches the hull, the flare and the key finish the shift.",
                zh: "会留下残影的数值条、带冷却的快捷栏、完成后划掉的目标。快捷栏可以直接使用：维修包（kit）修补船体，信号弹（flare）和钥匙（key）用来完成这一班。",
              })}
            </p>
          </div>
          <Hud />
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-bold font-zero text-zero-sm italic">
            <span className="text-zero-text-3">
              {pick({ en: "More blocks:", zh: "更多区块：" })}
            </span>
            {blocks.map(([href, name]) => (
              <Link
                key={href}
                href={link(href)}
                className="text-zero-text-2 underline decoration-zero-line decoration-2 underline-offset-4 outline-none transition-colors hover:text-zero-accent focus-visible:text-zero-focus"
              >
                {name}
              </Link>
            ))}
          </p>
        </section>

        <section className="grid gap-8">
          <Heading eyebrow={pick({ en: "The set", zh: "一览" })}>
            {pick({ en: "Components", zh: "全部组件" })}
          </Heading>
          <ComponentIndex />
        </section>
      </main>

      <footer className="relative bg-zero-void">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 font-bold font-zero text-zero-sm text-zero-text-3 italic sm:px-8">
          <span>
            zzz<span className="text-zero-accent">UI</span> ·{" "}
            {pick({
              en: "built on shadcn and Base UI",
              zh: "基于 shadcn 与 Base UI 构建",
            })}
          </span>
          <span>{pick({ en: "A catforest project", zh: "猫森出品" })}</span>
          <p className="basis-full font-medium font-zero-text text-zero-xs not-italic">
            {pick({
              en: "Fan-made and unofficial: the name is a tribute to Zenless Zone Zero. zzzUI is not affiliated with HoYoverse or the game, and uses none of its logos, fonts, art or text.",
              zh: "粉丝自制，非官方：名称致敬《绝区零》。zzzUI 与米哈游（HoYoverse）及该游戏无关，未使用其任何标志、字体、美术或文字。",
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}
