import { TitleScreen } from "@/components/blocks/title-screen";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/title-screen");

export default async function TitleScreenPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/title-screen")} />
      <DocHeader
        title="Title screen"
        lead={pick({
          en: "A game title screen for React: the name big and glitching in, a menu moved through with the arrow keys, news in a corner, and the keys along the bottom.",
          zh: "React 游戏标题画面：大号游戏名以故障效果浮现，菜单可用方向键切换，角落显示公告，底部列出按键提示。",
        })}
      />
      <DocSection id="install">
        <Install item="title-screen" />
      </DocSection>
      <DocSection id="preview">
        <Block name="title-screen">
          <TitleScreen />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The menu is a column of buttons; the arrow keys move focus
                  between them, so the mouse, Tab and the keys agree on which is
                  chosen, lit with the accent and a marker, its line shown
                  beneath. <code>onChoose</code> gets the entry's id.
                </p>
                <p>
                  The title sizes itself to the block's width (container units)
                  and glitches in once. The backdrop is drawn: put your key art
                  behind it.
                </p>
                <p>
                  Built from <a href={link("/docs/badge")}>Badge</a>,{" "}
                  <a href={link("/docs/kbd")}>Kbd</a>. It installs those with
                  it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  菜单是一列按钮，方向键在按钮之间移动焦点，因此鼠标、Tab
                  与方向键选中的始终是同一项：当前项以强调色和标记高亮，下方显示该项的说明。
                  <code>onChoose</code> 接收所选条目的 id。
                </p>
                <p>
                  标题按区块宽度确定字号（容器单位），并以故障效果浮现一次。背景为代码绘制的占位，可将自己的主视觉置于其后。
                </p>
                <p>
                  由 <a href={link("/docs/badge")}>Badge</a>、
                  <a href={link("/docs/kbd")}>Kbd</a>{" "}
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
