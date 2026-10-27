import { Hud } from "@/components/blocks/hud";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/hud");

export default async function HudPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/hud")} />
      <DocHeader
        title="HUD"
        lead={pick({
          en: "An in-game HUD for React: hull and shield gauges, credits and objectives, and a hotbar whose items do things and go on cooldown.",
          zh: "React 游戏内 HUD：船体与护盾数值条、信用点与任务目标，以及快捷栏，栏中物品可实际使用，使用后进入冷却。",
        })}
      />
      <DocSection id="install">
        <Install item="hud" />
      </DocSection>
      <DocSection id="preview">
        <Block name="hud">
          <Hud />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Use a hotbar slot with a click, or with its number while the
                  HUD has focus: the kit patches the hull, the cell charges the
                  shield, the flare and the key each finish an objective, and
                  the slot sweeps through its cooldown. Finishing both
                  objectives pays out, announced by a cut-in.
                </p>
                <p>
                  The backdrop is drawn (a glow, a floor grid): put your game
                  behind it. The panels stack on a phone.
                </p>
                <p>
                  Built from <a href={link("/docs/gauge")}>Gauge</a>,{" "}
                  <a href={link("/docs/counter")}>Counter</a>,{" "}
                  <a href={link("/docs/objectives")}>Objectives</a>,{" "}
                  <a href={link("/docs/inventory")}>Inventory</a>,{" "}
                  <a href={link("/docs/cut-in")}>Cut-in</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  点击快捷栏中的物品格即可使用；HUD
                  获得焦点时，也可按对应的数字键。修理包修复船体，能量电池为护盾充能，信号弹与钥匙各完成一项目标；使用后，物品格上以扫过的遮罩显示冷却进度。两项目标全部完成后发放报酬，并以
                  Cut-in 宣告。
                </p>
                <p>
                  背景为代码绘制的占位（光晕与地面网格），实际使用时将游戏画面置于其后。在手机上，各面板上下堆叠。
                </p>
                <p>
                  由 <a href={link("/docs/gauge")}>Gauge</a>、
                  <a href={link("/docs/counter")}>Counter</a>、
                  <a href={link("/docs/objectives")}>Objectives</a>、
                  <a href={link("/docs/inventory")}>Inventory</a>、
                  <a href={link("/docs/cut-in")}>Cut-in</a>{" "}
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
