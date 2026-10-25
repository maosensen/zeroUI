import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A note in the run of a conversation that nobody said: "Mara joined", a date, "Reconnected". Small,
 * quiet and leaning. `separator` sets it between two quiet lines across the width; `border` puts a
 * line under it.
 */

const markerVariants = cva(
  [
    "group/marker relative flex min-h-4 w-full items-center gap-2 text-left",
    "font-bold font-zero text-zero-text-3 text-zero-xs italic",
    "[&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-zero-text",
  ],
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:me-1 before:h-(--zero-stroke-thin) before:min-w-0 before:flex-1 before:bg-zero-line after:ms-1 after:h-(--zero-stroke-thin) after:min-w-0 after:flex-1 after:bg-zero-line",
        border: "border-zero-line border-b-(length:--zero-stroke-thin) pb-2",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      { className: cn(markerVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: "marker", variant },
  });
}

function MarkerIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn("flex shrink-0", className)}
      {...props}
    />
  );
}

function MarkerContent({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center",
        className,
      )}
      {...props}
    />
  );
}

export { Marker, MarkerContent, MarkerIcon, markerVariants };
