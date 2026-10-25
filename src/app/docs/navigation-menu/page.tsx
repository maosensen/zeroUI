import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import NavigationMenuSite from "../_demos/navigation-menu-site";

export const metadata = pageMetadata("/docs/navigation-menu");

export default function NavigationMenuPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/navigation-menu")} />
      <DocHeader
        title="Navigation menu"
        lead="A site's top navigation: a row of quiet slabs, some of which open a panel of links below them."
      />
      <DocSection id="install" title="Install">
        <Install item="navigation-menu" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="navigation-menu-site" title="Jobs, districts, a plain link">
          <NavigationMenuSite />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The panel is shared: moving from one menu to the next, it changes
            size and its contents slide across in the direction you moved. Each
            link inside is a block with a leaning title (put it in a{" "}
            <code>strong</code>) and a line of text.
          </p>
          <p>
            A plain link in the row takes{" "}
            <code>navigationMenuTriggerStyle</code>; the page you are on (
            <code>aria-current="page"</code>) fills with the accent.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "The open menu.",
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
