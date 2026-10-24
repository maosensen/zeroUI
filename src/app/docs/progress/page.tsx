import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ProgressKinds from "../_demos/progress-kinds";

export const metadata = pageMetadata("/docs/progress");

export default function ProgressPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/progress")} />
      <DocHeader
        title="Progress"
        lead="A thin slanted track filling with the accent, or with segments a row of cells that light up one by one, like a gauge of charges."
      />
      <DocSection id="install" title="Install">
        <Install item="progress" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="progress-kinds"
          title="A bar, a gauge of charges, an unknown amount"
        >
          <ProgressKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Without a value (<code>value=&#123;null&#125;</code>) the amount is
            unknown: a short block sweeps the track back and forth. Under
            reduced motion it holds still as a dim fill of the whole track.
          </p>
          <p>
            The bar is a <code>progressbar</code> named by its label;
            ProgressValue shows the formatted number and takes Base UI's{" "}
            <code>format</code>.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Progress"
          base={{
            name: "Progress.Root",
            href: "https://base-ui.com/react/components/progress",
          }}
          rows={[
            {
              name: "value",
              type: "number | null",
              description: "How far it has got; null when unknown.",
            },
            {
              name: "segments",
              type: "number",
              description:
                "Splits the bar into this many cells, each lit once its share is reached.",
            },
            {
              name: "min / max",
              type: "number",
              default: "0 / 100",
              description: "The range.",
            },
          ]}
        />
        <PropsTable
          part="ProgressLabel, ProgressValue"
          base={{
            name: "Progress.Label",
            href: "https://base-ui.com/react/components/progress",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
