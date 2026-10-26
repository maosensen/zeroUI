import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SelectBasic from "../_demos/select-basic";
import SelectField from "../_demos/select-field";
import SelectGroups from "../_demos/select-groups";

export const generateMetadata = metadataFor("/docs/select");

const select = { href: "https://base-ui.com/react/components/select" };

export default async function SelectPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/select")} />
      <DocHeader
        title="Select"
        lead={pick({
          en: "The trigger is the same inset well as Input. The list drops from it in a square box lifted by a double outline; the highlighted row fills with the accent.",
          zh: "触发器与 Input 同为凹槽外观。列表从触发器下方展开，为直角方框，外围双层描边，呈浮起效果；高亮的一行以强调色填充。",
        })}
      />
      <DocSection id="install">
        <Install item="select" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="select-basic" title={pick({ en: "Basic", zh: "基础" })}>
          <SelectBasic />
        </Demo>
        <Demo
          file="select-groups"
          title={pick({
            en: "Groups, a separator, a disabled row",
            zh: "分组、分隔线与禁用项",
          })}
        >
          <SelectGroups />
        </Demo>
        <Demo
          file="select-field"
          title={pick({ en: "In a Field", zh: "置于 Field 中" })}
        >
          <SelectField />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The popup grows out of the trigger in 240 ms and folds away in
                  140 ms. It always drops below (or above, if there is no room)
                  rather than laying the chosen row over the trigger, so a long
                  list scrolls inside it.
                </p>
                <p>
                  Pass <code>items</code> to <code>Select</code> (value to
                  label) so the trigger can show the chosen label before the
                  list has ever opened.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  弹出层在 240 ms 内从触发器展开，在 140 ms
                  内收起。弹出层总是出现在触发器下方（空间不足时在上方），不会让已选项与触发器重叠对齐。因此列表较长时，在弹出层内部滚动。
                </p>
                <p>
                  向 <code>Select</code> 传入 <code>items</code>
                  （值到标签的映射），这样即使列表从未打开，触发器也能显示已选项的标签。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Select"
          base={{ name: "Select.Root", ...select }}
          rows={[
            {
              name: "items",
              type: "Record<string, ReactNode>",
              description: pick({
                en: "Labels by value, for the trigger.",
                zh: "按值索引的标签，供触发器显示。",
              }),
            },
          ]}
        />
        <PropsTable
          part="SelectTrigger"
          base={{ name: "Select.Trigger", ...select }}
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
          ]}
        />
        <PropsTable
          part="SelectValue"
          base={{ name: "Select.Value", ...select }}
          rows={[
            {
              name: "placeholder",
              type: "ReactNode",
              description: pick({
                en: "Shown, in italic grey, until something is chosen.",
                zh: "尚未选择时显示，灰色斜体。",
              }),
            },
          ]}
        />
        <PropsTable
          part="SelectContent"
          base={{ name: "Select.Popup", ...select }}
          rows={[
            {
              name: "side",
              type: '"bottom" | "top" | "left" | "right"',
              default: '"bottom"',
              description: pick({
                en: "Where the popup opens from the trigger.",
                zh: "弹出层相对触发器的展开方向。",
              }),
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: pick({
                en: "How it lines up with the trigger.",
                zh: "与触发器的对齐方式。",
              }),
            },
          ]}
        />
        <PropsTable
          part="SelectItem"
          base={{ name: "Select.Item", ...select }}
          rows={[]}
        />
        <PropsTable
          part="SelectGroup, SelectLabel, SelectSeparator"
          base={{ name: "Select.Group", ...select }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
