import { SettingsMenu } from "@/components/blocks/settings-menu";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/settings-menu");

export default function SettingsMenuPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/settings-menu")} />
      <DocHeader
        title="Settings menu"
        lead="A game settings screen for React: a black title bar over tabs, one setting a row, and a footer that applies or, held, restores the defaults."
      />
      <DocSection id="install" title="Install">
        <Install item="settings-menu" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="settings-menu">
          <SettingsMenu />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Display, audio, controls and gameplay, each a tab. A setting is a
            row: its name and a line on the left, its control on the right,
            stacking on a phone. Controls lists the bindings as keys.
          </p>
          <p>
            <strong>Apply</strong> stays disabled until something changed.{" "}
            <strong>Hold to restore defaults</strong> has to be held, so a stray
            click never wipes a player's settings. Every value is local state:
            wire them to your own store.
          </p>
          <p>
            Built from <a href="/docs/tabs">Tabs</a>,{" "}
            <a href="/docs/select">Select</a>, <a href="/docs/slider">Slider</a>
            , <a href="/docs/switch">Switch</a>,{" "}
            <a href="/docs/radio-group">Radio group</a>,{" "}
            <a href="/docs/kbd">Kbd</a>, <a href="/docs/button">Button</a>,{" "}
            <a href="/docs/hold-button">Hold button</a>. It installs those with
            it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
