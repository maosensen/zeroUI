import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InputOTPCode from "../_demos/input-otp-code";

export const generateMetadata = metadataFor("/docs/input-otp");

export default async function InputOTPPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/input-otp")} />
      <DocHeader
        title="Input OTP"
        lead="A one-time code, a character to a cell: small slanted wells of Input's, each holding one tall leaning character."
      />
      <DocSection id="install">
        <Install item="input-otp" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="input-otp-code"
          title="Four characters, and six in two runs"
        >
          <InputOTPCode />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Typing moves to the next cell, Backspace moves back, and pasting
            fills the row. The cell being typed in draws the selection frame;
            inside an invalid Field the cells outline in danger. Digits only by
            default; <code>validationType</code> takes letters too.
          </p>
          <p>
            Without children, InputOTP draws <code>length</code> cells; with
            InputOTPSlot and InputOTPSeparator you can split them into runs.
            Name it with a FieldLabel inside a Field (or a label pointing at its
            id): the first cell takes that name, the others say which character
            they hold.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="InputOTP"
          base={{
            name: "OTPField.Root",
            href: "https://base-ui.com/react/components/otp-field",
          }}
          rows={[
            {
              name: "length",
              type: "number",
              description: "How many characters.",
            },
            {
              name: "validationType",
              type: '"numeric" | "alpha" | "alphanumeric" | "none"',
              default: '"numeric"',
              description: "What a cell accepts.",
            },
            {
              name: "onValueComplete",
              type: "(value) => void",
              description: "Called when every cell is filled.",
            },
          ]}
        />
        <PropsTable
          part="InputOTPSlot, InputOTPSeparator"
          base={{
            name: "OTPField.Input",
            href: "https://base-ui.com/react/components/otp-field",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
