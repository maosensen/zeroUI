"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/zero/field";
import {
  Fieldset,
  FieldsetLegend,
  Form,
  FormActions,
} from "@/components/zero/form";
import { Input } from "@/components/zero/input";
import { Textarea } from "@/components/zero/textarea";

export default function FormJob() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [posted, setPosted] = useState("");
  return (
    <Form
      className="w-full max-w-md"
      errors={errors}
      onFormSubmit={(values) => {
        // Stands in for the server: it rejects a reward under 500.
        if (Number(values.reward) < 500) {
          setErrors({ reward: "The dispatcher posts nothing under 500 cr." });
          return;
        }
        setErrors({});
        setPosted(String(values.title));
      }}
    >
      <Fieldset>
        <FieldsetLegend>Post a job</FieldsetLegend>
        <Field name="title">
          <FieldLabel>Title</FieldLabel>
          <Input required placeholder="Sealed crate" />
          <FieldError>Give the job a title.</FieldError>
        </Field>
        <Field
          name="reward"
          validate={(value) => (value ? null : "Name the reward.")}
        >
          <FieldLabel>Reward</FieldLabel>
          <Input type="number" inputMode="numeric" placeholder="3100" />
          <FieldDescription>In credits, paid on hand-in.</FieldDescription>
          {/* its own message, or the server's, from the form's errors */}
          <FieldError />
        </Field>
        <Field name="notes">
          <FieldLabel>Notes</FieldLabel>
          <Textarea placeholder="Anything the driver should know" />
        </Field>
      </Fieldset>
      <FormActions>
        <Button type="submit">Post it</Button>
        {posted ? (
          <span className="font-medium font-zero-text text-zero-sm text-zero-accent">
            Posted: {posted}
          </span>
        ) : null}
      </FormActions>
    </Form>
  );
}
