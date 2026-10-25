import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A control's name, outside a Field: the Field label's leaning type, quiet until its control is
 * disabled. Inside a Field, use FieldLabel, which also follows focus and errors.
 */
function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control is passed in by the caller (htmlFor or children)
    <label
      data-slot="label"
      className={cn(
        "inline-flex items-center gap-2 font-bold font-zero text-zero-sm text-zero-text-2 italic select-none",
        "has-disabled:text-zero-text-3 peer-disabled:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
