import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A band of short news carried across the top of a screen, right to left, without end: what is
 * happening elsewhere, glanced at. A black band between two quiet lines; its items sit in a row
 * with a slanted mark between them. It stops while pointed at or while focus is inside, so an
 * item can be read and its link followed. The content is written twice and moved by half (the
 * `ticker` animation), so it loops without a jump; the second copy is hidden from screen readers
 * and from Tab. Under reduced motion it does not move: it scrolls sideways by hand instead.
 * `duration` is one full pass in seconds; give more time to more items.
 *
 *   <Ticker aria-label="Latest">
 *     <TickerLive />
 *     <TickerItem>Halcyon ships Meridian-4 <TickerValue>412</TickerValue></TickerItem>
 *   </Ticker>
 */

function Ticker({
  className,
  children,
  duration = 80,
  style,
  ...props
}: Omit<ComponentProps<"section">, "children"> & {
  children: ReactNode;
  /** Seconds for one full pass. */
  duration?: number;
}) {
  const row =
    "flex shrink-0 items-center gap-6 pe-6 [&>li+li]:before:me-6 [&>li+li]:before:inline-block [&>li+li]:before:h-[0.8em] [&>li+li]:before:w-[0.35em] [&>li+li]:before:-skew-x-(--zero-slant) [&>li+li]:before:bg-zero-line [&>li]:flex [&>li]:items-center";
  return (
    <section
      data-slot="ticker"
      style={{ "--ticker-dur": `${duration}s`, ...style } as CSSProperties}
      className={cn(
        "group/ticker relative overflow-hidden border-zero-line border-y-(length:--zero-stroke-thin) bg-zero-void py-2 motion-reduce:overflow-x-auto",
        className,
      )}
      {...props}
    >
      <div className="flex w-max animate-zero-ticker group-focus-within/ticker:[animation-play-state:paused] group-hover/ticker:[animation-play-state:paused] motion-reduce:animate-none">
        <ul className={row}>{children}</ul>
        <ul className={row} aria-hidden inert>
          {children}
        </ul>
      </div>
    </section>
  );
}

/** One item: a short line, its link if any, and a value after it. */
function TickerItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="ticker-item"
      className={cn(
        "gap-2 whitespace-nowrap font-medium font-zero-text text-zero-sm text-zero-text-2 [&_a]:text-zero-text [&_a]:outline-none [&_a:hover]:text-zero-accent [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-(length:--zero-stroke-thin) [&_a:focus-visible]:outline-zero-focus [&_a:focus-visible]:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

/** A number beside an item, in the accent: a score, a count. */
function TickerValue({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="ticker-value"
      className={cn(
        "font-black font-zero text-zero-accent italic tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

/** "Live", with a breathing dot: put it first. */
function TickerLive({
  className,
  children = "Live",
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot="ticker-live"
      className={cn(
        "gap-2 font-black font-zero text-zero-accent text-zero-xs uppercase italic tracking-[0.14em]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="size-2 rounded-zero-round bg-zero-accent animate-zero-pulse"
      />
      {children}
    </li>
  );
}

export { Ticker, TickerItem, TickerLive, TickerValue };
