import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DialogBasic from "../_demos/dialog-basic";

export const metadata = pageMetadata("/docs/dialog");

export default function DialogPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/dialog")} />
      <DocHeader
        title="Dialog"
        lead="A panel over a dimmed page: a black header bar with the title, a body, and the actions. It opens out of its centre and folds back faster."
      />
      <DocSection id="install" title="Install">
        <Install item="dialog" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="dialog-basic" title="Confirm before taking a job">
          <DialogBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Focus moves into the dialog when it opens and back to the trigger
            when it closes; Escape or a click on the dimmed page closes it.
            Under reduced motion it only fades.
          </p>
          <p>
            Give the trigger and the closing buttons zzzUI Buttons through{" "}
            <code>render</code>, as in the example. The corner close button is
            there by default; <code>showClose=&#123;false&#125;</code> removes
            it.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
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
              description: "The close button in the header's corner.",
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
              description: "Open, controlled; with onOpenChange.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              default: "false",
              description: "Open, uncontrolled.",
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
