import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ButtonCuts from "../_demos/button-cuts";
import ButtonIcon from "../_demos/button-icon";
import ButtonSizes from "../_demos/button-sizes";
import ButtonVariants from "../_demos/button-variants";

export const generateMetadata = metadataFor("/docs/button");

export default async function ButtonPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/button")} />
      <DocHeader
        title="Button"
        lead={pick({
          en: "A slab with a label, cut on the slant and outlined in ink. It drops when pressed and springs back past its rest.",
          zh: "一块带文字的斜切块，边缘斜切，墨黑描边。按下时收缩，松开后回弹，越过原位再落定。",
        })}
      />
      <DocSection id="install">
        <Install item="button" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="button-variants"
          title={pick({ en: "Variants", zh: "变体" })}
        >
          <ButtonVariants />
        </Demo>
        <Demo file="button-sizes" title={pick({ en: "Sizes", zh: "尺寸" })}>
          <ButtonSizes />
        </Demo>
        <Demo file="button-cuts" title={pick({ en: "Cuts", zh: "切角" })}>
          <ButtonCuts />
        </Demo>
        <Demo
          file="button-icon"
          title={pick({
            en: "With an icon, and disabled",
            zh: "带图标，以及禁用状态",
          })}
        >
          <ButtonIcon />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Pressing shrinks the slab in 70 ms and lets it spring back
                  past its rest in 240 ms. Pointing at it sends a band of light
                  across along the slant; there is no sheen on touch screens or
                  when the system asks for reduced motion, and the press does
                  not shrink then either.
                </p>
                <p>
                  Keyboard focus swaps the outline for the selection frame:
                  yellow, with a dark gap inside it so it reads against the lime
                  fill too.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  按下时，斜切块在 70 ms 内收缩；松开后在 240 ms
                  内回弹，越过原位再落定。指针悬停时，一道高光沿斜切方向扫过。在触屏设备上，或系统开启「减少动态效果」时，不显示高光，按下也不再收缩。
                </p>
                <p>
                  通过键盘聚焦时，描边换成焦点框：黄色，内侧留一道墨黑间隙，在强调色的填充上同样清晰可辨。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Button"
          base={{
            name: "Button",
            href: "https://base-ui.com/react/components/button",
          }}
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "danger" | "ghost"',
              default: '"primary"',
              description: pick({
                en: "The fill: the accent, a quiet charcoal, a dark slab outlined in danger, or nothing until pointed at.",
                zh: "填充：强调色、炭灰、深色底加危险色描边，或悬停前不填充。",
              }),
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "32, 40 or 52 px tall. The label and an icon inside follow.",
                zh: "高 32、40 或 52 px，文字与图标随之缩放。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges are cut on the slant. Two slabs cut on facing edges nest into each other.",
                zh: "斜切哪一侧。两块在相对的一侧斜切时，可以彼此嵌合。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
