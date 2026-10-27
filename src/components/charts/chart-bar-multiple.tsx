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
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";
import { ChevronUpIcon } from "@/components/zero/icons/chevron-up";

/*
 * A bar chart with two series side by side: rush and regular jobs, a pair of bars a month. The
 * numbers are made up; feed your own.
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

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rush and regular</CardTitle>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="rush" fill="var(--color-rush)" {...chartMotion} />
            <Bar
              dataKey="regular"
              fill="var(--color-regular)"
              {...chartMotion}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Rush up 5.2% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Both kinds of job, January to June</p>
      </CardFooter>
    </Card>
  );
}
