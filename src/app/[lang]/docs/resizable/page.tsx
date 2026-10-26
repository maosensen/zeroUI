import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ResizablePanes from "../_demos/resizable-panes";

export const generateMetadata = metadataFor("/docs/resizable");

export default async function ResizablePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/resizable")} />
      <DocHeader
        title="Resizable"
        lead={pick({
          en: "Panels whose shared edge can be dragged: the quiet line, lit with the accent while pointed at or dragged.",
          zh: "可拖动相邻边界来调整大小的面板：边界是一条淡色细线，悬停或拖动时以强调色高亮。",
        })}
      />
      <DocSection id="install">
        <Install item="resizable" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="resizable-panes"
          title={pick({ en: "Three panes", zh: "三栏面板" })}
        >
          <ResizablePanes />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                The grip is wider than the line. From the keyboard, focus the
                edge and use the arrow keys. <code>withHandle</code> puts a
                slanted grip on it. It is react-resizable-panels underneath:
                sizes take pixels or percentages, and groups nest.
              </p>
            ),
            zh: (
              <p>
                可拖动的范围比细线本身更宽。使用键盘时，先聚焦边界，再按方向键调整。
                <code>withHandle</code> 会在边界上添加一个斜切手柄。底层是
                react-resizable-panels：尺寸可用像素或百分比，面板组可以嵌套。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ResizablePanelGroup"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pick({
                en: "Which way the panels sit.",
                zh: "面板的排列方向。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ResizablePanel"
          rows={[
            {
              name: "defaultSize / minSize / maxSize",
              type: "number | string",
              description: pick({
                en: "Pixels, or a percentage as a string.",
                zh: "像素值，或以字符串表示的百分比。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ResizableHandle"
          rows={[
            {
              name: "withHandle",
              type: "boolean",
              default: "false",
              description: pick({
                en: "A slanted grip on the edge.",
                zh: "在边界上显示斜切手柄。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
