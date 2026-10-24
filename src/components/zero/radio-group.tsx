"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/zero/cn";

/*
 * One choice of several. Each radio is the same small slanted well as a Checkbox; the chosen one
 * gets a slab of the accent nested inside it, --zero-inset in all round (the Tabs geometry again),
 * springing in. A checkbox fills; a radio holds a slab: the two never read alike. Sized in em.
 */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "slab slab-cut-both relative inline-block shrink-0 outline-none",
        "[--rd-h:1.375em] [--rd-w:calc(var(--rd-h)*(1+tan(var(--zero-slant))))]",
        "[--rd-ih:calc(var(--rd-h)-2*(var(--zero-stroke-thin)+var(--zero-inset)))]",
        "[--rd-x:calc((var(--zero-inset)+var(--zero-stroke-thin))/cos(var(--zero-slant))+(var(--zero-inset)+var(--zero-stroke-thin))*tan(var(--zero-slant)))]",
        "w-(--rd-w) [--slab-h:var(--rd-h)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
        "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
        "hover:[--slab-line:var(--color-zero-text-3)] data-checked:[--slab-line:var(--color-zero-accent)]",
        "focus-visible:[--slab-line:var(--color-zero-focus)]",
        "aria-invalid:[--slab-line:var(--color-zero-danger)] data-invalid:[--slab-line:var(--color-zero-danger)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-fill:var(--color-zero-raised)] data-disabled:[--slab-line:var(--color-zero-ink)]",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          "slab slab-cut-both absolute top-[calc(var(--zero-stroke-thin)+var(--zero-inset))] left-(--rd-x) block",
          "w-[calc(var(--rd-w)-2*var(--rd-x))] [--slab-h:var(--rd-ih)] [--slab-o:0px] [--slab-px:0px] [--slab-line:transparent] [--slab-fill:var(--color-zero-accent)]",
          "in-data-disabled:[--slab-fill:var(--color-zero-text-3)]",
          "transition-[scale,opacity] duration-(--zero-dur-base) ease-(--zero-ease-spring)",
          "data-starting-style:scale-0 data-starting-style:opacity-0 data-ending-style:scale-0 data-ending-style:opacity-0 data-ending-style:duration-(--zero-dur-fast) data-ending-style:ease-(--zero-ease-in)",
        )}
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
