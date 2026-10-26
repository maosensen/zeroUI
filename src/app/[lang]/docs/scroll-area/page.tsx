import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ScrollAreaLog from "../_demos/scroll-area-log";

export const generateMetadata = metadataFor("/docs/scroll-area");

export default async function ScrollAreaPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/scroll-area")} />
      <DocHeader
        title="Scroll area"
        lead={pick({
          en: "A box that scrolls with zzzUI's own bars: a thin track and a slanted thumb that leans like a slab.",
          zh: "使用 zzzUI 自有滚动条的滚动区域：细窄的轨道，配以与斜切块同样倾斜的滑块。",
        })}
      />
      <DocSection id="install">
        <Install item="scroll-area" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="scroll-area-log"
          title={pick({ en: "A route log", zh: "路线日志" })}
        >
          <ScrollAreaLog />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The bars stay out of sight until the box is pointed at or
                  scrolled, and the thumb lights to the accent while it is held.
                  The wheel, touch and the keyboard scroll as usual; the
                  viewport can take focus to scroll by keys.
                </p>
                <p>
                  Give the ScrollArea a height (or a max height); its content
                  scrolls inside it, either way.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  滚动条平时隐藏，指针悬停或滚动时才出现；按住滑块时，滑块变为强调色。滚轮、触摸与键盘均可照常滚动；视口可获得焦点，以便通过键盘滚动。
                </p>
                <p>需为 ScrollArea 设置高度或最大高度，内容在其内部滚动。</p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ScrollArea"
          base={{
            name: "ScrollArea.Root",
            href: "https://base-ui.com/react/components/scroll-area",
          }}
          rows={[]}
        />
        <PropsTable
          part="ScrollBar"
          base={{
            name: "ScrollArea.Scrollbar",
            href: "https://base-ui.com/react/components/scroll-area",
          }}
          rows={[
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              default: '"vertical"',
              description: pick({
                en: "ScrollArea draws both; use it alone to build your own.",
                zh: "ScrollArea 会同时绘制横向与纵向滚动条；单独使用 ScrollBar 可自行搭建滚动区域。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
