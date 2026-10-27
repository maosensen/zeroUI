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
 * A line chart drawn in steps: the value holds flat until the next month changes it. One series.
 * The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", crew: 6 },
  { month: "Feb", crew: 8 },
  { month: "Mar", crew: 8 },
  { month: "Apr", crew: 5 },
  { month: "May", crew: 9 },
  { month: "Jun", crew: 11 },
];

const config = {
  crew: { label: "Couriers", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartLineStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Couriers on shift</CardTitle>
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
              dataKey="crew"
              type="step"
              stroke="var(--color-crew)"
              strokeWidth={2}
              dot={false}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Five more than in January
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>The crew at the start of each month</p>
      </CardFooter>
    </Card>
  );
}
