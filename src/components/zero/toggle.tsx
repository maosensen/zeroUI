"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/zero/button";
import { cn } from "@/lib/zero/cn";

/*
 * A Button that stays down: a ghost or raised slab while off, filled with the accent while on
 * (aria-pressed). The same sizes and cuts as Button; it presses and springs back the same way.
 * Give an icon-only toggle an aria-label.
 */

type ToggleProps = TogglePrimitive.Props & {
  variant?: "ghost" | "secondary";
  size?: VariantProps<typeof buttonVariants>["size"];
  cut?: VariantProps<typeof buttonVariants>["cut"];
};

/** The classes a toggle adds to a Button: the accent while pressed, lighter while pointed at. */
const pressed = cn(
  "data-pressed:[--slab-fill:var(--color-zero-accent)] data-pressed:[--slab-ink:var(--color-zero-ink)]",
  "data-pressed:hover:[--slab-fill:var(--color-zero-accent-hi)] data-pressed:hover:[--slab-ink:var(--color-zero-ink)]",
);

function Toggle({
  className,
  variant = "ghost",
  size = "md",
  cut = "end",
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(buttonVariants({ variant, size, cut }), pressed, className)}
      {...props}
    />
  );
}

export { Toggle, type ToggleProps, pressed as togglePressed };
