import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SwitchBasic from "../_demos/switch-basic";

export const generateMetadata = metadataFor("/docs/switch");

export default async function SwitchPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/switch")} />
      <DocHeader
        title="Switch"
        lead={pick({
          en: "A slanted track with a slab inside it. Turned on, the track fills with the accent and the slab springs across to the other end, parallel to the track's cut at both.",
          zh: "斜切的轨道内嵌一块斜切块。开启时轨道填充强调色，斜切块弹到另一端；无论停在哪一端，斜切块都与轨道的切角平行。",
        })}
      />
      <DocSection id="install">
        <Install item="switch" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="switch-basic"
          title={pick({ en: "On, off, and larger", zh: "开启、关闭与大尺寸" })}
        >
          <SwitchBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The slab slides on the release timing, past its stop and back.
                  Sized in em: beside larger text the whole switch is larger.
                </p>
                <p>
                  Use a Switch for something that takes effect at once (night
                  routes on); use a Checkbox for a choice that is submitted with
                  a form.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  斜切块滑动时带回弹：越过终点后再退回。尺寸以 em
                  为单位：旁边的文字越大，整个开关越大。
                </p>
                <p>
                  立即生效的设置（如开启夜间路线）用
                  Switch；随表单一同提交的选项用 Checkbox。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Switch"
          base={{
            name: "Switch.Root",
            href: "https://base-ui.com/react/components/switch",
          }}
          rows={[
            {
              name: "checked",
              type: "boolean",
              description: pick({
                en: "On, controlled; with onCheckedChange.",
                zh: "是否开启（受控），配合 onCheckedChange 使用。",
              }),
            },
            {
              name: "defaultChecked",
              type: "boolean",
              default: "false",
              description: pick({
                en: "On, uncontrolled.",
                zh: "默认是否开启（非受控）。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
