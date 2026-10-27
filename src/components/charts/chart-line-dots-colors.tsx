"use client";

import { CartesianGrid, Dot, Line, LineChart, XAxis } from "recharts";
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
 * A line chart over cargo kinds where each dot takes its row's colour: the row carries a `fill`,
 * and a custom dot draws with it. The numbers are made up; feed your own.
 */

const data = [
  { cargo: "parcels", jobs: 275, fill: "var(--color-parcels)" },
  { cargo: "crates", jobs: 200, fill: "var(--color-crates)" },
  { cargo: "cold", jobs: 187, fill: "var(--color-cold)" },
  { cargo: "fragile", jobs: 173, fill: "var(--color-fragile)" },
  { cargo: "data", jobs: 90, fill: "var(--color-data)" },
];

const config = {
  jobs: { label: "Jobs", color: "var(--zero-chart-3)" },
  parcels: { label: "Parcels", color: "var(--zero-chart-1)" },
  crates: { label: "Crates", color: "var(--zero-chart-2)" },
  cold: { label: "Cold", color: "var(--zero-chart-3)" },
  fragile: { label: "Fragile", color: "var(--zero-chart-4)" },
  data: { label: "Data", color: "var(--zero-chart-5)" },
} satisfies ChartConfig;

type Cargo = Exclude<keyof typeof config, "jobs">;

export function ChartLineDotsColors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by cargo</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            data={data}
            margin={{ top: 12, left: 12, right: 12 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="cargo"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: Cargo) => config[value]?.label}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="jobs"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="jobs"
              type="natural"
              stroke="var(--color-jobs)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => (
                <Dot
                  key={payload.cargo}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={payload.fill}
                  stroke="var(--color-zero-ink)"
                  strokeWidth={2}
                />
              )}
              activeDot={({ cx, cy, payload }) => (
                <Dot
                  cx={cx}
                  cy={cy}
                  r={7}
                  fill={payload.fill}
                  stroke="var(--color-zero-ink)"
                  strokeWidth={2}
                />
              )}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Parcels up 7.1% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Jobs closed by what was carried</p>
      </CardFooter>
    </Card>
  );
}
