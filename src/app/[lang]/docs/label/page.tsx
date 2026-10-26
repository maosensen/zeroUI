import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import LabelBasic from "../_demos/label-basic";

export const generateMetadata = metadataFor("/docs/label");

export default async function LabelPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/label")} />
      <DocHeader
        title="Label"
        lead="A control's name outside a Field, in the Field label's leaning type."
      />
      <DocSection id="install">
        <Install item="label" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="label-basic" title="Beside a checkbox and a switch">
          <LabelBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Wrap the control in it, or point at it with <code>htmlFor</code>. It
            dims with a disabled control inside it. Inside a Field, use
            FieldLabel, which also follows focus and errors.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="Label" rows={[]} />
      </DocSection>
    </>
  );
}
