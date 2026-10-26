import { LevelRewards } from "@/components/blocks/level-rewards";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/level-rewards");

export default function LevelRewardsPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/level-rewards")} />
      <DocHeader
        title="Level rewards"
        lead="A rank or season pass page for React: who you are and how far to the next level, then a row per level with its rewards to claim, one at a time or all at once."
      />
      <DocSection id="install" title="Install">
        <Install item="level-rewards" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="level-rewards">
          <LevelRewards />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The top carries the <a href="/docs/profile-chip">Profile chip</a>.
            Below, a <a href="/docs/reward-track">Reward track</a>: levels
            passed and unclaimed show Claim, "Claim all" takes them all, and a
            polite line says how many levels wait and how many things were
            claimed. Levels ahead are locked and say what it takes; milestones
            carry a line of what they open.
          </p>
          <p>
            The rewards are <a href="/docs/inventory">InventorySlots</a> with
            zzzUI's item icons.
          </p>
          <p>
            Built from <a href="/docs/reward-track">Reward track</a>,{" "}
            <a href="/docs/profile-chip">Profile chip</a>,{" "}
            <a href="/docs/inventory">Inventory</a>,{" "}
            <a href="/docs/avatar">Avatar</a>, <a href="/docs/button">Button</a>
            . It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
