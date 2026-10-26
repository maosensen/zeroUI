import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InputBasic from "../_demos/input-basic";
import InputSizes from "../_demos/input-sizes";
import InputSlots from "../_demos/input-slots";
import InputStates from "../_demos/input-states";

export const generateMetadata = metadataFor("/docs/input");

export default async function InputPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/input")} />
      <DocHeader
        title="Input"
        lead={pick({
          en: "A text field as an inset well: the void for a fill, a quiet outline, the accent for a caret. A click almost anywhere on the slab lands in it.",
          zh: "凹槽形态的文本输入框：纯黑填充、低对比度的描边、强调色光标。点击斜切块上几乎任何位置，都会聚焦到输入框。",
        })}
      />
      <DocSection id="install">
        <Install item="input" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="input-basic" title={pick({ en: "Basic", zh: "基础" })}>
          <InputBasic />
        </Demo>
        <Demo file="input-sizes" title={pick({ en: "Sizes", zh: "尺寸" })}>
          <InputSizes />
        </Demo>
        <Demo
          file="input-slots"
          title={pick({
            en: "An icon or an action at either end",
            zh: "两端的图标或操作按钮",
          })}
        >
          <InputSlots />
        </Demo>
        <Demo
          file="input-states"
          title={pick({ en: "Invalid and disabled", zh: "无效与禁用状态" })}
        >
          <InputStates />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Focus draws the selection frame, also while an{" "}
                  <code>InputAction</code> inside it has focus. An invalid value
                  turns the outline to danger: inside a{" "}
                  <Link href={link("/docs/field")}>Field</Link> that follows its
                  validation, outside one it follows <code>aria-invalid</code>.
                </p>
                <p>
                  <code>className</code> styles the frame (its width, its
                  margins); every other prop goes to the input itself.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  获得焦点时显示焦点框；焦点落在内部的 <code>InputAction</code>{" "}
                  上时同样如此。值无效时描边变为危险色：位于{" "}
                  <Link href={link("/docs/field")}>Field</Link> 内时以 Field
                  的校验结果为准，独立使用时以 <code>aria-invalid</code> 为准。
                </p>
                <p>
                  <code>className</code>{" "}
                  作用于外层容器（宽度、外边距）；其余属性均传给 input
                  元素本身。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Input"
          base={{
            name: "Input",
            href: "https://base-ui.com/react/components/input",
          }}
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "32, 40 or 52 px tall.",
                zh: "高 32、40 或 52 px。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges of the well are cut on the slant.",
                zh: "凹槽的斜切位置：末端、起始端、两端或不斜切。",
              }),
            },
            {
              name: "start",
              type: "ReactNode",
              description: pick({
                en: "Before the text: usually an icon. The input gives up its padding on that side.",
                zh: "文字前方的内容，通常是图标；输入框随之去掉该侧的内边距。",
              }),
            },
            {
              name: "end",
              type: "ReactNode",
              description: pick({
                en: "After the text: an icon or an InputAction (clear, show the password).",
                zh: "文字后方的内容：图标或 InputAction（清空、显示密码）。",
              }),
            },
          ]}
        />
        <PropsTable
          part="InputAction"
          base={{
            name: "Button",
            href: "https://base-ui.com/react/components/button",
          }}
          rows={[
            {
              name: "aria-label",
              type: "string",
              description: pick({
                en: "Required: the action holds only an icon, so this is its name.",
                zh: "必填。操作按钮仅含图标，需以此提供可访问名称。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
