"use client";

import { useId } from "react";
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
 * An area chart with two series, each filled with its colour fading to nothing at the bottom.
 * The numbers are made up; feed your own.
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

export function ChartAreaGradient() {
  // the gradients are named per chart, so two of these on a page do not share fills
  const id = useId().replace(/:/g, "");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solo and crew runs</CardTitle>
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
            <defs>
              {(Object.keys(config) as (keyof typeof config)[]).map((key) => (
                <linearGradient
                  key={key}
                  id={`${id}-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <Area
              dataKey="crew"
              type="natural"
              fill={`url(#${id}-crew)`}
              stroke="var(--color-crew)"
              {...chartMotion}
            />
            <Area
              dataKey="solo"
              type="natural"
              fill={`url(#${id}-solo)`}
              stroke="var(--color-solo)"
              {...chartMotion}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Crew runs up 7.7% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Runs taken alone and as a crew, January to June</p>
      </CardFooter>
    </Card>
  );
}
