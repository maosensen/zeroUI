"use client";

import { useState } from "react";
import {
  Label,
  Pie,
  PieChart,
  type PieSectorShapeProps,
  Sector,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";

/*
 * A donut chart of jobs by the month, with a select in the header that picks one month: its slice
 * is drawn larger, with a ring outside it, and its number stands in the middle. The numbers are
 * made up; feed your own.
 */

const data = [
  { month: "jan", jobs: 186, fill: "var(--color-jan)" },
  { month: "feb", jobs: 305, fill: "var(--color-feb)" },
  { month: "mar", jobs: 237, fill: "var(--color-mar)" },
  { month: "apr", jobs: 173, fill: "var(--color-apr)" },
  { month: "may", jobs: 209, fill: "var(--color-may)" },
];

const config = {
  jobs: { label: "Jobs" },
  jan: { label: "January", color: "var(--zero-chart-1)" },
  feb: { label: "February", color: "var(--zero-chart-2)" },
  mar: { label: "March", color: "var(--zero-chart-5)" },
  apr: { label: "April", color: "var(--zero-chart-4)" },
  may: { label: "May", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

type Month = (typeof data)[number]["month"];

const months = Object.fromEntries(
  data.map(({ month }) => [month, config[month as keyof typeof config].label]),
);

export function ChartPieInteractive() {
  const [month, setMonth] = useState<Month>("jan");
  const active = data.findIndex((row) => row.month === month);
  const jobs = data[active]?.jobs ?? 0;
  return (
    <Card>
      <CardHeader className="sm:grid-cols-[1fr_auto]">
        <CardTitle>Jobs by the month</CardTitle>
        <CardDescription>January – May</CardDescription>
        <div className="sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-center">
          <Select
            items={months}
            value={month}
            onValueChange={(value) => {
              if (value) setMonth(value);
            }}
          >
            <SelectTrigger size="sm" className="w-36" aria-label="Month">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {data.map(({ month: key }) => (
                <SelectItem key={key} value={key}>
                  {months[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              nameKey="month"
              innerRadius={60}
              shape={({
                index,
                outerRadius = 0,
                ...props
              }: PieSectorShapeProps) =>
                index === active ? (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      innerRadius={outerRadius + 14}
                      outerRadius={outerRadius + 20}
                    />
                  </g>
                ) : (
                  <Sector {...props} outerRadius={outerRadius} />
                )
              }
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
                        {jobs.toLocaleString()}
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
    </Card>
  );
}
