import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FloatingTextHits from "../_demos/floating-text-hits";

export const generateMetadata = metadataFor("/docs/floating-text");

export default async function FloatingTextPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/floating-text")} />
      <DocHeader
        title="Floating text"
        lead={pick({
          en: "Floating damage numbers for React: text thrown off something as it happens, popping, rising and fading; crits bigger and orange.",
          zh: "React 伤害飘字组件：事件发生时从目标上弹出文字，上浮并淡出；暴击字号更大，呈橙色。",
        })}
      />
      <DocSection id="install">
        <Install item="floating-text" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="floating-text-hits"
          title={pick({
            en: "Hits, crits and repairs",
            zh: "命中、暴击与修复",
          })}
        >
          <FloatingTextHits />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  <code>useFloatingText()</code> keeps the list;{" "}
                  <code>FloatingTextLayer</code> draws it over its positioned
                  parent; <code>spawn()</code> throws one at a point. Each pops,
                  rises and fades on the <code>float</code> transition, then
                  removes itself. <code>damage</code> is plain,{" "}
                  <code>crit</code> bigger in the legendary orange with a harder
                  pop, <code>heal</code> green, <code>info</code> the accent.
                </p>
                <p>
                  The layer is decoration and hidden from screen readers: say
                  the real value somewhere they can find it, such as a Gauge.
                  Under reduced motion they fade where they are.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  <code>useFloatingText()</code> 维护飘字列表；
                  <code>FloatingTextLayer</code>{" "}
                  将列表绘制在设置了定位的父元素之上；<code>spawn()</code>{" "}
                  在指定位置生成一条飘字。每条飘字按 <code>float</code>{" "}
                  过渡弹出、上浮、淡出，随后自行移除。<code>damage</code>{" "}
                  为普通样式；<code>crit</code>{" "}
                  字号更大，使用传说稀有度的橙色，弹出的力度更强；
                  <code>heal</code> 为绿色；<code>info</code> 为强调色。
                </p>
                <p>
                  飘字层仅作装饰，对读屏软件隐藏：真实数值需在读屏软件能读到的地方另行提供，例如
                  Gauge。开启「减少动态效果」时，飘字在原地淡出。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="useFloatingText().spawn"
          rows={[
            {
              name: "text",
              type: "string",
              description: pick({ en: "What to show.", zh: "显示的文字。" }),
            },
            {
              name: "x / y",
              type: "number",
              description: pick({
                en: "In px from the layer's top-left.",
                zh: "相对飘字层左上角的位置，单位 px。",
              }),
            },
            {
              name: "kind",
              type: '"damage" | "crit" | "heal" | "info"',
              default: '"damage"',
              description: pick({ en: "Its look.", zh: "样式。" }),
            },
          ]}
        />
        <PropsTable
          part="FloatingTextLayer"
          rows={[
            {
              name: "floats",
              type: "ReturnType<typeof useFloatingText>",
              description: pick({
                en: "The list to draw.",
                zh: "要绘制的列表。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
