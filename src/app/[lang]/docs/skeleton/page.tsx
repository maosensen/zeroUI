import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SkeletonCard from "../_demos/skeleton-card";

export const generateMetadata = metadataFor("/docs/skeleton");

export default async function SkeletonPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/skeleton")} />
      <DocHeader
        title="Skeleton"
        lead={pick({
          en: "A stand-in for something still loading: a quiet grey shape with a faint band of light dragged along the slant across it.",
          zh: "内容加载期间的占位图形：暗灰色的形状，一道淡淡的光带沿斜切方向从表面掠过。",
        })}
      />
      <DocSection id="install">
        <Install item="skeleton" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="skeleton-card"
          title={pick({ en: "A card still loading", zh: "加载中的卡片" })}
        >
          <SkeletonCard />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Three shapes: a block for pictures and cards, a line for a
                  line of text, cut on both sides like a slab, and a slab the
                  size of a control. Size each like the thing it stands for;
                  SkeletonText stacks lines, the last one short.
                </p>
                <p>
                  Skeletons are hidden from assistive technology; mark the
                  region that is loading with <code>aria-busy</code>. Under
                  reduced motion the light does not move.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  共有三种形状：矩形块，用于图片与卡片；线条，代表一行文字，像斜切块一样两端斜切；以及控件大小的斜切块。每种形状的尺寸按它所替代的内容设定；SkeletonText
                  堆叠多行线条，最后一行较短。
                </p>
                <p>
                  骨架屏对辅助技术隐藏，正在加载的区域应标注{" "}
                  <code>aria-busy</code>
                  。系统开启「减少动态效果」时光带保持静止。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Skeleton"
          rows={[
            {
              name: "shape",
              type: '"block" | "line" | "slab"',
              default: '"block"',
              description: pick({
                en: "A rectangle, a thin slanted line of text, or a control-sized slab.",
                zh: "矩形块、代表一行文字的倾斜细线条，或控件大小的斜切块。",
              }),
            },
          ]}
        />
        <PropsTable
          part="SkeletonText"
          rows={[
            {
              name: "lines",
              type: "number",
              default: "3",
              description: pick({ en: "How many lines.", zh: "行数。" }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
