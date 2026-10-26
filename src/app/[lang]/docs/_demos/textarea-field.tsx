"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/zero/field";
import { Textarea } from "@/components/zero/textarea";

export default function TextareaField() {
  return (
    <Field
      className="w-full max-w-md"
      validationMode="onChange"
      validate={(value) =>
        typeof value === "string" && value.length > 140
          ? "Keep it under 140 characters."
          : null
      }
    >
      <FieldLabel>Notes for the courier</FieldLabel>
      <Textarea placeholder="Where to leave it, who to ask for" />
      <FieldDescription>It grows as you write.</FieldDescription>
      <FieldError />
    </Field>
  );
}
