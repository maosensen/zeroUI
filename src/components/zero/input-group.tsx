import { Input as InputPrimitive } from "@base-ui/react/input";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Button } from "@/components/zero/button";
import { inputVariants } from "@/components/zero/input";
import { cn } from "@/lib/zero/cn";

/*
 * Input's well, taken apart: put an InputGroupInput in it and addons at either end, text, icons
 * or small buttons, in any number. The well behaves like Input's, focus frame, invalid outline and
 * all; an end that holds an addon takes the input's padding. For a single icon or action, Input's
 * own `start` and `end` are shorter.
 *
 *   <InputGroup>
 *     <InputGroupAddon><InputGroupText>cr</InputGroupText></InputGroupAddon>
 *     <InputGroupInput placeholder="Reward" />
 *     <InputGroupAddon align="end"><InputGroupButton>Max</InputGroupButton></InputGroupAddon>
 *   </InputGroup>
 */

function InputGroup({
  className,
  size,
  cut,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof inputVariants>) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would bring form semantics and its own box
    <div
      data-slot="input"
      role="group"
      className={cn(inputVariants({ size, cut }), className)}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      data-slot="input-control"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-(--input-px) outline-none",
        "font-semibold font-zero-text text-inherit [font-size:inherit] [line-height:inherit] caret-zero-accent",
        "placeholder:text-zero-text-3 selection:bg-zero-accent selection:text-zero-ink",
        "autofill:shadow-[inset_0_0_0_10em_var(--color-zero-void)] autofill:[-webkit-text-fill-color:var(--color-zero-text)]",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = "start",
  ...props
}: ComponentProps<"span"> & { align?: "start" | "end" }) {
  return (
    <span
      data-slot={align === "start" ? "input-start" : "input-end"}
      className={cn(
        "flex h-full shrink-0 items-center gap-1.5 text-zero-text-3",
        align === "start"
          ? "order-first ps-(--input-px)"
          : "order-last pe-(--input-px)",
        "[&_svg]:size-[1.1em]",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "font-semibold font-zero-text text-zero-text-3 [font-size:0.875em]",
        className,
      )}
      {...props}
    />
  );
}

/** A small button inside the well: a ghost slab cut on both sides, a step shorter than the well. */
function InputGroupButton({
  className,
  variant = "ghost",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="input-group-button"
      variant={variant}
      cut="both"
      className={cn(
        "-me-1 [--slab-h:calc(100%-0.5rem)] [--slab-px:0.5rem] text-[0.875em]",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
};
