import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AttachmentFiles from "../_demos/attachment-files";

export const generateMetadata = metadataFor("/docs/attachment");

export default async function AttachmentPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/attachment")} />
      <DocHeader
        title="Attachment"
        lead={pick({
          en: "A file sent or about to be sent: a mark, its name in leaning type, a line under it, and small actions.",
          zh: "已发送或待发送的文件：标识、斜体文件名、下方一行附注，以及几个小型操作按钮。",
        })}
      />
      <DocSection id="install">
        <Install item="attachment" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="attachment-files"
          title={pick({
            en: "Sent, uploading, failed, not sent yet",
            zh: "已发送、上传中、失败、未发送",
          })}
        >
          <AttachmentFiles />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The mark is an icon in a slanted black well, or the picture in
                  an ink frame. <code>state</code> tells where the file is: idle
                  (a dashed outline), uploading and processing (the picture
                  dimmed, the name quiet), error (outlined in red), done.
                </p>
                <p>
                  AttachmentTrigger makes the whole card open the file, under
                  its actions. AttachmentGroup lines several up in a row that
                  scrolls sideways.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  标识可以是黑色斜切凹槽中的图标，或带墨黑边框的图片。
                  <code>state</code>{" "}
                  表示文件所处的阶段：idle（虚线描边）、uploading 与
                  processing（图片变暗，文件名变淡）、error（红色描边）、done。
                </p>
                <p>
                  AttachmentTrigger
                  使整张卡片可点击以打开文件，其层级位于操作按钮之下。AttachmentGroup
                  将多个附件排成一行，可横向滚动。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Attachment"
          rows={[
            {
              name: "state",
              type: '"idle" | "uploading" | "processing" | "error" | "done"',
              default: '"done"',
              description: pick({
                en: "Where the file is.",
                zh: "文件所处的阶段。",
              }),
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: pick({
                en: "How much room around it.",
                zh: "内边距大小。",
              }),
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pick({
                en: "Mark beside the name, or above it.",
                zh: "标识位于文件名旁边，或上方。",
              }),
            },
          ]}
        />
        <PropsTable
          part="AttachmentMedia"
          rows={[
            {
              name: "variant",
              type: '"icon" | "image"',
              default: '"icon"',
              description: pick({
                en: "An icon in a slanted well, or a framed picture.",
                zh: "斜切凹槽中的图标，或带边框的图片。",
              }),
            },
          ]}
        />
        <PropsTable
          part="AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger, AttachmentGroup"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
