import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * What was said, in a box: square-cornered, since its height is whatever it holds, with the one
 * corner nearest the speaker cut off at 45°, like a ticket torn from the side it came from. The
 * accent for your own turns, the raised grey for the other side, the surface for the quieter, an
 * outlined black well, red for something that went wrong, or no box at all (ghost). Inside a
 * Message it follows the message's side. BubbleReactions pins a small slab of reactions to its edge.
 */

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 data-[align=end]:self-end group-data-[align=end]/message:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "[--bubble-fill:var(--color-zero-accent)] [--bubble-ink:var(--color-zero-ink)]",
        secondary:
          "[--bubble-fill:var(--color-zero-raised)] [--bubble-ink:var(--color-zero-text)]",
        muted:
          "[--bubble-fill:var(--color-zero-surface)] [--bubble-ink:var(--color-zero-text-2)]",
        outline:
          "[--bubble-fill:var(--color-zero-void)] [--bubble-ink:var(--color-zero-text)] [--bubble-line:var(--color-zero-line)]",
        danger:
          "[--bubble-fill:var(--color-zero-void)] [--bubble-ink:var(--color-zero-danger)] [--bubble-line:var(--color-zero-danger)]",
        ghost:
          "[--bubble-fill:transparent] [--bubble-ink:var(--color-zero-text)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

/** The box. `render` makes it a button or a link (a suggested reply). */
function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 px-4 py-2.5 font-medium font-zero-text text-zero-md leading-relaxed wrap-break-word",
          "bg-(--bubble-fill) text-(--bubble-ink) border-(length:--zero-stroke-thin) border-(--bubble-line,transparent)",
          // the corner nearest the speaker, cut at 45° (not on an outlined box: the cut would take its border)
          "[--bubble-cut:0.75rem] not-in-data-[variant=outline]:not-in-data-[variant=danger]:not-in-data-[variant=ghost]:[clip-path:polygon(0_0,100%_0,100%_100%,var(--bubble-cut)_100%,0_calc(100%-var(--bubble-cut)))]",
          "not-in-data-[variant=outline]:not-in-data-[variant=danger]:not-in-data-[variant=ghost]:in-data-[align=end]:[clip-path:polygon(0_0,100%_0,100%_calc(100%-var(--bubble-cut)),calc(100%-var(--bubble-cut))_100%,0_100%)]",
          "in-data-[variant=ghost]:p-0 group-data-[align=end]/bubble:self-end",
          "[button]:text-left [a,button]:outline-none [a,button]:transition-colors [a,button]:hover:brightness-110",
          "[a,button]:focus-visible:outline-(length:--zero-stroke-thin) [a,button]:focus-visible:outline-zero-focus [a,button]:focus-visible:outline-offset-2",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "bubble-content" },
  });
}

/** A small raised slab of reactions on the bubble's edge. */
function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-side={side}
      data-align={align}
      className={cn(
        "slab slab-cut-both absolute z-zero-raised inline-flex items-center gap-1",
        "[--slab-h:1.75rem] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0.5rem] [--slab-fill:var(--color-zero-raised)]",
        "font-semibold font-zero-text text-zero-xs tabular-nums",
        side === "bottom"
          ? "bottom-0 translate-y-2/3"
          : "top-0 -translate-y-2/3",
        align === "end" ? "right-3" : "left-3",
        className,
      )}
      {...props}
    />
  );
}

function BubbleGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions, bubbleVariants };
