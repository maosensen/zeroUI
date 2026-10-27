"use client";

import type { ReactNode } from "react";
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
 * Rush and regular jobs a day, stacked, over one week in April; the tooltip's label turns the
 * short day into its full date. The numbers are made up; feed your own.
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
} satisfies ChartConfig;

const days = data.map((row) => row.day);

/** "Mon" to "Monday 13 April 2026": the week starts on Monday 13 April. */
function fullDate(label: ReactNode) {
  const index = typeof label === "string" ? days.indexOf(label) : -1;
  if (index < 0) return label;
  return new Date(2026, 3, 13 + index).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ChartTooltipLabelFormatter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip: label formatter</CardTitle>
        <CardDescription>The day written out as a date.</CardDescription>
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
              content={<ChartTooltipContent labelFormatter={fullDate} />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
