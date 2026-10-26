import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PopoverBasic from "../_demos/popover-basic";

export const generateMetadata = metadataFor("/docs/popover");

export default async function PopoverPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/popover")} />
      <DocHeader
        title="Popover"
        lead={pick({
          en: "A panel that opens beside its trigger and holds anything: a few lines of text, a small form. It grows out of the trigger and folds back faster.",
          zh: "在触发器旁打开的面板，可容纳任意内容，如几行文字或一个小表单。从触发器处展开，关闭时收回得更快。",
        })}
      />
      <DocSection id="install">
        <Install item="popover" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="popover-basic"
          title={pick({
            en: "A few lines beside the trigger",
            zh: "触发器旁的几行文字",
          })}
        >
          <PopoverBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It opens on click and closes on a click outside or Escape; focus
                moves into it. Use a Tooltip for a label, a Popover for anything
                you might read twice or act in.
              </p>
            ),
            zh: (
              <p>
                点击打开，点击外部或按 Esc
                关闭；打开后焦点移入面板。简短的标签用
                Tooltip；需要停下来阅读或在其中操作的内容用 Popover。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="PopoverContent"
          base={{
            name: "Popover.Popup",
            href: "https://base-ui.com/react/components/popover",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: pick({
                en: "Where it opens from the trigger.",
                zh: "相对触发器的打开方向。",
              }),
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: pick({
                en: "How it lines up with the trigger.",
                zh: "与触发器的对齐方式。",
              }),
            },
          ]}
        />
        <PropsTable
          part="PopoverTitle, PopoverDescription, PopoverClose"
          base={{
            name: "Popover.Title",
            href: "https://base-ui.com/react/components/popover",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
