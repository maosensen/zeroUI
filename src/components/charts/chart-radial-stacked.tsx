"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
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
 * A stacked radial bar chart: half a ring, rush and regular jobs end to end, the total in the
 * middle. The numbers are made up; feed your own.
 */

const data = [{ month: "jun", rush: 126, regular: 340 }];

const total = data[0].rush + data[0].regular;

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

export function ChartRadialStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rush and regular</CardTitle>
        <CardDescription>June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-[2/1] w-full max-w-72"
        >
          <RadialBarChart
            data={data}
            endAngle={180}
            cy="88%"
            innerRadius="120%"
            outerRadius="170%"
            accessibilityLayer
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;
                  const { cx = 0, cy = 0 } = viewBox;
                  return (
                    <text x={cx} y={cy} textAnchor="middle">
                      <tspan
                        x={cx}
                        y={cy - 18}
                        className="fill-zero-text font-black font-zero text-zero-xl italic"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={cx} y={cy + 2} className="fill-zero-text-3">
                        Jobs
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="rush"
              stackId="a"
              fill="var(--color-rush)"
              className="stroke-transparent stroke-2"
              {...chartMotion}
            />
            <RadialBar
              dataKey="regular"
              stackId="a"
              fill="var(--color-regular)"
              className="stroke-transparent stroke-2"
              {...chartMotion}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Rush up 12% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed in June, rush and regular</p>
      </CardFooter>
    </Card>
  );
}
