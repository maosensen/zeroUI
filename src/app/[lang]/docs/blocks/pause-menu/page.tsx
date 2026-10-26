import { PauseMenu } from "@/components/blocks/pause-menu";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/pause-menu");

export default async function PauseMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/pause-menu")} />
      <DocHeader
        title="Pause menu"
        lead="A game pause menu for React: the scene dimmed and blurred behind a panel with the run so far, the ways out, and abandoning the run held."
      />
      <DocSection id="install">
        <Install item="pause-menu" />
      </DocSection>
      <DocSection id="preview">
        <Block name="pause-menu">
          <PauseMenu />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Escape, while focus is in the game, pauses and resumes; so does
            Resume. The panel shows the run so far as{" "}
            <a href={link("/docs/stats")}>Stats</a>, then Resume, Settings and
            Map. Abandoning the run is a{" "}
            <a href={link("/docs/hold-button")}>Hold button</a> in red with a
            longer hold.
          </p>
          <p>
            The game behind is a stand-in (a hull gauge on a drawn floor). In
            your game, render the panel over the real scene.
          </p>
          <p>
            Built from <a href={link("/docs/stats")}>Stats</a>,{" "}
            <a href={link("/docs/button")}>Button</a>,{" "}
            <a href={link("/docs/hold-button")}>Hold button</a>,{" "}
            <a href={link("/docs/gauge")}>Gauge</a>,{" "}
            <a href={link("/docs/kbd")}>Kbd</a>. It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
