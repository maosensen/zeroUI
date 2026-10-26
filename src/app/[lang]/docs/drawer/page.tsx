import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DrawerRoute from "../_demos/drawer-route";

export const generateMetadata = metadataFor("/docs/drawer");

export default async function DrawerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/drawer")} />
      <DocHeader
        title="Drawer"
        lead="A panel that comes up from the bottom of the screen and can be dragged back down: the phone's sheet, with a slanted grip at its top."
      />
      <DocSection id="install">
        <Install item="drawer" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="drawer-route" title="From the bottom, and from the right">
          <DrawerRoute />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It follows the finger while it is swiped, the page behind lightening
            as it goes, and closes once dragged far or fast enough.{" "}
            <code>side</code> brings it in from another edge; Sheet does that
            without the swipe. Under reduced motion it only fades.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Drawer"
          rows={[
            {
              name: "side",
              type: '"bottom" | "top" | "left" | "right"',
              default: '"bottom"',
              description:
                "The edge it comes from, and the way it is swiped away.",
            },
          ]}
        />
        <PropsTable
          part="DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose"
          base={{
            name: "Drawer.Popup",
            href: "https://base-ui.com/react/components/drawer",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
