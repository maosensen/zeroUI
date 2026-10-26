import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AlertTones from "../_demos/alert-tones";

export const generateMetadata = metadataFor("/docs/alert");

export default async function AlertPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/alert")} />
      <DocHeader
        title="Alert"
        lead={pick({
          en: "A message set into the page: a square-cornered box with its start edge in the message's tone, and the tone's badge as its mark.",
          zh: "嵌在页面中的提示信息：直角方框，起始侧（通常为左侧）的边线显示消息的色调，并以该色调的徽标作为标记。",
        })}
      />
      <DocSection id="install">
        <Install item="alert" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="alert-tones"
          title={pick({ en: "Four tones", zh: "四种色调" })}
        >
          <AlertTones />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The four tones reuse colours zzzUI already has: quiet grey for
                  information, the accent for something done, the selection
                  yellow for a warning, the danger red. Each has its own badge
                  (info, done, alert), so the tone never rests on colour alone.
                </p>
                <p>
                  An alert is static: it is not announced when it appears. For a
                  message that comes and goes, use a Toast.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  四种色调沿用 zzzUI
                  已有的颜色：信息用暗灰色，成功用强调色，警告用焦点框的黄色，危险用红色。每种色调都配有徽标（信息、完成、警示），不单靠颜色区分。
                </p>
                <p>
                  Alert
                  是静态的，出现时不会通知读屏软件。出现后会自行消失的消息，应使用
                  Toast。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Alert"
          rows={[
            {
              name: "variant",
              type: '"info" | "success" | "warning" | "danger"',
              default: '"info"',
              description: pick({
                en: "The tone: the edge, the badge and its colour.",
                zh: "色调，决定边线、徽标及其颜色。",
              }),
            },
            {
              name: "icon",
              type: "ReactNode",
              description: pick({
                en: "Replaces the tone's badge; null leaves the mark out.",
                zh: "替换色调自带的徽标；设为 null 时不显示标记。",
              }),
            },
          ]}
        />
        <PropsTable part="AlertTitle, AlertDescription" rows={[]} />
      </DocSection>
    </>
  );
}
