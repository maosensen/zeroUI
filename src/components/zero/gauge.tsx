"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A reading that goes up and down: health, shields, stamina, a budget. A thicker cousin of
 * Progress, on the same slanted well. When the value drops, the fill falls at once and a pale
 * trail is left where it was, which waits (--zero-dur-hold) and then catches up, so the size of
 * the hit stays readable; when it rises, a faint trail runs ahead and the fill climbs into it.
 * With `segments` the well is split into slanted cells, each filling in turn. Under `low` (a share
 * of the whole) it turns red and breathes. Under reduced motion the trail does not wait.
 *
 *   <Gauge value={hp} max={120} low={0.25}>
 *     <GaugeLabel>Hull</GaugeLabel>
 *     <GaugeValue />
 *   </Gauge>
 */

const tones = {
  accent: "[--gauge-tone:var(--color-zero-accent)]",
  danger: "[--gauge-tone:var(--color-zero-danger)]",
  uncommon: "[--gauge-tone:var(--color-zero-rarity-uncommon)]",
  rare: "[--gauge-tone:var(--color-zero-rarity-rare)]",
  epic: "[--gauge-tone:var(--color-zero-rarity-epic)]",
  legendary: "[--gauge-tone:var(--color-zero-rarity-legendary)]",
} as const;

type GaugeProps = MeterPrimitive.Root.Props & {
  /** The fill's colour. */
  tone?: keyof typeof tones;
  /** Splits the well into this many cells. */
  segments?: number;
  /** A share of the whole (0–1); at or under it the fill turns red and breathes. */
  low?: number;
};

const GaugeContext = createContext({ max: 100 });

/** Each layer's width: the fill and the trail move on different clocks. */
const layer =
  "absolute inset-y-0 start-0 transition-[width] duration-(--zero-dur-slow) ease-(--zero-ease-out)";

function Gauge({
  className,
  children,
  tone = "accent",
  segments,
  low,
  value,
  min = 0,
  max = 100,
  ...props
}: GaugeProps) {
  const share = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  // which way it last moved decides which layer waits: React's "previous render" pattern
  const [last, setLast] = useState(share);
  const [move, setMove] = useState<"drop" | "gain">("drop");
  if (share !== last) {
    setLast(share);
    setMove(share < last ? "drop" : "gain");
  }
  const isLow = low !== undefined && share <= low;
  const cells = segments ?? 1;
  return (
    <MeterPrimitive.Root
      data-slot="gauge"
      data-move={move}
      data-low={isLow ? "" : undefined}
      value={value}
      min={min}
      max={max}
      className={cn(
        "grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2",
        tones[tone],
        "data-low:[--gauge-tone:var(--color-zero-danger)]",
        // the layer that waits: the trail on a drop, the fill on a gain
        "data-[move=drop]:[--gauge-trail-delay:var(--zero-dur-hold)] data-[move=gain]:[--gauge-fill-delay:var(--zero-dur-hold)]",
        className,
      )}
      {...props}
    >
      <GaugeContext.Provider value={{ max }}>{children}</GaugeContext.Provider>
      <MeterPrimitive.Track
        data-slot="gauge-track"
        className={cn(
          "col-span-full flex h-[1em] gap-[0.25em]",
          segments
            ? "px-[calc(0.5em*tan(var(--zero-slant)))]"
            : "slab slab-cut-both overflow-hidden [--slab-fill:var(--color-zero-void)] [--slab-h:1em] [--slab-line:var(--color-zero-line)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
        )}
      >
        {Array.from({ length: cells }, (_, index) => {
          const part = Math.min(1, Math.max(0, share * cells - index));
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: the cells are fixed and in order
              key={index}
              data-slot="gauge-cell"
              className={cn(
                "relative h-full flex-1 overflow-hidden",
                segments &&
                  "-skew-x-(--zero-slant) bg-zero-void shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
              )}
            >
              <span
                data-slot="gauge-trail"
                className={cn(
                  layer,
                  "delay-(--gauge-trail-delay,0s)",
                  !segments && "-skew-x-(--zero-slant)",
                  move === "drop"
                    ? "bg-zero-text"
                    : "bg-(--gauge-tone) opacity-40",
                )}
                style={{ width: `${part * 100}%` }}
              />
              <span
                data-slot="gauge-fill"
                className={cn(
                  layer,
                  "delay-(--gauge-fill-delay,0s) bg-(--gauge-tone)",
                  !segments && "-skew-x-(--zero-slant)",
                  isLow && "animate-zero-pulse",
                )}
                style={{ width: `${part * 100}%` }}
              />
            </span>
          );
        })}
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}

function GaugeLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="gauge-label"
      className={cn(
        "font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]",
        className,
      )}
      {...props}
    />
  );
}

/** The reading. By default "value / max"; pass a function for your own. */
function GaugeValue({
  className,
  children,
  ...props
}: MeterPrimitive.Value.Props) {
  const { max } = useContext(GaugeContext);
  return (
    <MeterPrimitive.Value
      data-slot="gauge-value"
      className={cn(
        "col-start-2 font-semibold font-zero-text text-zero-sm text-zero-text-2 tabular-nums",
        className,
      )}
      {...props}
    >
      {children ?? ((_, value) => `${value} / ${max}`)}
    </MeterPrimitive.Value>
  );
}

export { Gauge, GaugeLabel, type GaugeProps, GaugeValue };
