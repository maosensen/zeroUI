import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TabsBasic from "../_demos/tabs-basic";
import TabsIcons from "../_demos/tabs-icons";
import TabsSizes from "../_demos/tabs-sizes";

export const metadata = pageMetadata("/docs/tabs");

const tabs = { href: "https://base-ui.com/react/components/tabs" };

export default function TabsPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/tabs")} />
      <DocHeader
        title="Tabs"
        lead="A track cut on the slant at both ends, and a slab of the accent that springs to the active tab. Every edge leans the same way, so at either end the slab sits parallel to the track."
      />
      <DocSection id="install" title="Install">
        <Install item="tabs" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="tabs-basic" title="With panels">
          <TabsBasic />
        </Demo>
        <Demo file="tabs-sizes" title="Sizes">
          <TabsSizes />
        </Demo>
        <Demo file="tabs-icons" title="Icons, long labels, a disabled tab">
          <TabsIcons />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The slab springs to the new tab and settles in about a quarter of a
            second; under reduced motion it lands without travelling. While it
            slides, the part of each label over it turns dark and the rest stays
            light, so no label is ever dark on the dark track.
          </p>
          <p>
            Arrow keys move focus along the tabs; Enter or Space activates the
            focused one, which then fills itself straight away inside the
            selection frame. Tabs are horizontal only.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Tabs"
          base={{ name: "Tabs.Root", ...tabs }}
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description:
                "A tab is 32, 40 or 52 px tall; the track adds its outline and inset.",
            },
          ]}
        />
        <PropsTable
          part="TabsList"
          base={{ name: "Tabs.List", ...tabs }}
          rows={[]}
        />
        <PropsTable
          part="TabsTab"
          base={{ name: "Tabs.Tab", ...tabs }}
          rows={[
            {
              name: "value",
              type: "string",
              description: "Which panel this tab shows.",
            },
          ]}
        />
        <PropsTable
          part="TabsPanel"
          base={{ name: "Tabs.Panel", ...tabs }}
          rows={[
            {
              name: "value",
              type: "string",
              description: "The tab that shows this panel.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
