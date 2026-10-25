import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CollapsibleBasic from "../_demos/collapsible-basic";

export const metadata = pageMetadata("/docs/collapsible");

export default function CollapsiblePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/collapsible")} />
      <DocHeader
        title="Collapsible"
        lead="Something that opens and closes in place: the panel unfolds to its own height on the reveal timing and folds back faster."
      />
      <DocSection id="install" title="Install">
        <Install item="collapsible" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="collapsible-basic" title="Notes behind a button">
          <CollapsibleBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The trigger brings no look of its own; give it a Button through{" "}
            <code>render</code>. Under reduced motion the panel simply appears.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Collapsible"
          base={{
            name: "Collapsible.Root",
            href: "https://base-ui.com/react/components/collapsible",
          }}
          rows={[
            {
              name: "open / defaultOpen",
              type: "boolean",
              default: "false",
              description: "Open, controlled or not.",
            },
          ]}
        />
        <PropsTable
          part="CollapsibleTrigger, CollapsibleContent"
          base={{
            name: "Collapsible.Trigger",
            href: "https://base-ui.com/react/components/collapsible",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
