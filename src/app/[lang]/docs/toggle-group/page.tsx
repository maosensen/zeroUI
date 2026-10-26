import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ToggleGroupDistricts from "../_demos/toggle-group-districts";

export const generateMetadata = metadataFor("/docs/toggle-group");

export default async function ToggleGroupPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/toggle-group")} />
      <DocHeader
        title="Toggle group"
        lead={pick({
          en: "A row of toggles that share one value: each is a slab cut on both sides, so the row nests like the tabs.",
          zh: "共享同一个值的一排 Toggle：每一项都是两端带切角的斜切块，因此能像 Tabs 那样彼此嵌合。",
        })}
      />
      <DocSection id="install">
        <Install item="toggle-group" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="toggle-group-districts"
          title={pick({
            en: "One view, several districts",
            zh: "视图单选，街区多选",
          })}
        >
          <ToggleGroupDistricts />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Pick one, or several with <code>multiple</code>. Arrow keys move
                between items. Set the variant and size once on the group.
              </p>
            ),
            zh: (
              <p>
                默认单选，传入 <code>multiple</code>{" "}
                后可多选。用方向键在各项间切换焦点。变体与尺寸在组上统一设置一次即可。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="ToggleGroup"
          base={{
            name: "ToggleGroup",
            href: "https://base-ui.com/react/components/toggle-group",
          }}
          rows={[
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Lets several items be on.",
                zh: "允许多项同时开启。",
              }),
            },
            {
              name: "value / defaultValue",
              type: "string[]",
              description: pick({
                en: "The items that are on.",
                zh: "处于开启状态的项。",
              }),
            },
            {
              name: "variant, size",
              type: "Toggle's",
              description: pick({
                en: "For every item.",
                zh: "应用于所有项。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ToggleGroupItem"
          base={{
            name: "Toggle",
            href: "https://base-ui.com/react/components/toggle",
          }}
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "Its value in the group.",
                zh: "该项在组中的值。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
