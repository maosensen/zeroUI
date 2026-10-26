import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AlertTones from "../_demos/alert-tones";

export const metadata = pageMetadata("/docs/alert");

export default function AlertPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/alert")} />
      <DocHeader
        title="Alert"
        lead="A message set into the page: a square-cornered box with its start edge in the message's tone, and the tone's badge as its mark."
      />
      <DocSection id="install" title="Install">
        <Install item="alert" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="alert-tones" title="Four tones">
          <AlertTones />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The four tones reuse colours zzzUI already has: quiet grey for
            information, the accent for something done, the selection yellow for
            a warning, the danger red. Each has its own badge (info, done,
            alert), so the tone never rests on colour alone.
          </p>
          <p>
            An alert is static: it is not announced when it appears. For a
            message that comes and goes, use a Toast.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Alert"
          rows={[
            {
              name: "variant",
              type: '"info" | "success" | "warning" | "danger"',
              default: '"info"',
              description: "The tone: the edge, the badge and its colour.",
            },
            {
              name: "icon",
              type: "ReactNode",
              description:
                "Replaces the tone's badge; null leaves the mark out.",
            },
          ]}
        />
        <PropsTable part="AlertTitle, AlertDescription" rows={[]} />
      </DocSection>
    </>
  );
}
