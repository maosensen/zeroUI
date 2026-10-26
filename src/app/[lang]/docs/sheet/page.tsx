import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SheetSides from "../_demos/sheet-sides";

export const generateMetadata = metadataFor("/docs/sheet");

export default async function SheetPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/sheet")} />
      <DocHeader
        title="Sheet"
        lead="A dialog that slides in from an edge of the screen and holds on to it, the ink border on the edge facing the page."
      />
      <DocSection id="install">
        <Install item="sheet" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="sheet-sides" title="From the right, the left, the bottom">
          <SheetSides />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It slides in on the reveal timing and out faster; under reduced
            motion it only fades. Its footer is pinned to the far end.
          </p>
          <p>
            Header, title, description and body are the Dialog's own parts,
            re-exported with Sheet names.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="SheetContent"
          base={{
            name: "Dialog.Popup",
            href: "https://base-ui.com/react/components/dialog",
          }}
          rows={[
            {
              name: "side",
              type: '"right" | "left" | "top" | "bottom"',
              default: '"right"',
              description: "The edge it slides in from.",
            },
            {
              name: "showClose",
              type: "boolean",
              default: "true",
              description: "The close button in the corner.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
