import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import GaugeHit from "../_demos/gauge-hit";
import GaugeKinds from "../_demos/gauge-kinds";

export const generateMetadata = metadataFor("/docs/gauge");

export default async function GaugePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/gauge")} />
      <DocHeader
        title="Gauge"
        lead={pick({
          en: "A health bar for React: a reading on a slanted well that leaves a trail when it drops, so the size of a hit stays readable.",
          zh: "React 血条组件：读数显示在斜切的槽中，数值下降时留下一段残影，每次受击的伤害量一目了然。",
        })}
      />
      <DocSection id="install">
        <Install item="gauge" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="gauge-hit"
          title={pick({ en: "A hit and a repair", zh: "受击与修复" })}
        >
          <GaugeHit />
        </Demo>
        <Demo
          file="gauge-kinds"
          title={pick({ en: "Segments and tones", zh: "分格与色调" })}
        >
          <GaugeKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  When the value drops, the fill falls at once and a pale trail
                  stays where it was, waits (<code>--zero-dur-hold</code>) and
                  catches up. When it rises, a faint trail runs ahead and the
                  fill climbs into it. At or under <code>low</code> (a share of
                  the whole) the fill turns red and breathes. Under reduced
                  motion the trail does not wait and nothing breathes.
                </p>
                <p>
                  <code>segments</code> splits the well into slanted cells that
                  fill in turn, for shields or charges. <code>tone</code>{" "}
                  colours the fill: the accent, danger, a rarity tier, or quiet
                  grey for a reading among many where only the notable ones
                  should wear a colour. It is a Base UI Meter: screen readers
                  hear the value and its range, named by <code>GaugeLabel</code>
                  .
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  数值下降时，填充条立即缩短，原位置留下一段浅色残影，停留片刻（
                  <code>--zero-dur-hold</code>
                  ）后再收缩到新值。数值上升时，先有一段淡色的条延伸至新值，填充条随后增长到该位置。降到{" "}
                  <code>low</code>
                  （占总量的比例）及以下时，填充条变红并呼吸闪烁。开启「减少动态效果」时，残影不再停留，填充条也不再呼吸闪烁。
                </p>
                <p>
                  <code>segments</code>{" "}
                  将槽分成若干斜切的格子，依次填满，适合表示护盾或充能次数。
                  <code>tone</code>{" "}
                  决定填充条的颜色：强调色、危险色、某一稀有度的颜色，或中性的灰色；多个读数并列时，中性灰用于无需突出的那些。组件基于
                  Base UI 的 Meter：读屏软件会读出数值及其范围，名称取自{" "}
                  <code>GaugeLabel</code>。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Gauge"
          base={{
            name: "Meter.Root",
            href: "https://base-ui.com/react/components/meter",
          }}
          rows={[
            {
              name: "value",
              type: "number",
              description: pick({ en: "The reading.", zh: "读数。" }),
            },
            {
              name: "min / max",
              type: "number",
              default: "0 / 100",
              description: pick({ en: "Its range.", zh: "取值范围。" }),
            },
            {
              name: "tone",
              type: '"accent" | "quiet" | "danger" | "uncommon" | "rare" | "epic" | "legendary"',
              default: '"accent"',
              description: pick({
                en: "The fill's colour.",
                zh: "填充条颜色。",
              }),
            },
            {
              name: "segments",
              type: "number",
              description: pick({
                en: "Splits the well into this many cells.",
                zh: "槽的分格数。",
              }),
            },
            {
              name: "low",
              type: "number",
              description: pick({
                en: "A share of the whole (0\u20131); at or under it the fill turns red and breathes.",
                zh: "占总量的比例（0–1）；降到此值及以下时，填充条变红并呼吸闪烁。",
              }),
            },
          ]}
        />
        <PropsTable
          part="GaugeValue"
          base={{
            name: "Meter.Value",
            href: "https://base-ui.com/react/components/meter",
          }}
          rows={[
            {
              name: "children",
              type: "(formatted, value) => ReactNode",
              default: '"value / max"',
              description: pick({
                en: "Writes the reading your way.",
                zh: "自定义读数的显示方式。",
              }),
            },
          ]}
        />
        <PropsTable part="GaugeLabel" rows={[]} />
      </DocSection>
    </>
  );
}
