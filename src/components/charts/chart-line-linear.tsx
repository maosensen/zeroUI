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
 * A line chart drawn in straight segments, point to point: one series, a point a month. The
 * numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", distance: 412 },
  { month: "Feb", distance: 538 },
  { month: "Mar", distance: 486 },
  { month: "Apr", distance: 297 },
  { month: "May", distance: 571 },
  { month: "Jun", distance: 624 },
];

const config = {
  distance: { label: "Distance (km)", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartLineLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distance run</CardTitle>
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
              dataKey="distance"
              type="linear"
              stroke="var(--color-distance)"
              strokeWidth={2}
              dot={false}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 9.3% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Kilometres on the road, January to June</p>
      </CardFooter>
    </Card>
  );
}
