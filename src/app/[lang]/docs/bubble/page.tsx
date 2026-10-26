import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="What was said, in a square-cornered box with the one corner nearest the speaker cut off at 45\u00b0."
      />
      <DocSection id="install">
        <Install item="bubble" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="bubble-variants" title="Six kinds">
          <BubbleVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The accent for your own turns, the raised grey for the other side,
            the surface for the quieter, an outlined black well, red for
            something that went wrong, or no box at all. Inside a Message it
            follows the message's side.
          </p>
          <p>
            BubbleContent takes <code>render</code>, so a bubble can be a button
            or a link, a suggested reply. BubbleReactions pins a small slab of
            reactions to its edge.
          </p>
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
              description: "Its fill.",
            },
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: "Which side it sits on, outside a Message.",
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
              description: "Which edge it sits on.",
            },
            {
              name: "align",
              type: '"start" | "end"',
              default: '"end"',
              description: "Which end of that edge.",
            },
          ]}
        />
        <PropsTable part="BubbleGroup, BubbleContent" rows={[]} />
      </DocSection>
    </>
  );
}
