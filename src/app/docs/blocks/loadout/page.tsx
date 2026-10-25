import { Loadout } from "@/components/blocks/loadout";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/loadout");

export default function LoadoutPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/loadout")} />
      <DocHeader
        title="Loadout"
        lead="A loadout screen for React: the hold on one side, the chosen item on the other, with its tier, wear and weight, a belt to equip it to, and a held scrap."
      />
      <DocSection id="install" title="Install">
        <Install item="loadout" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="loadout">
          <Loadout />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Pick a slot to see the item: its tier as a badge, what it is, its
            durability and weight as gauges, what it is worth.{" "}
            <strong>Put on the belt</strong> moves it to one of three belt
            slots; <strong>Hold to scrap</strong> takes one away and pays its
            worth into the credits, which count up.
          </p>
          <p>
            Both grids move with the arrow keys. Two columns once its box is
            wide enough, one on a phone. The items are local state: feed your
            own.
          </p>
          <p>
            Built from <a href="/docs/inventory">Inventory</a>,{" "}
            <a href="/docs/gauge">Gauge</a>, <a href="/docs/counter">Counter</a>
            , <a href="/docs/badge">Badge</a>, <a href="/docs/button">Button</a>
            , <a href="/docs/hold-button">Hold button</a>. It installs those
            with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
