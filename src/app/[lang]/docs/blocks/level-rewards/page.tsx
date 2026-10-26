import { LevelRewards } from "@/components/blocks/level-rewards";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/level-rewards");

export default async function LevelRewardsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/level-rewards")} />
      <DocHeader
        title="Level rewards"
        lead={pick({
          en: "A rank or season pass page for React: who you are and how far to the next level, then a row per level with its rewards to claim, one at a time or all at once.",
          zh: "React 段位或赛季通行证页面：顶部是玩家信息与距下一级的进度，下方每个等级一行列出奖励，可逐个领取，也可一键全部领取。",
        })}
      />
      <DocSection id="install">
        <Install item="level-rewards" />
      </DocSection>
      <DocSection id="preview">
        <Block name="level-rewards">
          <LevelRewards />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The top carries the{" "}
                  <a href={link("/docs/profile-chip")}>Profile chip</a>. Below,
                  a <a href={link("/docs/reward-track")}>Reward track</a>:
                  levels passed and unclaimed show Claim, "Claim all" takes them
                  all, and a polite line says how many levels wait and how many
                  things were claimed. Levels ahead are locked and say what it
                  takes; milestones carry a line of what they open.
                </p>
                <p>
                  The rewards are{" "}
                  <a href={link("/docs/inventory")}>InventorySlots</a> with
                  zzzUI's item icons.
                </p>
                <p>
                  Built from{" "}
                  <a href={link("/docs/reward-track")}>Reward track</a>,{" "}
                  <a href={link("/docs/profile-chip")}>Profile chip</a>,{" "}
                  <a href={link("/docs/inventory")}>Inventory</a>,{" "}
                  <a href={link("/docs/avatar")}>Avatar</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  顶部是 <a href={link("/docs/profile-chip")}>Profile chip</a>
                  。下方是 <a href={link("/docs/reward-track")}>Reward track</a>
                  ：已达到但未领取的等级显示 Claim，「Claim
                  all」一次领取全部；另有一行实时区域（
                  <code>aria-live="polite"</code>
                  ）播报还有几个等级待领取、已领取多少件物品。尚未达到的等级处于锁定状态，并注明达成条件；里程碑等级附有一行说明，写明解锁的内容。
                </p>
                <p>
                  奖励以 <a href={link("/docs/inventory")}>InventorySlot</a>{" "}
                  呈现，使用 zzzUI 的物品图标。
                </p>
                <p>
                  由 <a href={link("/docs/reward-track")}>Reward track</a>、
                  <a href={link("/docs/profile-chip")}>Profile chip</a>、
                  <a href={link("/docs/inventory")}>Inventory</a>、
                  <a href={link("/docs/avatar")}>Avatar</a>、
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
