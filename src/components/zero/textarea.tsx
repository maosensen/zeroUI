import { Field as FieldPrimitive } from "@base-ui/react/field";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Several lines of text in the same sunken well as Input. Its height follows what is typed, and a
 * slab's cut follows from a known height, so — like a popup — it is a square-cornered box: a quiet
 * outline, the void for a fill, the text face, the accent for a caret. Inside a Field it is the
 * Field's control and takes its validation.
 */
function Textarea({
  className,
  ...props
}: Omit<FieldPrimitive.Control.Props, "render"> & ComponentProps<"textarea">) {
  return (
    <FieldPrimitive.Control
      data-slot="textarea"
      render={<textarea />}
      className={cn(
        "field-sizing-content block min-h-28 w-full min-w-0 resize-none px-4 py-3 outline-none",
        "border-(length:--zero-stroke) border-zero-line bg-zero-void",
        "font-semibold font-zero-text text-zero-md text-zero-text caret-zero-accent",
        "placeholder:text-zero-text-3 selection:bg-zero-accent selection:text-zero-ink",
        "hover:not-focus-visible:border-zero-text-3 focus-visible:border-zero-focus",
        "aria-invalid:border-zero-danger focus-visible:aria-invalid:border-zero-danger-hi",
        "disabled:pointer-events-none disabled:border-zero-ink disabled:bg-zero-raised disabled:text-zero-text-3",
        className,
      )}
      {...(props as FieldPrimitive.Control.Props)}
    />
  );
}

export { Textarea };
