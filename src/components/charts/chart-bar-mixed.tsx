"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/zero/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";
import { ChevronUpIcon } from "@/components/zero/icons/chevron-up";

/*
 * A bar chart on its side with a colour per bar: one bar for each kind of cargo, the colour named
 * in its row (`fill`) and its label in the config. The numbers are made up; feed your own.
 */

const data = [
  { cargo: "parcels", jobs: 275, fill: "var(--color-parcels)" },
  { cargo: "crates", jobs: 200, fill: "var(--color-crates)" },
  { cargo: "cold", jobs: 187, fill: "var(--color-cold)" },
  { cargo: "fragile", jobs: 173, fill: "var(--color-fragile)" },
  { cargo: "data", jobs: 90, fill: "var(--color-data)" },
];

const config = {
  jobs: { label: "Jobs" },
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-3)" },
  fragile: { label: "Fragile", color: "var(--zero-chart-4)" },
  data: { label: "Data", color: "var(--zero-chart-5)" },
} satisfies ChartConfig;

export function ChartBarMixed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by cargo</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0 }}
            accessibilityLayer
          >
            <YAxis
              dataKey="cargo"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                config[value as keyof typeof config].label
              }
            />
            <XAxis type="number" dataKey="jobs" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="cargo" hideLabel />}
            />
            <Bar dataKey="jobs" {...chartMotion} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Cold cargo up 8.4% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, by what was carried</p>
      </CardFooter>
    </Card>
  );
}
