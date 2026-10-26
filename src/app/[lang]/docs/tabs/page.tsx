import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TabsBasic from "../_demos/tabs-basic";
import TabsHotkeys from "../_demos/tabs-hotkeys";
import TabsIcons from "../_demos/tabs-icons";
import TabsSizes from "../_demos/tabs-sizes";

export const generateMetadata = metadataFor("/docs/tabs");

const tabs = { href: "https://base-ui.com/react/components/tabs" };

export default async function TabsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/tabs")} />
      <DocHeader
        title="Tabs"
        lead="A track cut on the slant at both ends, and a slab of the accent that springs to the active tab. Every edge leans the same way, so at either end the slab sits parallel to the track."
      />
      <DocSection id="install">
        <Install item="tabs" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="tabs-basic" title="With panels">
          <TabsBasic />
        </Demo>
        <Demo file="tabs-sizes" title="Sizes">
          <TabsSizes />
        </Demo>
        <Demo file="tabs-icons" title="Icons, long labels, a disabled tab">
          <TabsIcons />
        </Demo>
        <Demo file="tabs-hotkeys" title="Hotkeys, as a game's shoulder buttons">
          <TabsHotkeys />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
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
            selection frame. Tabs are horizontal only. With <code>hotkeys</code>
            , two keys step back and forth from anywhere on the page, the way a
            game pages with its shoulder buttons. The keys are shown at the
            track&apos;s ends, but not on a touch screen, where there is no
            keyboard to press them and they would only take room from the tabs.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
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
          rows={[
            {
              name: "hotkeys",
              type: "[string, string]",
              description:
                "Two keys that step to the previous and next tab from anywhere outside a text field; shown at the track's ends.",
            },
          ]}
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
