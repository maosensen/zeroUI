import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RarityLoot from "../_demos/rarity-loot";

export const metadata = pageMetadata("/docs/rarity");

export default function RarityPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/rarity")} />
      <DocHeader
        title="Rarity"
        lead="Five tiers of worth, the way a game grades its loot: common, uncommon, rare, epic, legendary, each with its own colour."
      />
      <DocSection id="install" title="Install">
        <Install item="rarity" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="rarity-loot" title="Loot, graded">
          <RarityLoot />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The colours are tokens, <code>--color-zero-rarity-common</code> to{" "}
            <code>--color-zero-rarity-legendary</code>, kept clear of the
            accent, the focus yellow and danger, and readable as text on every
            ground zeroUI uses.
          </p>
          <p>
            Three components take a <code>rarity</code>: Badge fills with the
            tier's colour, Card gets a top edge in it, and Item colours its
            title and marks its start edge, as an inventory does. Elsewhere, use
            the tokens directly (<code>text-zero-rarity-epic</code>,{" "}
            <code>bg-zero-rarity-rare</code>).
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Badge, Card, Item"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: "The tier, and with it the colour.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
