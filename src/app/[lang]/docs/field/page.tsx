import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FieldInvalid from "../_demos/field-invalid";
import FieldValidation from "../_demos/field-validation";

export const generateMetadata = metadataFor("/docs/field");

const field = { href: "https://base-ui.com/react/components/field" };

export default async function FieldPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/field")} />
      <DocHeader
        title="Field"
        lead={pick({
          en: "The parts around a control: a label, a line of help, and an error that slides in under a small slanted mark. Validation is Base UI's.",
          zh: "控件周围的配套部分：标签、一行说明文字，以及带小斜切标记、滑入显示的错误信息。校验沿用 Base UI 的机制。",
        })}
      />
      <DocSection id="install">
        <Install item="field" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="field-validation"
          title={pick({ en: "Validating as you type", zh: "输入时校验" })}
        >
          <FieldValidation />
        </Demo>
        <Demo
          file="field-invalid"
          title={pick({ en: "Invalid from outside", zh: "由外部标记为无效" })}
        >
          <FieldInvalid />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  An <Link href={link("/docs/input")}>Input</Link> or a{" "}
                  <Link href={link("/docs/select")}>Select</Link> inside a Field
                  is its control: the label names it, and when the Field is
                  invalid its outline turns to danger along with the label.
                </p>
                <p>
                  The error slides in on the reveal timing (240 ms) and leaves
                  faster (140 ms). Give <code>FieldError</code>{" "}
                  <code>match</code> to show it whenever the field is invalid,
                  for validation done elsewhere.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  放在 Field 内的 <Link href={link("/docs/input")}>Input</Link>{" "}
                  或 <Link href={link("/docs/select")}>Select</Link> 即为该
                  Field 的控件：标签作为控件的可访问名称；Field
                  无效时，控件描边与标签一同变为危险色。
                </p>
                <p>
                  错误信息在 240 ms 内滑入，消失更快，只需 140
                  ms。校验在别处完成时，为 <code>FieldError</code> 设置{" "}
                  <code>match</code>，字段一旦无效即显示错误信息。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Field"
          base={{ name: "Field.Root", ...field }}
          rows={[
            {
              name: "validate",
              type: "(value) => string | string[] | null",
              description: pick({
                en: "Returns the error for a value, or null.",
                zh: "根据值返回错误信息，无错误时返回 null。",
              }),
            },
            {
              name: "validationMode",
              type: '"onSubmit" | "onBlur" | "onChange"',
              default: '"onSubmit"',
              description: pick({
                en: "When validate runs.",
                zh: "validate 的执行时机。",
              }),
            },
            {
              name: "invalid",
              type: "boolean",
              description: pick({
                en: "Marks the field invalid from outside.",
                zh: "从外部将字段标记为无效。",
              }),
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
              description: pick({
                en: "true shows the message whenever the field is invalid; a validity key shows it for that failure only.",
                zh: "为 true 时，字段无效即显示；传入 validity 键名时，仅在该项校验失败时显示。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
