"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
 * A bar chart that shows one series at a time: a toggle per series in the header, each with its
 * total, picks the one drawn. The numbers are made up; feed your own.
 */

const data = [
  { day: "Jun 1", rush: 95, regular: 140 },
  { day: "Jun 2", rush: 74, regular: 102 },
  { day: "Jun 3", rush: 106, regular: 87 },
  { day: "Jun 4", rush: 98, regular: 94 },
  { day: "Jun 5", rush: 72, regular: 93 },
  { day: "Jun 6", rush: 39, regular: 31 },
  { day: "Jun 7", rush: 65, regular: 54 },
  { day: "Jun 8", rush: 39, regular: 73 },
  { day: "Jun 9", rush: 53, regular: 113 },
  { day: "Jun 10", rush: 112, regular: 136 },
  { day: "Jun 11", rush: 101, regular: 131 },
  { day: "Jun 12", rush: 106, regular: 126 },
  { day: "Jun 13", rush: 93, regular: 102 },
  { day: "Jun 14", rush: 74, regular: 162 },
  { day: "Jun 15", rush: 20, regular: 150 },
  { day: "Jun 16", rush: 40, regular: 111 },
  { day: "Jun 17", rush: 75, regular: 81 },
  { day: "Jun 18", rush: 56, regular: 81 },
  { day: "Jun 19", rush: 110, regular: 92 },
  { day: "Jun 20", rush: 123, regular: 42 },
  { day: "Jun 21", rush: 93, regular: 62 },
  { day: "Jun 22", rush: 55, regular: 66 },
  { day: "Jun 23", rush: 74, regular: 102 },
  { day: "Jun 24", rush: 55, regular: 138 },
  { day: "Jun 25", rush: 16, regular: 144 },
  { day: "Jun 26", rush: 90, regular: 131 },
  { day: "Jun 27", rush: 93, regular: 92 },
  { day: "Jun 28", rush: 72, regular: 151 },
  { day: "Jun 29", rush: 88, regular: 154 },
  { day: "Jun 30", rush: 119, regular: 123 },
];

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-2)" },
} satisfies ChartConfig;

type Series = keyof typeof config;

const totals = {
  rush: data.reduce((sum, row) => sum + row.rush, 0),
  regular: data.reduce((sum, row) => sum + row.regular, 0),
};

export function ChartBarInteractive() {
  const [shown, setShown] = useState<Series>("rush");
  return (
    <Card>
      <CardHeader className="sm:grid-cols-[1fr_auto]">
        <CardTitle>Jobs by the day</CardTitle>
        <CardDescription>June, rush and regular</CardDescription>
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
          <BarChart data={data} accessibilityLayer>
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
            <Bar
              dataKey={shown}
              fill={`var(--color-${shown})`}
              {...chartMotion}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
