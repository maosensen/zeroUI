import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import GaugeHit from "../_demos/gauge-hit";
import GaugeKinds from "../_demos/gauge-kinds";

export const metadata = pageMetadata("/docs/gauge");

export default function GaugePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/gauge")} />
      <DocHeader
        title="Gauge"
        lead="A health bar for React: a reading on a slanted well that leaves a trail when it drops, so the size of a hit stays readable."
      />
      <DocSection id="install" title="Install">
        <Install item="gauge" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="gauge-hit" title="A hit and a repair">
          <GaugeHit />
        </Demo>
        <Demo file="gauge-kinds" title="Segments and tones">
          <GaugeKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            When the value drops, the fill falls at once and a pale trail stays
            where it was, waits (<code>--zero-dur-hold</code>) and catches up.
            When it rises, a faint trail runs ahead and the fill climbs into it.
            At or under <code>low</code> (a share of the whole) the fill turns
            red and breathes. Under reduced motion the trail does not wait and
            nothing breathes.
          </p>
          <p>
            <code>segments</code> splits the well into slanted cells that fill
            in turn, for shields or charges. <code>tone</code> colours the fill:
            the accent, danger, or a rarity tier. It is a Base UI Meter: screen
            readers hear the value and its range, named by{" "}
            <code>GaugeLabel</code>.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Gauge"
          base={{
            name: "Meter.Root",
            href: "https://base-ui.com/react/components/meter",
          }}
          rows={[
            {
              name: "value",
              type: "number",
              description: "The reading.",
            },
            {
              name: "min / max",
              type: "number",
              default: "0 / 100",
              description: "Its range.",
            },
            {
              name: "tone",
              type: '"accent" | "danger" | "uncommon" | "rare" | "epic" | "legendary"',
              default: '"accent"',
              description: "The fill's colour.",
            },
            {
              name: "segments",
              type: "number",
              description: "Splits the well into this many cells.",
            },
            {
              name: "low",
              type: "number",
              description:
                "A share of the whole (0\u20131); at or under it the fill turns red and breathes.",
            },
          ]}
        />
        <PropsTable
          part="GaugeValue"
          base={{
            name: "Meter.Value",
            href: "https://base-ui.com/react/components/meter",
          }}
          rows={[
            {
              name: "children",
              type: "(formatted, value) => ReactNode",
              default: '"value / max"',
              description: "Writes the reading your way.",
            },
          ]}
        />
        <PropsTable part="GaugeLabel" rows={[]} />
      </DocSection>
    </>
  );
}
