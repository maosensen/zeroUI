import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DirectionRtl from "../_demos/direction-rtl";

export const metadata = pageMetadata("/docs/direction");

export default function DirectionPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/direction")} />
      <DocHeader
        title="Direction"
        lead="Tells the components which way text runs, for right-to-left pages: Base UI's DirectionProvider, under zeroUI's name."
      />
      <DocSection id="install" title="Install">
        <Install item="direction" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="direction-rtl" title="Tabs, right to left">
          <DirectionRtl />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Arrow keys in menus, tabs, sliders and the like follow the
            direction, and popups line up from the right. Set <code>dir</code>{" "}
            on the page (or the element) as well.
          </p>
          <p>
            The slant does not mirror: every cut leans the same way in any
            language, since the lean belongs to the look, like the italic.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="DirectionProvider"
          base={{
            name: "DirectionProvider",
            href: "https://base-ui.com/react/components/direction-provider",
          }}
          rows={[
            {
              name: "direction",
              type: '"ltr" | "rtl"',
              default: '"ltr"',
              description: "Which way text runs inside it.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
