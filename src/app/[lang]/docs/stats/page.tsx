import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import StatsCompare from "../_demos/stats-compare";

export const generateMetadata = metadataFor("/docs/stats");

export default async function StatsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/stats")} />
      <DocHeader
        title="Stats"
        lead={pick({
          en: "Item stat comparison for React: each stat's value and the difference from what you have now: in the accent when better, red when worse.",
          zh: "React 物品属性对比组件：显示每项属性的数值及其与当前装备的差值，更优为强调色，更差为红色。",
        })}
      />
      <DocSection id="install">
        <Install item="stats" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="stats-compare"
          title={pick({
            en: "A found rig against yours",
            zh: "拾取的装备与当前装备对比",
          })}
        >
          <StatsCompare />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A row per stat: its name leaning on the left, its value, and
                  with <code>compare</code> the difference after it, in the
                  accent with an arrow up when it is better and red with an
                  arrow down when it is worse. Which way is better is{" "}
                  <code>better</code>: higher for capacity, lower for weight.
                </p>
                <p>
                  It is a description list; the difference is also said in words
                  ("2 kg less than now, better"). Put it in a{" "}
                  <a href={link("/docs/hover-card")}>Hover card</a> to compare
                  loot on hover.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每项属性一行：左侧为斜体的属性名，其后是数值；设置{" "}
                  <code>compare</code>{" "}
                  时再显示差值，更优时为强调色并带向上箭头，更差时为红色并带向下箭头。哪个方向更优由{" "}
                  <code>better</code> 决定：例如容量越大越好，重量越轻越好。
                </p>
                <p>
                  组件是一个描述列表；差值也会以文字读出（「2 kg less than now,
                  better」）。置于{" "}
                  <a href={link("/docs/hover-card")}>Hover card</a>
                  中，即可在悬停时对比战利品。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Stat"
          rows={[
            {
              name: "label",
              type: "string",
              description: pick({ en: "The stat's name.", zh: "属性名。" }),
            },
            {
              name: "value",
              type: "number",
              description: pick({
                en: "This item's value.",
                zh: "该物品的数值。",
              }),
            },
            {
              name: "compare",
              type: "number",
              description: pick({
                en: "What you have now; shows the difference.",
                zh: "当前装备的数值；设置后显示差值。",
              }),
            },
            {
              name: "better",
              type: '"higher" | "lower"',
              default: '"higher"',
              description: pick({
                en: "Which way is better.",
                zh: "哪个方向更优。",
              }),
            },
            {
              name: "unit",
              type: "string",
              default: '""',
              description: pick({
                en: "Written after each number.",
                zh: "附在每个数字后的单位。",
              }),
            },
            {
              name: "format",
              type: "(n: number) => string",
              default: "en-US",
              description: pick({
                en: "How to write a number.",
                zh: "数字格式。",
              }),
            },
            {
              name: "labels",
              type: "Partial<StatLabels>",
              default: "statLabels",
              description: pick({
                en: "The difference in words, in another language: same, and diff(amount, more, better).",
                zh: "换成其他语言的差值说明：same，以及 diff(amount, more, better)。",
              }),
            },
          ]}
        />
        <PropsTable part="Stats" rows={[]} />
      </DocSection>
    </>
  );
}
