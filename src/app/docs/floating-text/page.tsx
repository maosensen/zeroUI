import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FloatingTextHits from "../_demos/floating-text-hits";

export const metadata = pageMetadata("/docs/floating-text");

export default function FloatingTextPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/floating-text")} />
      <DocHeader
        title="Floating text"
        lead="Floating damage numbers for React: text thrown off something as it happens, popping, rising and fading; crits bigger and orange."
      />
      <DocSection id="install" title="Install">
        <Install item="floating-text" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="floating-text-hits" title="Hits, crits and repairs">
          <FloatingTextHits />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            <code>useFloatingText()</code> keeps the list;{" "}
            <code>FloatingTextLayer</code> draws it over its positioned parent;{" "}
            <code>spawn()</code> throws one at a point. Each pops, rises and
            fades on the <code>float</code> transition, then removes itself.{" "}
            <code>damage</code> is plain, <code>crit</code> bigger in the
            legendary orange with a harder pop, <code>heal</code> green,{" "}
            <code>info</code> the accent.
          </p>
          <p>
            The layer is decoration and hidden from screen readers: say the real
            value somewhere they can find it, such as a Gauge. Under reduced
            motion they fade where they are.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="useFloatingText().spawn"
          rows={[
            {
              name: "text",
              type: "string",
              description: "What to show.",
            },
            {
              name: "x / y",
              type: "number",
              description: "In px from the layer's top-left.",
            },
            {
              name: "kind",
              type: '"damage" | "crit" | "heal" | "info"',
              default: '"damage"',
              description: "Its look.",
            },
          ]}
        />
        <PropsTable
          part="FloatingTextLayer"
          rows={[
            {
              name: "floats",
              type: "ReturnType<typeof useFloatingText>",
              description: "The list to draw.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
