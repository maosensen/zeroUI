import Link from "next/link";
import { SiteHeader } from "@/app/[lang]/_site/site-header";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { exampleGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";

export const generateMetadata = metadataFor("/examples");

const examples = [
  {
    href: "/examples/board",
    title: "Courier board",
    line: {
      en: "A community board, today's shifts and a rank page, under one top bar with tabs that Q and E step through. Built from the community feed, daily schedule and level rewards blocks.",
      zh: "社区留言板、今日排班与等级页共用一条顶栏，标签页用 Q、E 键切换。由 Community feed、Daily schedule 与 Level rewards 三个代码块构成。",
    },
  },
  {
    href: "/examples/signal-board",
    title: "Signal board",
    line: {
      en: "A news aggregator to scan, not read: a live ticker, readings, a heat-ranked board you walk with J and K beside a preview, topics, and stories in a sheet. Built from Ticker, Gauge, Sparkline, Table and Sheet.",
      zh: "供快速浏览而非细读的新闻聚合应用：实时快讯滚动条、数据读数、按热度排序的列表（用 J、K 键逐条移动，旁边附预览）、话题，以及在侧边面板中展开的报道。由 Ticker、Gauge、Sparkline、Table 与 Sheet 构成。",
    },
  },
  {
    href: "/examples/ops-console",
    title: "Ops console",
    line: {
      en: "An afternoon on call: a live wall of services, an alert queue to acknowledge, and an incident whose war room and runbook you see through to resolved. Built from the chat components, Gauge, Feed, Table and HoldButton.",
      zh: "值班的一个下午：实时更新的服务状态墙、待确认的告警队列，以及一起事故：在作战室中对照运维手册处理，直至解决。由聊天类组件、Gauge、Feed、Table 与 HoldButton 构成。",
    },
  },
];

export default async function Examples({ params }: LangProps) {
  await enter(params);
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch) text-zero-text">
      <JsonLd data={exampleGraph("/examples")} />
      <SiteHeader />
      <main className="mx-auto grid max-w-4xl gap-8 px-4 py-14 sm:px-8">
        <header className="grid gap-4">
          <h1 className="font-black font-zero text-zero-2xl italic">
            {pick({ en: "Examples", zh: "示例应用" })}
          </h1>
          <p className="max-w-2xl font-medium text-zero-md text-zero-text-2 leading-relaxed">
            {pick({
              en: (
                <>
                  Whole apps put together from zzzUI's blocks and components, to
                  show how the pieces work side by side. Open one, then read its
                  source: every part of it installs from the registry.
                </>
              ),
              zh: (
                <>
                  由 zzzUI
                  的代码块与组件组装而成的完整应用，展示各个部分如何协同工作。可以打开任意一个并查看源码：其中每个部分都能从
                  registry 安装。
                </>
              ),
            })}
          </p>
        </header>
        <ul className="grid gap-3">
          {examples.map((example) => (
            <li key={example.href}>
              <Link
                href={link(example.href)}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between gap-4 font-black font-zero text-zero-lg italic">
                  {example.title}
                  <ArrowRightIcon className="shrink-0 text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {pick(example.line)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
