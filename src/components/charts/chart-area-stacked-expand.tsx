"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
 * An area chart with three series stacked and stretched to the full height, so each band is its
 * share of the month: parcels, crates and cold cargo. The numbers are made up; feed your own.
 */

const data = [
  { month: "Jan", parcels: 186, crates: 80, cold: 45 },
  { month: "Feb", parcels: 305, crates: 200, cold: 100 },
  { month: "Mar", parcels: 237, crates: 120, cold: 150 },
  { month: "Apr", parcels: 73, crates: 190, cold: 50 },
  { month: "May", parcels: 209, crates: 130, cold: 100 },
  { month: "Jun", parcels: 214, crates: 140, cold: 160 },
];

const config = {
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

const percent = (share: number) => `${Math.round(share * 100)}%`;

export function ChartAreaStackedExpand() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo mix</CardTitle>
        <CardDescription>
          Share of loads by kind, January – June
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12, top: 12 }}
            stackOffset="expand"
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
              tickCount={3}
              tickFormatter={percent}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="cold"
              type="natural"
              fill="var(--color-cold)"
              fillOpacity={0.1}
              stroke="var(--color-cold)"
              stackId="a"
              {...chartMotion}
            />
            <Area
              dataKey="crates"
              type="natural"
              fill="var(--color-crates)"
              fillOpacity={0.4}
              stroke="var(--color-crates)"
              stackId="a"
              {...chartMotion}
            />
            <Area
              dataKey="parcels"
              type="natural"
              fill="var(--color-parcels)"
              fillOpacity={0.4}
              stroke="var(--color-parcels)"
              stackId="a"
              {...chartMotion}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Cold loads up to 31% in June
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every load carried, by kind, January to June</p>
      </CardFooter>
    </Card>
  );
}
