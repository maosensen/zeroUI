import { Loadout } from "@/components/blocks/loadout";
import { enter, type LangProps, link } from "@/lib/i18n/server";
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
        lead="A loadout screen for React: the hold on one side, the chosen item on the other, with its tier, wear and weight, a belt to equip it to, and a held scrap."
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
            Built from <a href={link("/docs/inventory")}>Inventory</a>,{" "}
            <a href={link("/docs/gauge")}>Gauge</a>,{" "}
            <a href={link("/docs/counter")}>Counter</a>,{" "}
            <a href={link("/docs/badge")}>Badge</a>,{" "}
            <a href={link("/docs/button")}>Button</a>,{" "}
            <a href={link("/docs/hold-button")}>Hold button</a>. It installs
            those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
