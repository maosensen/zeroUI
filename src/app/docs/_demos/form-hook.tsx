"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/zero/button";
import { Field, FieldError, FieldLabel } from "@/components/zero/field";
import { Form, FormActions } from "@/components/zero/form";
import { Input } from "@/components/zero/input";

const schema = z.object({
  driver: z.string().min(2, "At least two letters."),
  code: z
    .string()
    .regex(/^[A-Z0-9]{4}$/, "Four letters or digits, in capitals."),
});

type Values = z.infer<typeof schema>;

export default function FormHook() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { driver: "", code: "" },
  });
  return (
    <Form
      className="w-full max-w-md"
      onSubmit={form.handleSubmit(() => form.reset())}
    >
      {(["driver", "code"] as const).map((name) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field name={name} invalid={fieldState.invalid}>
              <FieldLabel>
                {name === "driver" ? "Driver" : "Gate code"}
              </FieldLabel>
              <Input {...field} />
              <FieldError match={fieldState.invalid}>
                {fieldState.error?.message}
              </FieldError>
            </Field>
          )}
        />
      ))}
      <FormActions>
        <Button type="submit">Sign for it</Button>
      </FormActions>
    </Form>
  );
}
