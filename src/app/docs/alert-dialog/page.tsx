import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AlertDialogAbandon from "../_demos/alert-dialog-abandon";

export const metadata = pageMetadata("/docs/alert-dialog");

export default function AlertDialogPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/alert-dialog")} />
      <DocHeader
        title="Alert dialog"
        lead="A Dialog that asks before something that cannot be undone, and waits for an answer."
      />
      <DocSection id="install" title="Install">
        <Install item="alert-dialog" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="alert-dialog-abandon" title="Before abandoning a job">
          <AlertDialogAbandon />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            It has no close button in the corner, and a click on the dimmed page
            does not dismiss it: only the answers do, or Escape. Focus starts
            inside it and returns to the trigger.
          </p>
          <p>
            The header, title, body and footer are the Dialog's.
            AlertDialogCancel is a raised button; AlertDialogAction is in the
            accent, or in red with <code>variant="danger"</code>. Both close it.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "The button's look; both close the dialog.",
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
