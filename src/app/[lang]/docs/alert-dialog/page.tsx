import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AlertDialogAbandon from "../_demos/alert-dialog-abandon";

export const generateMetadata = metadataFor("/docs/alert-dialog");

export default async function AlertDialogPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/alert-dialog")} />
      <DocHeader
        title="Alert dialog"
        lead={pick({
          en: "A Dialog that asks before something that cannot be undone, and waits for an answer.",
          zh: "在执行无法撤销的操作前弹出的 Dialog：先请求确认，得到答复后才关闭。",
        })}
      />
      <DocSection id="install">
        <Install item="alert-dialog" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="alert-dialog-abandon"
          title={pick({
            en: "Before abandoning a job",
            zh: "放弃委托前的确认",
          })}
        >
          <AlertDialogAbandon />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  It has no close button in the corner, and a click on the
                  dimmed page does not dismiss it: only the answers do, or
                  Escape. Focus starts inside it and returns to the trigger.
                </p>
                <p>
                  The header, title, body and footer are the Dialog's.
                  AlertDialogCancel is a raised button; AlertDialogAction is in
                  the accent, or in red with <code>variant="danger"</code>. Both
                  close it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  角落没有关闭按钮，点击变暗的页面也不会关闭：只能点击底栏的按钮或按
                  Esc 关闭。打开时焦点位于对话框内，关闭后回到触发器。
                </p>
                <p>
                  标题栏、标题、正文与底栏直接沿用 Dialog
                  的对应部分。AlertDialogCancel 是浮起色按钮；AlertDialogAction
                  使用强调色，设置 <code>variant="danger"</code>{" "}
                  时为红色。两者点击后都会关闭对话框。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="AlertDialogContent"
          base={{
            name: "AlertDialog.Popup",
            href: "https://base-ui.com/react/components/alert-dialog",
          }}
          rows={[]}
        />
        <PropsTable
          part="AlertDialogAction, AlertDialogCancel"
          rows={[
            {
              name: "variant",
              type: "Button's",
              default: '"primary" / "secondary"',
              description: pick({
                en: "The button's look; both close the dialog.",
                zh: "按钮的外观；两者都会关闭对话框。",
              }),
            },
          ]}
        />
        <PropsTable
          part="AlertDialog, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogBody, AlertDialogFooter"
          base={{
            name: "AlertDialog.Root",
            href: "https://base-ui.com/react/components/alert-dialog",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
