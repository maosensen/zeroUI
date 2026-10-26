import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ContextMenuJob from "../_demos/context-menu-job";

export const generateMetadata = metadataFor("/docs/context-menu");

export default async function ContextMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/context-menu")} />
      <DocHeader
        title="Context menu"
        lead={pick({
          en: "The Dropdown menu, opened where you right-click or long-press inside an area instead of from a button.",
          zh: "即 Dropdown menu，但不由按钮打开，而是在区域内右键单击或长按的位置弹出。",
        })}
      />
      <DocSection id="install">
        <Install item="context-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="context-menu-job"
          title={pick({ en: "Right-click a job", zh: "右键单击委托" })}
        >
          <ContextMenuJob />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Its rows, labels, separators, checkbox and radio rows and
                submenus are the Dropdown menu's own parts under ContextMenu
                names. A submenu opens beside its row, which stays raised while
                it is open.
              </p>
            ),
            zh: (
              <p>
                菜单项、标签、分隔线、复选与单选菜单项以及子菜单，都是 Dropdown
                menu 的同一套部件，仅改以 ContextMenu
                命名。子菜单在所属菜单项旁打开，打开期间该菜单项保持浮起色背景。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ContextMenuTrigger"
          base={{
            name: "ContextMenu.Trigger",
            href: "https://base-ui.com/react/components/context-menu",
          }}
          rows={[]}
        />
        <PropsTable
          part="ContextMenuContent"
          base={{
            name: "Menu.Popup",
            href: "https://base-ui.com/react/components/context-menu",
          }}
          rows={[]}
        />
        <PropsTable
          part="ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, …"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
