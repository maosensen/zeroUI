"use client";

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn } from "@/lib/zero/cn";

/*
 * A one-time code, a character to a cell. Each cell is a small well of Input's, cut on both sides
 * so a row of them nests, holding one tall leaning character. The cell being typed in draws the
 * selection frame; typing moves on, Backspace moves back, pasting fills the row. Inside an invalid
 * Field the cells outline in danger. Without children, InputOTP draws `length` cells.
 */

function InputOTP({
  className,
  children,
  length,
  ...props
}: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="input-otp"
      length={length}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {children ??
        Array.from({ length }, (_, index) => (
          <InputOTPSlot
            // biome-ignore lint/suspicious/noArrayIndexKey: one cell per character, in order
            key={index}
            aria-label={
              index === 0 ? undefined : `Character ${index + 1} of ${length}`
            }
          />
        ))}
    </OTPFieldPrimitive.Root>
  );
}

function InputOTPSlot({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      render={(inputProps) => (
        // An input cannot carry the slab's layers, so the cell is a frame around it, like Input's.
        <span
          data-slot="input-otp-slot"
          className={cn(
            "slab slab-cut-both block w-[calc(var(--height-zero-lg)*(0.75+tan(var(--zero-slant))))] [--slab-px:0px]",
            "[--slab-h:var(--height-zero-lg)] [--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
            "hover:[--slab-line:var(--color-zero-text-3)]",
            "has-focus:[--slab-line:var(--color-zero-focus)] has-focus:[--slab-gap:var(--zero-stroke-thin)] has-focus:[--slab-gap-fill:var(--color-zero-ink)]",
            "in-data-invalid:[--slab-line:var(--color-zero-danger)]",
            "has-disabled:pointer-events-none has-disabled:[--slab-fill:var(--color-zero-raised)] has-disabled:[--slab-line:var(--color-zero-ink)]",
          )}
        >
          <input
            {...inputProps}
            className={cn(
              "size-full bg-transparent text-center font-black font-zero text-zero-xl text-zero-text italic caret-zero-accent outline-none disabled:text-zero-text-3",
              inputProps.className,
            )}
          />
        </span>
      )}
      className={className}
      {...props}
    />
  );
}

/** A short slanted dash between two runs of cells. */
function InputOTPSeparator({
  className,
  ...props
}: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="input-otp-separator"
      className={cn(
        "mx-1 h-(--zero-stroke) w-3 -skew-x-(--zero-slant) bg-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

export { InputOTP, InputOTPSeparator, InputOTPSlot };
