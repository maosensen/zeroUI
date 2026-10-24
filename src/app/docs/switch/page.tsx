import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SwitchBasic from "../_demos/switch-basic";

export const metadata = pageMetadata("/docs/switch");

export default function SwitchPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/switch")} />
      <DocHeader
        title="Switch"
        lead="A slanted track with a slab inside it. Turned on, the track fills with the accent and the slab springs across to the other end, parallel to the track's cut at both."
      />
      <DocSection id="install" title="Install">
        <Install item="switch" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="switch-basic" title="On, off, and larger">
          <SwitchBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The slab slides on the release timing, past its stop and back. Sized
            in em: beside larger text the whole switch is larger.
          </p>
          <p>
            Use a Switch for something that takes effect at once (night routes
            on); use a Checkbox for a choice that is submitted with a form.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Switch"
          base={{
            name: "Switch.Root",
            href: "https://base-ui.com/react/components/switch",
          }}
          rows={[
            {
              name: "checked",
              type: "boolean",
              description: "On, controlled; with onCheckedChange.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: "On, uncontrolled.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
