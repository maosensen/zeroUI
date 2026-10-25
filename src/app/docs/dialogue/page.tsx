import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DialogueTalk from "../_demos/dialogue-talk";

export const metadata = pageMetadata("/docs/dialogue");

export default function DialoguePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/dialogue")} />
      <DocHeader
        title="Dialogue"
        lead="A game dialogue box for React: the speaker on a slab, the line typed out, a blinking mark to continue, and numbered replies."
      />
      <DocSection id="install" title="Install">
        <Install item="dialogue" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="dialogue-talk" title="A conversation with replies">
          <DialogueTalk />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            A black band with the speaker's name on a slab breaking its top
            edge. The line is typed out at <code>speed</code> letters a second;
            a click on the line or on Continue, or Enter or Space anywhere in
            the box, shows the rest at once, and the replies wait until it is
            whole. While focus is in the box, the number keys pick a reply.
          </p>
          <p>
            Screen readers hear each whole line once, from a polite live region
            on the box, never the typing. Under reduced motion the line appears
            whole. Give <code>DialogueText</code> a new <code>key</code> for
            each line so the typing starts over.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="DialogueText"
          rows={[
            {
              name: "children",
              type: "string",
              description: "The line.",
            },
            {
              name: "speed",
              type: "number",
              default: "45",
              description: "Letters a second.",
            },
            {
              name: "onDone",
              type: "() => void",
              description: "When the whole line is on screen.",
            },
          ]}
        />
        <PropsTable
          part="DialogueNext"
          rows={[
            {
              name: "onClick",
              type: "(event) => void",
              description:
                "Called when the line is whole; before that, a click shows the rest.",
            },
            {
              name: "children",
              type: "ReactNode",
              default: '"Continue"',
              description: "Its label.",
            },
          ]}
        />
        <PropsTable
          part="DialogueChoice"
          rows={[
            {
              name: "index",
              type: "number",
              description: "Its number, and the key that picks it.",
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
