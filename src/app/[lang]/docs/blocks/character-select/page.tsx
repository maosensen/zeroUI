import { CharacterSelect } from "@/components/blocks/character-select";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/character-select");

export default async function CharacterSelectPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/character-select")} />
      <DocHeader
        title="Character select"
        lead={pick({
          en: "A character select screen for React: a roster of couriers as cards, the chosen one in full with ratings and a perk, a locked one with how to earn it, and a held deploy.",
          zh: "React 角色选择界面：以卡片列出信使名单，并显示选中信使的完整资料，包括评级与专长；未解锁的信使注明获得方式，出发需按住确认。",
        })}
      />
      <DocSection id="install">
        <Install item="character-select" />
      </DocSection>
      <DocSection id="preview">
        <Block name="character-select">
          <CharacterSelect />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The roster is one choice: each card is a toggle button, the
                  chosen one framed in the accent. A locked courier stays in the
                  roster, dimmed with its lock, and says how to unlock it
                  instead of its role.
                </p>
                <p>
                  The chosen courier's four ratings are five-cell{" "}
                  <a href={link("/docs/gauge")}>Gauges</a>; the perk sits in an
                  accent-edged well; deploying is held. Two columns once the
                  block's box is wide enough.
                </p>
                <p>
                  Built from <a href={link("/docs/gauge")}>Gauge</a>,{" "}
                  <a href={link("/docs/badge")}>Badge</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>,{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a>. It
                  installs those with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  名单是一组单选：每张卡片都是切换按钮，选中的一张以强调色框出。未解锁的信使仍留在名单中，变暗并带锁形标记，原本显示职能的位置改为说明解锁方式。
                </p>
                <p>
                  选中信使的四项评级是五格的{" "}
                  <a href={link("/docs/gauge")}>Gauge</a>
                  ；专长显示在一块带强调色边线的内嵌面板中；出发需按住确认。区块宽度足够时排成两栏。
                </p>
                <p>
                  由 <a href={link("/docs/gauge")}>Gauge</a>、
                  <a href={link("/docs/badge")}>Badge</a>、
                  <a href={link("/docs/button")}>Button</a>、
                  <a href={link("/docs/hold-button")}>Hold button</a>{" "}
                  组成，安装此区块时会一并安装这些组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
