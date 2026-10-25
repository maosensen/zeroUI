import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/zero/attachment";
import { AlertIcon, CloseIcon, LockIcon } from "@/components/zero/icons";
import { Spinner } from "@/components/zero/spinner";

export default function AttachmentFiles() {
  return (
    <AttachmentGroup className="w-full max-w-xl flex-wrap">
      <Attachment>
        <AttachmentMedia variant="image">
          {/* biome-ignore lint/performance/noImgElement: a small SVG sample, and the demo is copied into projects without next/image */}
          <img src="/samples/route-map.svg" alt="" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>route-map.svg</AttachmentTitle>
          <AttachmentDescription>12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove route-map.svg">
            <CloseIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner aria-hidden />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>manifest.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <AlertIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>gate-codes.txt</AttachmentTitle>
          <AttachmentDescription>Too large to send</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="idle" size="sm">
        <AttachmentMedia>
          <LockIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>seal.key</AttachmentTitle>
          <AttachmentDescription>Not sent yet</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  );
}
