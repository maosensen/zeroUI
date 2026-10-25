import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import QuestionnaireDispatch from "../_demos/questionnaire-dispatch";

export const metadata = pageMetadata("/docs/questionnaire");

export default function QuestionnairePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/questionnaire")} />
      <DocHeader
        title="Questionnaire"
        lead="Questions asked one at a time in a conversation: a leaning question, its choices as rows, or a field to type in, then Previous, Skip and Next."
      />
      <DocSection id="install" title="Install">
        <Install item="questionnaire" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo
          file="questionnaire-dispatch"
          title="Three questions before the run"
        >
          <QuestionnaireDispatch />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            A choice row is a square box with a slanted well that fills with the
            accent: a check for several answers, a slab for one. With{" "}
            <code>shortcuts</code>, each row shows the key that picks it. A
            required question says so in red when left empty.
          </p>
          <p>
            It is @shadcn/react's questionnaire underneath, a form: read the
            answers on submit.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Questionnaire"
          rows={[
            {
              name: "shortcuts",
              type: '"letters" | "numbers"',
              description: "A key to pick each choice.",
            },
          ]}
        />
        <PropsTable
          part="QuestionnaireItem"
          rows={[
            {
              name: "name",
              type: "string",
              description: "The answer's name in the form.",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Cannot be skipped.",
            },
            {
              name: "multiple",
              type: "boolean",
              default: "false",
              description: "Several choices at once.",
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
