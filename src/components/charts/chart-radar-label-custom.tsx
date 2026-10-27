"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
 * A radar chart of two couriers whose stat labels carry the scores: under each stat's name, both
 * couriers' values in their own colours. The numbers are made up; feed your own.
 */

const data = [
  { stat: "Speed", juno: 86, marlo: 58 },
  { stat: "Load", juno: 54, marlo: 88 },
  { stat: "Range", juno: 72, marlo: 64 },
  { stat: "Grip", juno: 61, marlo: 80 },
  { stat: "Focus", juno: 78, marlo: 52 },
  { stat: "Stealth", juno: 45, marlo: 70 },
];

const config = {
  juno: { label: "Juno", color: "var(--zero-chart-1)" },
  marlo: { label: "Marlo", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

/** How far the two-line label's top sits above its point: below, centred on, or above it. */
const lift = { start: 0, middle: 15, end: 30 } as const;

export function ChartRadarLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two couriers</CardTitle>
        <CardDescription>Juno and Marlo, scored out of 100</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <RadarChart data={data} outerRadius="66%" accessibilityLayer>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis
              dataKey="stat"
              tick={({ x, y, textAnchor, verticalAnchor, index }) => {
                const row = data[index];
                if (!row) return <g />;
                const top = Number(y) - lift[verticalAnchor];
                return (
                  <text x={x} y={top + 12} textAnchor={textAnchor}>
                    <tspan className="fill-zero-text-3">{row.stat}</tspan>
                    <tspan x={x} dy={15} className="font-bold tabular-nums">
                      <tspan className="fill-(--color-juno)">{row.juno}</tspan>
                      <tspan className="fill-zero-text-3"> / </tspan>
                      <tspan className="fill-(--color-marlo)">
                        {row.marlo}
                      </tspan>
                    </tspan>
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              dataKey="juno"
              fill="var(--color-juno)"
              fillOpacity={0.6}
              {...chartMotion}
            />
            <Radar
              dataKey="marlo"
              fill="var(--color-marlo)"
              fillOpacity={0.3}
              {...chartMotion}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Juno the faster, Marlo the stronger
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Scored from every job, January to June</p>
      </CardFooter>
    </Card>
  );
}
