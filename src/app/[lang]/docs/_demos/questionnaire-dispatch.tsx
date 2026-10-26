"use client";

import { useState } from "react";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/zero/questionnaire";

export default function QuestionnaireDispatch() {
  const [sent, setSent] = useState("");
  return (
    <Questionnaire
      className="max-w-md"
      shortcuts="letters"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSent(`${data.get("route")} · ${data.getAll("cargo").join(", ")}`);
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="route" required>
        <QuestionnaireTitle>Which way to the north gate?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Gate 4 is shut tonight.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="canal">
            The canal
            <QuestionnaireChoiceDescription>
              18 minutes
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tower">
            Past Tower 9
            <QuestionnaireChoiceDescription>
              24 minutes, quieter
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError>Pick a way.</QuestionnaireError>
      </QuestionnaireItem>
      <QuestionnaireItem name="cargo" multiple>
        <QuestionnaireTitle>What else are you carrying?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="parcels">Parcels</QuestionnaireChoice>
          <QuestionnaireChoice value="cold-box">A cold box</QuestionnaireChoice>
          <QuestionnaireChoice value="nothing">
            Nothing else
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="note">
        <QuestionnaireTitle>A note for the gate?</QuestionnaireTitle>
        <QuestionnaireInput placeholder="Optional" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Send</QuestionnaireSubmit>
      </QuestionnaireActions>
      {sent ? (
        <p className="font-medium font-zero-text text-zero-accent text-zero-sm">
          Sent: {sent}
        </p>
      ) : null}
    </Questionnaire>
  );
}
