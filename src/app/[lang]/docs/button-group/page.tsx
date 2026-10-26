import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ButtonGroupActions from "../_demos/button-group-actions";

export const generateMetadata = metadataFor("/docs/button-group");

export default async function ButtonGroupPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/button-group")} />
      <DocHeader
        title="Button group"
        lead={pick({
          en: "Buttons that belong together, set close and cut on both sides so their slanted edges nest, like the tabs.",
          zh: "一组相关的按钮，紧密排列、两侧斜切，斜边彼此嵌合，做法与 Tabs 相同。",
        })}
      />
      <DocSection id="install">
        <Install item="button-group" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="button-group-actions"
          title={pick({ en: "Actions, and a pager", zh: "操作组，以及分页器" })}
        >
          <ButtonGroupActions />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                Whatever cut each Button asks for, inside a group it is cut on
                both sides. ButtonGroupText puts a label in the row as a black
                well the height of the buttons.
              </p>
            ),
            zh: (
              <p>
                无论各个 Button
                设置的是哪种切角，在组内一律两侧斜切。ButtonGroupText
                在行内放置一段标签，呈现为与按钮等高的黑色凹槽。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable part="ButtonGroup, ButtonGroupText" rows={[]} />
      </DocSection>
    </>
  );
}
