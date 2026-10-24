import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CheckboxBasic from "../_demos/checkbox-basic";

export const metadata = pageMetadata("/docs/checkbox");

export default function CheckboxPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/checkbox")} />
      <DocHeader
        title="Checkbox"
        lead="A small slab cut on both sides: a sunken well until it is checked, then filled with the accent and an ink check. It is sized in em, so it follows the label beside it."
      />
      <DocSection id="install" title="Install">
        <Install item="checkbox" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="checkbox-basic"
          title="Checked, unchecked, indeterminate, disabled"
        >
          <CheckboxBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Put it inside a <code>&lt;label&gt;</code> with its text, and the
            whole label toggles it. The check springs in on the release timing
            and leaves faster; pressing it shrinks it like a button.
          </p>
          <p>
            <code>indeterminate</code> shows a minus instead of the check, for a
            box that stands for several others. Keyboard focus draws the
            selection frame; inside an invalid Field, or with{" "}
            <code>aria-invalid</code>, the outline turns to danger.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Checkbox"
          base={{
            name: "Checkbox.Root",
            href: "https://base-ui.com/react/components/checkbox",
          }}
          rows={[
            {
              name: "checked",
              type: "boolean",
              description: "Checked, controlled; with onCheckedChange.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: "Checked, uncontrolled.",
            },
            {
              name: "indeterminate",
              type: "boolean",
              default: "false",
              description:
                "Shows a minus: some of what it stands for is checked.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
