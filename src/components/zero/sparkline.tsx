import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A trend in a word's space: a line through a run of numbers, its last point marked. Quiet grey
 * by default; `hot` draws it in the accent with a glow on the last point, for the few lines that
 * should stand out among many. Sized in em (4 : 1), so it follows the text it sits in. Screen
 * readers get the run in words: where it started, where it is, and its peak.
 *
 *   <Sparkline values={[0, 3, 9, 14, 11]} hot />
 */

const W = 80;
const H = 20;
const PAD = 2.5;

function Sparkline({
  className,
  values,
  hot,
  label,
  ...props
}: Omit<ComponentProps<"svg">, "children" | "values"> & {
  values: number[];
  /** Draw it in the accent, its last point glowing. */
  hot?: boolean;
  /** What screen readers hear; a description of the run when omitted. */
  label?: string;
}) {
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? (W - PAD * 2) / (values.length - 1) : 0;
  const points = values.map(
    (v, i) => [PAD + i * step, H - PAD - (v / max) * (H - PAD * 2)] as const,
  );
  const last = points.at(-1);
  const said =
    label ??
    `Trend over ${values.length} points: from ${values[0] ?? 0} to ${values.at(-1) ?? 0}, peak ${Math.max(0, ...values)}`;
  return (
    <svg
      role="img"
      aria-label={said}
      viewBox={`0 0 ${W} ${H}`}
      data-slot="sparkline"
      data-hot={hot ? "" : undefined}
      className={cn(
        "h-[1.25em] w-[5em] shrink-0 overflow-visible text-zero-text-3 data-hot:text-zero-accent",
        className,
      )}
      {...props}
    >
      <polyline
        points={points.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {last ? (
        <circle
          cx={last[0]}
          cy={last[1]}
          r={2.25}
          fill="currentColor"
          className={hot ? "drop-shadow-[0_0_3px_currentColor]" : undefined}
        />
      ) : null}
    </svg>
  );
}

export { Sparkline };
