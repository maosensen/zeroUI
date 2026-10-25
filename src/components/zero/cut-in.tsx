"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/zero/cn";

/*
 * The cut-in: a band thrown across the screen for a moment that matters ("Job taken", "Run
 * failed"), the way a game announces one. A black band between two lines of the tone's colour,
 * a small leaning eyebrow, a big tilted title that glitches as it lands, a line under it. It wipes
 * in from the left on the slant (`cut-in`, motion.css), holds, and wipes out to the right; it closes
 * by itself after `duration`, on Escape, or on a click. It does not take focus or block the page,
 * and it is announced politely. Under reduced motion it appears and goes without the wipe or the
 * glitch.
 *
 *   const [open, setOpen] = useState(false);
 *   <CutIn open={open} onOpenChange={setOpen}>
 *     <CutInContent>
 *       <CutInEyebrow>Job taken</CutInEyebrow>
 *       <CutInTitle>Sealed crate</CutInTitle>
 *       <CutInDescription>Rail yards → North gate</CutInDescription>
 *     </CutInContent>
 *   </CutIn>
 */

const tones = {
  accent: "[--cut-in-tone:var(--color-zero-accent)]",
  danger: "[--cut-in-tone:var(--color-zero-danger)]",
  legendary: "[--cut-in-tone:var(--color-zero-rarity-legendary)]",
} as const;

type CutInProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Milliseconds it holds before going by itself; 0 keeps it. */
  duration?: number;
  children?: ReactNode;
};

function CutIn({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  duration = 2400,
  children,
}: CutInProps) {
  const [own, setOwn] = useState(defaultOpen);
  const open = openProp ?? own;
  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOwn(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );
  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [open, duration, setOpen]);
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      modal={false}
      disablePointerDismissal={false}
    >
      {children}
    </DialogPrimitive.Root>
  );
}

const CutInTrigger = DialogPrimitive.Trigger;

function CutInContent({
  className,
  children,
  tone = "accent",
  ...props
}: DialogPrimitive.Popup.Props & { tone?: keyof typeof tones }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Popup
        data-slot="cut-in"
        role="status"
        aria-live="polite"
        initialFocus={false}
        finalFocus={false}
        className={cn(
          "cut-in pointer-events-none fixed [--cut-in-h:11rem] inset-x-0 top-[30%] z-zero-overlay outline-none",
          "border-(--cut-in-tone) border-y-(length:--zero-stroke-thick) bg-zero-void bg-(image:--zero-hatch)",
          tones[tone],
          className,
        )}
        {...props}
      >
        <div className="mx-auto grid max-w-5xl gap-2 px-6 pt-10 pb-7 sm:px-10">
          {children}
        </div>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

function CutInEyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="cut-in-eyebrow"
      className={cn(
        "flex items-center gap-2.5 font-black font-zero text-(--cut-in-tone) text-zero-sm uppercase italic tracking-[0.14em]",
        "before:h-[0.9em] before:w-[0.45em] before:-skew-x-(--zero-slant) before:bg-(--cut-in-tone)",
        className,
      )}
      {...props}
    />
  );
}

function CutInTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="cut-in-title"
      className={cn(
        "glitch origin-left rotate-(--zero-tilt) font-black font-zero text-[clamp(2.5rem,7vw,4.5rem)] italic leading-[0.95]",
        className,
      )}
      {...props}
    />
  );
}

function CutInDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="cut-in-description"
      className={cn(
        "font-semibold font-zero-text text-zero-lg text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  CutIn,
  CutInContent,
  CutInDescription,
  CutInEyebrow,
  type CutInProps,
  CutInTitle,
  CutInTrigger,
};
