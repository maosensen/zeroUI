import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TooltipBasic from "../_demos/tooltip-basic";

export const generateMetadata = metadataFor("/docs/tooltip");

export default async function TooltipPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/tooltip")} />
      <DocHeader
        title="Tooltip"
        lead={pick({
          en: "A short label on a light slab cut on both sides. One line only: its height is known, so it can be a slab rather than a panel.",
          zh: "显示在浅色斜切块上的简短标签。仅限单行：高度固定，因此能用斜切块而非面板来承载。",
        })}
      />
      <DocSection id="install">
        <Install item="tooltip" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="tooltip-basic"
          title={pick({ en: "Three sides", zh: "三个方向" })}
        >
          <TooltipBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  It opens on hover and on keyboard focus after a short delay,
                  and closes when the pointer leaves. Inside one
                  TooltipProvider, moving from one trigger to the next opens the
                  next tooltip at once.
                </p>
                <p>
                  Keep it to a few words; anything longer belongs in a Popover.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  指针悬停或键盘聚焦时，经过短暂延迟后显示；指针移开即隐藏。在同一个
                  TooltipProvider
                  内，从一个触发器移到下一个时，下一个提示会立即显示。
                </p>
                <p>内容控制在几个字以内；更长的内容应放入 Popover。</p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="TooltipContent"
          base={{
            name: "Tooltip.Popup",
            href: "https://base-ui.com/react/components/tooltip",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"top"',
              description: pick({
                en: "Where it opens from the trigger.",
                zh: "相对触发器的显示方向。",
              }),
            },
          ]}
        />
        <PropsTable
          part="TooltipProvider"
          base={{
            name: "Tooltip.Provider",
            href: "https://base-ui.com/react/components/tooltip",
          }}
          rows={[
            {
              name: "delay",
              type: "number",
              default: "400",
              description: pick({
                en: "Milliseconds of hover before the first tooltip opens.",
                zh: "首个提示显示前需要悬停的毫秒数。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
