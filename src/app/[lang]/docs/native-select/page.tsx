import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import NativeSelectDistrict from "../_demos/native-select-district";

export const generateMetadata = metadataFor("/docs/native-select");

export default async function NativeSelectPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/native-select")} />
      <DocHeader
        title="Native select"
        lead="The browser's own select in Input's well, with zzzUI's chevron."
      />
      <DocSection id="install">
        <Install item="native-select" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="native-select-district" title="Districts in two groups">
          <NativeSelectDistrict />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Use it where a form must work without JavaScript or where the
            phone's own picker is wanted. Its list is drawn by the browser, so
            it does not take zzzUI's look; Select does.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="NativeSelect"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Input's heights.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: "Which edges are cut on the slant.",
            },
          ]}
        />
        <PropsTable part="NativeSelectOption, NativeSelectOptGroup" rows={[]} />
      </DocSection>
    </>
  );
}
