import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ButtonGroupActions from "../_demos/button-group-actions";

export const generateMetadata = metadataFor("/docs/button-group");

export default async function ButtonGroupPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/button-group")} />
      <DocHeader
        title="Button group"
        lead="Buttons that belong together, set close and cut on both sides so their slanted edges nest, like the tabs."
      />
      <DocSection id="install">
        <Install item="button-group" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="button-group-actions" title="Actions, and a pager">
          <ButtonGroupActions />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Whatever cut each Button asks for, inside a group it is cut on both
            sides. ButtonGroupText puts a label in the row as a black well the
            height of the buttons.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="ButtonGroup, ButtonGroupText" rows={[]} />
      </DocSection>
    </>
  );
}
