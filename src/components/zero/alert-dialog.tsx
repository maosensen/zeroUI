"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { Button } from "@/components/zero/button";
import {
  DialogBackdrop,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/zero/dialog";
import { cn } from "@/lib/zero/cn";

/*
 * A Dialog that asks before something that cannot be undone, and waits for an answer: no close
 * button in the corner, and a click on the dimmed page does not dismiss it. The header, title,
 * body and footer are the Dialog's. AlertDialogCancel is a raised button that closes it;
 * AlertDialogAction closes it too, in the accent, or in red with variant="danger".
 */

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPrimitive.Portal>
      <DialogBackdrop />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "panel pop fixed top-1/2 left-1/2 z-zero-overlay grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogAction({
  variant = "primary",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button variant={variant} {...props} />}
    />
  );
}

function AlertDialogCancel({
  variant = "secondary",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} {...props} />}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  DialogBody as AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  DialogDescription as AlertDialogDescription,
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
  DialogTitle as AlertDialogTitle,
  AlertDialogTrigger,
};
