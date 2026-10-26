import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A text field as an inset well: a slab filled with the void, outlined quietly, sitting lower than
 * the ground around it. An <input> cannot carry the slab's ::before and ::after, so the slab is a
 * frame around it. The frame keeps no padding of its own beyond the cut; the input stretches across
 * it and carries the padding, so a click almost anywhere on the slab lands in the input.
 *
 * `start` and `end` hold things beside the text: an icon, or an InputAction (clear, show). The
 * input gives up its padding on a side that holds something, which takes that padding instead.
 *
 * Focus draws the selection frame (also while an InputAction inside it has focus). An invalid
 * value (inside a Field, or aria-invalid) turns the outline to danger; focused and invalid, the
 * gap opens in the danger frame.
 *
 * className styles the frame (width, margins); every other prop goes to the input.
 */
const inputVariants = cva(
  [
    "slab relative flex w-full min-w-0 items-center [--slab-px:0px]",
    "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-ink:var(--color-zero-text)]",
    "hover:not-has-focus-visible:[--slab-line:var(--color-zero-text-3)]",
    "has-focus-visible:[--slab-line:var(--color-zero-focus)] has-focus-visible:[--slab-gap:var(--zero-stroke-thin)] has-focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
    "has-aria-invalid:[--slab-line:var(--color-zero-danger)] has-aria-invalid:has-focus-visible:[--slab-line:var(--color-zero-danger-hi)]",
    // disabled is the input's own state: a disabled button beside it (Send, with nothing written) is not
    "has-[>[data-slot=input-control]:disabled]:pointer-events-none has-[>[data-slot=input-control]:disabled]:[--slab-fill:var(--color-zero-raised)] has-[>[data-slot=input-control]:disabled]:[--slab-line:var(--color-zero-ink)] has-[>[data-slot=input-control]:disabled]:[--slab-ink:var(--color-zero-text-3)]",
    // a side that holds something takes the padding from the input
    "[&:has(>[data-slot=input-start])>[data-slot=input-control]]:ps-2 [&:has(>[data-slot=input-end])>[data-slot=input-control]]:pe-2",
  ],
  {
    variants: {
      size: {
        sm: "[--slab-h:var(--height-zero-sm)] [--input-px:0.75rem] text-zero-sm",
        md: "[--slab-h:var(--height-zero-md)] [--input-px:1rem] text-zero-md",
        lg: "[--slab-h:var(--height-zero-lg)] [--input-px:1.25rem] text-zero-lg",
      },
      cut: {
        end: "slab-cut-end",
        start: "slab-cut-start",
        both: "slab-cut-both",
        none: "slab-cut-none",
      },
    },
    defaultVariants: {
      size: "md",
      cut: "end",
    },
  },
);

type InputProps = Omit<InputPrimitive.Props, "size"> &
  VariantProps<typeof inputVariants> & {
    start?: ReactNode;
    end?: ReactNode;
  };

function Input({ className, size, cut, start, end, ...props }: InputProps) {
  return (
    <span
      data-slot="input"
      className={cn(inputVariants({ size, cut, className }))}
    >
      {start ? (
        <span
          data-slot="input-start"
          className="flex h-full shrink-0 items-center ps-(--input-px) text-zero-text-3"
        >
          {start}
        </span>
      ) : null}
      <InputPrimitive
        data-slot="input-control"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-(--input-px) outline-none",
          // inputs inherit neither colour nor size by default
          "font-semibold font-zero-text text-inherit [font-size:inherit] [line-height:inherit] caret-zero-accent",
          "placeholder:text-zero-text-3",
          "selection:bg-zero-accent selection:text-zero-ink",
          // keep the browser's autofill from painting over the well
          "autofill:shadow-[inset_0_0_0_10em_var(--color-zero-void)] autofill:[-webkit-text-fill-color:var(--color-zero-text)]",
        )}
        {...props}
      />
      {end ? (
        <span
          data-slot="input-end"
          className="flex h-full shrink-0 items-center gap-1 pe-(--input-px) text-zero-text-3"
        >
          {end}
        </span>
      ) : null}
    </span>
  );
}

/** A small button inside an Input's start or end: clear, show the password. Needs aria-label. */
function InputAction({ className, ...props }: ButtonPrimitive.Props) {
  return (
    <ButtonPrimitive
      data-slot="input-action"
      className={cn(
        "-mx-1 grid h-full place-items-center px-1 text-zero-text-2 outline-none",
        "hover:text-zero-accent focus-visible:text-zero-focus active:scale-(--zero-press-scale)",
        className,
      )}
      {...props}
    />
  );
}

export { Input, InputAction, type InputProps, inputVariants };
