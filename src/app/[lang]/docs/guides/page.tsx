import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { DocHeader, DocSection } from "../_components/doc";

export const generateMetadata = metadataFor("/docs/guides");

const guides = [
  {
    href: "/docs/guides/game-settings-menu",
    title: {
      en: "Build a game settings menu in React",
      zh: "用 React 搭建游戏设置菜单",
    },
    line: {
      en: "Tabs, rows, apply, and a held reset.",
      zh: "标签页、设置行、应用更改，以及需按住确认的「恢复默认」。",
    },
  },
  {
    href: "/docs/guides/health-bar-damage-trail",
    title: {
      en: "A health bar that shows the size of a hit",
      zh: "带残影的血条：显示每次受击的伤害量",
    },
    line: {
      en: "The damage trail, with the Gauge or from scratch.",
      zh: "伤害残影的实现：使用 Gauge，或从零手写。",
    },
  },
  {
    href: "/docs/guides/theme-tokens",
    title: {
      en: "Theme zzzUI with its tokens",
      zh: "用设计令牌定制 zzzUI 主题",
    },
    line: {
      en: "One slant, one accent, the timings.",
      zh: "一个斜切角度、一种强调色，以及各档动效时长。",
    },
  },
];

export default async function GuidesPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/guides")} />
      <DocHeader
        title={pick({ en: "Guides", zh: "指南" })}
        lead={pick({
          en: "How to build game screens with zzzUI and shadcn, how its effects work, and how to make it your own: longer reads that explain the why, with code you can lift.",
          zh: "用 React 搭建游戏 UI 的系列教程：如何用 zzzUI 和 shadcn 做出游戏界面，各类效果如何实现，以及如何定制成自己的风格。每篇都讲清做法背后的原因，并附可直接复用的代码。",
        })}
      />
      <DocSection id="list" title={pick({ en: "The guides", zh: "全部指南" })}>
        <ul className="grid gap-3">
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={link(guide.href)}
                className="group grid gap-1 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-5 py-4 outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              >
                <span className="flex items-center justify-between gap-4 font-black font-zero text-zero-lg italic">
                  {pick(guide.title)}
                  <ArrowRightIcon className="shrink-0 text-zero-text-3 transition-colors group-hover:text-zero-accent" />
                </span>
                <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                  {pick(guide.line)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}
