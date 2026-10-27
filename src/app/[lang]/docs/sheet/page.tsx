import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SheetSides from "../_demos/sheet-sides";

export const generateMetadata = metadataFor("/docs/sheet");

export default async function SheetPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/sheet")} />
      <DocHeader
        title="Sheet"
        lead={pick({
          en: "A dialog that slides in from an edge of the screen and holds on to it, the ink border on the edge facing the page.",
          zh: "从屏幕边缘滑入并贴边停靠的对话框，朝向页面的一侧带墨黑边框。",
        })}
      />
      <DocSection id="install">
        <Install item="sheet" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="sheet-sides"
          title={pick({
            en: "From the right, the left, the bottom",
            zh: "从右侧、左侧与底部滑入",
          })}
        >
          <SheetSides />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  It slides in on the reveal timing and out faster; under
                  reduced motion it only fades. Its footer is pinned to the far
                  end.
                </p>
                <p>
                  Header, title, description and body are the Dialog's own
                  parts, re-exported with Sheet names.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  滑入使用地基中展开动效的时长，滑出更快；系统开启「减少动态效果」时仅保留淡入淡出。底栏固定在面板末端。
                </p>
                <p>
                  标题栏、标题、描述与正文即 Dialog 的组成部分，以 Sheet
                  开头的名称重新导出。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="SheetContent"
          base={{
            name: "Dialog.Popup",
            href: "https://base-ui.com/react/components/dialog",
          }}
          rows={[
            {
              name: "side",
              type: '"right" | "left" | "top" | "bottom"',
              default: '"right"',
              description: pick({
                en: "The edge it slides in from.",
                zh: "从哪一侧滑入。",
              }),
            },
            {
              name: "showClose",
              type: "boolean",
              default: "true",
              description: pick({
                en: "The close button in the corner.",
                zh: "角落的关闭按钮。",
              }),
            },
            {
              name: "closeLabel",
              type: "string",
              default: '"Close"',
              description: pick({
                en: "The corner close button's name.",
                zh: "右上角关闭按钮的可访问名称。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
