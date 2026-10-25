import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * What a place shows when it has nothing in it yet: a mark in a slanted black well, a leaning title,
 * a line of explanation, and the action that fills it. Centred, with room around it; give it a
 * dashed outline with className when it stands for a drop zone.
 */

function Empty({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-5 p-8 text-center",
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className,
      )}
      {...props}
    />
  );
}

/** The mark: an icon in a slanted black well, cut on both sides. */
function EmptyMedia({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-media"
      className={cn(
        "slab slab-cut-both mb-2 flex items-center justify-center text-zero-text-3",
        "w-[calc(var(--height-zero-lg)*(1+tan(var(--zero-slant))))] [--slab-h:var(--height-zero-lg)] [--slab-px:0px]",
        "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-o:var(--zero-stroke-thin)]",
        "[&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("font-black font-zero text-zero-lg italic", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
