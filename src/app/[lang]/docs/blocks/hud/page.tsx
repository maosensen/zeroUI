import { Hud } from "@/components/blocks/hud";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/hud");

export default async function HudPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/hud")} />
      <DocHeader
        title="HUD"
        lead="An in-game HUD for React: hull and shield gauges, credits and objectives, and a hotbar whose items do things and go on cooldown."
      />
      <DocSection id="install">
        <Install item="hud" />
      </DocSection>
      <DocSection id="preview">
        <Block name="hud">
          <Hud />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Use a hotbar slot with a click, or with its number while the HUD has
            focus: the kit patches the hull, the cell charges the shield, the
            flare and the key each finish an objective, and the slot sweeps
            through its cooldown. Finishing both objectives pays out, announced
            by a cut-in.
          </p>
          <p>
            The backdrop is drawn (a glow, a floor grid): put your game behind
            it. The panels stack on a phone.
          </p>
          <p>
            Built from <a href={link("/docs/gauge")}>Gauge</a>,{" "}
            <a href={link("/docs/counter")}>Counter</a>,{" "}
            <a href={link("/docs/objectives")}>Objectives</a>,{" "}
            <a href={link("/docs/inventory")}>Inventory</a>,{" "}
            <a href={link("/docs/cut-in")}>Cut-in</a>. It installs those with
            it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
