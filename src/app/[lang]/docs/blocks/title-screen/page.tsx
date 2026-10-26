import { TitleScreen } from "@/components/blocks/title-screen";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/title-screen");

export default async function TitleScreenPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/title-screen")} />
      <DocHeader
        title="Title screen"
        lead="A game title screen for React: the name big and glitching in, a menu moved through with the arrow keys, news in a corner, and the keys along the bottom."
      />
      <DocSection id="install">
        <Install item="title-screen" />
      </DocSection>
      <DocSection id="preview">
        <Block name="title-screen">
          <TitleScreen />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The menu is a column of buttons; the arrow keys move focus between
            them, so the mouse, Tab and the keys agree on which is chosen, lit
            with the accent and a marker, its line shown beneath.{" "}
            <code>onChoose</code> gets the entry's id.
          </p>
          <p>
            The title sizes itself to the block's width (container units) and
            glitches in once. The backdrop is drawn: put your key art behind it.
          </p>
          <p>
            Built from <a href={link("/docs/badge")}>Badge</a>,{" "}
            <a href={link("/docs/kbd")}>Kbd</a>. It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
