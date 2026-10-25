import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { Form as FormPrimitive } from "@base-ui/react/form";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * The frame around Fields. Form is Base UI's form: it collects every Field's value, runs their
 * validation on submit, and shows errors handed back from the server (`errors`, by field name) in
 * each Field's FieldError. Fieldset groups related Fields under a legend that leans, led by a
 * slanted sliver; disabling the fieldset disables everything in it. FormActions is the row of
 * buttons at the end.
 *
 * For react-hook-form, wire each control through its Controller and give the Field `invalid` and
 * the FieldError `match` from the field state (see the docs).
 */

function Form({ className, ...props }: FormPrimitive.Props) {
  return (
    <FormPrimitive
      data-slot="form"
      className={cn("grid gap-6", className)}
      {...props}
    />
  );
}

function Fieldset({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      className={cn("m-0 grid min-w-0 gap-4 border-0 p-0", className)}
      {...props}
    />
  );
}

function FieldsetLegend({
  className,
  children,
  ...props
}: FieldsetPrimitive.Legend.Props) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={cn(
        "mb-1 flex items-center gap-2.5 font-black font-zero text-zero-lg italic",
        "data-disabled:text-zero-text-3",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="h-[0.9em] w-[0.3em] shrink-0 -skew-x-(--zero-slant) bg-zero-accent in-data-disabled:bg-zero-text-3"
      />
      {children}
    </FieldsetPrimitive.Legend>
  );
}

function FormActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="form-actions"
      className={cn("flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend, Form, FormActions };
