"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/zero/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  chartMotion,
} from "@/components/zero/chart";

/*
 * A pie chart with a legend under it naming each kind; the legend wraps onto a second row when
 * it runs out of width. The numbers are made up; feed your own.
 */

const data = [
  { kind: "parcels", jobs: 275, fill: "var(--color-parcels)" },
  { kind: "crates", jobs: 200, fill: "var(--color-crates)" },
  { kind: "cold", jobs: 187, fill: "var(--color-cold)" },
  { kind: "fragile", jobs: 173, fill: "var(--color-fragile)" },
  { kind: "data", jobs: 90, fill: "var(--color-data)" },
];

const config = {
  jobs: { label: "Jobs" },
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-5)" },
  fragile: { label: "Fragile", color: "var(--zero-chart-4)" },
  data: { label: "Data", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by cargo</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-72"
        >
          <PieChart accessibilityLayer>
            <Pie data={data} dataKey="jobs" nameKey="kind" {...chartMotion} />
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey="kind"
                  className="gap-x-4 gap-y-2"
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
