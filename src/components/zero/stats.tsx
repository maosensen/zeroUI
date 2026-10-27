import type { ComponentProps } from "react";
import { ArrowDownIcon } from "@/components/zero/icons/arrow-down";
import { cn } from "@/lib/zero/cn";

/*
 * An item's numbers, and how they compare with what you have now: a row per stat, its name
 * leaning on the left, its value on the right, and with `compare` the difference after it, in the
 * accent with an arrow up when it is better and red with an arrow down when it is worse. Which way
 * is better is `better` ("higher" for damage, "lower" for weight). The difference is also said in
 * words for screen readers. Put Stats in a HoverCard or a Tooltip to compare loot on hover.
 *
 *   <Stats>
 *     <Stat label="Capacity" value={6} compare={4} />
 *     <Stat label="Weight" value={3} compare={2} better="lower" unit=" kg" />
 *   </Stats>
 */

function Stats({ className, ...props }: ComponentProps<"dl">) {
  return (
    <dl
      data-slot="stats"
      className={cn(
        "grid w-full grid-cols-[1fr_auto_auto] items-baseline gap-x-3 gap-y-1.5",
        className,
      )}
      {...props}
    />
  );
}

/** What a Stat says in words for screen readers; English by default. */
type StatLabels = {
  /** No difference from what you have now. */
  same: string;
  /** A difference: its amount written out with the unit ("2 kg"), which way, and whether that is better. */
  diff: (amount: string, more: boolean, better: boolean) => string;
};

const statLabels: StatLabels = {
  same: "same as now",
  diff: (amount, more, better) =>
    `${amount} ${more ? "more" : "less"} than now, ${better ? "better" : "worse"}`,
};

function Stat({
  className,
  label,
  value,
  compare,
  better = "higher",
  unit = "",
  format = (n: number) => n.toLocaleString("en-US"),
  labels,
}: {
  className?: string;
  label: string;
  value: number;
  /** What you have now; shows the difference. */
  compare?: number;
  better?: "higher" | "lower";
  /** Written after each number, as " kg" or "%". */
  unit?: string;
  format?: (n: number) => string;
  /** What it says in words, in another language: any part of statLabels. */
  labels?: Partial<StatLabels>;
}) {
  const said = { ...statLabels, ...labels };
  const diff = compare === undefined ? 0 : value - compare;
  const good = better === "higher" ? diff > 0 : diff < 0;
  return (
    <div data-slot="stat" className={cn("contents", className)}>
      <dt className="font-bold font-zero text-zero-sm text-zero-text-2 uppercase italic tracking-[0.06em]">
        {label}
      </dt>
      <dd className="text-end font-semibold font-zero-text text-zero-md tabular-nums">
        {format(value)}
        {unit}
      </dd>
      <dd
        data-slot="stat-diff"
        data-better={compare !== undefined && diff !== 0 ? good : undefined}
        className={cn(
          "inline-flex min-w-14 items-center justify-end gap-0.5 font-bold font-zero-text text-zero-sm tabular-nums",
          diff === 0
            ? "text-zero-text-3"
            : good
              ? "text-zero-accent"
              : "text-zero-danger",
        )}
      >
        {compare === undefined ? null : diff === 0 ? (
          <>
            <span aria-hidden>=</span>
            <span className="sr-only">{said.same}</span>
          </>
        ) : (
          <>
            <ArrowDownIcon
              className={cn("size-[1.1em]", diff > 0 && "rotate-180")}
            />
            <span aria-hidden>
              {format(Math.abs(diff))}
              {unit}
            </span>
            <span className="sr-only">
              {said.diff(`${format(Math.abs(diff))}${unit}`, diff > 0, good)}
            </span>
          </>
        )}
      </dd>
    </div>
  );
}

export { Stat, type StatLabels, Stats, statLabels };
