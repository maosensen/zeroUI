"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/zero/cn";

/*
 * A panel that opens beside its trigger and holds anything: a few lines of text, a small form.
 * It grows out of the trigger and folds back faster, and sits a little apart from it.
 */

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "side" | "align">;

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        className="z-zero-popover"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "panel pop grid w-72 gap-2 p-4 font-medium font-zero-text text-zero-sm",
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2 data-[side=left]:me-2 data-[side=right]:ms-2",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-black font-zero text-zero-md italic", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-zero-text-2", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  type PopoverContentProps,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
};
