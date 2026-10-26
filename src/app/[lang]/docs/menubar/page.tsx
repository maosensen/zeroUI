import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "The row of menus across the top of an application: a black bar of quiet slabs, each filled with the accent while its menu is open.",
          zh: "横贯应用顶部的一排菜单：黑色横条上排列着不填色的斜切块，菜单打开时，对应的斜切块填充强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="menubar" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="menubar-dispatch"
          title={pick({
            en: "Job, View, Help",
            zh: "Job、View、Help 三个菜单",
          })}
        >
          <MenubarDispatch />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Once one menu is open, moving along the bar opens the next;
                arrow keys move between menus. The menus are Dropdown menus,
                with their rows, submenus, checkbox and radio rows.
              </p>
            ),
            zh: (
              <p>
                打开一个菜单后，指针沿横条移动即可依次打开其他菜单；用方向键在各菜单间切换焦点。每个菜单都是
                Dropdown menu，包含菜单项、子菜单、复选与单选菜单项。
              </p>
            ),
          })}
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
              description: pick({
                en: "Which way the bar runs.",
                zh: "菜单栏的方向。",
              }),
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
