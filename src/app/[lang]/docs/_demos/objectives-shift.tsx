"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import {
  Objective,
  ObjectiveCount,
  ObjectiveDescription,
  type ObjectiveState,
  Objectives,
  ObjectivesHeader,
  ObjectiveTitle,
} from "@/components/zero/objectives";

const steps = [
  "Reach the rail yards",
  "Load the sealed crates",
  "Cross the river before the gate shuts",
  "Hand over at the North gate",
];

export default function ObjectivesShift() {
  const [step, setStep] = useState(1);
  const [crates, setCrates] = useState(2);
  const [failed, setFailed] = useState(false);
  const state = (index: number): ObjectiveState =>
    index < step
      ? "done"
      : index === step
        ? failed
          ? "failed"
          : "active"
        : "pending";
  const advance = () => {
    if (step === 1 && crates < 5) setCrates((n) => n + 1);
    else setStep((s) => Math.min(steps.length, s + 1));
  };
  return (
    <div className="grid justify-items-start gap-5">
      <Objectives aria-label="Night shift">
        <ObjectivesHeader>Night shift</ObjectivesHeader>
        {steps.map((title, index) => (
          <Objective key={title} state={state(index)}>
            <ObjectiveTitle>{title}</ObjectiveTitle>
            {index === 1 ? <ObjectiveCount>{crates} / 5</ObjectiveCount> : null}
            {index === 2 && state(index) === "active" ? (
              <ObjectiveDescription>
                The gate shuts at 02:00.
              </ObjectiveDescription>
            ) : null}
          </Objective>
        ))}
      </Objectives>
      <div className="flex flex-wrap gap-3">
        <Button size="sm" onClick={advance} disabled={failed}>
          Next
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setFailed(true)}
          disabled={failed || step >= steps.length}
        >
          Fail it
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setStep(1);
            setCrates(2);
            setFailed(false);
          }}
        >
          Start over
        </Button>
      </div>
    </div>
  );
}
