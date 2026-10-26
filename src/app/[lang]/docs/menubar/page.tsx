import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MenubarDispatch from "../_demos/menubar-dispatch";

export const generateMetadata = metadataFor("/docs/menubar");

export default async function MenubarPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/menubar")} />
      <DocHeader
        title="Menubar"
        lead="The row of menus across the top of an application: a black bar of quiet slabs, each filled with the accent while its menu is open."
      />
      <DocSection id="install">
        <Install item="menubar" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="menubar-dispatch" title="Job, View, Help">
          <MenubarDispatch />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Once one menu is open, moving along the bar opens the next; arrow
            keys move between menus. The menus are Dropdown menus, with their
            rows, submenus, checkbox and radio rows.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Menubar"
          base={{
            name: "Menubar",
            href: "https://base-ui.com/react/components/menubar",
          }}
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Which way the bar runs.",
            },
          ]}
        />
        <PropsTable
          part="MenubarMenu, MenubarTrigger, MenubarContent"
          base={{
            name: "Menu.Root",
            href: "https://base-ui.com/react/components/menu",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
