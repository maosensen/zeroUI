"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@/lib/zero/cn";

/*
 * How far something has got. The track is Slider's: a thin slanted well. The fill is the accent,
 * its end leaning with the slant. With `segments` the bar is a row of separate slanted cells that
 * light up one by one, like a gauge of charges. Without a value (value={null}) the amount is
 * unknown and a short block sweeps the track back and forth; under reduced motion it holds still
 * as a dim fill of the whole track instead. Label and value sit above the bar. Sized in em.
 *
 *   <Progress value={40}>
 *     <ProgressLabel>Uploading</ProgressLabel>
 *     <ProgressValue />
 *   </Progress>
 */

type ProgressProps = ProgressPrimitive.Root.Props & {
  /** Splits the bar into this many cells, each lit once its share is reached. */
  segments?: number;
};

function Progress({
  className,
  children,
  segments,
  value,
  min = 0,
  max = 100,
  ...props
}: ProgressProps) {
  const share =
    value === null
      ? null
      : Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  const cells = share === null ? 0 : (segments ?? 0);
  const lit = Math.floor((share ?? 0) * cells);
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      min={min}
      max={max}
      className={cn(
        "grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2",
        className,
      )}
      {...props}
    >
      {children}
      {cells > 0 ? (
        <ProgressPrimitive.Track
          data-slot="progress-track"
          className="col-span-full flex h-[0.75em] gap-[0.25em] px-[calc(0.375em*tan(var(--zero-slant)))]"
        >
          {Array.from({ length: cells }, (_, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: the cells are fixed and in order
              key={index}
              data-slot="progress-segment"
              data-lit={index < lit ? "" : undefined}
              className={cn(
                "h-full flex-1 -skew-x-(--zero-slant) bg-zero-void shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
                "transition-[background-color,box-shadow] duration-(--zero-dur-fast) ease-(--zero-ease-out)",
                "data-lit:bg-zero-accent data-lit:shadow-none",
              )}
            />
          ))}
        </ProgressPrimitive.Track>
      ) : (
        <ProgressPrimitive.Track
          data-slot="progress-track"
          className={cn(
            "slab slab-cut-both relative col-span-full w-full overflow-hidden [--slab-h:0.75em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
            "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
          )}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className={cn(
              "-skew-x-(--zero-slant) bg-zero-accent transition-[width] duration-(--zero-dur-base) ease-(--zero-ease-out)",
              "data-indeterminate:absolute data-indeterminate:inset-y-0 data-indeterminate:w-1/3 data-indeterminate:animate-zero-sweep",
              "motion-reduce:data-indeterminate:w-full motion-reduce:data-indeterminate:opacity-35",
            )}
          />
        </ProgressPrimitive.Track>
      )}
    </ProgressPrimitive.Root>
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("font-bold font-zero text-zero-sm italic", className)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "col-start-2 font-semibold font-zero-text text-zero-sm text-zero-text-2 tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export { Progress, ProgressLabel, type ProgressProps, ProgressValue };
