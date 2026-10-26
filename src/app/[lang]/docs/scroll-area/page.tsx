import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ScrollAreaLog from "../_demos/scroll-area-log";

export const generateMetadata = metadataFor("/docs/scroll-area");

export default async function ScrollAreaPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/scroll-area")} />
      <DocHeader
        title="Scroll area"
        lead="A box that scrolls with zzzUI's own bars: a thin track and a slanted thumb that leans like a slab."
      />
      <DocSection id="install">
        <Install item="scroll-area" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="scroll-area-log" title="A route log">
          <ScrollAreaLog />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The bars stay out of sight until the box is pointed at or scrolled,
            and the thumb lights to the accent while it is held. The wheel,
            touch and the keyboard scroll as usual; the viewport can take focus
            to scroll by keys.
          </p>
          <p>
            Give the ScrollArea a height (or a max height); its content scrolls
            inside it, either way.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ScrollArea"
          base={{
            name: "ScrollArea.Root",
            href: "https://base-ui.com/react/components/scroll-area",
          }}
          rows={[]}
        />
        <PropsTable
          part="ScrollBar"
          base={{
            name: "ScrollArea.Scrollbar",
            href: "https://base-ui.com/react/components/scroll-area",
          }}
          rows={[
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              default: '"vertical"',
              description:
                "ScrollArea draws both; use it alone to build your own.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
