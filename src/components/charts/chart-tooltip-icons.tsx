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
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";
import { CrateIcon } from "@/components/zero/icons/crate";
import { FlareIcon } from "@/components/zero/icons/flare";

/*
 * Rush and regular jobs a day, stacked; each series names an icon in the config, and the tooltip
 * shows it in place of the swatch. The numbers are made up; feed your own.
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
  rush: { label: "Rush", color: "var(--zero-chart-1)", icon: FlareIcon },
  regular: { label: "Regular", color: "var(--zero-chart-3)", icon: CrateIcon },
} satisfies ChartConfig;

export function ChartTooltipIcons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip: icons</CardTitle>
        <CardDescription>
          An icon from the config beside each series.
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
              content={<ChartTooltipContent />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
