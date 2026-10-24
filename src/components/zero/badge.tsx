import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/zero/cn";

/*
 * A short label stuck on something: a small slab cut on both sides, in small leaning capitals.
 * One line, so it is a slab, 1.75em tall on the smallest type size. The accent for what matters,
 * the raised grey for the ordinary, a black well outlined in the quiet line for the quiet (a
 * slab cannot be hollow: its outline is painted under the fill), red for danger.
 * `render` makes it a link (<Badge render={<a href="…" />}>).
 */

const badgeVariants = cva(
  [
    "slab slab-cut-both inline-flex w-fit shrink-0 items-center gap-[0.3em] whitespace-nowrap",
    "[--slab-h:1.75em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0.5em]",
    "font-black font-zero text-zero-xs uppercase italic tracking-[0.06em]",
    "[&>svg]:pointer-events-none [&>svg]:size-[1.1em]",
    "outline-none focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)]",
  ],
  {
    variants: {
      variant: {
        default:
          "[--slab-fill:var(--color-zero-accent)] [--slab-ink:var(--color-zero-ink)] [a]:hover:[--slab-fill:var(--color-zero-accent-hi)]",
        secondary:
          "[--slab-fill:var(--color-zero-raised)] [a]:hover:[--slab-fill:var(--color-zero-lifted)]",
        outline:
          "[--slab-fill:var(--color-zero-void)] [--slab-ink:var(--color-zero-text-2)] [--slab-line:var(--color-zero-line)] [a]:hover:[--slab-ink:var(--color-zero-text)]",
        danger:
          "[--slab-fill:var(--color-zero-danger)] [--slab-ink:var(--color-zero-ink)] [a]:hover:[--slab-fill:var(--color-zero-danger-hi)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: "badge", variant },
  });
}

export { Badge, type BadgeProps, badgeVariants };
