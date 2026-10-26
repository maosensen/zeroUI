import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import NavigationMenuSite from "../_demos/navigation-menu-site";

export const generateMetadata = metadataFor("/docs/navigation-menu");

export default async function NavigationMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/navigation-menu")} />
      <DocHeader
        title="Navigation menu"
        lead={pick({
          en: "A site's top navigation: a row of quiet slabs, some of which open a panel of links below them.",
          zh: "网站的顶部导航：一排暗色的斜切块，其中一部分可在下方展开链接面板。",
        })}
      />
      <DocSection id="install">
        <Install item="navigation-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="navigation-menu-site"
          title={pick({
            en: "Jobs, districts, a plain link",
            zh: "委托、街区与一条普通链接",
          })}
        >
          <NavigationMenuSite />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The panel is shared: moving from one menu to the next, it
                  changes size and its contents slide across in the direction
                  you moved. Each link inside is a block with a leaning title
                  (put it in a <code>strong</code>) and a line of text.
                </p>
                <p>
                  A plain link in the row takes{" "}
                  <code>navigationMenuTriggerStyle</code>; the page you are on (
                  <code>aria-current="page"</code>) fills with the accent.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  各菜单共用同一个面板：从一个菜单移到下一个时，面板随之改变尺寸，内容沿移动方向滑过。面板内的每条链接自成一块，包含一行斜体标题（放在{" "}
                  <code>strong</code> 中）和一行说明文字。
                </p>
                <p>
                  导航栏中的普通链接使用 <code>navigationMenuTriggerStyle</code>
                  ；指向当前页的链接（<code>aria-current="page"</code>
                  ）填充强调色。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="NavigationMenu"
          base={{
            name: "NavigationMenu.Root",
            href: "https://base-ui.com/react/components/navigation-menu",
          }}
          rows={[
            {
              name: "value / defaultValue",
              type: "any",
              description: pick({
                en: "The open menu.",
                zh: "当前打开的菜单。",
              }),
            },
          ]}
        />
        <PropsTable
          part="NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink"
          base={{
            name: "NavigationMenu.Trigger",
            href: "https://base-ui.com/react/components/navigation-menu",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
