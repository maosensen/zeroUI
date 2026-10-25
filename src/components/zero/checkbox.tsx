"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "@/components/zero/icons/check";
import { MinusIcon } from "@/components/zero/icons/minus";
import { cn } from "@/lib/zero/cn";

/*
 * A small slab cut on both sides: a sunken well while unchecked, filled with the accent once
 * checked, with an ink check (or a minus, when indeterminate) springing in. It is sized in em, so
 * it follows the text of the label it sits in. Put it inside a <label> to make the text clickable.
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/checkbox slab slab-cut-both inline-grid shrink-0 place-items-center outline-none",
        // a box whose inside reads square: as wide as it is tall, plus the cut
        "[--slab-h:1.375em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px] w-[calc(1.375em*(1+tan(var(--zero-slant))))]",
        "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-ink:var(--color-zero-ink)]",
        "hover:[--slab-line:var(--color-zero-text-3)]",
        "data-checked:[--slab-fill:var(--color-zero-accent)] data-checked:[--slab-line:var(--color-zero-ink)] data-indeterminate:[--slab-fill:var(--color-zero-accent)] data-indeterminate:[--slab-line:var(--color-zero-ink)]",
        "focus-visible:[--slab-line:var(--color-zero-focus)] data-checked:focus-visible:[--slab-line:var(--color-zero-focus)] data-indeterminate:focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
        "aria-invalid:[--slab-line:var(--color-zero-danger)] data-invalid:[--slab-line:var(--color-zero-danger)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-fill:var(--color-zero-raised)] data-disabled:[--slab-line:var(--color-zero-ink)] data-disabled:[--slab-ink:var(--color-zero-text-3)]",
        "transition-[scale] duration-(--zero-dur-base) ease-(--zero-ease-spring) active:scale-(--zero-press-scale) active:duration-(--zero-dur-instant) active:ease-(--zero-ease-out)",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          "grid place-items-center transition-[scale,opacity] duration-(--zero-dur-base) ease-(--zero-ease-spring)",
          "data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0 data-ending-style:duration-(--zero-dur-fast) data-ending-style:ease-(--zero-ease-in)",
        )}
      >
        <CheckIcon className="size-[0.95em] group-data-indeterminate/checkbox:hidden" />
        <MinusIcon className="hidden size-[0.95em] group-data-indeterminate/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
