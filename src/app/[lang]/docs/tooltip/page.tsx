import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TooltipBasic from "../_demos/tooltip-basic";

export const generateMetadata = metadataFor("/docs/tooltip");

export default async function TooltipPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/tooltip")} />
      <DocHeader
        title="Tooltip"
        lead="A short label on a light slab cut on both sides. One line only: its height is known, so it can be a slab rather than a panel."
      />
      <DocSection id="install">
        <Install item="tooltip" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="tooltip-basic" title="Three sides">
          <TooltipBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It opens on hover and on keyboard focus after a short delay, and
            closes when the pointer leaves. Inside one TooltipProvider, moving
            from one trigger to the next opens the next tooltip at once.
          </p>
          <p>Keep it to a few words; anything longer belongs in a Popover.</p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="TooltipContent"
          base={{
            name: "Tooltip.Popup",
            href: "https://base-ui.com/react/components/tooltip",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: "Where it opens from the trigger.",
            },
          ]}
        />
        <PropsTable
          part="TooltipProvider"
          base={{
            name: "Tooltip.Provider",
            href: "https://base-ui.com/react/components/tooltip",
          }}
          rows={[
            {
              name: "delay",
              type: "number",
              default: "400",
              description:
                "Milliseconds of hover before the first tooltip opens.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
