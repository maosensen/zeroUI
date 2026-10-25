import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CommandPalette from "../_demos/command-palette";

export const metadata = pageMetadata("/docs/command");

export default function CommandPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/command")} />
      <DocHeader
        title="Command"
        lead="A search box over a list of actions, always open: type to narrow it, arrows to move, Enter to run. CommandDialog floats it over the dimmed page."
      />
      <DocSection id="install" title="Install">
        <Install item="command" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="command-palette" title="Inline, and as a ⌘K palette">
          <CommandPalette />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The first match is always highlighted, so Enter runs it. The search
            sits on a black bar; the rows are the Dropdown menu's, filled with
            the accent while highlighted. Pass the items, or groups of items, to
            Command and render them from CommandList's function child; an item's{" "}
            <code>label</code> is what typing matches.
          </p>
          <p>
            It is built on Base UI's Autocomplete, so it needs no other library.
            The ⌘K shortcut is yours to wire, as in the example.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Command"
          base={{
            name: "Autocomplete.Root",
            href: "https://base-ui.com/react/components/autocomplete",
          }}
          rows={[
            {
              name: "items",
              type: "Item[] | Group[]",
              description: "What to list; each item needs a label.",
            },
            {
              name: "filter",
              type: "(item, query) => boolean",
              description: "Replaces the built-in matching.",
            },
          ]}
        />
        <PropsTable
          part="CommandDialog"
          rows={[
            {
              name: "open / onOpenChange",
              type: "boolean / (open) => void",
              description: "Open, controlled.",
            },
            {
              name: "title",
              type: "string",
              default: '"Command palette"',
              description: "The dialog's accessible name.",
            },
          ]}
        />
        <PropsTable
          part="CommandInput, CommandList, CommandEmpty, CommandGroup, CommandGroupLabel, CommandCollection, CommandItem, CommandSeparator, CommandShortcut"
          base={{
            name: "Autocomplete.Input",
            href: "https://base-ui.com/react/components/autocomplete",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
