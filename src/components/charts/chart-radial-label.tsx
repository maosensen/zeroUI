"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
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
 * A radial bar chart with labels: a ring for each district, its name written where the ring
 * starts. The numbers are made up; feed your own.
 */

const data = [
  { district: "canalDocks", jobs: 275, fill: "var(--color-canalDocks)" },
  { district: "oldMarket", jobs: 214, fill: "var(--color-oldMarket)" },
  { district: "northGate", jobs: 187, fill: "var(--color-northGate)" },
  { district: "railYards", jobs: 173, fill: "var(--color-railYards)" },
  { district: "harbor", jobs: 128, fill: "var(--color-harbor)" },
];

const config = {
  jobs: { label: "Jobs" },
  canalDocks: { label: "Canal docks", color: "var(--zero-chart-1)" },
  oldMarket: { label: "Old market", color: "var(--zero-chart-2)" },
  northGate: { label: "North gate", color: "var(--zero-chart-3)" },
  railYards: { label: "Rail yards", color: "var(--zero-chart-4)" },
  harbor: { label: "Harbor", color: "var(--zero-chart-5)" },
} satisfies ChartConfig;

/** A district's key, as written on its ring. */
function districtName(key: unknown) {
  return config[key as keyof typeof config]?.label;
}

export function ChartRadialLabel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs by district</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square w-full max-w-64"
        >
          <RadialBarChart
            data={data}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
            accessibilityLayer
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="district" />}
            />
            <RadialBar dataKey="jobs" background {...chartMotion}>
              <LabelList
                position="insideStart"
                dataKey="district"
                formatter={districtName}
                className="fill-zero-ink font-bold font-zero italic"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          Canal docks up 8.4% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Jobs closed in five districts, January to June</p>
      </CardFooter>
    </Card>
  );
}
