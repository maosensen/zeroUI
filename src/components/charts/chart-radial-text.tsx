"use client";

import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
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
 * A radial bar chart with text: one ring, how far a shift has got towards its target, and the
 * count written large in the middle. The numbers are made up; feed your own.
 */

const target = 50;

const data = [{ shift: "night", jobs: 38, fill: "var(--color-jobs)" }];

const config = {
  jobs: { label: "Jobs done", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartRadialText() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Night shift</CardTitle>
        <CardDescription>Target: {target} jobs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={80}
            outerRadius={110}
            accessibilityLayer
          >
            <PolarAngleAxis
              type="number"
              domain={[0, target]}
              tick={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar dataKey="jobs" background {...chartMotion} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;
                  const { cx = 0, cy = 0 } = viewBox;
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy - 4}
                        className="fill-zero-text font-black font-zero text-zero-2xl italic"
                      >
                        {data[0].jobs.toLocaleString()}
                      </tspan>
                      <tspan x={cx} y={cy + 26} className="fill-zero-text-3">
                        Jobs done
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          76% of the way, two hours to go
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Jobs closed since the shift began</p>
      </CardFooter>
    </Card>
  );
}
