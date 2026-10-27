"use client";

import { Label, Pie, PieChart } from "recharts";
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
 * A donut chart with the total written in its middle: the number large, what it counts small
 * under it. The numbers are made up; feed your own.
 */

const data = [
  { kind: "parcels", jobs: 275, fill: "var(--color-parcels)" },
  { kind: "crates", jobs: 200, fill: "var(--color-crates)" },
  { kind: "cold", jobs: 187, fill: "var(--color-cold)" },
  { kind: "fragile", jobs: 173, fill: "var(--color-fragile)" },
  { kind: "data", jobs: 90, fill: "var(--color-data)" },
];

const config = {
  jobs: { label: "Jobs" },
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-5)" },
  fragile: { label: "Fragile", color: "var(--zero-chart-4)" },
  data: { label: "Data", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

const total = data.reduce((sum, row) => sum + row.jobs, 0);

export function ChartPieDonutText() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by cargo</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="jobs"
              nameKey="kind"
              innerRadius={60}
              {...chartMotion}
            >
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-zero-text font-black font-zero text-zero-xl italic tabular-nums"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 24}
                        className="fill-zero-text-3"
                      >
                        Jobs
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Up 5.2% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, by what it carried</p>
      </CardFooter>
    </Card>
  );
}
