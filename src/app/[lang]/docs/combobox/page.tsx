import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ComboboxDistrict from "../_demos/combobox-district";
import ComboboxDistricts from "../_demos/combobox-districts";

export const generateMetadata = metadataFor("/docs/combobox");

export default async function ComboboxPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/combobox")} />
      <DocHeader
        title="Combobox"
        lead={pick({
          en: "A text field that suggests as you type: Input's well with a clear button and a chevron, over Select's panel and rows.",
          zh: "输入时给出建议的文本框：沿用 Input 的输入框，带清除按钮与下拉箭头；下方弹出的面板与选项行沿用 Select。",
        })}
      />
      <DocSection id="install">
        <Install item="combobox" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="combobox-district"
          title={pick({ en: "Pick a district", zh: "选择街区" })}
        >
          <ComboboxDistrict />
        </Demo>
        <Demo
          file="combobox-districts"
          title={pick({
            en: "Several districts, as chips",
            zh: "多选街区，以斜切块呈现",
          })}
        >
          <ComboboxDistricts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Typing filters the list; the highlighted row fills with the
                  accent and the chosen one carries the slanted mark. Pass the
                  items to Combobox and render each from ComboboxList's function
                  child.
                </p>
                <p>
                  With <code>multiple</code>, the chosen items sit in the field
                  as small slabs (ComboboxChips, ComboboxChip,
                  ComboboxChipsInput), each with a button that takes it out; the
                  field wraps them, so it is Textarea's square well. Backspace
                  at the start of the text takes out the last one.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  输入文字即筛选列表；高亮行填充强调色，已选项带斜切标记。将条目传给
                  Combobox，并在 ComboboxList 的函数子元素中逐项渲染。
                </p>
                <p>
                  设置 <code>multiple</code>{" "}
                  后，已选项以小号斜切块显示在输入框内（ComboboxChips、ComboboxChip、ComboboxChipsInput），每块带一个移除按钮。输入框内的斜切块会自动换行，因此输入框采用
                  Textarea 的直角样式。光标位于文字开头时按
                  Backspace，可移除最后一项。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Combobox"
          base={{
            name: "Combobox.Root",
            href: "https://base-ui.com/react/components/combobox",
          }}
          rows={[
            {
              name: "items",
              type: "Item[]",
              description: pick({
                en: "What to suggest; each item needs a label.",
                zh: "可供建议的条目，每项都需要 label。",
              }),
            },
            {
              name: "value / onValueChange",
              type: "Item | null",
              description: pick({
                en: "The chosen item, controlled.",
                zh: "已选项，受控。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ComboboxInput"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "Input's heights.",
                zh: "与 Input 相同的高度。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges are cut on the slant.",
                zh: "斜切位置：末端、起始端、两端或不斜切。",
              }),
            },
            {
              name: "showClear",
              type: "boolean",
              default: "true",
              description: pick({
                en: "The clear button.",
                zh: "是否显示清除按钮。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput"
          base={{
            name: "Combobox.Popup",
            href: "https://base-ui.com/react/components/combobox",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
