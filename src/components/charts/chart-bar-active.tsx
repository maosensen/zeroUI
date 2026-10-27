"use client";

import {
  Bar,
  BarChart,
  type BarShapeProps,
  CartesianGrid,
  Rectangle,
  XAxis,
} from "recharts";
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
 * A bar chart with one bar marked: the others dimmed, the marked one at full strength with a
 * dashed ink line run round inside it. Recharts 3 dropped `activeIndex` (its `activeBar` follows
 * the tooltip), so the bar's `shape` picks the marked one by its index. The numbers are made up;
 * feed your own.
 */

const data = [
  { month: "Jan", jobs: 186 },
  { month: "Feb", jobs: 305 },
  { month: "Mar", jobs: 237 },
  { month: "Apr", jobs: 73 },
  { month: "May", jobs: 209 },
  { month: "Jun", jobs: 214 },
];

/** The row drawn as marked. */
const marked = 1;

const config = {
  jobs: { label: "Jobs", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

/** The marked bar: its full colour, and a dashed ink outline set just inside its edge. */
function MarkedBar(props: BarShapeProps) {
  const { x, y, width, height } = props;
  const inset = 4;
  return (
    <g>
      <Rectangle {...props} />
      {width > inset * 2 && height > inset * 2 ? (
        <rect
          x={x + inset}
          y={y + inset}
          width={width - inset * 2}
          height={height - inset * 2}
          fill="none"
          strokeDasharray="6 4"
          className="stroke-(length:--zero-stroke-thin) stroke-zero-ink"
        />
      ) : null}
    </g>
  );
}

function shape(props: BarShapeProps) {
  return props.index === marked ? (
    <MarkedBar {...props} />
  ) : (
    <Rectangle {...props} fillOpacity={0.5} />
  );
}

export function ChartBarActive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Best month</CardTitle>
        <CardDescription>January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="jobs"
              fill="var(--color-jobs)"
              shape={shape}
              {...chartMotion}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid gap-1 font-medium font-zero-text text-zero-sm text-zero-text-2">
        <p className="flex items-center gap-1.5 font-bold text-zero-text">
          February best, up 5.2% on the half before
          <ChevronUpIcon className="size-4 text-zero-accent" />
        </p>
        <p>Every job closed, January to June</p>
      </CardFooter>
    </Card>
  );
}
