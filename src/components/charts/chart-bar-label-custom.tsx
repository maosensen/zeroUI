"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
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
 * A bar chart on its side with its labels in the bars: each district's name written in ink at the
 * start of its bar, the count just past the end. No axes; the labels say it all. The numbers are
 * made up; feed your own.
 */

const data = [
  { district: "Canal docks", jobs: 305 },
  { district: "Old market", jobs: 237 },
  { district: "North gate", jobs: 214 },
  { district: "Rail yards", jobs: 186 },
  { district: "Tower 9", jobs: 132 },
  { district: "Harbor", jobs: 96 },
];

const config = {
  jobs: { label: "Jobs", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

export function ChartBarLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by district</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ right: 32 }}
            accessibilityLayer
          >
            <XAxis type="number" dataKey="jobs" hide />
            <YAxis dataKey="district" type="category" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="jobs" fill="var(--color-jobs)" {...chartMotion}>
              <LabelList
                dataKey="district"
                position="insideLeft"
                offset={8}
                className="fill-zero-ink"
              />
              <LabelList
                dataKey="jobs"
                position="right"
                offset={8}
                className="fill-zero-text tabular-nums"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Canal docks busiest for the third month
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, by where it was picked up</p>
      </CardFooter>
    </Card>
  );
}
