import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/zero/lib/utils";

/*
 * A text field as an inset well: a slab filled with the void, outlined quietly, sitting lower than
 * the ground around it. An <input> cannot carry the slab's ::before and ::after, so the slab is a
 * frame around it, and the input is laid over the whole frame: clicking anywhere on the slab
 * focuses it, while the text keeps the slab's padding.
 *
 * Focus draws the selection frame. An invalid value (inside a Field, or aria-invalid) turns the
 * outline to danger; focused and invalid, the gap opens in the danger frame.
 *
 * className styles the frame (width, margins); every other prop goes to the input.
 */
const inputVariants = cva(
  [
    "slab relative flex w-full min-w-0",
    "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-ink:var(--color-zero-text)]",
    "hover:not-has-focus-visible:[--slab-line:var(--color-zero-text-3)]",
    "has-focus-visible:[--slab-line:var(--color-zero-focus)] has-focus-visible:[--slab-gap:var(--zero-stroke-thin)] has-focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
    "has-aria-invalid:[--slab-line:var(--color-zero-danger)] has-aria-invalid:has-focus-visible:[--slab-line:var(--color-zero-danger-hi)]",
    "has-disabled:pointer-events-none has-disabled:[--slab-fill:var(--color-zero-raised)] has-disabled:[--slab-line:var(--color-zero-ink)] has-disabled:[--slab-ink:var(--color-zero-text-3)]",
  ],
  {
    variants: {
      size: {
        sm: "[--slab-h:var(--height-zero-sm)] [--slab-px:0.75rem] text-zero-sm",
        md: "[--slab-h:var(--height-zero-md)] [--slab-px:1rem] text-zero-md",
        lg: "[--slab-h:var(--height-zero-lg)] [--slab-px:1.25rem] text-zero-lg",
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
  VariantProps<typeof inputVariants>;

function Input({ className, size, cut, ...props }: InputProps) {
  return (
    <span
      data-slot="input"
      className={cn(inputVariants({ size, cut, className }))}
    >
      <InputPrimitive
        className={cn(
          "absolute inset-0 min-w-0 bg-transparent px-[inherit] outline-none",
          // inputs inherit neither colour nor size by default
          "font-semibold font-zero text-inherit [font-size:inherit] [line-height:inherit] caret-zero-accent",
          "placeholder:text-zero-text-3 placeholder:italic",
          "selection:bg-zero-accent selection:text-zero-ink",
          // keep the browser's autofill from painting over the well
          "autofill:shadow-[inset_0_0_0_10em_var(--color-zero-void)] autofill:[-webkit-text-fill-color:var(--color-zero-text)]",
        )}
        {...props}
      />
    </span>
  );
}

export { Input, type InputProps, inputVariants };
