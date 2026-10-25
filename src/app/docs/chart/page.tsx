import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ChartWeek from "../_demos/chart-week";

export const metadata = pageMetadata("/docs/chart");

export default function ChartPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/chart")} />
      <DocHeader
        title="Chart"
        lead="Charts drawn with Recharts in zeroUI's colours: quiet axes and grid, a small panel for the tooltip, slanted blocks for every swatch."
      />
      <DocSection id="install" title="Install">
        <Install item="chart" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="chart-week" title="Jobs taken in a week">
          <ChartWeek />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            ChartContainer names the series in <code>config</code> and gives
            each its colour as <code>--color-&lt;key&gt;</code>, for the chart's
            parts to use. Five series colours come with it, all from the tokens:{" "}
            <code>--zero-chart-1</code> the accent, 2 the text white, 3 the
            quiet grey, 4 the danger red, 5 the pressed accent.
          </p>
          <p>
            Build the chart itself with Recharts' own parts (BarChart,
            LineChart, XAxis…); ChartTooltipContent and ChartLegendContent give
            its tooltip and legend zeroUI's look.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="ChartContainer"
          rows={[
            {
              name: "config",
              type: "ChartConfig",
              description: "Each series: its label, colour and optional icon.",
            },
          ]}
        />
        <PropsTable
          part="ChartTooltipContent"
          rows={[
            {
              name: "indicator",
              type: '"block" | "line"',
              default: '"block"',
              description: "The swatch beside each row.",
            },
            {
              name: "hideLabel / hideIndicator",
              type: "boolean",
              default: "false",
              description: "Leave out the heading or the swatches.",
            },
          ]}
        />
        <PropsTable
          part="ChartLegendContent"
          rows={[
            {
              name: "hideIcon",
              type: "boolean",
              default: "false",
              description: "Use the swatch even where the series has an icon.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
