import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MessageTurns from "../_demos/message-turns";

export const metadata = pageMetadata("/docs/message");

export default function MessagePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/message")} />
      <DocHeader
        title="Message"
        lead="One turn in a conversation: who said it, what was said, and a line under it."
      />
      <DocSection id="install" title="Install">
        <Install item="message" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="message-turns" title="Two turns">
          <MessageTurns />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The header names the speaker in leaning type (put the name in a{" "}
            <code>strong</code>) beside the time; the content holds Bubbles,
            attachments or anything else; the footer is a quiet line.{" "}
            <code>align="end"</code> puts a turn on the other side, for your
            own. MessageAvatar holds an Avatar level with the turn's last line.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Message"
          rows={[
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: "Which side the turn sits on.",
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
