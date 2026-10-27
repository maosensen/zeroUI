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
 * An area chart with two series stacked: rush jobs on top of regular ones, so the top edge is
 * the month's total. The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", rush: 186, regular: 80 },
  { month: "Feb", rush: 305, regular: 200 },
  { month: "Mar", rush: 237, regular: 120 },
  { month: "Apr", rush: 73, regular: 190 },
  { month: "May", rush: 209, regular: 130 },
  { month: "Jun", rush: 214, regular: 140 },
];

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

export function ChartAreaStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs, rush and regular</CardTitle>
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="regular"
              type="natural"
              fill="var(--color-regular)"
              fillOpacity={0.4}
              stroke="var(--color-regular)"
              stackId="a"
              {...chartMotion}
            />
            <Area
              dataKey="rush"
              type="natural"
              fill="var(--color-rush)"
              fillOpacity={0.4}
              stroke="var(--color-rush)"
              stackId="a"
              {...chartMotion}
            />
          </AreaChart>
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
