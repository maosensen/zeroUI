import { LevelRewards } from "@/components/blocks/level-rewards";
import { enter, type LangProps, link } from "@/lib/i18n/server";
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
        lead="A rank or season pass page for React: who you are and how far to the next level, then a row per level with its rewards to claim, one at a time or all at once."
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
          <p>
            The top carries the{" "}
            <a href={link("/docs/profile-chip")}>Profile chip</a>. Below, a{" "}
            <a href={link("/docs/reward-track")}>Reward track</a>: levels passed
            and unclaimed show Claim, "Claim all" takes them all, and a polite
            line says how many levels wait and how many things were claimed.
            Levels ahead are locked and say what it takes; milestones carry a
            line of what they open.
          </p>
          <p>
            The rewards are <a href={link("/docs/inventory")}>InventorySlots</a>{" "}
            with zzzUI's item icons.
          </p>
          <p>
            Built from <a href={link("/docs/reward-track")}>Reward track</a>,{" "}
            <a href={link("/docs/profile-chip")}>Profile chip</a>,{" "}
            <a href={link("/docs/inventory")}>Inventory</a>,{" "}
            <a href={link("/docs/avatar")}>Avatar</a>,{" "}
            <a href={link("/docs/button")}>Button</a>. It installs those with
            it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
