import Link from "next/link";
import type { ReactNode } from "react";
import { ChartAreaGradient } from "@/components/charts/chart-area-gradient";
import { ChartBarMultiple } from "@/components/charts/chart-bar-multiple";
import { ChartLineDots } from "@/components/charts/chart-line-dots";
import { ChartPieDonutText } from "@/components/charts/chart-pie-donut-text";
import { ChartRadarMultiple } from "@/components/charts/chart-radar-multiple";
import { ChartRadialText } from "@/components/charts/chart-radial-text";
import { ChartTooltipDefault } from "@/components/charts/chart-tooltip-default";
import { ArrowRightIcon } from "@/components/zero/icons/arrow-right";
import { enter, getLang, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor, page, pageCopy } from "@/seo/site";
import { DocHeader, DocSection, Prose } from "../_components/doc";
import { CHART_TYPES } from "./_catalog";

export const generateMetadata = metadataFor("/docs/charts");

/** One chart of each type, live, as the way into its page. */
const featured: Record<string, ReactNode> = {
  area: <ChartAreaGradient />,
  bar: <ChartBarMultiple />,
  line: <ChartLineDots />,
  pie: <ChartPieDonutText />,
  radar: <ChartRadarMultiple />,
  radial: <ChartRadialText />,
  tooltip: <ChartTooltipDefault />,
};

export default async function ChartsPage({ params }: LangProps) {
  await enter(params);
  const lang = getLang();
  const count = CHART_TYPES.reduce((sum, t) => sum + t.charts.length, 0);
  return (
    <>
      <JsonLd data={docGraph("/docs/charts")} />
      <DocHeader
        title={pick({ en: "Charts", zh: "图表" })}
        lead={pick({
          en: `${count} charts in zzzUI's look, built on Recharts: area, bar, line, pie, radar and radial charts, and the tooltips they share. Copy one, or install it on its own with one command.`,
          zh: `${count} 个 zzzUI 风格的图表，基于 Recharts 构建：面积图、柱状图、折线图、饼图、雷达图、径向图，以及它们共用的提示框。可直接复制，也可用一条命令单独安装。`,
        })}
      />
      <DocSection
        id="about"
        title={pick({ en: "About charts", zh: "关于图表" })}
      >
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A chart is one file in <code>components/charts/</code>: a{" "}
                  <a href={link("/docs/card")}>Card</a> holding a{" "}
                  <a href={link("/docs/chart")}>Chart</a>, with its data written
                  in. Installing it installs those two. Swap the data for yours
                  and keep the rest, or change it freely: it is yours once
                  copied.
                </p>
                <p>
                  A chart draws itself when it first comes into view: its marks
                  grow to their values on zzzUI's timing (
                  <code>chartMotion</code>). With reduced motion it is drawn at
                  once.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个图表都是 <code>components/charts/</code>{" "}
                  下的一个文件：一个 <a href={link("/docs/card")}>Card</a>{" "}
                  中容纳一个 <a href={link("/docs/chart")}>Chart</a>
                  ，数据直接写在文件里。安装图表时会一并安装这两个组件。可以只替换数据、保留其余部分，也可以自由修改：图表复制到项目后即归项目所有。
                </p>
                <p>
                  图表首次进入视野时开始绘制，各数据标记按 zzzUI
                  的动效参数增长到各自的数值（<code>chartMotion</code>
                  ）。开启「减少动态效果」时直接显示完整图表。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="types" title={pick({ en: "Types", zh: "类型" })}>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {CHART_TYPES.map(({ type, line, charts }) => {
            const path = `/docs/charts/${type}` as const;
            const copy = pageCopy(page(path), lang);
            return (
              <section key={type} className="grid min-w-0 content-start gap-3">
                <div className="grid gap-1">
                  <Link
                    href={link(path)}
                    className="group flex items-center gap-2 justify-self-start font-black font-zero text-zero-lg italic outline-none hover:text-zero-accent focus-visible:text-zero-focus focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
                  >
                    {copy.title}
                    <ArrowRightIcon className="size-4 transition-transform duration-(--zero-dur-fast) ease-(--zero-ease-out) group-hover:translate-x-1" />
                  </Link>
                  <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
                    {line[lang]} ·{" "}
                    {pick({
                      en: `${charts.length} charts`,
                      zh: `${charts.length} 个图表`,
                    })}
                  </p>
                </div>
                <div data-demo={`charts-${type}`} className="grid min-w-0">
                  {featured[type]}
                </div>
              </section>
            );
          })}
        </div>
      </DocSection>
    </>
  );
}
