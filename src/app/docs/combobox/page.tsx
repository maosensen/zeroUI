import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ComboboxDistrict from "../_demos/combobox-district";
import ComboboxDistricts from "../_demos/combobox-districts";

export const metadata = pageMetadata("/docs/combobox");

export default function ComboboxPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/combobox")} />
      <DocHeader
        title="Combobox"
        lead="A text field that suggests as you type: Input's well with a clear button and a chevron, over Select's panel and rows."
      />
      <DocSection id="install" title="Install">
        <Install item="combobox" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="combobox-district" title="Pick a district">
          <ComboboxDistrict />
        </Demo>
        <Demo file="combobox-districts" title="Several districts, as chips">
          <ComboboxDistricts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Typing filters the list; the highlighted row fills with the accent
            and the chosen one carries the slanted mark. Pass the items to
            Combobox and render each from ComboboxList's function child.
          </p>
          <p>
            With <code>multiple</code>, the chosen items sit in the field as
            small slabs (ComboboxChips, ComboboxChip, ComboboxChipsInput), each
            with a button that takes it out; the field wraps them, so it is
            Textarea's square well. Backspace at the start of the text takes out
            the last one.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "What to suggest; each item needs a label.",
            },
            {
              name: "value / onValueChange",
              type: "Item | null",
              description: "The chosen item, controlled.",
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
              description: "Input's heights.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: "Which edges are cut on the slant.",
            },
            {
              name: "showClear",
              type: "boolean",
              default: "true",
              description: "The clear button.",
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
