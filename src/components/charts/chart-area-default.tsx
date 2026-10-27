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
 * An area chart: one series, a smooth curve filled below. The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", credits: 186 },
  { month: "Feb", credits: 305 },
  { month: "Mar", credits: 237 },
  { month: "Apr", credits: 73 },
  { month: "May", credits: 209 },
  { month: "Jun", credits: 214 },
];

const config = {
  credits: { label: "Credits", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartAreaDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits earned</CardTitle>
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
              dataKey="credits"
              type="natural"
              fill="var(--color-credits)"
              fillOpacity={0.4}
              stroke="var(--color-credits)"
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
        <p>Every credit paid out, January to June</p>
      </CardFooter>
    </Card>
  );
}
