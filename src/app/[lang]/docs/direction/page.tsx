import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DirectionRtl from "../_demos/direction-rtl";

export const generateMetadata = metadataFor("/docs/direction");

export default async function DirectionPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/direction")} />
      <DocHeader
        title="Direction"
        lead={pick({
          en: "Tells the components which way text runs, for right-to-left pages: Base UI's DirectionProvider, under zzzUI's name.",
          zh: "为从右到左书写的页面指明文字方向，供各组件读取。本组件即 Base UI 的 DirectionProvider，以 zzzUI 的名称重新导出。",
        })}
      />
      <DocSection id="install">
        <Install item="direction" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="direction-rtl"
          title={pick({ en: "Tabs, right to left", zh: "从右到左的 Tabs" })}
        >
          <DirectionRtl />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Arrow keys in menus, tabs, sliders and the like follow the
                  direction, and popups line up from the right. Set{" "}
                  <code>dir</code> on the page (or the element) as well.
                </p>
                <p>
                  The slant does not mirror: every cut leans the same way in any
                  language, since the lean belongs to the look, like the italic.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  在菜单、标签页、滑块等组件中，方向键的行为随文字方向调整，弹出层也改为右对齐。此外仍需在页面（或对应元素）上设置{" "}
                  <code>dir</code>。
                </p>
                <p>
                  斜切角度不随方向镜像：无论哪种语言，所有切角都朝同一方向倾斜，因为这种倾斜和斜体一样，属于视觉风格的一部分。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="DirectionProvider"
          base={{
            name: "DirectionProvider",
            href: "https://base-ui.com/react/components/direction-provider",
          }}
          rows={[
            {
              name: "direction",
              type: '"ltr" | "rtl"',
              default: '"ltr"',
              description: pick({
                en: "Which way text runs inside it.",
                zh: "其内部文字的书写方向。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
