import { Leaderboard } from "@/components/blocks/leaderboard";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/leaderboard");

export default async function LeaderboardPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/leaderboard")} />
      <DocHeader
        title="Leaderboard"
        lead={pick({
          en: "A leaderboard for React: a tab per period, the top three ranked by tier, and your own row lit and kept at the bottom.",
          zh: "React 排行榜：每个周期一个分页，前三名使用传说、史诗、稀有三档配色，本人所在行高亮并固定在底部。",
        })}
      />
      <DocSection id="install">
        <Install item="leaderboard" />
      </DocSection>
      <DocSection id="preview">
        <Block name="leaderboard">
          <Leaderboard />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The first three ranks wear the legendary, epic and rare
                  colours. Your own row is lit with the selection edge and
                  marked for screen readers; when you are far from the top it is
                  kept at the bottom, under a gap.
                </p>
                <p>
                  The runs column folds away on a phone. The names and numbers
                  are made up: feed your own.
                </p>
                <p>
                  Built from <a href={link("/docs/table")}>Table</a>,{" "}
                  <a href={link("/docs/tabs")}>Tabs</a>,{" "}
                  <a href={link("/docs/avatar")}>Avatar</a>,{" "}
                  <a href={link("/docs/badge")}>Badge</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  前三名分别使用传说、史诗、稀有三档的颜色。本人所在行以选中边线高亮，并向读屏软件标明；名次离榜首较远时，这一行固定显示在底部，与上方隔开一段间距。
                </p>
                <p>
                  在手机上，场次一列会隐藏。玩家名与数据均为虚构，可替换为实际数据。
                </p>
                <p>
                  由 <a href={link("/docs/table")}>Table</a>、
                  <a href={link("/docs/tabs")}>Tabs</a>、
                  <a href={link("/docs/avatar")}>Avatar</a>、
                  <a href={link("/docs/badge")}>Badge</a>{" "}
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
