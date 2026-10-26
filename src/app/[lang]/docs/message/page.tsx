import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MessageTurns from "../_demos/message-turns";

export const generateMetadata = metadataFor("/docs/message");

export default async function MessagePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/message")} />
      <DocHeader
        title="Message"
        lead={pick({
          en: "One turn in a conversation: who said it, what was said, and a line under it.",
          zh: "对话中的一轮发言：发言人、发言内容，以及下方的一行附注。",
        })}
      />
      <DocSection id="install">
        <Install item="message" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="message-turns"
          title={pick({ en: "Two turns", zh: "两轮发言" })}
        >
          <MessageTurns />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                The header names the speaker in leaning type (put the name in a{" "}
                <code>strong</code>) beside the time; the content holds Bubbles,
                attachments or anything else; the footer is a quiet line.{" "}
                <code>align="end"</code> puts a turn on the other side, for your
                own. MessageAvatar holds an Avatar level with the turn's last
                line.
              </p>
            ),
            zh: (
              <p>
                头部以斜体显示发言人（将名字置于 <code>strong</code>{" "}
                中），旁边是时间；内容区可放置
                Bubble、附件或其他任意内容；底部是一行淡色文字。
                <code>align="end"</code>{" "}
                将这一轮发言置于另一侧，用于己方发言。MessageAvatar 放置一个
                Avatar，与该轮发言的最后一行对齐。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Message"
          rows={[
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: pick({
                en: "Which side the turn sits on.",
                zh: "发言位于哪一侧。",
              }),
            },
          ]}
        />
        <PropsTable
          part="MessageGroup, MessageAvatar, MessageContent, MessageHeader, MessageFooter"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
