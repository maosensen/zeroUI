"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
 * An area chart drawn in steps: each month holds level until the next. The numbers are made up;
 * feed your own.
 */

const data = [
  { month: "Jan", rush: 42 },
  { month: "Feb", rush: 58 },
  { month: "Mar", rush: 51 },
  { month: "Apr", rush: 27 },
  { month: "May", rush: 49 },
  { month: "Jun", rush: 64 },
];

const config = {
  rush: { label: "Rush jobs", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartAreaStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rush jobs</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="rush"
              type="step"
              fill="var(--color-rush)"
              fillOpacity={0.4}
              stroke="var(--color-rush)"
              {...chartMotion}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 30.6% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Rush jobs taken, January to June</p>
      </CardFooter>
    </Card>
  );
}
