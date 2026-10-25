"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { type ComponentProps, createContext, useContext } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A panel that comes up from the bottom of the screen and can be dragged back down: the phone's
 * sheet. It wears the Sheet's look, a slanted grip at its top, and follows the finger while it is
 * swiped, the page behind lightening as it goes. `side` brings it in from another edge instead
 * (Sheet does that without the swipe). Under reduced motion it only fades.
 */

const sides = {
  bottom: {
    swipe: "down",
    viewport: "items-end",
    popup:
      "max-h-[85dvh] w-full border-t-(length:--zero-stroke) [transform:translateY(var(--drawer-swipe-movement-y))] data-starting-style:[transform:translateY(100%)] data-ending-style:[transform:translateY(100%)]",
  },
  top: {
    swipe: "up",
    viewport: "items-start",
    popup:
      "max-h-[85dvh] w-full border-b-(length:--zero-stroke) [transform:translateY(var(--drawer-swipe-movement-y))] data-starting-style:[transform:translateY(-100%)] data-ending-style:[transform:translateY(-100%)]",
  },
  right: {
    swipe: "right",
    viewport: "justify-end",
    popup:
      "h-full w-[min(24rem,calc(100%-3rem))] border-l-(length:--zero-stroke) [transform:translateX(var(--drawer-swipe-movement-x))] data-starting-style:[transform:translateX(100%)] data-ending-style:[transform:translateX(100%)]",
  },
  left: {
    swipe: "left",
    viewport: "justify-start",
    popup:
      "h-full w-[min(24rem,calc(100%-3rem))] border-r-(length:--zero-stroke) [transform:translateX(var(--drawer-swipe-movement-x))] data-starting-style:[transform:translateX(-100%)] data-ending-style:[transform:translateX(-100%)]",
  },
} as const;

type DrawerSide = keyof typeof sides;

const SideContext = createContext<DrawerSide>("bottom");

function Drawer({
  side = "bottom",
  ...props
}: Omit<DrawerPrimitive.Root.Props, "swipeDirection"> & { side?: DrawerSide }) {
  return (
    <SideContext.Provider value={side}>
      <DrawerPrimitive.Root swipeDirection={sides[side].swipe} {...props} />
    </SideContext.Provider>
  );
}

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  const side = useContext(SideContext);
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className={cn(
          "fixed inset-0 z-zero-overlay bg-zero-void opacity-[calc(0.75*(1-var(--drawer-swipe-progress,0)))]",
          "transition-opacity duration-(--zero-dur-slow) ease-(--zero-ease-out) data-swiping:duration-0",
          "data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-(--zero-dur-base)",
        )}
      />
      <DrawerPrimitive.Viewport
        className={cn(
          "fixed inset-0 z-zero-overlay flex",
          sides[side].viewport,
        )}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-side={side}
          className={cn(
            "flex flex-col overflow-y-auto overscroll-contain border-0 border-zero-ink bg-zero-surface bg-(image:--zero-hatch) text-zero-text outline-none touch-auto",
            "transition-transform duration-(--zero-dur-slow) ease-(--zero-ease-out) data-swiping:select-none data-swiping:duration-0",
            "data-ending-style:duration-(--zero-dur-base) data-ending-style:ease-(--zero-ease-in)",
            sides[side].popup,
            "motion-reduce:transition-opacity motion-reduce:data-starting-style:[transform:none] motion-reduce:data-ending-style:[transform:none] motion-reduce:data-starting-style:opacity-0 motion-reduce:data-ending-style:opacity-0",
            className,
          )}
          {...props}
        >
          {side === "bottom" ? (
            <span
              aria-hidden
              className="mx-auto mt-3 mb-1 h-1.5 w-12 shrink-0 -skew-x-(--zero-slant) bg-zero-line"
            />
          ) : null}
          <DrawerPrimitive.Content
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              (side === "bottom" || side === "top") &&
                "mx-auto w-full max-w-2xl",
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid gap-1.5 px-6 pt-4 pb-2", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-black font-zero text-zero-xl italic", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

function DrawerBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn(
        "grid gap-4 px-6 py-4 font-medium font-zero-text text-zero-md",
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-wrap gap-3 px-6 pt-2 pb-6", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  type DrawerSide,
  DrawerTitle,
  DrawerTrigger,
};
