import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import NativeSelectDistrict from "../_demos/native-select-district";

export const generateMetadata = metadataFor("/docs/native-select");

export default async function NativeSelectPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/native-select")} />
      <DocHeader
        title="Native select"
        lead={pick({
          en: "The browser's own select in Input's well, with zzzUI's chevron.",
          zh: "浏览器原生的 select，置于 Input 的输入槽中，配以 zzzUI 的下拉箭头。",
        })}
      />
      <DocSection id="install">
        <Install item="native-select" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="native-select-district"
          title={pick({ en: "Districts in two groups", zh: "分为两组的区域" })}
        >
          <NativeSelectDistrict />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Use it where a form must work without JavaScript or where the
                phone's own picker is wanted. Its list is drawn by the browser,
                so it does not take zzzUI's look; Select does.
              </p>
            ),
            zh: (
              <p>
                表单须在禁用 JavaScript
                时仍可使用，或需要调用手机原生选择器时，适合使用此组件。其下拉列表由浏览器绘制，不带
                zzzUI 的外观；需要该外观时，请使用 Select。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="NativeSelect"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "Input's heights.",
                zh: "与 Input 相同的高度档位。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges are cut on the slant.",
                zh: "斜切哪一侧。",
              }),
            },
          ]}
        />
        <PropsTable part="NativeSelectOption, NativeSelectOptGroup" rows={[]} />
      </DocSection>
    </>
  );
}
