import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A key to press: a small raised slab cut on both sides, with the key's name in the text face.",
          zh: "标示一个按键：浮起色、两端带切角的小号斜切块，键名使用正文字体。",
        })}
      />
      <DocSection id="install">
        <Install item="kbd" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="kbd-shortcuts"
          title={pick({ en: "Keys in a sentence", zh: "句中的按键" })}
        >
          <KbdShortcuts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It is sized in em, so it follows the text around it. KbdGroup
                sets the keys of a chord close together.
              </p>
            ),
            zh: (
              <p>
                尺寸以 em 为单位，随周围文字缩放。KbdGroup
                将组合键的各个键紧凑排列。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="Kbd, KbdGroup" rows={[]} />
      </DocSection>
    </>
  );
}
