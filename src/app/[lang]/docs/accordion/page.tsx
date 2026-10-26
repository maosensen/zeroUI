import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AccordionFaq from "../_demos/accordion-faq";

export const generateMetadata = metadataFor("/docs/accordion");

export default async function AccordionPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/accordion")} />
      <DocHeader
        title="Accordion"
        lead="Sections that open one at a time, divided by quiet lines; each heading leans, led by a slanted sliver that lights with the accent while open."
      />
      <DocSection id="install">
        <Install item="accordion" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="accordion-faq" title="Questions, one open at a time">
          <AccordionFaq />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Opening one section closes the others; pass <code>multiple</code> to
            let several stay open. The section unfolds to its own height and
            folds back faster; under reduced motion it simply appears.
          </p>
          <p>
            Arrow keys move between headings, Enter or Space opens one. Each
            heading is a button inside a heading element.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Accordion"
          base={{
            name: "Accordion.Root",
            href: "https://base-ui.com/react/components/accordion",
          }}
          rows={[
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: "Lets several sections stay open.",
            },
            {
              name: "defaultValue / value",
              type: "any[]",
              description: "The open sections, by their items' values.",
            },
          ]}
        />
        <PropsTable
          part="AccordionItem, AccordionTrigger, AccordionContent"
          base={{
            name: "Accordion.Item",
            href: "https://base-ui.com/react/components/accordion",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
