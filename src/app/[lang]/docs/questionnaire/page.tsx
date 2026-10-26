import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import QuestionnaireDispatch from "../_demos/questionnaire-dispatch";

export const generateMetadata = metadataFor("/docs/questionnaire");

export default async function QuestionnairePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/questionnaire")} />
      <DocHeader
        title="Questionnaire"
        lead={pick({
          en: "Questions asked one at a time in a conversation: a leaning question, its choices as rows, or a field to type in, then Previous, Skip and Next.",
          zh: "在对话中逐题提问：斜体的问题，下方是逐行排列的选项或输入框，最后是 Previous、Skip 与 Next 三个按钮。",
        })}
      />
      <DocSection id="install">
        <Install item="questionnaire" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="questionnaire-dispatch"
          title={pick({
            en: "Three questions before the run",
            zh: "出发前的三个问题",
          })}
        >
          <QuestionnaireDispatch />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A choice row is a square box with a slanted well that fills
                  with the accent: a check for several answers, a slab for one.
                  With <code>shortcuts</code>, each row shows the key that picks
                  it. A required question says so in red when left empty.
                </p>
                <p>
                  It is @shadcn/react's questionnaire underneath, a form: read
                  the answers on submit.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个选项行带一个方框，框内的斜切凹槽在选中时以强调色填充：多选题显示对勾，单选题显示斜切块。设置{" "}
                  <code>shortcuts</code>{" "}
                  后，每行显示选择该项所用的按键。必答题未作答时，以红色文字提示。
                </p>
                <p>
                  底层是 @shadcn/react 的
                  questionnaire，本身即是一个表单：提交时读取答案即可。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Questionnaire"
          rows={[
            {
              name: "shortcuts",
              type: '"letters" | "numbers"',
              description: pick({
                en: "A key to pick each choice.",
                zh: "为每个选项分配一个选择按键。",
              }),
            },
          ]}
        />
        <PropsTable
          part="QuestionnaireItem"
          rows={[
            {
              name: "name",
              type: "string",
              description: pick({
                en: "The answer's name in the form.",
                zh: "答案在表单中的字段名。",
              }),
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: pick({ en: "Cannot be skipped.", zh: "不可跳过。" }),
            },
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Several choices at once.",
                zh: "允许多选。",
              }),
            },
          ]}
        />
        <PropsTable
          part="QuestionnaireProgress, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireInput, QuestionnaireError, QuestionnaireActions, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, QuestionnaireSubmit"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
