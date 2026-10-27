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
 * An area chart drawn with straight lines from month to month. The numbers are made up; feed
 * your own.
 */

const data = [
  { month: "Jan", distance: 412 },
  { month: "Feb", distance: 538 },
  { month: "Mar", distance: 486 },
  { month: "Apr", distance: 297 },
  { month: "May", distance: 451 },
  { month: "Jun", distance: 563 },
];

const config = {
  distance: { label: "Distance (km)", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartAreaLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distance run</CardTitle>
        <CardDescription>Kilometres a month, January – June</CardDescription>
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
              dataKey="distance"
              type="linear"
              fill="var(--color-distance)"
              fillOpacity={0.4}
              stroke="var(--color-distance)"
              {...chartMotion}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 24.8% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>The whole crew's kilometres, January to June</p>
      </CardFooter>
    </Card>
  );
}
