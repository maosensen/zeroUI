import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DialogueTalk from "../_demos/dialogue-talk";

export const generateMetadata = metadataFor("/docs/dialogue");

export default async function DialoguePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/dialogue")} />
      <DocHeader
        title="Dialogue"
        lead={pick({
          en: "A game dialogue box for React: the speaker on a slab, the line typed out, a blinking mark to continue, and numbered replies.",
          zh: "React 游戏对话框组件：说话人名字置于斜切块上，台词逐字打出，闪烁的标记提示继续，回复选项带编号。",
        })}
      />
      <DocSection id="install">
        <Install item="dialogue" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="dialogue-talk"
          title={pick({
            en: "A conversation with replies",
            zh: "带回复选项的对话",
          })}
        >
          <DialogueTalk />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A black band with the speaker's name on a slab breaking its
                  top edge. The line is typed out at <code>speed</code> letters
                  a second; a click on the line or on Continue, or Enter or
                  Space anywhere in the box, shows the rest at once, and the
                  replies wait until it is whole. While focus is in the box, the
                  number keys pick a reply.
                </p>
                <p>
                  Screen readers hear each whole line once, from a polite live
                  region on the box, never the typing. Under reduced motion the
                  line appears whole. Give <code>DialogueText</code> a new{" "}
                  <code>key</code> for each line so the typing starts over.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  对话框是一道黑色横条，说话人的名字写在一块斜切块上，压在横条的上边缘。台词以每秒{" "}
                  <code>speed</code> 个字符的速度逐字打出；点击台词或
                  Continue，或在对话框内任意位置按 Enter
                  或空格键，会立即显示全文；回复选项等台词完整显示后才出现。焦点位于对话框内时，按数字键可选择回复。
                </p>
                <p>
                  读屏软件通过对话框上 polite
                  级别的实时区域，将每句完整台词读出一次，不读逐字打出的过程。开启「减少动态效果」时，台词直接完整显示。每句新台词需为{" "}
                  <code>DialogueText</code> 指定新的 <code>key</code>
                  ，逐字效果才会从头开始。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="DialogueText"
          rows={[
            {
              name: "children",
              type: "string",
              description: pick({ en: "The line.", zh: "台词。" }),
            },
            {
              name: "speed",
              type: "number",
              default: "45",
              description: pick({
                en: "Letters a second.",
                zh: "每秒显示的字符数。",
              }),
            },
            {
              name: "onDone",
              type: "() => void",
              description: pick({
                en: "When the whole line is on screen.",
                zh: "整句台词显示完毕时触发。",
              }),
            },
          ]}
        />
        <PropsTable
          part="DialogueNext"
          rows={[
            {
              name: "onClick",
              type: "(event) => void",
              description: pick({
                en: "Called when the line is whole; before that, a click shows the rest.",
                zh: "台词完整显示后点击时调用；在此之前，点击会显示剩余部分。",
              }),
            },
            {
              name: "children",
              type: "ReactNode",
              default: '"Continue"',
              description: pick({ en: "Its label.", zh: "按钮文字。" }),
            },
          ]}
        />
        <PropsTable
          part="DialogueChoice"
          rows={[
            {
              name: "index",
              type: "number",
              description: pick({
                en: "Its number, and the key that picks it.",
                zh: "序号，也是选择该项的按键。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Dialogue, DialogueSpeaker, DialogueChoices"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
