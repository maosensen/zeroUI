"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";

/*
 * A line chart that shows one series at a time: a toggle per series in the header, each with its
 * total, picks the one drawn. The numbers are made up; feed your own.
 */

const data = [
  { day: "Jun 1", solo: 52, crew: 94 },
  { day: "Jun 2", solo: 49, crew: 65 },
  { day: "Jun 3", solo: 25, crew: 98 },
  { day: "Jun 4", solo: 18, crew: 109 },
  { day: "Jun 5", solo: 27, crew: 81 },
  { day: "Jun 6", solo: 57, crew: 110 },
  { day: "Jun 7", solo: 42, crew: 79 },
  { day: "Jun 8", solo: 19, crew: 99 },
  { day: "Jun 9", solo: 18, crew: 72 },
  { day: "Jun 10", solo: 18, crew: 48 },
  { day: "Jun 11", solo: 25, crew: 67 },
  { day: "Jun 12", solo: 18, crew: 104 },
  { day: "Jun 13", solo: 18, crew: 97 },
  { day: "Jun 14", solo: 30, crew: 69 },
  { day: "Jun 15", solo: 38, crew: 84 },
  { day: "Jun 16", solo: 18, crew: 77 },
  { day: "Jun 17", solo: 18, crew: 113 },
  { day: "Jun 18", solo: 44, crew: 95 },
  { day: "Jun 19", solo: 34, crew: 113 },
  { day: "Jun 20", solo: 18, crew: 147 },
  { day: "Jun 21", solo: 18, crew: 185 },
  { day: "Jun 22", solo: 18, crew: 190 },
  { day: "Jun 23", solo: 42, crew: 178 },
  { day: "Jun 24", solo: 20, crew: 190 },
  { day: "Jun 25", solo: 32, crew: 179 },
  { day: "Jun 26", solo: 27, crew: 156 },
  { day: "Jun 27", solo: 34, crew: 129 },
  { day: "Jun 28", solo: 42, crew: 101 },
  { day: "Jun 29", solo: 53, crew: 92 },
  { day: "Jun 30", solo: 56, crew: 125 },
];

const config = {
  solo: { label: "Solo", color: "var(--zero-chart-1)" },
  crew: { label: "Crew", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

type Series = keyof typeof config;

const totals = {
  solo: data.reduce((sum, row) => sum + row.solo, 0),
  crew: data.reduce((sum, row) => sum + row.crew, 0),
};

export function ChartLineInteractive() {
  const [shown, setShown] = useState<Series>("solo");
  return (
    <Card>
      <CardHeader className="sm:grid-cols-[1fr_auto]">
        <CardTitle>Runs by the day</CardTitle>
        <CardDescription>June, solo and crew</CardDescription>
        <div className="sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-center">
          <ToggleGroup
            size="sm"
            aria-label="Series"
            value={[shown]}
            onValueChange={(value) => {
              const next = value[0] as Series | undefined;
              if (next) setShown(next);
            }}
          >
            {(Object.keys(config) as Series[]).map((key) => (
              <ToggleGroupItem key={key} value={key}>
                {config[key].label}
                <span className="tabular-nums">
                  {totals[key].toLocaleString()}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-64">
          <LineChart
            data={data}
            margin={{ left: 12, right: 12 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <ChartTooltip
              content={<ChartTooltipContent className="w-36" nameKey={shown} />}
            />
            <Line
              dataKey={shown}
              type="monotone"
              stroke={`var(--color-${shown})`}
              strokeWidth={2}
              dot={false}
              {...chartMotion}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
