import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MarkerKinds from "../_demos/marker-kinds";

export const generateMetadata = metadataFor("/docs/marker");

export default async function MarkerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/marker")} />
      <DocHeader
        title="Marker"
        lead="A note in the run of a conversation that nobody said: someone joined, a date, a reconnection. Small, quiet and leaning."
      />
      <DocSection id="install">
        <Install item="marker" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="marker-kinds" title="A date, an event, an archive line">
          <MarkerKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            <code>separator</code> sets it between two quiet lines across the
            width; <code>border</code> puts a line under it. MarkerIcon puts an
            icon before it.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Marker"
          rows={[
            {
              name: "variant",
              type: '"default" | "separator" | "border"',
              default: '"default"',
              description: "Plain, between lines, or over one.",
            },
            {
              name: "render",
              type: "ReactElement",
              description: "The element to render as.",
            },
          ]}
        />
        <PropsTable part="MarkerIcon, MarkerContent" rows={[]} />
      </DocSection>
    </>
  );
}
