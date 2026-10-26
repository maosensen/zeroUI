import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SeparatorBasic from "../_demos/separator-basic";

export const generateMetadata = metadataFor("/docs/separator");

export default async function SeparatorPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/separator")} />
      <DocHeader
        title="Separator"
        lead={pick({
          en: "A quiet line between two things, the same line that divides rows and panels.",
          zh: "两部分内容之间的一道暗色细线，与分隔表格行、面板的线相同。",
        })}
      />
      <DocSection id="install">
        <Install item="separator" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="separator-basic"
          title={pick({ en: "Across and upright", zh: "横向与竖向" })}
        >
          <SeparatorBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Horizontal by default; <code>orientation="vertical"</code>{" "}
                stands it up beside inline content, as tall as the row.
              </p>
            ),
            zh: (
              <p>
                默认横向；设为 <code>orientation="vertical"</code>{" "}
                后竖立在行内内容旁，高度与所在行一致。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Separator"
          base={{
            name: "Separator",
            href: "https://base-ui.com/react/components/separator",
          }}
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pick({
                en: "Which way it runs.",
                zh: "分隔线的方向。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
