import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TextareaField from "../_demos/textarea-field";

export const generateMetadata = metadataFor("/docs/textarea");

export default async function TextareaPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/textarea")} />
      <DocHeader
        title="Textarea"
        lead={pick({
          en: "Several lines of text in the same sunken well as Input. It grows with what is typed, so it is a square-cornered box rather than a slab.",
          zh: "多行文本输入框，与 Input 同为凹槽外观。高度随输入内容增长，因此采用直角方框，而非斜切块。",
        })}
      />
      <DocSection id="install">
        <Install item="textarea" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="textarea-field"
          title={pick({
            en: "In a Field, with a limit",
            zh: "置于 Field 中，限制字数",
          })}
        >
          <TextareaField />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The text is set in the text face, upright, with the accent for
                  a caret. Focus turns the outline yellow; an invalid value
                  turns it red.
                </p>
                <p>
                  Inside a Field it is the Field's control, so the label names
                  it and the Field's validation applies to it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  文字使用正文字体，不加斜体，光标为强调色。获得焦点时显示焦点框，值无效时描边变为危险色。
                </p>
                <p>
                  置于 Field 内时即为 Field 的控件：以标签作为可访问名称，并由
                  Field 负责校验。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Textarea"
          base={{
            name: "Field.Control",
            href: "https://base-ui.com/react/components/field",
          }}
          rows={[
            {
              name: "…",
              type: "textarea props",
              description: pick({
                en: "rows, placeholder, maxLength and the rest go to the textarea.",
                zh: "rows、placeholder、maxLength 等属性均传给 textarea 元素。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
