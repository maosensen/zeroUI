import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DropdownMenuBasic from "../_demos/dropdown-menu-basic";

export const metadata = pageMetadata("/docs/dropdown-menu");

export default function DropdownMenuPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/dropdown-menu")} />
      <DocHeader
        title="Dropdown menu"
        lead="A list of actions in a panel that drops from its trigger. The rows are Select's: slabs cut at the end, filled with the accent while highlighted."
      />
      <DocSection id="install" title="Install">
        <Install item="dropdown-menu" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="dropdown-menu-basic" title="Actions, a toggle, a choice">
          <DropdownMenuBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Rows take an icon or a <code>DropdownMenuShortcut</code>; a checkbox
            row shows a check, a radio row the small slanted mark of a chosen
            Select row; <code>danger</code> turns a row red.
          </p>
          <p>
            Arrow keys move the highlight, typing jumps to a row, Enter
            activates it. A submenu (DropdownMenuSub, with its SubTrigger and
            SubContent) opens beside its row, which stays raised while it is
            open.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "Where it opens from the trigger.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: "How it lines up with the trigger.",
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
              description:
                "A destructive action: red, and red when highlighted.",
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
