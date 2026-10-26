import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="A file sent or about to be sent: a mark, its name in leaning type, a line under it, and small actions."
      />
      <DocSection id="install">
        <Install item="attachment" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="attachment-files"
          title="Sent, uploading, failed, not sent yet"
        >
          <AttachmentFiles />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The mark is an icon in a slanted black well, or the picture in an
            ink frame. <code>state</code> tells where the file is: idle (a
            dashed outline), uploading and processing (the picture dimmed, the
            name quiet), error (outlined in red), done.
          </p>
          <p>
            AttachmentTrigger makes the whole card open the file, under its
            actions. AttachmentGroup lines several up in a row that scrolls
            sideways.
          </p>
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
              description: "Where the file is.",
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: "How much room around it.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Mark beside the name, or above it.",
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
              description: "An icon in a slanted well, or a framed picture.",
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
