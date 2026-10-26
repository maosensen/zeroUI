import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import KbdShortcuts from "../_demos/kbd-shortcuts";

export const generateMetadata = metadataFor("/docs/kbd");

export default async function KbdPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/kbd")} />
      <DocHeader
        title="Kbd"
        lead="A key to press: a small raised slab cut on both sides, with the key's name in the text face."
      />
      <DocSection id="install">
        <Install item="kbd" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="kbd-shortcuts" title="Keys in a sentence">
          <KbdShortcuts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            It is sized in em, so it follows the text around it. KbdGroup sets
            the keys of a chord close together.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="Kbd, KbdGroup" rows={[]} />
      </DocSection>
    </>
  );
}
