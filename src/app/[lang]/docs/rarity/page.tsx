import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RarityLoot from "../_demos/rarity-loot";

export const generateMetadata = metadataFor("/docs/rarity");

export default async function RarityPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/rarity")} />
      <DocHeader
        title="Rarity"
        lead={pick({
          en: "Five tiers of worth, the way a game grades its loot: common, uncommon, rare, epic, legendary, each with its own colour.",
          zh: "五档稀有度，沿用游戏中为战利品分级的做法：普通、优秀、稀有、史诗、传说，每档各有专属颜色。",
        })}
      />
      <DocSection id="install">
        <Install item="rarity" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="rarity-loot"
          title={pick({ en: "Loot, graded", zh: "按稀有度分级的战利品" })}
        >
          <RarityLoot />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The colours are tokens,{" "}
                  <code>--color-zero-rarity-common</code> to{" "}
                  <code>--color-zero-rarity-legendary</code>, kept clear of the
                  accent, the focus yellow and danger, and readable as text on
                  every ground zzzUI uses.
                </p>
                <p>
                  Three components take a <code>rarity</code>: Badge fills with
                  the tier's colour, Card gets a top edge in it, and Item
                  colours its title and marks its start edge, as an inventory
                  does. Elsewhere, use the tokens directly (
                  <code>text-zero-rarity-epic</code>,{" "}
                  <code>bg-zero-rarity-rare</code>).
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  颜色以设计 token 提供，从{" "}
                  <code>--color-zero-rarity-common</code> 到{" "}
                  <code>--color-zero-rarity-legendary</code>
                  ，与强调色、焦点框的黄色和危险色都有明显区分；用作文字时，在
                  zzzUI 的各种底色上也都清晰可读。
                </p>
                <p>
                  有三个组件接受 <code>rarity</code>：Badge 以该档颜色填充，Card
                  的顶边使用该颜色，Item
                  则像游戏物品栏那样为标题着色，并在起始一侧加一道色条。其他场合可直接使用设计
                  token（
                  <code>text-zero-rarity-epic</code>、
                  <code>bg-zero-rarity-rare</code>）。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Badge, Card, Item"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: pick({
                en: "The tier, and with it the colour.",
                zh: "稀有度档位，颜色随之确定。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
