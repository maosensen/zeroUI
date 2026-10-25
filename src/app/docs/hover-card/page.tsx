import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import HoverCardDriver from "../_demos/hover-card-driver";

export const metadata = pageMetadata("/docs/hover-card");

export default function HoverCardPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/hover-card")} />
      <DocHeader
        title="Hover card"
        lead="A preview of what a link leads to, opening while the link is pointed at or focused: the Popover's panel, a little apart from it."
      />
      <DocSection id="install" title="Install">
        <Install item="hover-card" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="hover-card-driver" title="A driver behind a name">
          <HoverCardDriver />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            It grows out of the link and folds back faster. Keep it to what
            pointer users can do without; anything needed belongs on the page or
            in a Popover.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="HoverCardContent"
          base={{
            name: "PreviewCard.Popup",
            href: "https://base-ui.com/react/components/preview-card",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: "Where it opens from the link.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "How it lines up with the link.",
            },
          ]}
        />
        <PropsTable
          part="HoverCard, HoverCardTrigger"
          base={{
            name: "PreviewCard.Root",
            href: "https://base-ui.com/react/components/preview-card",
          }}
          rows={[
            {
              name: "delay",
              type: "number",
              default: "600",
              description: "Milliseconds before it opens.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
