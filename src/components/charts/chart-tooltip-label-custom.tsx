"use client";

import { Bar, BarChart, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";

/*
 * Rush and regular jobs a day, stacked; the tooltip's label comes from the config's jobs entry
 * (labelKey) instead of the day. The numbers are made up; feed your own.
 */

const data = [
  { day: "Mon", rush: 18, regular: 42 },
  { day: "Tue", rush: 31, regular: 38 },
  { day: "Wed", rush: 24, regular: 47 },
  { day: "Thu", rush: 12, regular: 35 },
  { day: "Fri", rush: 36, regular: 51 },
  { day: "Sat", rush: 27, regular: 22 },
];

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-3)" },
  jobs: { label: "Jobs" },
} satisfies ChartConfig;

export function ChartTooltipLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip: custom label</CardTitle>
        <CardDescription>The label taken from the config.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data} accessibilityLayer>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="rush"
              stackId="jobs"
              fill="var(--color-rush)"
              {...chartMotion}
            />
            <Bar
              dataKey="regular"
              stackId="jobs"
              fill="var(--color-regular)"
              {...chartMotion}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={1}
              content={<ChartTooltipContent labelKey="jobs" />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
