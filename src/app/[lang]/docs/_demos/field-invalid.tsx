import { Field, FieldError, FieldLabel } from "@/components/zero/field";
import { Input } from "@/components/zero/input";

export default function FieldInvalid() {
  return (
    <Field invalid className="w-full max-w-xs">
      <FieldLabel>Drop point</FieldLabel>
      <Input defaultValue="Pier 0" />
      <FieldError match>That pier closed last season.</FieldError>
    </Field>
  );
}
