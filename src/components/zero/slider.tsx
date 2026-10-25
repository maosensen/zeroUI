"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/zero/cn";

/*
 * A thin slanted well for a track, the chosen stretch filled with the accent, and a slab for each
 * thumb: light, outlined in ink, lifting to the accent while it is dragged. Horizontal only; one
 * value, or two for a range (pass an array). Sized in em.
 */
function Slider({
  className,
  "aria-label": label,
  ...props
}: SliderPrimitive.Root.Props) {
  const initial = props.value ?? props.defaultValue;
  const values = Array.isArray(initial) ? initial.length : 1;
  // a thumb is the control a screen reader lands on, so the slider's name goes there
  const thumbLabel = (index: number) =>
    label && values > 1 ? `${label}, ${index === 0 ? "from" : "to"}` : label;
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("w-full", className)}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex h-[1.75em] w-full touch-none select-none items-center">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "slab slab-cut-both relative w-full [--slab-h:0.625em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
            "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
            "in-data-disabled:[--slab-fill:var(--color-zero-raised)] in-data-disabled:[--slab-line:var(--color-zero-ink)]",
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="h-full bg-zero-accent in-data-disabled:bg-zero-text-3"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: values }, (_, index) => (
          <SliderPrimitive.Thumb
            // biome-ignore lint/suspicious/noArrayIndexKey: one thumb per value, in order
            key={index}
            getAriaLabel={label ? () => thumbLabel(index) ?? "" : undefined}
            data-slot="slider-thumb"
            className={cn(
              "slab slab-cut-both block w-[calc(1.5em*(0.85+tan(var(--zero-slant))))] outline-none",
              "[--slab-h:1.5em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
              "[--slab-fill:var(--color-zero-text)] [--slab-line:var(--color-zero-ink)]",
              "hover:[--slab-fill:var(--color-zero-accent-hi)] data-dragging:[--slab-fill:var(--color-zero-accent)]",
              // the range input inside the thumb takes focus, so the frame follows it
              "has-focus-visible:[--slab-line:var(--color-zero-focus)] has-focus-visible:[--slab-gap:var(--zero-stroke-thin)] has-focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
              "data-disabled:[--slab-fill:var(--color-zero-lifted)]",
              "transition-[scale] duration-(--zero-dur-base) ease-(--zero-ease-spring) data-dragging:scale-(--zero-press-scale) data-dragging:duration-(--zero-dur-instant)",
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
