"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, type ButtonProps } from "@/components/zero/button";
import { cn } from "@/lib/zero/cn";

/*
 * A button that has to be held, for what should not happen by accident: scrap an item, abandon a
 * run. While it is held (pointer, Enter or Space, or its `hotkey` anywhere on the page) a fill
 * runs across it along the slant; let go early and it drains back. When it is full, `onConfirm`
 * fires and the button flashes the accent. The fill keeps its pace under reduced motion: it is how
 * long to hold, not decoration. Put a Kbd inside to show the key.
 *
 *   <HoldButton onConfirm={scrap} hotkey="x">
 *     <Kbd>X</Kbd> Hold to scrap
 *   </HoldButton>
 */

type KeyEvent = Parameters<NonNullable<ButtonProps["onKeyDown"]>>[0];
type PointerEvent = Parameters<NonNullable<ButtonProps["onPointerDown"]>>[0];

type HoldButtonProps = Omit<ButtonProps, "onClick"> & {
  /** Fired once the hold is complete. */
  onConfirm?: () => void;
  /** How long to hold, in ms. */
  duration?: number;
  /** A key (as in KeyboardEvent.key) that holds it from anywhere, outside text fields. */
  hotkey?: string;
};

function HoldButton({
  className,
  onConfirm,
  duration = 1200,
  hotkey,
  style,
  variant = "secondary",
  disabled,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onKeyDown,
  onKeyUp,
  ...props
}: HoldButtonProps) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const fill = useRef<Animation>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const confirm = useRef(onConfirm);
  confirm.current = onConfirm;

  // the fill is --hold-p (registered in slab.css), run by the Web Animations API so it keeps its
  // own clock beside the button's press transitions
  const run = useCallback((to: string, ms: number, easing: string) => {
    const button = ref.current;
    if (!button) return;
    const from = getComputedStyle(button).getPropertyValue("--hold-p");
    fill.current?.cancel();
    fill.current = button.animate(
      [{ "--hold-p": from || "-10%" }, { "--hold-p": to }],
      { duration: ms, easing, fill: "forwards" },
    );
  }, []);

  const start = useCallback(() => {
    if (disabled || timer.current) return;
    setHolding(true);
    run("110%", duration, "linear");
    timer.current = setTimeout(() => {
      timer.current = undefined;
      setHolding(false);
      setDone(true);
      confirm.current?.();
    }, duration);
  }, [disabled, duration, run]);

  const stop = useCallback(() => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = undefined;
    setHolding(false);
    run("-10%", duration / 6, "cubic-bezier(0.2, 0.7, 0.2, 1)");
  }, [duration, run]);

  // the flash after a confirm lasts one slow beat, then the fill is gone
  useEffect(() => {
    if (!done) return;
    const flash = setTimeout(() => {
      setDone(false);
      fill.current?.cancel();
    }, 420);
    return () => clearTimeout(flash);
  }, [done]);

  useEffect(() => stop, [stop]);

  useEffect(() => {
    if (!hotkey) return;
    const typing = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    const down = (event: globalThis.KeyboardEvent) => {
      if (event.repeat || typing(event.target)) return;
      if (event.key.toLowerCase() === hotkey.toLowerCase()) start();
    };
    const up = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() === hotkey.toLowerCase()) stop();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", stop);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", stop);
    };
  }, [hotkey, start, stop]);

  const hold = (event: KeyEvent) => {
    onKeyDown?.(event);
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) start();
  };
  const release = (event: KeyEvent) => {
    onKeyUp?.(event);
    if (event.key === "Enter" || event.key === " ") stop();
  };

  return (
    <Button
      ref={ref}
      data-slot="hold-button"
      data-holding={holding ? "" : undefined}
      data-confirmed={done ? "" : undefined}
      variant={variant}
      disabled={disabled}
      aria-description={
        hotkey
          ? `Press and hold, or hold ${hotkey.toUpperCase()}`
          : "Press and hold"
      }
      onPointerDown={(event: PointerEvent) => {
        onPointerDown?.(event);
        if (event.button === 0) start();
      }}
      onPointerUp={(event: PointerEvent) => {
        onPointerUp?.(event);
        stop();
      }}
      onPointerLeave={(event: PointerEvent) => {
        onPointerLeave?.(event);
        stop();
      }}
      onKeyDown={hold}
      onKeyUp={release}
      style={style}
      className={cn(
        // the fill is the hatch layer of the slab: a tinted band whose edge leans on the slant
        "[--slab-hatch:linear-gradient(calc(90deg+var(--zero-slant)),color-mix(in_srgb,var(--color-zero-accent)_40%,transparent)_var(--hold-p),transparent_var(--hold-p))]",
        "data-confirmed:[--slab-fill:var(--color-zero-accent)] data-confirmed:[--slab-hatch:none] data-confirmed:[--slab-ink:var(--color-zero-ink)]",
        className,
      )}
      {...props}
    />
  );
}

export { HoldButton, type HoldButtonProps };
