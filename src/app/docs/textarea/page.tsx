import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TextareaField from "../_demos/textarea-field";

export const metadata = pageMetadata("/docs/textarea");

export default function TextareaPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/textarea")} />
      <DocHeader
        title="Textarea"
        lead="Several lines of text in the same sunken well as Input. It grows with what is typed, so it is a square-cornered box rather than a slab."
      />
      <DocSection id="install" title="Install">
        <Install item="textarea" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="textarea-field" title="In a Field, with a limit">
          <TextareaField />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The text is set in the text face, upright, with the accent for a
            caret. Focus turns the outline yellow; an invalid value turns it
            red.
          </p>
          <p>
            Inside a Field it is the Field's control, so the label names it and
            the Field's validation applies to it.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Textarea"
          base={{
            name: "Field.Control",
            href: "https://base-ui.com/react/components/field",
          }}
          rows={[
            {
              name: "\u2026",
              type: "textarea props",
              description:
                "rows, placeholder, maxLength and the rest go to the textarea.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
