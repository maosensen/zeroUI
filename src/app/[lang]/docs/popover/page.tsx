import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PopoverBasic from "../_demos/popover-basic";

export const generateMetadata = metadataFor("/docs/popover");

export default async function PopoverPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/popover")} />
      <DocHeader
        title="Popover"
        lead="A panel that opens beside its trigger and holds anything: a few lines of text, a small form. It grows out of the trigger and folds back faster."
      />
      <DocSection id="install">
        <Install item="popover" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="popover-basic" title="A few lines beside the trigger">
          <PopoverBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It opens on click and closes on a click outside or Escape; focus
            moves into it. Use a Tooltip for a label, a Popover for anything you
            might read twice or act in.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="PopoverContent"
          base={{
            name: "Popover.Popup",
            href: "https://base-ui.com/react/components/popover",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: "Where it opens from the trigger.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "How it lines up with the trigger.",
            },
          ]}
        />
        <PropsTable
          part="PopoverTitle, PopoverDescription, PopoverClose"
          base={{
            name: "Popover.Title",
            href: "https://base-ui.com/react/components/popover",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
