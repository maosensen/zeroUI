import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ButtonGroupActions from "../_demos/button-group-actions";

export const metadata = pageMetadata("/docs/button-group");

export default function ButtonGroupPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/button-group")} />
      <DocHeader
        title="Button group"
        lead="Buttons that belong together, set close and cut on both sides so their slanted edges nest, like the tabs."
      />
      <DocSection id="install" title="Install">
        <Install item="button-group" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="button-group-actions" title="Actions, and a pager">
          <ButtonGroupActions />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Whatever cut each Button asks for, inside a group it is cut on both
            sides. ButtonGroupText puts a label in the row as a black well the
            height of the buttons.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable part="ButtonGroup, ButtonGroupText" rows={[]} />
      </DocSection>
    </>
  );
}
