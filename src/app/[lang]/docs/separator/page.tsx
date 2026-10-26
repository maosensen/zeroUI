import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SeparatorBasic from "../_demos/separator-basic";

export const generateMetadata = metadataFor("/docs/separator");

export default async function SeparatorPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/separator")} />
      <DocHeader
        title="Separator"
        lead="A quiet line between two things, the same line that divides rows and panels."
      />
      <DocSection id="install">
        <Install item="separator" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="separator-basic" title="Across and upright">
          <SeparatorBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Horizontal by default; <code>orientation="vertical"</code> stands it
            up beside inline content, as tall as the row.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Separator"
          base={{
            name: "Separator",
            href: "https://base-ui.com/react/components/separator",
          }}
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Which way it runs.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
