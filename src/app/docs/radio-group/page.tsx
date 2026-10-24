import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RadioGroupBasic from "../_demos/radio-group-basic";

export const metadata = pageMetadata("/docs/radio-group");

export default function RadioGroupPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/radio-group")} />
      <DocHeader
        title="Radio group"
        lead="One choice of several. Each radio is the same small slanted well as a checkbox; the chosen one holds a slab of the accent, nested inside it like the Tabs slab in its track."
      />
      <DocSection id="install" title="Install">
        <Install item="radio-group" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="radio-group-basic" title="One shift of three">
          <RadioGroupBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            A checkbox fills, a radio holds a slab, so the two never read alike.
            The slab springs in on the release timing.
          </p>
          <p>
            Arrow keys move the choice within the group. Wrap each radio in a{" "}
            <code>&lt;label&gt;</code> with its text.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="RadioGroup"
          base={{
            name: "RadioGroup",
            href: "https://base-ui.com/react/components/radio",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: "The chosen value, controlled; with onValueChange.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "The chosen value, uncontrolled.",
            },
          ]}
        />
        <PropsTable
          part="RadioGroupItem"
          base={{
            name: "Radio.Root",
            href: "https://base-ui.com/react/components/radio",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: "The value this radio stands for.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
