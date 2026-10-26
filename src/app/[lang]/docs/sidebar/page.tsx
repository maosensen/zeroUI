import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "The column down the side of an app: a black, hatched strip whose rows are the Dropdown menu's, the current page filled with the accent.",
          zh: "沿应用一侧纵向排列的导航栏：黑底带斜线纹理，各行与 Dropdown menu 相同，当前页填充强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="sidebar" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="sidebar-app"
          title={pick({
            en: "An app's sidebar, folding to icons",
            zh: "可收起为图标栏的应用侧边栏",
          })}
        >
          <SidebarApp />
        </Demo>
        <Demo
          file="sidebar-variants"
          title={pick({
            en: "Against the edge, floating, inset",
            zh: "贴边、悬浮与内嵌",
          })}
        >
          <SidebarVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  On a wide screen it folds away entirely (
                  <code>collapsible="offcanvas"</code>) or down to a rail of
                  icons (<code>"icon"</code>), where each row shows only its
                  icon and names itself in a tooltip. On a phone it opens as a
                  Sheet. SidebarTrigger, or ⌘B / Ctrl+B, opens and closes it.
                </p>
                <p>
                  It fills the screen's height by default; to put it in a box,
                  as in the example, give the provider a height and the sidebar{" "}
                  <code>className="absolute h-full"</code>. useSidebar gives the
                  open state to anything inside the provider.
                </p>
                <p>
                  <code>variant</code> sets it against the edge (
                  <code>"sidebar"</code>), as a panel standing a little off it (
                  <code>"floating"</code>), or on the black ground with the page
                  set in beside it as a panel (<code>"inset"</code>, with
                  SidebarInset).
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  在宽屏上，可以完全收起（<code>collapsible="offcanvas"</code>
                  ），也可以收窄为一列图标（<code>"icon"</code>
                  ），此时每行只显示图标，名称改由 Tooltip 显示。在手机上以
                  Sheet 的形式打开。点击 SidebarTrigger 或按 ⌘B / Ctrl+B
                  可展开或收起。
                </p>
                <p>
                  默认占满屏幕高度。若要像示例那样置于一个容器中，需为 provider
                  设定高度，并为侧边栏添加{" "}
                  <code>className="absolute h-full"</code>。provider
                  内的任意组件都可以通过 useSidebar 读取展开状态。
                </p>
                <p>
                  <code>variant</code> 决定摆放方式：贴边（
                  <code>"sidebar"</code>）；作为与边缘稍有间距的面板（
                  <code>"floating"</code>
                  ）；或铺在黑色底色上，页面作为面板嵌在一旁（
                  <code>"inset"</code>，配合 SidebarInset 使用）。
                </p>
              </>
            ),
          })}
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
              description: pick({
                en: "Open at first, uncontrolled.",
                zh: "初始是否展开（非受控）。",
              }),
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open) => void",
              description: pick({
                en: "Open, controlled.",
                zh: "是否展开（受控）。",
              }),
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
              description: pick({
                en: "Against the edge, a panel off the edge, or the page set in as a panel.",
                zh: "贴边、与边缘留有间距的悬浮面板，或让页面作为面板内嵌。",
              }),
            },
            {
              name: "collapsible",
              type: '"offcanvas" | "icon" | "none"',
              default: '"offcanvas"',
              description: pick({
                en: "What closing does on a wide screen.",
                zh: "宽屏上收起时的表现。",
              }),
            },
            {
              name: "side",
              type: '"left" | "right"',
              default: '"left"',
              description: pick({
                en: "The edge it sits on.",
                zh: "停靠在哪一侧。",
              }),
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
              description: pick({
                en: "The page you are on: filled with the accent.",
                zh: "当前页：填充强调色。",
              }),
            },
            {
              name: "tooltip",
              type: "string",
              description: pick({
                en: "Names the row while the sidebar is folded to icons.",
                zh: "侧边栏收起为图标时，提示中显示的该行名称。",
              }),
            },
            {
              name: "render",
              type: "ReactElement",
              description: pick({
                en: "The element to render as, such as a link.",
                zh: "改为渲染的元素，例如链接。",
              }),
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
