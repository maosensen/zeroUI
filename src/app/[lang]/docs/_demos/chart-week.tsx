"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
} from "@/components/zero/chart";

const week = [
  { day: "Mon", rush: 4, regular: 9 },
  { day: "Tue", rush: 6, regular: 7 },
  { day: "Wed", rush: 3, regular: 11 },
  { day: "Thu", rush: 8, regular: 6 },
  { day: "Fri", rush: 9, regular: 10 },
  { day: "Sat", rush: 5, regular: 4 },
  { day: "Sun", rush: 2, regular: 3 },
];

const config = {
  rush: { label: "Rush", color: "var(--zero-chart-1)" },
  regular: { label: "Regular", color: "var(--zero-chart-3)" },
} satisfies ChartConfig;

export default function ChartWeek() {
  return (
    <ChartContainer config={config} className="w-full max-w-lg">
      <BarChart data={week} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} cursor />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="rush"
          fill="var(--color-rush)"
          stackId="jobs"
          {...chartMotion}
        />
        <Bar
          dataKey="regular"
          fill="var(--color-regular)"
          stackId="jobs"
          {...chartMotion}
        />
      </BarChart>
    </ChartContainer>
  );
}
