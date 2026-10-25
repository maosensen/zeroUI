import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import StatsCompare from "../_demos/stats-compare";

export const metadata = pageMetadata("/docs/stats");

export default function StatsPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/stats")} />
      <DocHeader
        title="Stats"
        lead="Item stat comparison for React: each stat's value and the difference from what you have now: in the accent when better, red when worse."
      />
      <DocSection id="install" title="Install">
        <Install item="stats" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="stats-compare" title="A found rig against yours">
          <StatsCompare />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            A row per stat: its name leaning on the left, its value, and with{" "}
            <code>compare</code> the difference after it, in the accent with an
            arrow up when it is better and red with an arrow down when it is
            worse. Which way is better is <code>better</code>: higher for
            capacity, lower for weight.
          </p>
          <p>
            It is a description list; the difference is also said in words ("2
            kg less than now, better"). Put it in a{" "}
            <a href="/docs/hover-card">Hover card</a> to compare loot on hover.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Stat"
          rows={[
            {
              name: "label",
              type: "string",
              description: "The stat's name.",
            },
            {
              name: "value",
              type: "number",
              description: "This item's value.",
            },
            {
              name: "compare",
              type: "number",
              description: "What you have now; shows the difference.",
            },
            {
              name: "better",
              type: '"higher" | "lower"',
              default: '"higher"',
              description: "Which way is better.",
            },
            {
              name: "unit",
              type: "string",
              default: '""',
              description: "Written after each number.",
            },
            {
              name: "format",
              type: "(n: number) => string",
              default: "en-US",
              description: "How to write a number.",
            },
          ]}
        />
        <PropsTable part="Stats" rows={[]} />
      </DocSection>
    </>
  );
}
