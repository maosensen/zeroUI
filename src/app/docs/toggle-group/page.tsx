import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToggleGroupDistricts from "../_demos/toggle-group-districts";

export const metadata = pageMetadata("/docs/toggle-group");

export default function ToggleGroupPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/toggle-group")} />
      <DocHeader
        title="Toggle group"
        lead="A row of toggles that share one value: each is a slab cut on both sides, so the row nests like the tabs."
      />
      <DocSection id="install" title="Install">
        <Install item="toggle-group" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="toggle-group-districts" title="One view, several districts">
          <ToggleGroupDistricts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Pick one, or several with <code>multiple</code>. Arrow keys move
            between items. Set the variant and size once on the group.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="ToggleGroup"
          base={{
            name: "ToggleGroup",
            href: "https://base-ui.com/react/components/toggle-group",
          }}
          rows={[
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: "Lets several items be on.",
            },
            {
              name: "value / defaultValue",
              type: "string[]",
              description: "The items that are on.",
            },
            {
              name: "variant, size",
              type: "Toggle's",
              description: "For every item.",
            },
          ]}
        />
        <PropsTable
          part="ToggleGroupItem"
          base={{
            name: "Toggle",
            href: "https://base-ui.com/react/components/toggle",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: "Its value in the group.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
