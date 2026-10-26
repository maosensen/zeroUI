import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import LabelBasic from "../_demos/label-basic";

export const generateMetadata = metadataFor("/docs/label");

export default async function LabelPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/label")} />
      <DocHeader
        title="Label"
        lead={pick({
          en: "A control's name outside a Field, in the Field label's leaning type.",
          zh: "Field 之外的控件名称，沿用 Field 标签的斜体字。",
        })}
      />
      <DocSection id="install">
        <Install item="label" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="label-basic"
          title={pick({
            en: "Beside a checkbox and a switch",
            zh: "复选框与开关旁的标签",
          })}
        >
          <LabelBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Wrap the control in it, or point at it with <code>htmlFor</code>
                . It dims with a disabled control inside it. Inside a Field, use
                FieldLabel, which also follows focus and errors.
              </p>
            ),
            zh: (
              <p>
                将控件包在其中，或通过 <code>htmlFor</code>{" "}
                指向控件。内部的控件禁用时，标签随之变暗。在 Field 中请改用
                FieldLabel，它还会响应聚焦与校验错误。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="Label" rows={[]} />
      </DocSection>
    </>
  );
}
