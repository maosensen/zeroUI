import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SparklineRelays from "../_demos/sparkline-relays";

export const generateMetadata = metadataFor("/docs/sparkline");

export default async function SparklinePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/sparkline")} />
      <DocHeader
        title="Sparkline"
        lead="A sparkline for React in a word's space: a line through a run of numbers with its last point marked, quiet by default and in the accent for the one that matters."
      />
      <DocSection id="install">
        <Install item="sparkline" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="sparkline-relays" title="One rising line among steady ones">
          <SparklineRelays />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It is sized in em, four wide to one tall, so it follows the text it
            sits beside; set a width and height to change that. The line is
            scaled to the run&apos;s own peak, so read it for its shape, not
            against another sparkline&apos;s height. For axes and values, use a{" "}
            <a href={link("/docs/chart")}>Chart</a>.
          </p>
          <p>
            <code>hot</code> draws it in the accent and lights its last point.
            Keep that to the few lines that should be seen first; a page of hot
            lines is no different from a page of quiet ones.
          </p>
          <p>
            It is an image to screen readers. Without a <code>label</code> it
            says the run in words: how many points, where it started, where it
            ends and its peak.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Sparkline"
          rows={[
            {
              name: "values",
              type: "number[]",
              description: "The run, oldest first.",
            },
            {
              name: "hot",
              type: "boolean",
              default: "false",
              description: "Draw it in the accent, its last point glowing.",
            },
            {
              name: "label",
              type: "string",
              description: "What screen readers hear instead of the run.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
