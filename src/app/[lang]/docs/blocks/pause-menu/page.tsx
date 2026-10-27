import { PauseMenu } from "@/components/blocks/pause-menu";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/pause-menu");

export default async function PauseMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/pause-menu")} />
      <DocHeader
        title="Pause menu"
        lead={pick({
          en: "A game pause menu for React: the scene dimmed and blurred behind a panel with the run so far, the ways out, and abandoning the run held.",
          zh: "React 游戏暂停菜单：后方场景变暗并模糊，前方面板显示本局战绩，以及继续、设置与地图等选项，放弃本局需按住确认。",
        })}
      />
      <DocSection id="install">
        <Install item="pause-menu" />
      </DocSection>
      <DocSection id="preview">
        <Block name="pause-menu">
          <PauseMenu />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Escape, while focus is in the game, pauses and resumes; so
                  does Resume. The panel shows the run so far as{" "}
                  <a href={link("/docs/stats")}>Stats</a>, then Resume, Settings
                  and Map. Abandoning the run is a{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a> in red
                  with a longer hold.
                </p>
                <p>
                  The game behind is a stand-in (a hull gauge on a drawn floor).
                  In your game, render the panel over the real scene.
                </p>
                <p>
                  Built from <a href={link("/docs/stats")}>Stats</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>,{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a>,{" "}
                  <a href={link("/docs/gauge")}>Gauge</a>,{" "}
                  <a href={link("/docs/kbd")}>Kbd</a>. It installs those with
                  it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  焦点在游戏内时，按 Esc 暂停或继续；Resume
                  同样可以继续。面板先以 <a href={link("/docs/stats")}>Stats</a>{" "}
                  显示本局战绩，其后是 Resume、Settings 与
                  Map。放弃本局是一个红色的{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a>
                  ，需要按住更久。
                </p>
                <p>
                  后方的游戏画面仅为占位（在绘制的地面上摆放一条船体数值条）。在实际游戏中，应将面板渲染在真实场景之上。
                </p>
                <p>
                  由 <a href={link("/docs/stats")}>Stats</a>、
                  <a href={link("/docs/button")}>Button</a>、
                  <a href={link("/docs/hold-button")}>Hold button</a>、
                  <a href={link("/docs/gauge")}>Gauge</a>、
                  <a href={link("/docs/kbd")}>Kbd</a>{" "}
                  组成，安装此代码块时会一并安装这些组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
