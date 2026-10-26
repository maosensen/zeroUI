import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CounterCredits from "../_demos/counter-credits";

export const generateMetadata = metadataFor("/docs/counter");

export default async function CounterPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/counter")} />
      <DocHeader
        title="Counter"
        lead={pick({
          en: "An animated number counter for React: it rolls to each new value and throws the change off it, the way a game counts gold.",
          zh: "React 数字滚动组件：每次变化时滚动到新值，并弹出本次增减量，如同游戏中的金币计数。",
        })}
      />
      <DocSection id="install">
        <Install item="counter" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="counter-credits"
          title={pick({ en: "Credits", zh: "信用点" })}
        >
          <CounterCredits />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Set in the display face, leaning, with figures of one width so
                  it does not shake as it counts. It rolls on the{" "}
                  <code>roll</code> transition; with <code>delta</code>, each
                  change rises off it and fades, in the accent when it grows and
                  red when it shrinks.
                </p>
                <p>
                  Screen readers get the final value, not the count. Under
                  reduced motion it jumps and the change does not rise. It
                  writes numbers in <code>en-US</code> unless given a locale, so
                  the server and the browser agree.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  数字使用展示字体的斜体，并采用等宽数字，计数时不会左右抖动。滚动使用{" "}
                  <code>roll</code> 过渡；开启 <code>delta</code>{" "}
                  后，每次的增减量会从数字处向上浮起并淡出，增加时为强调色，减少时为红色。
                </p>
                <p>
                  读屏软件只读出最终数值，不读滚动过程。开启「减少动态效果」时，数字直接跳到新值，增减量也不再浮起。未指定
                  locale 时，数字按 <code>en-US</code>{" "}
                  格式显示，使服务端与浏览器的输出一致。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Counter"
          rows={[
            {
              name: "value",
              type: "number",
              description: pick({ en: "The number.", zh: "数值。" }),
            },
            {
              name: "format",
              type: "Intl.NumberFormatOptions",
              description: pick({ en: "How to write it.", zh: "数字格式。" }),
            },
            {
              name: "locale",
              type: "string",
              default: '"en-US"',
              description: pick({
                en: "Whose way of writing numbers.",
                zh: "数字格式所依据的地区。",
              }),
            },
            {
              name: "delta",
              type: "boolean",
              description: pick({
                en: "Throw each change off the number.",
                zh: "每次变化时弹出增减量。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
