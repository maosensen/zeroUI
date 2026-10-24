import type { Metadata } from "next";
import Link from "next/link";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FieldInvalid from "../_demos/field-invalid";
import FieldValidation from "../_demos/field-validation";

export const metadata: Metadata = {
  title: "Field",
  description:
    "Label, description and error around a control, with Base UI's validation.",
};

const field = { href: "https://base-ui.com/react/components/field" };

export default function FieldPage() {
  return (
    <>
      <DocHeader
        title="Field"
        lead="The parts around a control: a label, a line of help, and an error that slides in under a small slanted mark. Validation is Base UI's."
      />
      <DocSection id="install" title="Install">
        <Install item="field" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="field-validation" title="Validating as you type">
          <FieldValidation />
        </Demo>
        <Demo file="field-invalid" title="Invalid from outside">
          <FieldInvalid />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            An <Link href="/docs/input">Input</Link> or a{" "}
            <Link href="/docs/select">Select</Link> inside a Field is its
            control: the label names it, and when the Field is invalid its
            outline turns to danger along with the label.
          </p>
          <p>
            The error slides in on the reveal timing (240 ms) and leaves faster
            (140 ms). Give <code>FieldError</code> <code>match</code> to show it
            whenever the field is invalid, for validation done elsewhere.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Field"
          base={{ name: "Field.Root", ...field }}
          rows={[
            {
              name: "validate",
              type: "(value) => string | string[] | null",
              description: "Returns the error for a value, or null.",
            },
            {
              name: "validationMode",
              type: '"onSubmit" | "onBlur" | "onChange"',
              default: '"onSubmit"',
              description: "When validate runs.",
            },
            {
              name: "invalid",
              type: "boolean",
              description: "Marks the field invalid from outside.",
            },
          ]}
        />
        <PropsTable
          part="FieldLabel"
          base={{ name: "Field.Label", ...field }}
          rows={[]}
        />
        <PropsTable
          part="FieldDescription"
          base={{ name: "Field.Description", ...field }}
          rows={[]}
        />
        <PropsTable
          part="FieldError"
          base={{ name: "Field.Error", ...field }}
          rows={[
            {
              name: "match",
              type: "boolean | keyof ValidityState",
              description:
                "true shows the message whenever the field is invalid; a validity key shows it for that failure only.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
