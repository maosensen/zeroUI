import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import HoverCardDriver from "../_demos/hover-card-driver";

export const generateMetadata = metadataFor("/docs/hover-card");

export default async function HoverCardPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/hover-card")} />
      <DocHeader
        title="Hover card"
        lead={pick({
          en: "A preview of what a link leads to, opening while the link is pointed at or focused: the Popover's panel, a little apart from it.",
          zh: "链接目标的预览，在指针悬停于链接或链接获得焦点时打开：沿用 Popover 的面板，与链接之间略有间距。",
        })}
      />
      <DocSection id="install">
        <Install item="hover-card" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="hover-card-driver"
          title={pick({
            en: "A driver behind a name",
            zh: "悬停姓名查看司机资料",
          })}
        >
          <HoverCardDriver />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It grows out of the link and folds back faster. Keep it to what
                pointer users can do without; anything needed belongs on the
                page or in a Popover.
              </p>
            ),
            zh: (
              <p>
                面板从链接处展开，收起时更快。其中只放不看也无妨的补充信息；必需的内容应放在页面上或
                Popover 中。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="HoverCardContent"
          base={{
            name: "PreviewCard.Popup",
            href: "https://base-ui.com/react/components/preview-card",
          }}
          rows={[
            {
              name: "side",
              type: '"top" | "bottom" | "left" | "right"',
              default: '"bottom"',
              description: pick({
                en: "Where it opens from the link.",
                zh: "相对于链接的弹出方向。",
              }),
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: pick({
                en: "How it lines up with the link.",
                zh: "与链接的对齐方式。",
              }),
            },
          ]}
        />
        <PropsTable
          part="HoverCard, HoverCardTrigger"
          base={{
            name: "PreviewCard.Root",
            href: "https://base-ui.com/react/components/preview-card",
          }}
          rows={[
            {
              name: "delay",
              type: "number",
              default: "600",
              description: pick({
                en: "Milliseconds before it opens.",
                zh: "打开前的延迟（毫秒）。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
