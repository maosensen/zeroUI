"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
} from "motion/react";
import { type ComponentProps, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/zero/cn";
import { transition } from "@/lib/zero/motion";

/*
 * A number that rolls to its new value instead of jumping: gold, score, damage, a bounty. Set in
 * the display face, leaning, with figures of one width so it does not shake as it counts. With
 * `delta` the change is thrown off it (+120 in the accent, −40 in red), rising and fading. Screen
 * readers get the final value, not the count. Under reduced motion it jumps and the change does
 * not rise.
 *
 *   <Counter value={credits} delta />
 */

type CounterProps = Omit<ComponentProps<"span">, "children"> & {
  value: number;
  /** How to write it. */
  format?: Intl.NumberFormatOptions;
  /** Fixed so the server and the browser write it the same way. */
  locale?: string;
  /** Throw each change off the number. */
  delta?: boolean;
};

function Counter({
  className,
  value,
  format,
  locale = "en-US",
  delta,
  ...props
}: CounterProps) {
  const reduce = useReducedMotion();
  const shown = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  const [changes, setChanges] = useState<{ id: number; by: number }[]>([]);
  const write = (n: number) =>
    new Intl.NumberFormat(locale, format).format(
      format?.maximumFractionDigits ? n : Math.round(n),
    );

  // before paint: the render wrote the new value; put the old one back and roll from it
  // biome-ignore lint/correctness/useExhaustiveDependencies: `write` changes with format and locale, which a counter keeps
  useLayoutEffect(() => {
    const start = from.current;
    from.current = value;
    if (start === value) return;
    if (delta)
      setChanges((list) => [
        ...list.slice(-2),
        { id: Date.now(), by: value - start },
      ]);
    if (reduce) return;
    const roll = animate(start, value, {
      ...transition.roll,
      onUpdate: (n) => {
        if (shown.current) shown.current.textContent = write(n);
      },
    });
    return () => roll.stop();
  }, [value, delta, reduce]);

  return (
    <span
      data-slot="counter"
      className={cn(
        "relative inline-block font-black font-zero text-zero-xl italic tabular-nums",
        className,
      )}
      {...props}
    >
      <span ref={shown} aria-hidden>
        {write(value)}
      </span>
      <span className="sr-only">{write(value)}</span>
      <AnimatePresence>
        {changes.map((change) => (
          <motion.span
            key={change.id}
            data-slot="counter-delta"
            aria-hidden
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: reduce ? 0 : "-1.2em" }}
            transition={transition.float}
            onAnimationComplete={() =>
              setChanges((list) => list.filter((c) => c.id !== change.id))
            }
            className={cn(
              "pointer-events-none absolute end-0 bottom-[85%] whitespace-nowrap text-[0.5em]",
              change.by > 0 ? "text-zero-accent" : "text-zero-danger",
            )}
          >
            {change.by > 0 ? "+" : "−"}
            {write(Math.abs(change.by))}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

export { Counter, type CounterProps };
