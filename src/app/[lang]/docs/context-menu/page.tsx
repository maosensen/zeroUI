import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="The Dropdown menu, opened where you right-click or long-press inside an area instead of from a button."
      />
      <DocSection id="install">
        <Install item="context-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="context-menu-job" title="Right-click a job">
          <ContextMenuJob />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Its rows, labels, separators, checkbox and radio rows and submenus
            are the Dropdown menu's own parts under ContextMenu names. A submenu
            opens beside its row, which stays raised while it is open.
          </p>
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
          part="ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, \u2026"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
