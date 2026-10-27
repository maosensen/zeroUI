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
 * A radar chart with a dot on each stat: one courier's six stats, the shape filled and every
 * score marked. The numbers are made up; feed your own.
 */

const data = [
  { stat: "Speed", juno: 86 },
  { stat: "Load", juno: 54 },
  { stat: "Range", juno: 72 },
  { stat: "Grip", juno: 61 },
  { stat: "Focus", juno: 78 },
  { stat: "Stealth", juno: 45 },
];

const config = {
  juno: { label: "Juno", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartRadarDots() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courier stats</CardTitle>
        <CardDescription>Juno, scored out of 100</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <RadarChart outerRadius="66%" data={data} accessibilityLayer>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="stat" />
            <PolarGrid />
            <Radar
              dataKey="juno"
              fill="var(--color-juno)"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
              {...chartMotion}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Speed up 8% since March
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Scored from every job, January to June</p>
      </CardFooter>
    </Card>
  );
}
