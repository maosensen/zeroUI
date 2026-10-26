import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import BadgeVariants from "../_demos/badge-variants";

export const generateMetadata = metadataFor("/docs/badge");

export default async function BadgePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/badge")} />
      <DocHeader
        title="Badge"
        lead={pick({
          en: "A short label stuck on something: a small slab cut on both sides, in small leaning capitals.",
          zh: "附在其他内容上的简短标签：两端带切角的小号斜切块，文字为倾斜的小号大写字母。",
        })}
      />
      <DocSection id="install">
        <Install item="badge" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="badge-variants"
          title={pick({
            en: "Four variants and an icon",
            zh: "四种变体与图标",
          })}
        >
          <BadgeVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The accent for what matters, the raised grey for the ordinary,
                  a black well with a quiet outline for the quiet, red for
                  danger. An icon goes before the word.
                </p>
                <p>
                  <code>render</code> turns it into a link or any other element;
                  as a link it lightens on hover and takes the focus frame.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  重要信息用强调色，一般信息用浮起色（灰），次要信息用带暗色描边的黑底，危险信息用红色。图标置于文字之前。
                </p>
                <p>
                  通过 <code>render</code>{" "}
                  可渲染为链接或其他任意元素。作为链接时，悬停时变亮，聚焦时显示焦点框。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Badge"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: pick({
                en: "Colours it by tier (see Rarity).",
                zh: "按稀有度档位着色（见 Rarity）。",
              }),
            },
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "danger"',
              default: '"default"',
              description: pick({ en: "Its fill.", zh: "填充样式。" }),
            },
            {
              name: "render",
              type: "ReactElement",
              description: pick({
                en: "The element to render as, such as a link.",
                zh: "实际渲染的元素，例如链接。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
