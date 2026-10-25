import { Field, FieldDescription, FieldLabel } from "@/components/zero/field";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/zero/input-otp";

export default function InputOTPCode() {
  return (
    <div className="grid gap-8">
      <Field>
        <FieldLabel>Gate code</FieldLabel>
        <InputOTP length={4} validationType="alphanumeric" />
        <FieldDescription>
          Four characters, on the back of the crate.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Sign-off code</FieldLabel>
        <InputOTP length={6}>
          <InputOTPSlot />
          <InputOTPSlot aria-label="Character 2 of 6" />
          <InputOTPSlot aria-label="Character 3 of 6" />
          <InputOTPSeparator />
          <InputOTPSlot aria-label="Character 4 of 6" />
          <InputOTPSlot aria-label="Character 5 of 6" />
          <InputOTPSlot aria-label="Character 6 of 6" />
        </InputOTP>
      </Field>
    </div>
  );
}
