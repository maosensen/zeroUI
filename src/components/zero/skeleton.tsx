import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A stand-in for something still loading, in the raised grey, with a faint band of light dragged
 * along the slant across it (`glint`, motion.css; still under reduced motion). Three shapes:
 * a block for pictures and cards, a line for a line of text (thin, cut on both sides like a slab),
 * and a slab the size of a control. No outline: a placeholder stays quieter than what it holds.
 * Give it the size of what it stands for; SkeletonText stacks lines for a paragraph.
 */

const skeletonVariants = cva(
  [
    "glint block bg-zero-raised",
    "[--sk-cut:calc(var(--sk-h,0px)*tan(var(--zero-slant)))]",
    "[clip-path:polygon(calc(var(--sk-cs,0)*var(--sk-cut))_0,100%_0,calc(100%-var(--sk-ce,0)*var(--sk-cut))_100%,0_100%)]",
  ],
  {
    variants: {
      shape: {
        block: "",
        line: "h-(--sk-h) w-full [--sk-ce:1] [--sk-cs:1] [--sk-h:0.75em]",
        slab: "h-(--sk-h) w-32 [--sk-ce:1] [--sk-h:var(--height-zero-md)]",
      },
    },
    defaultVariants: { shape: "block" },
  },
);

type SkeletonProps = ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, shape = "block", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton"
      data-shape={shape}
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  );
}

/** A paragraph of line placeholders, each the height of a line of text; the last one is short. */
function SkeletonText({
  className,
  lines = 3,
  ...props
}: ComponentProps<"div"> & { lines?: number }) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-text"
      className={cn("grid gap-[0.75em]", className)}
      {...props}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: placeholder lines have no identity
          key={index}
          shape="line"
          className={index === lines - 1 && lines > 1 ? "w-3/5" : undefined}
        />
      ))}
    </div>
  );
}

export { Skeleton, type SkeletonProps, SkeletonText, skeletonVariants };
