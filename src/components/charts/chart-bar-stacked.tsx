"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";
import { ChevronUpIcon } from "@/components/zero/icons/chevron-up";

/*
 * A bar chart with two series stacked: solo runs at the foot of each bar, crew runs on top, a
 * legend underneath. The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", solo: 186, crew: 80 },
  { month: "Feb", solo: 305, crew: 200 },
  { month: "Mar", solo: 237, crew: 120 },
  { month: "Apr", solo: 73, crew: 190 },
  { month: "May", solo: 209, crew: 130 },
  { month: "Jun", solo: 214, crew: 140 },
];

const config = {
  solo: { label: "Solo", color: "var(--zero-chart-1)" },
  crew: { label: "Crew", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

export function ChartBarStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solo and crew runs</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="solo"
              stackId="runs"
              fill="var(--color-solo)"
              {...chartMotion}
            />
            <Bar
              dataKey="crew"
              stackId="runs"
              fill="var(--color-crew)"
              {...chartMotion}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 5.2% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every run, alone or with the crew</p>
      </CardFooter>
    </Card>
  );
}
