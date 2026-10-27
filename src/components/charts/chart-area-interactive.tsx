"use client";

import { useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
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
 * An area chart over a month of days, two series stacked under fading fills, with a select in the
 * header that narrows it to the last two weeks or the last week. The numbers are made up; feed
 * your own.
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

const ranges = {
  "30": "Last 30 days",
  "14": "Last 14 days",
  "7": "Last 7 days",
};

type Range = keyof typeof ranges;

export function ChartAreaInteractive() {
  const [range, setRange] = useState<Range>("30");
  // the gradients are named per chart, so two of these on a page do not share fills
  const id = useId().replace(/:/g, "");
  const shown = data.slice(-Number(range));
  return (
    <Card>
      <CardHeader className="sm:grid-cols-[1fr_auto]">
        <CardTitle>Jobs by the day</CardTitle>
        <CardDescription>June, rush and regular</CardDescription>
        <div className="sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-center">
          <Select
            items={ranges}
            value={range}
            onValueChange={(value) => {
              if (value) setRange(value as Range);
            }}
          >
            <SelectTrigger size="sm" className="w-40" aria-label="Range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.entries(ranges).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-64">
          <AreaChart data={shown} accessibilityLayer>
            <defs>
              {(Object.keys(config) as (keyof typeof config)[]).map((key) => (
                <linearGradient
                  key={key}
                  id={`${id}-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="regular"
              type="natural"
              fill={`url(#${id}-regular)`}
              stroke="var(--color-regular)"
              stackId="a"
              {...chartMotion}
            />
            <Area
              dataKey="rush"
              type="natural"
              fill={`url(#${id}-rush)`}
              stroke="var(--color-rush)"
              stackId="a"
              {...chartMotion}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
