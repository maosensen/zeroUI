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
 * A line chart with a dot on every point, and a bigger one on the point the pointer is on. One
 * series. The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", jobs: 186 },
  { month: "Feb", jobs: 305 },
  { month: "Mar", jobs: 237 },
  { month: "Apr", jobs: 73 },
  { month: "May", jobs: 209 },
  { month: "Jun", jobs: 214 },
];

const config = {
  jobs: { label: "Jobs", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartLineDots() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs done</CardTitle>
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
              dataKey="jobs"
              type="natural"
              stroke="var(--color-jobs)"
              strokeWidth={2}
              dot={{
                r: 4,
                stroke: "var(--color-jobs)",
                strokeWidth: 2,
                fill: "var(--color-zero-surface)",
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-zero-ink)",
                strokeWidth: 2,
                fill: "var(--color-jobs)",
              }}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 5.2% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, January to June</p>
      </CardFooter>
    </Card>
  );
}
