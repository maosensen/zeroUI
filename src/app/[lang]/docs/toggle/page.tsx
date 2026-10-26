import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToggleBasic from "../_demos/toggle-basic";

export const generateMetadata = metadataFor("/docs/toggle");

export default async function TogglePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/toggle")} />
      <DocHeader
        title="Toggle"
        lead={pick({
          en: "A Button that stays down: a ghost or raised slab while off, filled with the accent while on.",
          zh: "按下后保持按下状态的 Button：关闭时为透明或浮起色的斜切块，开启时填充强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="toggle" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="toggle-basic"
          title={pick({ en: "On, off, and an icon", zh: "开启、关闭与图标" })}
        >
          <ToggleBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It has Button's sizes and cuts and presses the same way. It
                reports its state as <code>aria-pressed</code>; give an
                icon-only toggle an <code>aria-label</code>.
              </p>
            ),
            zh: (
              <p>
                尺寸、切角与按下效果均与 Button 相同。状态通过{" "}
                <code>aria-pressed</code> 告知辅助技术；仅含图标的 Toggle 需提供{" "}
                <code>aria-label</code>。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Toggle"
          base={{
            name: "Toggle",
            href: "https://base-ui.com/react/components/toggle",
          }}
          rows={[
            {
              name: "variant",
              type: '"ghost" | "secondary"',
              default: '"ghost"',
              description: pick({
                en: "Its look while off.",
                zh: "关闭时的外观。",
              }),
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "Button's heights.",
                zh: "与 Button 相同的高度。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges are cut on the slant.",
                zh: "斜切位置：末端、起始端、两端或不斜切。",
              }),
            },
            {
              name: "pressed / defaultPressed",
              type: "boolean",
              default: "false",
              description: pick({
                en: "On, controlled or not.",
                zh: "是否开启，受控或非受控。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
