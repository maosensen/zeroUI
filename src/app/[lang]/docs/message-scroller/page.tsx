import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MessageScrollerChat from "../_demos/message-scroller-chat";

export const generateMetadata = metadataFor("/docs/message-scroller");

export default async function MessageScrollerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/message-scroller")} />
      <DocHeader
        title="Message scroller"
        lead={pick({
          en: "The scrolling column of a conversation: it keeps to the newest turn while you are there, and stays put while you read back.",
          zh: "对话的滚动区域：停留在底部时自动跟随最新发言，向上翻阅历史时位置保持不动。",
        })}
      />
      <DocSection id="install">
        <Install item="message-scroller" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="message-scroller-chat"
          title={pick({
            en: "A conversation that keeps up",
            zh: "自动跟随最新发言的对话",
          })}
        >
          <MessageScrollerChat />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                When you are away from the newest turn, a raised slab with an
                arrow takes you back down. Mark the newest turn with{" "}
                <code>scrollAnchor</code>. It is @shadcn/react's message
                scroller underneath; useMessageScroller gives you its controls.
              </p>
            ),
            zh: (
              <p>
                滚动位置离开底部时，会出现一个带箭头的浮起色斜切块，点击即可返回底部。用{" "}
                <code>scrollAnchor</code> 标记最新一轮发言。底层是 @shadcn/react
                的 message scroller；通过 useMessageScroller 可获取其控制方法。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="MessageScrollerItem"
          rows={[
            {
              name: "scrollAnchor",
              type: "boolean",
              default: "false",
              description: pick({
                en: "The turn to keep in view as new ones come in.",
                zh: "有新发言进入时，保持在视野内的那一轮发言。",
              }),
            },
          ]}
        />
        <PropsTable
          part="MessageScrollerButton"
          rows={[
            {
              name: "direction",
              type: '"end" | "start"',
              default: '"end"',
              description: pick({
                en: "Back to the newest turn, or to the first.",
                zh: "返回最新一轮发言，或跳至第一轮。",
              }),
            },
            {
              name: "label",
              type: "string",
              default: '"Scroll to the newest"',
              description: pick({
                en: 'What screen readers hear for the arrow; with direction="start", "Scroll to the start".',
                zh: '读屏软件为箭头读出的文字；direction="start" 时默认为 "Scroll to the start"。',
              }),
            },
          ]}
        />
        <PropsTable
          part="MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
