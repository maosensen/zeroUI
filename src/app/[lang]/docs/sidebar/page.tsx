import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SidebarApp from "../_demos/sidebar-app";
import SidebarVariants from "../_demos/sidebar-variants";

export const generateMetadata = metadataFor("/docs/sidebar");

export default async function SidebarPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/sidebar")} />
      <DocHeader
        title="Sidebar"
        lead="The column down the side of an app: a black, hatched strip whose rows are the Dropdown menu's, the current page filled with the accent."
      />
      <DocSection id="install">
        <Install item="sidebar" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="sidebar-app" title="An app's sidebar, folding to icons">
          <SidebarApp />
        </Demo>
        <Demo file="sidebar-variants" title="Against the edge, floating, inset">
          <SidebarVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            On a wide screen it folds away entirely (
            <code>collapsible="offcanvas"</code>) or down to a rail of icons (
            <code>"icon"</code>), where each row shows only its icon and names
            itself in a tooltip. On a phone it opens as a Sheet. SidebarTrigger,
            or ⌘B / Ctrl+B, opens and closes it.
          </p>
          <p>
            It fills the screen's height by default; to put it in a box, as in
            the example, give the provider a height and the sidebar{" "}
            <code>className="absolute h-full"</code>. useSidebar gives the open
            state to anything inside the provider.
          </p>
          <p>
            <code>variant</code> sets it against the edge (
            <code>"sidebar"</code>), as a panel standing a little off it (
            <code>"floating"</code>), or on the black ground with the page set
            in beside it as a panel (<code>"inset"</code>, with SidebarInset).
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="SidebarProvider"
          rows={[
            {
              name: "defaultOpen",
              type: "boolean",
              default: "true",
              description: "Open at first, uncontrolled.",
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open) => void",
              description: "Open, controlled.",
            },
          ]}
        />
        <PropsTable
          part="Sidebar"
          rows={[
            {
              name: "variant",
              type: '"sidebar" | "floating" | "inset"',
              default: '"sidebar"',
              description:
                "Against the edge, a panel off the edge, or the page set in as a panel.",
            },
            {
              name: "collapsible",
              type: '"offcanvas" | "icon" | "none"',
              default: '"offcanvas"',
              description: "What closing does on a wide screen.",
            },
            {
              name: "side",
              type: '"left" | "right"',
              default: '"left"',
              description: "The edge it sits on.",
            },
          ]}
        />
        <PropsTable
          part="SidebarMenuButton"
          rows={[
            {
              name: "isActive",
              type: "boolean",
              default: "false",
              description: "The page you are on: filled with the accent.",
            },
            {
              name: "tooltip",
              type: "string",
              description:
                "Names the row while the sidebar is folded to icons.",
            },
            {
              name: "render",
              type: "ReactElement",
              description: "The element to render as, such as a link.",
            },
          ]}
        />
        <PropsTable
          part="SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubButton, SidebarSeparator, SidebarTrigger, SidebarInset"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
