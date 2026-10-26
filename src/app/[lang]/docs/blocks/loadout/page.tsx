import { Loadout } from "@/components/blocks/loadout";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/loadout");

export default async function LoadoutPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/loadout")} />
      <DocHeader
        title="Loadout"
        lead={pick({
          en: "A loadout screen for React: the hold on one side, the chosen item on the other, with its tier, wear and weight, a belt to equip it to, and a held scrap.",
          zh: "React 装备配置界面：一侧是货舱，另一侧是选中物品的详情，包括稀有度、耐久与重量；物品可装备到腰带栏，也可按住拆解。",
        })}
      />
      <DocSection id="install">
        <Install item="loadout" />
      </DocSection>
      <DocSection id="preview">
        <Block name="loadout">
          <Loadout />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Pick a slot to see the item: its tier as a badge, what it is,
                  its durability and weight as gauges, what it is worth.{" "}
                  <strong>Put on the belt</strong> moves it to one of three belt
                  slots; <strong>Hold to scrap</strong> takes one away and pays
                  its worth into the credits, which count up.
                </p>
                <p>
                  Both grids move with the arrow keys. Two columns once its box
                  is wide enough, one on a phone. The items are local state:
                  feed your own.
                </p>
                <p>
                  Built from <a href={link("/docs/inventory")}>Inventory</a>,{" "}
                  <a href={link("/docs/gauge")}>Gauge</a>,{" "}
                  <a href={link("/docs/counter")}>Counter</a>,{" "}
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
                  选中一个物品格即可查看物品：稀有度以徽章显示，其下是物品说明，耐久与重量以数值条显示，最后是物品价值。
                  <strong>Put on the belt</strong> 将物品移入三个腰带格之一；
                  <strong>Hold to scrap</strong>{" "}
                  拆解一件物品，并按其价值计入信用点，数字随之递增。
                </p>
                <p>
                  两组网格内均可用方向键切换选中的物品格。区块宽度足够时排成两栏，在手机上为一栏。物品为本地状态，可替换为自己的数据。
                </p>
                <p>
                  由 <a href={link("/docs/inventory")}>Inventory</a>、
                  <a href={link("/docs/gauge")}>Gauge</a>、
                  <a href={link("/docs/counter")}>Counter</a>、
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
