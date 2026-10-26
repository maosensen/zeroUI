import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="The scrolling column of a conversation: it keeps to the newest turn while you are there, and stays put while you read back."
      />
      <DocSection id="install">
        <Install item="message-scroller" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="message-scroller-chat" title="A conversation that keeps up">
          <MessageScrollerChat />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            When you are away from the newest turn, a raised slab with an arrow
            takes you back down. Mark the newest turn with{" "}
            <code>scrollAnchor</code>. It is @shadcn/react's message scroller
            underneath; useMessageScroller gives you its controls.
          </p>
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
              description: "The turn to keep in view as new ones come in.",
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
              description: "Back to the newest turn, or to the first.",
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
