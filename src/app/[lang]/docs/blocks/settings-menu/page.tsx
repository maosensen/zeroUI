import { SettingsMenu } from "@/components/blocks/settings-menu";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/settings-menu");

export default async function SettingsMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/settings-menu")} />
      <DocHeader
        title="Settings menu"
        lead={pick({
          en: "A game settings screen for React: a black title bar over tabs, one setting a row, and a footer that applies or, held, restores the defaults.",
          zh: "React 游戏设置界面：黑色标题栏下是分页，每项设置占一行；底栏可应用更改，也可按住按钮恢复默认设置。",
        })}
      />
      <DocSection id="install">
        <Install item="settings-menu" />
      </DocSection>
      <DocSection id="preview">
        <Block name="settings-menu">
          <SettingsMenu />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Display, audio, controls and gameplay, each a tab. A setting
                  is a row: its name and a line on the left, its control on the
                  right, stacking on a phone. Controls lists the bindings as
                  keys.
                </p>
                <p>
                  <strong>Apply</strong> stays disabled until something changed.{" "}
                  <strong>Hold to restore defaults</strong> has to be held, so a
                  stray click never wipes a player's settings. Every value is
                  local state: wire them to your own store.
                </p>
                <p>
                  Built from <a href={link("/docs/tabs")}>Tabs</a>,{" "}
                  <a href={link("/docs/select")}>Select</a>,{" "}
                  <a href={link("/docs/slider")}>Slider</a>,{" "}
                  <a href={link("/docs/switch")}>Switch</a>,{" "}
                  <a href={link("/docs/radio-group")}>Radio group</a>,{" "}
                  <a href={link("/docs/kbd")}>Kbd</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>,{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a>. It
                  installs those with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  显示、音频、操作与玩法各占一个分页。每项设置占一行：左侧是名称与一行说明，右侧是控件，在手机上改为上下堆叠。操作分页以按键形式列出键位绑定。
                </p>
                <p>
                  <strong>Apply</strong> 在设置有改动之前保持禁用。
                  <strong>Hold to restore defaults</strong>{" "}
                  需要按住才会生效，误点不会清空玩家的设置。所有值均为本地状态，需接入项目自己的状态存储。
                </p>
                <p>
                  由 <a href={link("/docs/tabs")}>Tabs</a>、
                  <a href={link("/docs/select")}>Select</a>、
                  <a href={link("/docs/slider")}>Slider</a>、
                  <a href={link("/docs/switch")}>Switch</a>、
                  <a href={link("/docs/radio-group")}>Radio group</a>、
                  <a href={link("/docs/kbd")}>Kbd</a>、
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
