import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RadialMenuQuick from "../_demos/radial-menu-quick";

export const generateMetadata = metadataFor("/docs/radial-menu");

export default async function RadialMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/radial-menu")} />
      <DocHeader
        title="Radial menu"
        lead="A radial menu for React, the game weapon wheel: choices around a ring, picked by the pointer's direction or the arrow keys."
      />
      <DocSection id="install">
        <Install item="radial-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="radial-menu-quick" title="A quick-use wheel">
          <RadialMenuQuick />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Up to eight items around a ring, the first at the top, going
            clockwise. Pointing anywhere picks the item in that direction, so a
            flick of the mouse is enough; a bright wedge swings to it and the
            centre names it. A click or Enter chooses it.
          </p>
          <p>
            The arrow keys go round the ring. Focus stays on the wheel and the
            picked item is its active descendant, so screen readers hear each as
            it is reached. It is the wheel only: show it where and when you need
            it, on a held key or in an overlay.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="RadialMenu"
          rows={[
            {
              name: "onSelect",
              type: "(value: string) => void",
              description: "When an item is chosen.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "The item picked when it opens.",
            },
          ]}
        />
        <PropsTable
          part="RadialMenuItem"
          rows={[
            {
              name: "value",
              type: "string",
              description: "What onSelect gets.",
            },
            {
              name: "label",
              type: "string",
              description:
                "Its name: said by screen readers and shown in the centre.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Shown dim; cannot be chosen.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
