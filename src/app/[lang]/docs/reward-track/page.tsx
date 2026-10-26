import { enter, type LangProps, link } from "@/lib/i18n/server";
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
        lead="A level reward track for React, the season or battle pass page: a row per level with its rewards in slots, claimed, ready to claim, or locked."
      />
      <DocSection id="install">
        <Install item="reward-track" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="reward-track-levels" title="Levels to claim">
          <RewardTrackLevels />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A row per level: the number big and leaning in a slanted well, the
            rewards (<a href={link("/docs/inventory")}>InventorySlots</a>) in
            the middle, and at the end what can be done. <code>ready</code>{" "}
            lights the number and an accent edge and shows Claim;{" "}
            <code>claimed</code> dims the rewards and says so with a check;{" "}
            <code>locked</code> dims them further and says what it takes.{" "}
            <code>current</code> marks the level you are on.
          </p>
          <p>
            Each row begins with its level and state in words for screen readers
            ("Level 5, ready to claim"). A "Claim all" belongs to the page
            around it: it is one line of your state.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="RewardTier"
          rows={[
            {
              name: "level",
              type: "number",
              description: "Its level.",
            },
            {
              name: "state",
              type: '"claimed" | "ready" | "locked"',
              description: "What can be done about it.",
            },
            {
              name: "current",
              type: "boolean",
              description: "The level you are on.",
            },
            {
              name: "onClaim",
              type: "() => void",
              description: "Claim pressed.",
            },
            {
              name: "note",
              type: "ReactNode",
              description: "A line about the level itself, never dimmed.",
            },
            {
              name: "locked",
              type: "ReactNode",
              default: '"Reach level n"',
              description: "What a locked tier says it takes.",
            },
          ]}
        />
        <PropsTable part="RewardTrack" rows={[]} />
      </DocSection>
    </>
  );
}
