"use client";

import { Pie, PieChart } from "recharts";
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
 * Two pies in one: this month as the inner pie, last month as a ring around it, so the share of
 * each kind can be held against the month before. The numbers are made up; feed your own.
 */

const data = [
  { kind: "parcels", june: 52, may: 41, fill: "var(--color-parcels)" },
  { kind: "crates", june: 34, may: 38, fill: "var(--color-crates)" },
  { kind: "cold", june: 31, may: 22, fill: "var(--color-cold)" },
  { kind: "fragile", june: 27, may: 30, fill: "var(--color-fragile)" },
  { kind: "data", june: 18, may: 12, fill: "var(--color-data)" },
];

const config = {
  june: { label: "June" },
  may: { label: "May" },
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-5)" },
  fragile: { label: "Fragile", color: "var(--zero-chart-4)" },
  data: { label: "Data", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

type Month = "june" | "may";

export function ChartPieStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by cargo</CardTitle>
        <CardDescription>June inside, May around it</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, [item]) =>
                    item ? config[item.dataKey as Month]?.label : null
                  }
                />
              }
            />
            <Pie
              data={data}
              dataKey="june"
              nameKey="kind"
              outerRadius="55%"
              {...chartMotion}
            />
            <Pie
              data={data}
              dataKey="may"
              nameKey="kind"
              innerRadius="65%"
              outerRadius="90%"
              {...chartMotion}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 13.3% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, by what it carried</p>
      </CardFooter>
    </Card>
  );
}
