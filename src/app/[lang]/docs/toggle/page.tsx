import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToggleBasic from "../_demos/toggle-basic";

export const generateMetadata = metadataFor("/docs/toggle");

export default async function TogglePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/toggle")} />
      <DocHeader
        title="Toggle"
        lead="A Button that stays down: a ghost or raised slab while off, filled with the accent while on."
      />
      <DocSection id="install">
        <Install item="toggle" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="toggle-basic" title="On, off, and an icon">
          <ToggleBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It has Button's sizes and cuts and presses the same way. It reports
            its state as <code>aria-pressed</code>; give an icon-only toggle an{" "}
            <code>aria-label</code>.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Toggle"
          base={{
            name: "Toggle",
            href: "https://base-ui.com/react/components/toggle",
          }}
          rows={[
            {
              name: "variant",
              type: '"ghost" | "secondary"',
              default: '"ghost"',
              description: "Its look while off.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Button's heights.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: "Which edges are cut on the slant.",
            },
            {
              name: "pressed / defaultPressed",
              type: "boolean",
              default: "false",
              description: "On, controlled or not.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
