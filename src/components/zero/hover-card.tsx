"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "@/lib/zero/cn";

/*
 * A preview of what a link leads to, opening while the link is pointed at or focused: the
 * Popover's panel, a little apart from the link, growing out of it and folding back faster.
 * Only for things sighted pointer users can do without; anything needed belongs on the page.
 */

const HoverCard = PreviewCardPrimitive.Root;
const HoverCardTrigger = PreviewCardPrimitive.Trigger;

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "side" | "align">;

function HoverCardContent({
  className,
  side = "bottom",
  align = "center",
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        side={side}
        align={align}
        className="z-zero-popover"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "panel pop grid w-72 gap-2 p-4 font-medium font-zero-text text-zero-sm",
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2 data-[side=left]:me-2 data-[side=right]:ms-2",
            className,
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export {
  HoverCard,
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardTrigger,
};
