"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";
import { Button } from "@/components/zero/button";
import { CloseIcon } from "@/components/zero/icons/close";
import { cn } from "@/lib/zero/cn";

/*
 * A panel over a dimmed page. The panel (panel.css) opens out of its centre and folds back faster
 * (`pop`); the page behind it goes dark (`fade`). The header is a black bar holding a tilted
 * title, like the bars across the top of a screen; the close button sits in its corner.
 *
 *   <Dialog>
 *     <DialogTrigger render={<Button />}>Open</DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader><DialogTitle /><DialogDescription /></DialogHeader>
 *       <DialogBody>…</DialogBody>
 *       <DialogFooter><DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose></DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

/** The corner close button shared by dialogs and sheets. */
function CornerClose() {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      render={
        <Button
          variant="ghost"
          size="sm"
          cut="both"
          className="absolute top-3 right-3 [--slab-px:0.25rem]"
        />
      }
    >
      <CloseIcon />
    </DialogPrimitive.Close>
  );
}

function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fade fixed inset-0 z-zero-overlay bg-zero-void/75",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: DialogPrimitive.Popup.Props & { showClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "panel pop fixed top-1/2 left-1/2 z-zero-overlay grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
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

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("grid gap-2 bg-zero-void px-6 py-5 pe-16", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "origin-left rotate-(--zero-tilt) font-black font-zero text-zero-xl italic",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "grid gap-4 px-6 py-5 font-medium font-zero-text text-zero-md",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-wrap justify-end gap-3 px-6 pb-6", className)}
      {...props}
    />
  );
}

export {
  CornerClose,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
