import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/zero/lib/utils";

/*
 * A slab with a label. The shape, outline and fill come from the `slab` utility; this file only
 * chooses which tokens go into it. Pressing shrinks it fast and lets it spring back past its rest;
 * pointing at it sends the sheen across. Focus swaps the outline for the selection frame.
 */
const buttonVariants = cva(
  [
    "slab sheen inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none",
    "font-zero font-extrabold italic tracking-[0.01em] outline-none",
    // release: the slower, overshooting half of the press
    "transition-[scale] duration-(--zero-dur-base) ease-(--zero-ease-spring)",
    "active:scale-(--zero-press-scale) active:duration-(--zero-dur-instant) active:ease-(--zero-ease-out)",
    // the selection frame: yellow outline, an ink gap, then the fill
    "focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
    "data-disabled:pointer-events-none data-disabled:[--slab-fill:var(--color-zero-raised)] data-disabled:[--slab-line:var(--color-zero-ink)] data-disabled:[--slab-ink:var(--color-zero-text-3)] data-disabled:[--slab-hatch:none]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "[--slab-fill:var(--color-zero-accent)] [--slab-ink:var(--color-zero-ink)]",
          "hover:[--slab-fill:var(--color-zero-accent-hi)] active:[--slab-fill:var(--color-zero-accent-lo)]",
        ],
        secondary: [
          "[--slab-fill:var(--color-zero-raised)] [--slab-hatch:var(--zero-hatch)] [--slab-ink:var(--color-zero-text)]",
          "hover:[--slab-fill:var(--color-zero-lifted)] active:[--slab-fill:var(--color-zero-raised)]",
        ],
        danger: [
          "[--slab-fill:var(--color-zero-void)] [--slab-hatch:var(--zero-hatch)] [--slab-line:var(--color-zero-danger)] [--slab-ink:var(--color-zero-danger)]",
          "hover:[--slab-line:var(--color-zero-danger-hi)] hover:[--slab-ink:var(--color-zero-danger-hi)]",
        ],
        ghost: [
          "[--slab-fill:transparent] [--slab-line:transparent] [--slab-ink:var(--color-zero-text-2)]",
          "hover:[--slab-fill:var(--color-zero-raised)] hover:[--slab-ink:var(--color-zero-text)]",
        ],
      },
      size: {
        sm: "[--slab-h:var(--height-zero-sm)] [--slab-px:0.75rem] gap-1.5 text-zero-sm [&_svg:not([class*='size-'])]:size-4",
        md: "[--slab-h:var(--height-zero-md)] [--slab-px:1.125rem] gap-2 text-zero-md [&_svg:not([class*='size-'])]:size-[1.125rem]",
        lg: "[--slab-h:var(--height-zero-lg)] [--slab-px:1.5rem] gap-2.5 text-zero-lg font-black [&_svg:not([class*='size-'])]:size-5",
      },
      cut: {
        end: "slab-cut-end",
        start: "slab-cut-start",
        both: "slab-cut-both",
        none: "slab-cut-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      cut: "end",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, cut, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, cut, className }))}
      {...props}
    />
  );
}

export { Button, type ButtonProps, buttonVariants };
