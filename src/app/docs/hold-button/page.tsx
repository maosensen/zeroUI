import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import HoldButtonScrap from "../_demos/hold-button-scrap";

export const metadata = pageMetadata("/docs/hold-button");

export default function HoldButtonPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/hold-button")} />
      <DocHeader
        title="Hold button"
        lead="A hold-to-confirm button for React: a fill runs across it along the slant while it is held, for what should not happen by accident."
      />
      <DocSection id="install" title="Install">
        <Install item="hold-button" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="hold-button-scrap" title="Hold to scrap">
          <HoldButtonScrap />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Hold it with the pointer, Enter or Space, or its <code>hotkey</code>{" "}
            from anywhere on the page (not while typing in a field). Let go
            early and the fill drains back; hold it to the end and{" "}
            <code>onConfirm</code> fires and the button flashes the accent. The
            fill keeps its pace under reduced motion: it tells you how long to
            hold.
          </p>
          <p>
            It is a Button with every Button variant and size,{" "}
            <code>secondary</code> by default. Screen readers are told to press
            and hold. Put a Kbd inside to show the key.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="HoldButton"
          rows={[
            {
              name: "onConfirm",
              type: "() => void",
              description: "Fired once the hold is complete.",
            },
            {
              name: "duration",
              type: "number",
              default: "1200",
              description: "How long to hold, in ms.",
            },
            {
              name: "hotkey",
              type: "string",
              description:
                "A key (KeyboardEvent.key) that holds it from anywhere.",
            },
            {
              name: "variant / size / cut",
              type: "Button's",
              default: '"secondary"',
              description: "As Button.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
