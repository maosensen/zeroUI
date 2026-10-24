"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/zero/cn";

/*
 * A short label on a light slab, cut on both sides: one line, so its height is known and it can be
 * a slab rather than a panel. It grows out of its trigger and folds back faster. Wrap the app (or
 * a part of it) in TooltipProvider so neighbouring tooltips open without a second delay.
 */

function TooltipProvider({
  delay = 400,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "side" | "align">;

function TooltipContent({
  className,
  side = "top",
  align = "center",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        align={align}
        className="z-zero-popover"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "slab slab-cut-both pop inline-flex items-center whitespace-nowrap",
            "[--slab-h:var(--height-zero-sm)] [--slab-px:0.625rem] [--slab-o:var(--zero-stroke-thin)]",
            "[--slab-fill:var(--color-zero-text)] [--slab-ink:var(--color-zero-ink)]",
            "font-bold font-zero text-zero-xs italic",
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2 data-[side=left]:me-2 data-[side=right]:ms-2",
            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export {
  Tooltip,
  TooltipContent,
  type TooltipContentProps,
  TooltipProvider,
  TooltipTrigger,
};
