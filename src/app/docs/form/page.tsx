import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FormHook from "../_demos/form-hook";
import FormJob from "../_demos/form-job";

export const metadata = pageMetadata("/docs/form");

export default function FormPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/form")} />
      <DocHeader
        title="Form"
        lead="The frame around Fields: Base UI's form, which validates every Field on submit and shows errors handed back from the server, with fieldsets under leaning legends."
      />
      <DocSection id="install" title="Install">
        <Install item="form" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="form-job" title="Post a job, with an error from the server">
          <FormJob />
        </Demo>
        <Demo file="form-hook" title="With react-hook-form and zod">
          <FormHook />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Form collects every Field's value and runs their validation on
            submit; <code>errors</code>, keyed by each Field's <code>name</code>
            , puts a server's messages in the Fields' FieldError. Fieldset
            groups Fields under a legend led by a slanted sliver; disabling it
            disables everything inside. FormActions is the row of buttons at the
            end.
          </p>
          <p>
            With react-hook-form, wire each control through its Controller and
            give the Field <code>invalid</code> and the FieldError{" "}
            <code>match</code> from the field's state, as in the second example.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Form"
          base={{
            name: "Form",
            href: "https://base-ui.com/react/components/form",
          }}
          rows={[
            {
              name: "errors",
              type: "Record<string, string | string[]>",
              description: "Messages from the server, by field name.",
            },
            {
              name: "onFormSubmit",
              type: "(values) => void",
              description:
                "Called with every Field's value once they are all valid.",
            },
          ]}
        />
        <PropsTable
          part="Fieldset, FieldsetLegend"
          base={{
            name: "Fieldset.Root",
            href: "https://base-ui.com/react/components/fieldset",
          }}
          rows={[
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables every control inside.",
            },
          ]}
        />
        <PropsTable part="FormActions" rows={[]} />
      </DocSection>
    </>
  );
}
