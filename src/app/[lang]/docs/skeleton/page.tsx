import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SkeletonCard from "../_demos/skeleton-card";

export const generateMetadata = metadataFor("/docs/skeleton");

export default async function SkeletonPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/skeleton")} />
      <DocHeader
        title="Skeleton"
        lead="A stand-in for something still loading: a quiet grey shape with a faint band of light dragged along the slant across it."
      />
      <DocSection id="install">
        <Install item="skeleton" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="skeleton-card" title="A card still loading">
          <SkeletonCard />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Three shapes: a block for pictures and cards, a line for a line of
            text, cut on both sides like a slab, and a slab the size of a
            control. Size each like the thing it stands for; SkeletonText stacks
            lines, the last one short.
          </p>
          <p>
            Skeletons are hidden from assistive technology; mark the region that
            is loading with <code>aria-busy</code>. Under reduced motion the
            light does not move.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Skeleton"
          rows={[
            {
              name: "shape",
              type: '"block" | "line" | "slab"',
              default: '"block"',
              description:
                "A rectangle, a thin slanted line of text, or a control-sized slab.",
            },
          ]}
        />
        <PropsTable
          part="SkeletonText"
          rows={[
            {
              name: "lines",
              type: "number",
              default: "3",
              description: "How many lines.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
