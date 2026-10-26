import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TraceSteps from "../_demos/trace-steps";

export const generateMetadata = metadataFor("/docs/trace");

export default async function TracePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/trace")} />
      <DocHeader
        title="Trace"
        lead="The steps an agent took, one line each: an icon, what it did, and a quiet figure at the end."
      />
      <DocSection id="install">
        <Install item="trace" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="trace-steps" title="An agent's four steps">
          <TraceSteps />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A step still running is in the accent, one that failed in red, one
            not yet started dimmed. A step can open (TraceCollapsible) to show
            what it read or wrote, behind a quiet line, unfolding like
            Collapsible.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="TraceLine"
          rows={[
            {
              name: "status",
              type: '"running" | "error" | "pending"',
              description: "Its state; finished when left out.",
            },
          ]}
        />
        <PropsTable
          part="Trace, TraceIcon, TraceTitle, TraceDescription, TraceCollapsible, TraceCollapsibleTrigger, TraceCollapsibleContent"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
