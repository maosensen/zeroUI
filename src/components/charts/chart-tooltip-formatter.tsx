"use client";

import { Bar, BarChart, XAxis } from "recharts";
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
  ChartSwatch,
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";

/*
 * Rush and regular jobs a day, stacked; a formatter draws each tooltip row with its unit, and a
 * total under the last one. The numbers are made up; feed your own.
 */

const data = [
  { day: "Mon", rush: 18, regular: 42 },
  { day: "Tue", rush: 31, regular: 38 },
  { day: "Wed", rush: 24, regular: 47 },
  { day: "Thu", rush: 12, regular: 35 },
  { day: "Fri", rush: 36, regular: 51 },
  { day: "Sat", rush: 27, regular: 22 },
];

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

export function ChartTooltipFormatter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip: formatter</CardTitle>
        <CardDescription>
          Each row with its unit, and the day's total.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data} accessibilityLayer>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="rush"
              stackId="jobs"
              fill="var(--color-rush)"
              {...chartMotion}
            />
            <Bar
              dataKey="regular"
              stackId="jobs"
              fill="var(--color-regular)"
              {...chartMotion}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={1}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-44"
                  formatter={(value, name, item, index) => {
                    const key = name as keyof typeof config;
                    const row = item.payload as (typeof data)[number];
                    return (
                      <div className="grid flex-1 gap-1">
                        <div className="flex items-center gap-2">
                          <ChartSwatch color={`var(--color-${key})`} />
                          <span className="text-zero-text-2">
                            {config[key]?.label ?? name}
                          </span>
                          <span className="ms-auto ps-3 text-zero-text tabular-nums">
                            {value}
                            <span className="ps-1 text-zero-text-3">jobs</span>
                          </span>
                        </div>
                        {index === Object.keys(config).length - 1 ? (
                          <div className="flex items-center border-zero-line border-t pt-1 text-zero-text">
                            Total
                            <span className="ms-auto ps-3 tabular-nums">
                              {row.rush + row.regular}
                              <span className="ps-1 text-zero-text-3">
                                jobs
                              </span>
                            </span>
                          </div>
                        ) : null}
                      </div>
                    );
                  }}
                />
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
