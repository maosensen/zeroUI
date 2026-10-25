import { PauseMenu } from "@/components/blocks/pause-menu";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/pause-menu");

export default function PauseMenuPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/pause-menu")} />
      <DocHeader
        title="Pause menu"
        lead="A game pause menu for React: the scene dimmed and blurred behind a panel with the run so far, the ways out, and abandoning the run held."
      />
      <DocSection id="install" title="Install">
        <Install item="pause-menu" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="pause-menu">
          <PauseMenu />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Escape, while focus is in the game, pauses and resumes; so does
            Resume. The panel shows the run so far as{" "}
            <a href="/docs/stats">Stats</a>, then Resume, Settings and Map.
            Abandoning the run is a <a href="/docs/hold-button">Hold button</a>{" "}
            in red with a longer hold.
          </p>
          <p>
            The game behind is a stand-in (a hull gauge on a drawn floor). In
            your game, render the panel over the real scene.
          </p>
          <p>
            Built from <a href="/docs/stats">Stats</a>,{" "}
            <a href="/docs/button">Button</a>,{" "}
            <a href="/docs/hold-button">Hold button</a>,{" "}
            <a href="/docs/gauge">Gauge</a>, <a href="/docs/kbd">Kbd</a>. It
            installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
