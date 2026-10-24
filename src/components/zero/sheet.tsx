"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  CornerClose,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/zero/dialog";
import { cn } from "@/lib/zero/cn";

/*
 * A dialog that slides in from an edge of the screen and holds on to it. The edge it holds is
 * open; the edge facing the page wears the ink border. It slides in on the reveal timing and out,
 * faster, on the dismiss timing; under reduced motion it only fades. Header, title, body and
 * footer are the Dialog's own parts.
 */

const sides = {
  right:
    "inset-y-0 right-0 w-[min(26rem,calc(100%-3rem))] border-l-(length:--zero-stroke) data-starting-style:translate-x-full data-ending-style:translate-x-full",
  left: "inset-y-0 left-0 w-[min(26rem,calc(100%-3rem))] border-r-(length:--zero-stroke) data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
  top: "inset-x-0 top-0 max-h-[80dvh] border-b-(length:--zero-stroke) data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[80dvh] border-t-(length:--zero-stroke) data-starting-style:translate-y-full data-ending-style:translate-y-full",
} as const;

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogClose;

function SheetContent({
  className,
  children,
  side = "right",
  showClose = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  side?: keyof typeof sides;
  showClose?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-zero-overlay flex flex-col overflow-y-auto border-0 border-zero-ink bg-zero-surface bg-(image:--zero-hatch) text-zero-text",
          "transition-[translate,opacity] duration-(--zero-dur-base) ease-(--zero-ease-out)",
          "data-ending-style:duration-(--zero-dur-fast) data-ending-style:ease-(--zero-ease-in)",
          sides[side],
          "motion-reduce:data-starting-style:translate-0 motion-reduce:data-starting-style:opacity-0 motion-reduce:data-ending-style:translate-0 motion-reduce:data-ending-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        {showClose ? <CornerClose /> : null}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

const SheetHeader = DialogHeader;
const SheetTitle = DialogTitle;
const SheetDescription = DialogDescription;
const SheetBody = DialogBody;

/** Pinned to the far end of the sheet. */
function SheetFooter({
  className,
  ...props
}: Parameters<typeof DialogFooter>[0]) {
  return <DialogFooter className={cn("mt-auto pt-5", className)} {...props} />;
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
