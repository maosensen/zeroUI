import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ChartWeek from "../_demos/chart-week";

export const generateMetadata = metadataFor("/docs/chart");

export default async function ChartPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/chart")} />
      <DocHeader
        title="Chart"
        lead={pick({
          en: "Charts drawn with Recharts in zzzUI's colours: quiet axes and grid, a small panel for the tooltip, slanted blocks for every swatch.",
          zh: "以 Recharts 绘制、采用 zzzUI 配色的图表：坐标轴与网格线为暗色，提示框是一块小面板，所有色块均为斜切小块。",
        })}
      />
      <DocSection id="install">
        <Install item="chart" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="chart-week"
          title={pick({ en: "Jobs taken in a week", zh: "一周内承接的委托" })}
        >
          <ChartWeek />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  ChartContainer names the series in <code>config</code> and
                  gives each its colour as <code>--color-&lt;key&gt;</code>, for
                  the chart's parts to use. Five series colours come with it,
                  all from the tokens: <code>--zero-chart-1</code> the accent, 2
                  the text white, 3 the quiet grey, 4 the danger red, 5 the
                  pressed accent.
                </p>
                <p>
                  Build the chart itself with Recharts' own parts (BarChart,
                  LineChart, XAxis…); ChartTooltipContent and ChartLegendContent
                  give its tooltip and legend zzzUI's look.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  ChartContainer 在 <code>config</code> 中为各数据系列命名，并以{" "}
                  <code>--color-&lt;key&gt;</code>{" "}
                  的形式提供各系列的颜色，供图表各部分使用。组件自带五种系列色，均取自设计
                  token：
                  <code>--zero-chart-1</code> 为强调色，2 为文字的白色，3
                  为次要文字的灰，4 为危险红，5 为按下状态的强调色。
                </p>
                <p>
                  图表本体用 Recharts
                  自带的组件搭建（BarChart、LineChart、XAxis……）；ChartTooltipContent
                  与 ChartLegendContent 为提示框和图例套用 zzzUI 的外观。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ChartContainer"
          rows={[
            {
              name: "config",
              type: "ChartConfig",
              description: pick({
                en: "Each series: its label, colour and optional icon.",
                zh: "各数据系列的名称、颜色与可选图标。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ChartTooltipContent"
          rows={[
            {
              name: "indicator",
              type: '"block" | "line"',
              default: '"block"',
              description: pick({
                en: "The swatch beside each row.",
                zh: "每行旁边色块的样式。",
              }),
            },
            {
              name: "hideLabel / hideIndicator",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Leave out the heading or the swatches.",
                zh: "隐藏标题或色块。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ChartLegendContent"
          rows={[
            {
              name: "hideIcon",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Use the swatch even where the series has an icon.",
                zh: "系列带图标时也改用色块。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
