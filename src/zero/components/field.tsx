import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "@/zero/lib/utils";

/*
 * The parts around a control: label, description, error. Validation and the invalid state come
 * from Base UI's Field; an Input inside a Field is its control.
 */

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "font-bold font-zero text-zero-sm text-zero-text-2 italic",
        "data-focused:text-zero-text data-invalid:text-zero-danger data-disabled:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(
        "font-medium font-zero text-zero-text-2 text-zero-xs",
        className,
      )}
      {...props}
    />
  );
}

/** The message under an invalid field, led by a small slanted mark. Slides in, leaves faster. */
function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn(
        "flex items-center gap-2 font-bold font-zero text-zero-danger text-zero-xs italic",
        "before:h-[1em] before:w-[0.4em] before:shrink-0 before:-skew-x-(--zero-slant) before:bg-current",
        "transition-[opacity,translate] duration-(--zero-dur-base) ease-(--zero-ease-out)",
        "data-starting-style:-translate-y-1 data-starting-style:opacity-0",
        "data-ending-style:-translate-y-1 data-ending-style:opacity-0 data-ending-style:duration-(--zero-dur-fast) data-ending-style:ease-(--zero-ease-in)",
        className,
      )}
      {...props}
    />
  );
}

export { Field, FieldDescription, FieldError, FieldLabel };
