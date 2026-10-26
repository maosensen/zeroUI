"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/zero/field";
import { Input } from "@/components/zero/input";

export default function FieldValidation() {
  return (
    <Field
      className="w-full max-w-xs"
      validationMode="onChange"
      validate={(value) =>
        typeof value === "string" && value.length > 0 && value.length < 3
          ? "At least three characters."
          : null
      }
    >
      <FieldLabel>Callsign</FieldLabel>
      <Input placeholder="Three or more characters" />
      <FieldDescription>Shown on every job you take.</FieldDescription>
      <FieldError />
    </Field>
  );
}
