import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CollapsibleBasic from "../_demos/collapsible-basic";

export const generateMetadata = metadataFor("/docs/collapsible");

export default async function CollapsiblePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/collapsible")} />
      <DocHeader
        title="Collapsible"
        lead={pick({
          en: "Something that opens and closes in place: the panel unfolds to its own height on the reveal timing and folds back faster.",
          zh: "在原位展开与收起的内容区：面板按展开动效的时长展开到自身高度，收起时更快。",
        })}
      />
      <DocSection id="install">
        <Install item="collapsible" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="collapsible-basic"
          title={pick({
            en: "Notes behind a button",
            zh: "由按钮展开的备注",
          })}
        >
          <CollapsibleBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                The trigger brings no look of its own; give it a Button through{" "}
                <code>render</code>. Under reduced motion the panel simply
                appears.
              </p>
            ),
            zh: (
              <p>
                触发器本身不带样式，可通过 <code>render</code> 传入
                Button。开启「减少动态效果」时，面板直接显示。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Collapsible"
          base={{
            name: "Collapsible.Root",
            href: "https://base-ui.com/react/components/collapsible",
          }}
          rows={[
            {
              name: "open / defaultOpen",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Open, controlled or not.",
                zh: "是否展开，受控或非受控。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CollapsibleTrigger, CollapsibleContent"
          base={{
            name: "Collapsible.Trigger",
            href: "https://base-ui.com/react/components/collapsible",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
