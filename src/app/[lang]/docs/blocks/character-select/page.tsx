import { CharacterSelect } from "@/components/blocks/character-select";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/character-select");

export default async function CharacterSelectPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/character-select")} />
      <DocHeader
        title="Character select"
        lead="A character select screen for React: a roster of couriers as cards, the chosen one in full with ratings and a perk, a locked one with how to earn it, and a held deploy."
      />
      <DocSection id="install">
        <Install item="character-select" />
      </DocSection>
      <DocSection id="preview">
        <Block name="character-select">
          <CharacterSelect />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The roster is one choice: each card is a toggle button, the chosen
            one framed in the accent. A locked courier stays in the roster,
            dimmed with its lock, and says how to unlock it instead of its role.
          </p>
          <p>
            The chosen courier's four ratings are five-cell{" "}
            <a href={link("/docs/gauge")}>Gauges</a>; the perk sits in an
            accent-edged well; deploying is held. Two columns once the block's
            box is wide enough.
          </p>
          <p>
            Built from <a href={link("/docs/gauge")}>Gauge</a>,{" "}
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
