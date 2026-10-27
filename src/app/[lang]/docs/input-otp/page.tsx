import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A one-time code, a character to a cell: small slanted wells of Input's, each holding one tall leaning character.",
          zh: "一次性验证码输入，一格一个字符：每格是 Input 样式的小号斜切输入槽，字符以瘦高的斜体显示。",
        })}
      />
      <DocSection id="install">
        <Install item="input-otp" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="input-otp-code"
          title={pick({
            en: "Four characters, and six in two runs",
            zh: "四位，以及分两组的六位",
          })}
        >
          <InputOTPCode />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Typing moves to the next cell, Backspace moves back, and
                  pasting fills the row. The cell being typed in draws the
                  selection frame; inside an invalid Field the cells outline in
                  danger. Digits only by default; <code>validationType</code>{" "}
                  takes letters too.
                </p>
                <p>
                  Without children, InputOTP draws <code>length</code> cells;
                  with InputOTPSlot and InputOTPSeparator you can split them
                  into runs. Name it with a FieldLabel inside a Field (or a
                  label pointing at its id): the first cell takes that name, the
                  others say which character they hold.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  输入一个字符后，焦点移至下一格；按 Backspace
                  退回上一格；粘贴则一次填满整行。正在输入的格子显示焦点框；位于校验未通过的
                  Field 中时，各格改为危险色描边。默认仅接受数字，通过{" "}
                  <code>validationType</code> 也可接受字母。
                </p>
                <p>
                  不传子元素时，InputOTP 绘制 <code>length</code> 个格子；配合
                  InputOTPSlot 与 InputOTPSeparator 可将格子分组。通过 Field
                  中的 FieldLabel（或指向其 id 的
                  label）为它命名：第一格使用该名称，其余各格的可访问名称标明各自是第几个字符。
                </p>
              </>
            ),
          })}
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
              description: pick({ en: "How many characters.", zh: "字符数。" }),
            },
            {
              name: "validationType",
              type: '"numeric" | "alpha" | "alphanumeric" | "none"',
              default: '"numeric"',
              description: pick({
                en: "What a cell accepts.",
                zh: "每格接受的字符类型。",
              }),
            },
            {
              name: "onValueComplete",
              type: "(value) => void",
              description: pick({
                en: "Called when every cell is filled.",
                zh: "所有格子填满时调用。",
              }),
            },
            {
              name: "label",
              type: "(character: number, length: number) => string",
              default: '"Character {n} of {length}"',
              description: pick({
                en: "Each drawn cell's name, from its place (from 1) and the length.",
                zh: "每个自动绘制的格子的可访问名称，由序号（从 1 起）与总长度生成。",
              }),
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
