"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/zero/cn";

/*
 * A slanted track with a slab inside it, the Tabs geometry in small: every edge leans the same
 * way, so at either end the thumb sits parallel to the track's cut, --zero-inset in. Turned on,
 * the track fills with the accent, the thumb turns ink and springs across. Sized in em, so it
 * follows the label beside it.
 *
 * The parts share these, set on the track:
 *   --sw-h      the track's height
 *   --sw-w      the track's width
 *   --sw-th     the thumb's height (the track less its outline and inset, top and bottom)
 *   --sw-tw     the thumb's width
 *   --sw-x      the thumb's left when off (the same formula as the Tabs track's padding)
 */
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group/switch slab slab-cut-both relative inline-block shrink-0 outline-none",
        "[--sw-h:1.5em] [--sw-w:3em] [--sw-th:calc(var(--sw-h)-2*(var(--zero-stroke-thin)+var(--zero-inset)))] [--sw-tw:calc(var(--sw-th)*1.15)]",
        "[--sw-x:calc((var(--zero-inset)+var(--zero-stroke-thin))/cos(var(--zero-slant))+(var(--zero-inset)+var(--zero-stroke-thin))*tan(var(--zero-slant)))]",
        "w-(--sw-w) [--slab-h:var(--sw-h)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
        "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
        "hover:[--slab-line:var(--color-zero-text-3)]",
        "data-checked:[--slab-fill:var(--color-zero-accent)] data-checked:[--slab-line:var(--color-zero-ink)]",
        "focus-visible:[--slab-line:var(--color-zero-focus)]",
        "aria-invalid:[--slab-line:var(--color-zero-danger)] data-invalid:[--slab-line:var(--color-zero-danger)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-fill:var(--color-zero-raised)] data-disabled:[--slab-line:var(--color-zero-ink)]",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "slab slab-cut-both pointer-events-none absolute top-[calc(var(--zero-stroke-thin)+var(--zero-inset))] left-(--sw-x) block",
          "w-(--sw-tw) [--slab-h:var(--sw-th)] [--slab-o:0px] [--slab-px:0px] [--slab-line:transparent] [--slab-fill:var(--color-zero-text-3)]",
          "group-data-checked/switch:[--slab-fill:var(--color-zero-ink)] group-data-disabled/switch:[--slab-fill:var(--color-zero-lifted)]",
          // the slide: across the track, past the end and back, on the release timing
          "transition-[translate] duration-(--zero-dur-base) ease-(--zero-ease-spring)",
          "data-checked:translate-x-[calc(var(--sw-w)-var(--sw-tw)-2*var(--sw-x))]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
