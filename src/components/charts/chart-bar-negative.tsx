"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  XAxis,
} from "recharts";
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
 * A bar chart that goes below zero: credits gained or lost each month, the gains in the accent,
 * the losses in red, each bar with its value. A bar takes the colour its row names (`fill`). The
 * numbers are made up; feed your own.
 */

const credits = [
  { month: "Jan", credits: 186 },
  { month: "Feb", credits: 205 },
  { month: "Mar", credits: -137 },
  { month: "Apr", credits: 173 },
  { month: "May", credits: -109 },
  { month: "Jun", credits: 214 },
];

const data = credits.map((row) => ({
  ...row,
  fill: row.credits < 0 ? "var(--color-lost)" : "var(--color-gained)",
}));

const config = {
  credits: { label: "Credits" },
  gained: { label: "Gained", color: "var(--zero-chart-1)" },
  lost: { label: "Lost", color: "var(--zero-chart-4)" },
} satisfies ChartConfig;

export function ChartBarNegative() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits, month on month</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            data={data}
            margin={{ top: 20, bottom: 20 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ReferenceLine y={0} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="credits" {...chartMotion}>
              <LabelList
                position="top"
                offset={10}
                className="fill-zero-text tabular-nums"
                formatter={(value) =>
                  typeof value === "number" && value > 0 ? `+${value}` : value
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          532 credits ahead over the half
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Fees earned less fines and repairs</p>
      </CardFooter>
    </Card>
  );
}
