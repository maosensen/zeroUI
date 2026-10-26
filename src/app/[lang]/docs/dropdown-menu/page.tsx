import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DropdownMenuBasic from "../_demos/dropdown-menu-basic";

export const generateMetadata = metadataFor("/docs/dropdown-menu");

export default async function DropdownMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/dropdown-menu")} />
      <DocHeader
        title="Dropdown menu"
        lead={pick({
          en: "A list of actions in a panel that drops from its trigger. The rows are Select's: slabs cut at the end, filled with the accent while highlighted.",
          zh: "从触发器下方展开的面板，内含一列操作。各行与 Select 相同：末端斜切，高亮时填充强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="dropdown-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="dropdown-menu-basic"
          title={pick({
            en: "Actions, a toggle, a choice",
            zh: "操作、复选与单选",
          })}
        >
          <DropdownMenuBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Rows take an icon or a <code>DropdownMenuShortcut</code>; a
                  checkbox row shows a check, a radio row the small slanted mark
                  of a chosen Select row; <code>danger</code> turns a row red.
                </p>
                <p>
                  Arrow keys move the highlight, typing jumps to a row, Enter
                  activates it. A submenu (DropdownMenuSub, with its SubTrigger
                  and SubContent) opens beside its row, which stays raised while
                  it is open.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  行内可放图标或 <code>DropdownMenuShortcut</code>
                  。复选行选中时显示对勾，单选行显示与 Select
                  选中行相同的斜切小标记；<code>danger</code> 使该行变为红色。
                </p>
                <p>
                  按方向键移动高亮，输入字符可跳至匹配的行，按 Enter
                  执行该行的操作。子菜单（DropdownMenuSub 及其
                  SubTrigger、SubContent）在所属行旁打开，打开期间该行保持浮起色。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="DropdownMenuContent"
          base={{
            name: "Menu.Popup",
            href: "https://base-ui.com/react/components/menu",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: pick({
                en: "Where it opens from the trigger.",
                zh: "相对触发器的打开方向。",
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
          part="DropdownMenuItem"
          base={{
            name: "Menu.Item",
            href: "https://base-ui.com/react/components/menu",
          }}
          rows={[
            {
              name: "danger",
              type: "boolean",
              default: "false",
              description: pick({
                en: "A destructive action: red, and red when highlighted.",
                zh: "破坏性操作：显示为红色，高亮时同样为红色。",
              }),
            },
          ]}
        />
        <PropsTable
          part="DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent"
          base={{
            name: "Menu.CheckboxItem",
            href: "https://base-ui.com/react/components/menu",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
