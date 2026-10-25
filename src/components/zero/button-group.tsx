import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Buttons that belong together, set close and cut on both sides so their slanted edges nest, like
 * the tabs. Whatever cut each Button asks for, inside a group it is cut on both sides.
 * ButtonGroupText puts a label in the row: a black well, the same height as the buttons beside it.
 */

function ButtonGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would bring form semantics and its own box
    <div
      data-slot="button-group"
      role="group"
      className={cn(
        "flex w-fit flex-wrap items-center gap-1",
        "[&>.slab]:[--slab-ce:1] [&>.slab]:[--slab-cs:1]",
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="button-group-text"
      className={cn(
        "slab inline-flex items-center",
        "[--slab-h:var(--height-zero-md)] [--slab-px:0.875rem] [--slab-o:var(--zero-stroke-thin)] [--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-ink:var(--color-zero-text-2)]",
        "font-semibold font-zero-text text-zero-sm",
        className,
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupText };
