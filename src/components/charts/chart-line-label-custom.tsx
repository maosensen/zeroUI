"use client";

import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
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
 * A line chart over districts where each point is labelled with its row's name, not its value:
 * the label reads the row's `district` and looks it up in the config. The numbers are made up;
 * feed your own.
 */

const data = [
  { district: "canalDocks", jobs: 186 },
  { district: "oldMarket", jobs: 305 },
  { district: "northGate", jobs: 237 },
  { district: "railYards", jobs: 173 },
  { district: "tower9", jobs: 209 },
  { district: "harbor", jobs: 264 },
];

const config = {
  jobs: { label: "Jobs", color: "var(--zero-chart-1)" },
  canalDocks: { label: "Canal docks" },
  oldMarket: { label: "Old market" },
  northGate: { label: "North gate" },
  railYards: { label: "Rail yards" },
  tower9: { label: "Tower 9" },
  harbor: { label: "Harbor" },
} satisfies ChartConfig;

type District = Exclude<keyof typeof config, "jobs">;

export function ChartLineLabelCustom() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by district</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            data={data}
            margin={{ top: 24, left: 36, right: 36 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="jobs"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="jobs"
              type="natural"
              stroke="var(--color-jobs)"
              strokeWidth={2}
              dot={{
                r: 4,
                stroke: "var(--color-jobs)",
                strokeWidth: 2,
                fill: "var(--color-zero-surface)",
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-zero-ink)",
                strokeWidth: 2,
                fill: "var(--color-jobs)",
              }}
              {...chartMotion}
            >
              <LabelList
                dataKey="district"
                position="top"
                offset={12}
                className="fill-zero-text-2"
                formatter={(value) => config[value as District]?.label}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Old market busiest, up 6.4%
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Jobs closed in each district, January to June</p>
      </CardFooter>
    </Card>
  );
}
