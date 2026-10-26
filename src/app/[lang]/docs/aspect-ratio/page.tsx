import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AspectRatioMap from "../_demos/aspect-ratio-map";

export const generateMetadata = metadataFor("/docs/aspect-ratio");

export default async function AspectRatioPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/aspect-ratio")} />
      <DocHeader
        title="Aspect ratio"
        lead="Keeps its content to a ratio of width to height, so pictures, video and maps do not jump while they load."
      />
      <DocSection id="install">
        <Install item="aspect-ratio" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="aspect-ratio-map" title="A 16 : 9 map">
          <AspectRatioMap />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>The content fills it; a picture inside is cropped to cover it.</p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="AspectRatio"
          rows={[
            {
              name: "ratio",
              type: "number",
              default: "16 / 9",
              description: "Width divided by height.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
