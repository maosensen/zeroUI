import { MissionBriefing } from "@/components/blocks/mission-briefing";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/mission-briefing");

export default async function MissionBriefingPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/mission-briefing")} />
      <DocHeader
        title="Mission briefing"
        lead="A mission briefing for React: the contract's name glitching in over a route map, the objectives, the threat, the reward, and a held accept."
      />
      <DocSection id="install">
        <Install item="mission-briefing" />
      </DocSection>
      <DocSection id="preview">
        <Block name="mission-briefing">
          <MissionBriefing />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The title glitches in over a map drawn in place (a grid, a river,
            the route, two marks): swap the SVG for your own picture. Beside it,
            what has to be done, a five-cell threat gauge, the pay and the loot
            in slots.
          </p>
          <p>
            Accepting is held (or hold <strong>E</strong>), so it is never taken
            by a stray click; once taken, a cut-in announces the job and the
            first objective becomes the current one. It lays out in two columns
            once its own box is wide enough (a container query), wherever it is
            placed.
          </p>
          <p>
            Built from <a href={link("/docs/objectives")}>Objectives</a>,{" "}
            <a href={link("/docs/gauge")}>Gauge</a>,{" "}
            <a href={link("/docs/counter")}>Counter</a>,{" "}
            <a href={link("/docs/inventory")}>Inventory</a>,{" "}
            <a href={link("/docs/badge")}>Badge</a>,{" "}
            <a href={link("/docs/hold-button")}>Hold button</a>,{" "}
            <a href={link("/docs/cut-in")}>Cut-in</a>,{" "}
            <a href={link("/docs/kbd")}>Kbd</a>,{" "}
            <a href={link("/docs/button")}>Button</a>. It installs those with
            it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
