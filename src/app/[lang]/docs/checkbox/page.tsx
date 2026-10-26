import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CheckboxBasic from "../_demos/checkbox-basic";

export const generateMetadata = metadataFor("/docs/checkbox");

export default async function CheckboxPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/checkbox")} />
      <DocHeader
        title="Checkbox"
        lead={pick({
          en: "A small slab cut on both sides: a sunken well until it is checked, then filled with the accent and an ink check. It is sized in em, so it follows the label beside it.",
          zh: "两端带切角的小号方块：未勾选时为凹槽，勾选后填充强调色，显示墨黑勾号。尺寸以 em 为单位，随旁边标签的字号缩放。",
        })}
      />
      <DocSection id="install">
        <Install item="checkbox" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="checkbox-basic"
          title={pick({
            en: "Checked, unchecked, indeterminate, disabled",
            zh: "已勾选、未勾选、半选与禁用",
          })}
        >
          <CheckboxBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Put it inside a <code>&lt;label&gt;</code> with its text, and
                  the whole label toggles it. The check springs in on the
                  release timing and leaves faster; pressing it shrinks it like
                  a button.
                </p>
                <p>
                  <code>indeterminate</code> shows a minus instead of the check,
                  for a box that stands for several others. Keyboard focus draws
                  the selection frame; inside an invalid Field, or with{" "}
                  <code>aria-invalid</code>, the outline turns to danger.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  将其与文字一同放入 <code>&lt;label&gt;</code>
                  ，点击整个标签即可切换。勾号带回弹弹入，消失更快；按下时像按钮一样收缩。
                </p>
                <p>
                  <code>indeterminate</code>{" "}
                  以减号代替勾号，用于统领一组复选框的全选框。通过键盘聚焦时显示焦点框；位于无效的
                  Field 内或带有 <code>aria-invalid</code> 时，描边变为危险色。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Checkbox"
          base={{
            name: "Checkbox.Root",
            href: "https://base-ui.com/react/components/checkbox",
          }}
          rows={[
            {
              name: "checked",
              type: "boolean",
              description: pick({
                en: "Checked, controlled; with onCheckedChange.",
                zh: "是否勾选（受控），配合 onCheckedChange 使用。",
              }),
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Checked, uncontrolled.",
                zh: "默认是否勾选（非受控）。",
              }),
            },
            {
              name: "indeterminate",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Shows a minus: some of what it stands for is checked.",
                zh: "显示减号，表示所代表的选项中有一部分已勾选。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
