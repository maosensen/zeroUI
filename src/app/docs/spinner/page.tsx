import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SpinnerBasic from "../_demos/spinner-basic";

export const metadata = pageMetadata("/docs/spinner");

export default function SpinnerPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/spinner")} />
      <DocHeader
        title="Spinner"
        lead="The spinner icon, turning: half a waiting loop a turn, in the colour and size of the text beside it."
      />
      <DocSection id="install" title="Install">
        <Install item="spinner" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="spinner-basic" title="Alone, beside text, in a button">
          <SpinnerBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            It announces itself as "Loading"; pass <code>aria-label</code> to
            say what is loading, or <code>aria-hidden</code> when the text
            beside it already says so. Under reduced motion it holds still.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Spinner"
          rows={[
            {
              name: "className",
              type: "string",
              description: "Size it with size-*, colour it with text-*.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
