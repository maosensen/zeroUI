import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RadioGroupBasic from "../_demos/radio-group-basic";

export const generateMetadata = metadataFor("/docs/radio-group");

export default async function RadioGroupPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/radio-group")} />
      <DocHeader
        title="Radio group"
        lead={pick({
          en: "One choice of several. Each radio is the same small slanted well as a checkbox; the chosen one holds a slab of the accent, nested inside it like the Tabs slab in its track.",
          zh: "多选一。每个单选按钮与复选框一样，是一个小号斜切凹槽；选中项内嵌一块强调色斜切块，如同 Tabs 的斜切块嵌在轨道中。",
        })}
      />
      <DocSection id="install">
        <Install item="radio-group" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="radio-group-basic"
          title={pick({ en: "One shift of three", zh: "三个班次选其一" })}
        >
          <RadioGroupBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A checkbox fills, a radio holds a slab, so the two never read
                  alike. The slab springs in on the release timing.
                </p>
                <p>
                  Arrow keys move the choice within the group. Wrap each radio
                  in a <code>&lt;label&gt;</code> with its text.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  复选框选中时整体填充，单选按钮选中时内嵌斜切块，两者因此不会混淆。斜切块带回弹弹入。
                </p>
                <p>
                  按方向键可在组内切换选中项。每个单选按钮应与其文字一同包在{" "}
                  <code>&lt;label&gt;</code> 中。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="RadioGroup"
          base={{
            name: "RadioGroup",
            href: "https://base-ui.com/react/components/radio",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "The chosen value, controlled; with onValueChange.",
                zh: "选中的值（受控），配合 onValueChange 使用。",
              }),
            },
            {
              name: "defaultValue",
              type: "string",
              description: pick({
                en: "The chosen value, uncontrolled.",
                zh: "默认选中的值（非受控）。",
              }),
            },
          ]}
        />
        <PropsTable
          part="RadioGroupItem"
          base={{
            name: "Radio.Root",
            href: "https://base-ui.com/react/components/radio",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "The value this radio stands for.",
                zh: "该单选按钮对应的值。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
