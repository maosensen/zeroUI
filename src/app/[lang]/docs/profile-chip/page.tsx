import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ProfileChipBasic from "../_demos/profile-chip-basic";

export const generateMetadata = metadataFor("/docs/profile-chip");

export default async function ProfileChipPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/profile-chip")} />
      <DocHeader
        title="Profile chip"
        lead={pick({
          en: "A player profile chip for React: avatar, name, an experience bar with the points on it, and the level, on one slab cut on both sides.",
          zh: "React 玩家资料条组件：头像、名字、标有经验值的经验条与等级，排在同一块斜切块上。",
        })}
      />
      <DocSection id="install">
        <Install item="profile-chip" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="profile-chip-basic"
          title={pick({ en: "Earning experience", zh: "获得经验" })}
        >
          <ProfileChipBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A slab of fixed height, cut on both sides, holding the avatar,
                  the name over a thin experience bar in the rare blue with the
                  points written on it, and the level big and leaning with LEVEL
                  under it. The bar eases to its new length on the slow timing.
                </p>
                <p>
                  Screen readers get one sentence instead of the parts: "Wren,
                  level 8, 685 of 790 experience".
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  一块固定高度的斜切块，从左到右依次是：头像；名字及其下方的细经验条（「稀有」稀有度的蓝色，条上标有经验值）；大号斜体的等级数字，下方标有
                  LEVEL。经验条按慢速时长缓动到新的长度。
                </p>
                <p>
                  读屏软件读到的是一句完整的话，而非各个部分：「Wren, level 8,
                  685 of 790 experience」。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ProfileChip"
          rows={[
            {
              name: "name",
              type: "string",
              description: pick({ en: "Who.", zh: "玩家名。" }),
            },
            {
              name: "level",
              type: "number",
              description: pick({ en: "Their level.", zh: "等级。" }),
            },
            {
              name: "xp / xpMax",
              type: "number",
              description: pick({
                en: "Experience so far, and to the next level.",
                zh: "当前经验值，以及本级升级所需的总经验值。",
              }),
            },
            {
              name: "avatar",
              type: "ReactNode",
              description: pick({ en: "An Avatar.", zh: "一个 Avatar。" }),
            },
            {
              name: "label",
              type: "(name, level, xp, xpMax) => string",
              default: '"{name}, level {level}, {xp} of {xpMax} experience"',
              description: pick({
                en: "The sentence screen readers hear in place of the chip's parts.",
                zh: "读屏软件读出的整句，代替组件的各个部分。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
