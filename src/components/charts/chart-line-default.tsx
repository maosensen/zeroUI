"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
 * A line chart: one series, a point a month, drawn as a smooth curve. The numbers are made up;
 * feed your own.
 */

const data = [
  { month: "Jan", credits: 1860 },
  { month: "Feb", credits: 3050 },
  { month: "Mar", credits: 2370 },
  { month: "Apr", credits: 730 },
  { month: "May", credits: 2090 },
  { month: "Jun", credits: 2140 },
];

const config = {
  credits: { label: "Credits", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits earned</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            data={data}
            margin={{ left: 12, right: 12 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="credits"
              type="natural"
              stroke="var(--color-credits)"
              strokeWidth={2}
              dot={false}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 4.8% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Credits paid out, January to June</p>
      </CardFooter>
    </Card>
  );
}
