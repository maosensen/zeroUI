import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "Sections that open one at a time, divided by quiet lines; each heading leans, led by a slanted sliver that lights with the accent while open.",
          zh: "每次只展开一项的分段内容，各段以暗色细线分隔。标题倾斜，前方有一道斜切细条，展开时亮起强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="accordion" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="accordion-faq"
          title={pick({
            en: "Questions, one open at a time",
            zh: "常见问题，每次展开一项",
          })}
        >
          <AccordionFaq />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Opening one section closes the others; pass{" "}
                  <code>multiple</code> to let several stay open. The section
                  unfolds to its own height and folds back faster; under reduced
                  motion it simply appears.
                </p>
                <p>
                  Arrow keys move between headings, Enter or Space opens one.
                  Each heading is a button inside a heading element.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  展开一项时，其余各项随之收起；传入 <code>multiple</code>{" "}
                  可让多项同时保持展开。内容展开到自身高度，收起时更快；开启「减少动态效果」时直接显示，不播放动画。
                </p>
                <p>
                  用方向键在各标题间切换焦点，按 Enter
                  或空格键展开当前项。每个标题都是置于标题元素（heading）内的按钮。
                </p>
              </>
            ),
          })}
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
              description: pick({
                en: "Lets several sections stay open.",
                zh: "允许多项同时展开。",
              }),
            },
            {
              name: "defaultValue / value",
              type: "any[]",
              description: pick({
                en: "The open sections, by their items' values.",
                zh: "展开的项，以各项的 value 指定。",
              }),
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
