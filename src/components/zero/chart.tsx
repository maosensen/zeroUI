"use client";

import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  createContext,
  type ReactNode,
  type Ref,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { TooltipValueType } from "recharts";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/zero/cn";
import { duration, ease } from "@/lib/zero/motion";

/*
 * Charts drawn with Recharts in zzzUI's colours. ChartContainer names the series (`config`) and
 * gives each its colour as --color-<key>, so the chart's parts use var(--color-<key>). Five
 * series colours come with it, all from the tokens: --zero-chart-1 the accent, 2 the text white,
 * 3 the quiet grey, 4 the danger red, 5 the pressed accent. Axes and grid are the quiet line and
 * grey; the tooltip is a small panel and every swatch is a slanted block. Dark only, so a series
 * has one colour, not a light and a dark one.
 *
 * A chart is drawn when it first comes into view, so its marks grow in where they are seen: spread
 * chartMotion on each series (<Bar {...chartMotion} />) for zzzUI's timing. Under reduced motion it
 * is drawn at once and Recharts skips the growing.
 */

/** The easings Recharts' types name. It takes any cubic-bezier, though, and gets one below. */
type Timing = "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";

/** The draw timing for a series: no delay, --zero-dur-draw, the arriving ease. */
const chartMotion = {
  animationBegin: 0,
  animationDuration: duration.draw * 1000,
  animationEasing: `cubic-bezier(${ease.out.join(",")})` as Timing,
};

type ChartConfig = Record<
  string,
  { label?: ReactNode; icon?: ComponentType; color?: string }
>;

const ChartContext = createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context)
    throw new Error("useChart must be used within a ChartContainer.");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  style,
  ref,
  ...props
}: ComponentProps<"div"> & {
  config: ChartConfig;
  children: ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  const colours = Object.fromEntries(
    Object.entries(config)
      .filter(([, item]) => item.color)
      .map(([key, item]) => [`--color-${key}`, item.color]),
  );
  const [box, seen] = useSeen(ref);
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={box}
        data-slot="chart"
        data-chart={chartId}
        style={{ ...colours, ...style } as CSSProperties}
        className={cn(
          "flex aspect-video justify-center font-semibold font-zero-text text-zero-xs",
          "[--zero-chart-1:var(--color-zero-accent)] [--zero-chart-2:var(--color-zero-text)] [--zero-chart-3:var(--color-zero-text-3)] [--zero-chart-4:var(--color-zero-danger)] [--zero-chart-5:var(--color-zero-accent-lo)]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-zero-text-3 [&_.recharts-polar-angle-axis-tick_text]:fill-zero-text-3 [&_.recharts-polar-radius-axis-tick_text]:fill-zero-text-3 [&_.recharts-cartesian-axis-line]:stroke-zero-line [&_.recharts-cartesian-axis-tick-line]:stroke-zero-line",
          "[&_.recharts-cartesian-grid_line]:stroke-zero-line [&_.recharts-polar-grid_[stroke]]:stroke-zero-line [&_.recharts-reference-line_line]:stroke-zero-line",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-zero-text-3 [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zero-raised/60",
          "[&_.recharts-dot[stroke='#fff']]:stroke-zero-ink [&_.recharts-sector[stroke='#fff']]:stroke-zero-ink [&_.recharts-radial-bar-background-sector]:fill-zero-raised",
          "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          // the surface takes keyboard focus (accessibilityLayer), and so does a pie: frame them then
          "[&_.recharts-surface:focus-visible]:outline-solid [&_.recharts-surface:focus-visible]:outline-(length:--zero-stroke-thin) [&_.recharts-surface:focus-visible]:outline-zero-focus",
          "[&_.recharts-pie:focus-visible]:outline-solid [&_.recharts-pie:focus-visible]:outline-(length:--zero-stroke-thin) [&_.recharts-pie:focus-visible]:outline-zero-focus",
          className,
        )}
        {...props}
      >
        {seen ? (
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        ) : null}
      </div>
    </ChartContext.Provider>
  );
}

/**
 * Whether the chart has come into view yet (a quarter of it on screen), and the ref that watches.
 * True at once under reduced motion, where there is no growing to be seen.
 */
function useSeen(ref: Ref<HTMLDivElement> | undefined) {
  const own = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = own.current;
    if (
      !node ||
      typeof IntersectionObserver === "undefined" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const box = (node: HTMLDivElement | null) => {
    own.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  return [box, seen] as const;
}

/** A series' swatch: a small slanted block in its colour; `line` makes it a thin upright bar. */
function ChartSwatch({ color, line }: { color?: string; line?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 -skew-x-(--zero-slant) bg-(--swatch)",
        line ? "h-3 w-1" : "h-2.5 w-2",
      )}
      style={{ "--swatch": color } as CSSProperties}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "block",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ComponentProps<typeof RechartsPrimitive.Tooltip> &
  ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "block" | "line";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      number | string
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = configFor(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;
    const text = labelFormatter ? labelFormatter(value, payload) : value;
    if (!text) return null;
    return (
      <div
        className={cn(
          "font-black font-zero text-zero-text text-zero-sm italic",
          labelClassName,
        )}
      >
        {text}
      </div>
    );
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "panel grid min-w-36 gap-1.5 px-3 py-2 font-semibold font-zero-text text-zero-xs",
        className,
      )}
    >
      {tooltipLabel}
      <div className="grid gap-1">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = configFor(config, item, key);
            const swatch = color ?? item.payload?.fill ?? item.color;
            return (
              <div
                key={key}
                className="flex items-center gap-2 [&>svg]:size-3 [&>svg]:text-zero-text-3"
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : hideIndicator ? null : (
                      <ChartSwatch color={swatch} line={indicator === "line"} />
                    )}
                    <span className="text-zero-text-2">
                      {itemConfig?.label ?? item.name}
                    </span>
                    {item.value != null ? (
                      <span className="ms-auto ps-3 text-zero-text tabular-nums">
                        {typeof item.value === "number"
                          ? item.value.toLocaleString()
                          : String(item.value)}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 font-bold font-zero text-zero-text-2 text-zero-xs italic",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = configFor(config, item, key);
          return (
            <div
              // a pie's slices share one name key: each is told apart by its value
              key={`${key}-${item.value}`}
              className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-zero-text-3"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <ChartSwatch color={item.color} />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

/** The config entry a tooltip or legend row belongs to: by its name key, or by its own key. */
function configFor(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const inner =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? (payload.payload as Record<string, unknown>)
      : undefined;
  const outer = payload as Record<string, unknown>;
  let labelKey = key;
  if (typeof outer[key] === "string") labelKey = outer[key] as string;
  else if (inner && typeof inner[key] === "string")
    labelKey = inner[key] as string;
  return labelKey in config ? config[labelKey] : config[key];
}

export {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartSwatch,
  ChartTooltip,
  ChartTooltipContent,
  chartMotion,
  useChart,
};
