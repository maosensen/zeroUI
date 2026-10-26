import { MissionBriefing } from "@/components/blocks/mission-briefing";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/mission-briefing");

export default async function MissionBriefingPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/mission-briefing")} />
      <DocHeader
        title="Mission briefing"
        lead={pick({
          en: "A mission briefing for React: the contract's name glitching in over a route map, the objectives, the threat, the reward, and a held accept.",
          zh: "React 任务简报界面：委托名称以故障效果浮现在路线图上，旁边列出任务目标、威胁等级与报酬，按住即可接受委托。",
        })}
      />
      <DocSection id="install">
        <Install item="mission-briefing" />
      </DocSection>
      <DocSection id="preview">
        <Block name="mission-briefing">
          <MissionBriefing />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The title glitches in over a map drawn in place (a grid, a
                  river, the route, two marks): swap the SVG for your own
                  picture. Beside it, what has to be done, a five-cell threat
                  gauge, the pay and the loot in slots.
                </p>
                <p>
                  Accepting is held (or hold <strong>E</strong>), so it is never
                  taken by a stray click; once taken, a cut-in announces the job
                  and the first objective becomes the current one. It lays out
                  in two columns once its own box is wide enough (a container
                  query), wherever it is placed.
                </p>
                <p>
                  Built from <a href={link("/docs/objectives")}>Objectives</a>,{" "}
                  <a href={link("/docs/gauge")}>Gauge</a>,{" "}
                  <a href={link("/docs/counter")}>Counter</a>,{" "}
                  <a href={link("/docs/inventory")}>Inventory</a>,{" "}
                  <a href={link("/docs/badge")}>Badge</a>,{" "}
                  <a href={link("/docs/hold-button")}>Hold button</a>,{" "}
                  <a href={link("/docs/cut-in")}>Cut-in</a>,{" "}
                  <a href={link("/docs/kbd")}>Kbd</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  标题以故障效果浮现在地图上。地图直接以 SVG
                  绘制（网格、河流、路线与两个标记），可替换为自己的图片。旁边依次是任务目标、五格的威胁数值条，以及置于物品格中的报酬与战利品。
                </p>
                <p>
                  接受委托需要按住按钮（或按住 <strong>E</strong>
                  ），避免误点接受；接受委托后，Cut-in
                  宣告任务开始，第一项目标成为当前目标。只要区块自身宽度足够（容器查询），无论置于何处都排成两栏。
                </p>
                <p>
                  由 <a href={link("/docs/objectives")}>Objectives</a>、
                  <a href={link("/docs/gauge")}>Gauge</a>、
                  <a href={link("/docs/counter")}>Counter</a>、
                  <a href={link("/docs/inventory")}>Inventory</a>、
                  <a href={link("/docs/badge")}>Badge</a>、
                  <a href={link("/docs/hold-button")}>Hold button</a>、
                  <a href={link("/docs/cut-in")}>Cut-in</a>、
                  <a href={link("/docs/kbd")}>Kbd</a>、
                  <a href={link("/docs/button")}>Button</a>{" "}
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
