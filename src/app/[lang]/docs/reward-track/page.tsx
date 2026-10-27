import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RewardTrackLevels from "../_demos/reward-track-levels";

export const generateMetadata = metadataFor("/docs/reward-track");

export default async function RewardTrackPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/reward-track")} />
      <DocHeader
        title="Reward track"
        lead={pick({
          en: "A level reward track for React, the season or battle pass page: a row per level with its rewards in slots, claimed, ready to claim, or locked.",
          zh: "React 等级奖励列表组件，即赛季通行证或战令页面：每个等级一行，奖励放在格子里，状态分为已领取、可领取与未解锁。",
        })}
      />
      <DocSection id="install">
        <Install item="reward-track" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="reward-track-levels"
          title={pick({ en: "Levels to claim", zh: "待领取的等级奖励" })}
        >
          <RewardTrackLevels />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A row per level: the number big and leaning in a slanted well,
                  the rewards (
                  <a href={link("/docs/inventory")}>InventorySlots</a>) in the
                  middle, and at the end what can be done. <code>ready</code>{" "}
                  lights the number and an accent edge and shows Claim;{" "}
                  <code>claimed</code> dims the rewards and says so with a
                  check; <code>locked</code> dims them further and says what it
                  takes. <code>current</code> marks the level you are on.
                </p>
                <p>
                  Each row begins with its level and state in words for screen
                  readers ("Level 5, ready to claim"). A "Claim all" belongs to
                  the page around it: it is one line of your state.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个等级一行：大号斜体的等级数字放在斜切的槽中，奖励（
                  <a href={link("/docs/inventory")}>InventorySlots</a>
                  ）在中间，行末是可执行的操作。<code>ready</code>{" "}
                  点亮等级数字并加上强调色边缘，显示 Claim 按钮；
                  <code>claimed</code> 将奖励变暗，并以对勾标明已领取；
                  <code>locked</code> 将奖励进一步变暗，并说明解锁条件。
                  <code>current</code> 标记当前所在的等级。
                </p>
                <p>
                  每行开头会以文字向读屏软件说明等级与状态（「Level 5, ready to
                  claim」）。「Claim
                  all」按钮应放在外层页面：只需在外层状态中做一次批量更新。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="RewardTier"
          rows={[
            {
              name: "level",
              type: "number",
              description: pick({ en: "Its level.", zh: "等级。" }),
            },
            {
              name: "state",
              type: '"claimed" | "ready" | "locked"',
              description: pick({
                en: "What can be done about it.",
                zh: "领取状态。",
              }),
            },
            {
              name: "current",
              type: "boolean",
              description: pick({
                en: "The level you are on.",
                zh: "是否为当前所在等级。",
              }),
            },
            {
              name: "onClaim",
              type: "() => void",
              description: pick({
                en: "Claim pressed.",
                zh: "按下 Claim 时调用。",
              }),
            },
            {
              name: "note",
              type: "ReactNode",
              description: pick({
                en: "A line about the level itself, never dimmed.",
                zh: "关于该等级本身的一行说明，不随状态变暗。",
              }),
            },
            {
              name: "locked",
              type: "ReactNode",
              default: '"Reach level n"',
              description: pick({
                en: "What a locked tier says it takes.",
                zh: "未解锁时显示的解锁条件。",
              }),
            },
            {
              name: "labels",
              type: "Partial<RewardTierLabels>",
              default: "rewardTierLabels",
              description: pick({
                en: "What it says, in another language: the lead-in for screen readers, Claim, Claimed and what a locked tier takes.",
                zh: "换成其他语言的文字：读屏前缀、「Claim」「Claimed」，以及未解锁时的条件。",
              }),
            },
          ]}
        />
        <PropsTable part="RewardTrack" rows={[]} />
      </DocSection>
    </>
  );
}
