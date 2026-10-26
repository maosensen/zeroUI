import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import BubbleVariants from "../_demos/bubble-variants";

export const generateMetadata = metadataFor("/docs/bubble");

export default async function BubblePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/bubble")} />
      <DocHeader
        title="Bubble"
        lead={pick({
          en: "What was said, in a square-cornered box with the one corner nearest the speaker cut off at 45°.",
          zh: "承载发言内容的直角方框，靠近发言人的一角以 45° 斜切。",
        })}
      />
      <DocSection id="install">
        <Install item="bubble" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="bubble-variants"
          title={pick({ en: "Six kinds", zh: "六种样式" })}
        >
          <BubbleVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The accent for your own turns, the raised grey for the other
                  side, the surface for the quieter, an outlined black well, red
                  for something that went wrong, or no box at all. Inside a
                  Message it follows the message's side.
                </p>
                <p>
                  BubbleContent takes <code>render</code>, so a bubble can be a
                  button or a link, a suggested reply. BubbleReactions pins a
                  small slab of reactions to its edge.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  自己的发言用强调色，对方的发言用浮起色，次要内容用面板色；另有描边的黑色凹槽、表示出错的红色，以及完全不带方框的样式。位于
                  Message 中时，气泡跟随该消息所在的一侧。
                </p>
                <p>
                  BubbleContent 支持 <code>render</code>
                  ，因此气泡可以是按钮或链接，例如建议回复。BubbleReactions
                  在气泡边缘固定一个显示表情回应的小号斜切块。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Bubble"
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "muted" | "outline" | "danger" | "ghost"',
              default: '"default"',
              description: pick({ en: "Its fill.", zh: "填充样式。" }),
            },
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: pick({
                en: "Which side it sits on, outside a Message.",
                zh: "不在 Message 中时，位于哪一侧。",
              }),
            },
          ]}
        />
        <PropsTable
          part="BubbleReactions"
          rows={[
            {
              name: "side",
              type: '"top" | "bottom"',
              default: '"bottom"',
              description: pick({
                en: "Which edge it sits on.",
                zh: "位于哪条边。",
              }),
            },
            {
              name: "align",
              type: '"start" | "end"',
              default: '"end"',
              description: pick({
                en: "Which end of that edge.",
                zh: "位于该边的哪一端。",
              }),
            },
          ]}
        />
        <PropsTable part="BubbleGroup, BubbleContent" rows={[]} />
      </DocSection>
    </>
  );
}
