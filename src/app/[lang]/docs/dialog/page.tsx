import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DialogBasic from "../_demos/dialog-basic";

export const generateMetadata = metadataFor("/docs/dialog");

export default async function DialogPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/dialog")} />
      <DocHeader
        title="Dialog"
        lead={pick({
          en: "A panel over a dimmed page: a black header bar with the title, a body, and the actions. It opens out of its centre and folds back faster.",
          zh: "浮在变暗页面之上的面板，由黑色标题栏、正文与操作按钮组成。打开时从中心展开，关闭时收回得更快。",
        })}
      />
      <DocSection id="install">
        <Install item="dialog" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="dialog-basic"
          title={pick({
            en: "Confirm before taking a job",
            zh: "接受委托前的确认",
          })}
        >
          <DialogBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Focus moves into the dialog when it opens and back to the
                  trigger when it closes; Escape or a click on the dimmed page
                  closes it. Under reduced motion it only fades.
                </p>
                <p>
                  Give the trigger and the closing buttons zzzUI Buttons through{" "}
                  <code>render</code>, as in the example. The corner close
                  button is there by default;{" "}
                  <code>showClose=&#123;false&#125;</code> removes it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  打开时焦点移入对话框，关闭后回到触发器；按 Esc
                  或点击变暗的页面即可关闭。系统开启「减少动态效果」时仅保留淡入淡出。
                </p>
                <p>
                  触发器与关闭按钮可通过 <code>render</code> 换成 zzzUI 的
                  Button，写法见示例。标题栏角落默认带有关闭按钮，设置{" "}
                  <code>showClose=&#123;false&#125;</code> 即可隐藏。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="DialogContent"
          base={{
            name: "Dialog.Popup",
            href: "https://base-ui.com/react/components/dialog",
          }}
          rows={[
            {
              name: "showClose",
              type: "boolean",
              default: "true",
              description: pick({
                en: "The close button in the header's corner.",
                zh: "标题栏角落的关闭按钮。",
              }),
            },
            {
              name: "closeLabel",
              type: "string",
              default: '"Close"',
              description: pick({
                en: "The corner close button's name.",
                zh: "右上角关闭按钮的可访问名称。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Dialog"
          base={{
            name: "Dialog.Root",
            href: "https://base-ui.com/react/components/dialog",
          }}
          rows={[
            {
              name: "open",
              type: "boolean",
              description: pick({
                en: "Open, controlled; with onOpenChange.",
                zh: "是否打开（受控），配合 onOpenChange 使用。",
              }),
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Open, uncontrolled.",
                zh: "初始是否打开（非受控）。",
              }),
            },
          ]}
        />
        <PropsTable
          part="DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter"
          base={{
            name: "Dialog.Title",
            href: "https://base-ui.com/react/components/dialog",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
