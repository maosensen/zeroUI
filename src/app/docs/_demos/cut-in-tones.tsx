"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import {
  CutIn,
  CutInContent,
  CutInDescription,
  CutInEyebrow,
  CutInTitle,
} from "@/components/zero/cut-in";

const moments = {
  accent: ["Job taken", "Sealed crate", "Rail yards → North gate · 3,100 cr"],
  danger: ["Run failed", "Crate damaged", "The reward drops by half."],
  legendary: ["Found", "North gate seal", "Signs any job, anywhere."],
} as const;

type Tone = keyof typeof moments;

export default function CutInTones() {
  const [tone, setTone] = useState<Tone | null>(null);
  const [eyebrow, title, line] = moments[tone ?? "accent"];
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => setTone("accent")}>Take the job</Button>
      <Button variant="danger" onClick={() => setTone("danger")}>
        Fail the run
      </Button>
      <Button variant="secondary" onClick={() => setTone("legendary")}>
        Open the crate
      </Button>
      <CutIn
        open={tone !== null}
        onOpenChange={(open) => {
          if (!open) setTone(null);
        }}
      >
        <CutInContent tone={tone ?? "accent"}>
          <CutInEyebrow>{eyebrow}</CutInEyebrow>
          <CutInTitle>{title}</CutInTitle>
          <CutInDescription>{line}</CutInDescription>
        </CutInContent>
      </CutIn>
    </div>
  );
}
