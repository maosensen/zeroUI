"use client";

import {
  Label,
  PolarGrid,
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
 * A radial bar chart with a shape: one open ring around a filled disc, the number in the middle.
 * The numbers are made up; feed your own.
 */

const data = [{ month: "jun", credits: 1260, fill: "var(--color-credits)" }];

const config = {
  credits: { label: "Credits", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartRadialShape() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credits earned</CardTitle>
        <CardDescription>June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <RadialBarChart
            data={data}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
            accessibilityLayer
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-zero-raised last:fill-zero-void"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="credits" background {...chartMotion} />
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
                        className="fill-zero-text font-black font-zero text-zero-xl italic"
                      >
                        {data[0].credits.toLocaleString()}
                      </tspan>
                      <tspan x={cx} y={cy + 20} className="fill-zero-text-3">
                        Credits
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
          Up 5.2% on May
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Credits paid out for every job closed in June</p>
      </CardFooter>
    </Card>
  );
}
