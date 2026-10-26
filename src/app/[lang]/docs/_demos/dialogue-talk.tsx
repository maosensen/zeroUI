"use client";

import { useState } from "react";
import {
  Dialogue,
  DialogueChoice,
  DialogueChoices,
  DialogueNext,
  DialogueSpeaker,
  DialogueText,
} from "@/components/zero/dialogue";

const script = [
  {
    who: "Mara",
    line: "You're late. The gate shuts at two, and the crates are still at the yards.",
  },
  {
    who: "Mara",
    line: "Rook says the river road is watched tonight. Your call, courier.",
  },
];

const replies = [
  {
    say: "We take the river road. It's faster.",
    answer: "Fast and loud. Keep your shield charged.",
  },
  {
    say: "We go round by the old market.",
    answer: "Slower, but nobody looks twice at the market.",
  },
  {
    say: "Who's watching it?",
    answer: "Nobody you want to meet. Pick a road.",
  },
];

export default function DialogueTalk() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const line = answer ?? script[step].line;
  const asking = answer === null && step === script.length - 1;
  return (
    <Dialogue aria-label="Conversation with Mara" className="w-full max-w-2xl">
      <DialogueSpeaker>{answer ? "Mara" : script[step].who}</DialogueSpeaker>
      <DialogueText key={line} onDone={() => setTyped(line)}>
        {line}
      </DialogueText>
      {/* the replies wait for the line; until then, Continue shows the rest */}
      {asking && typed === line ? (
        <DialogueChoices>
          {replies.map((reply, index) => (
            <DialogueChoice
              key={reply.say}
              index={index + 1}
              onClick={() => setAnswer(reply.answer)}
            >
              {reply.say}
            </DialogueChoice>
          ))}
        </DialogueChoices>
      ) : (
        <DialogueNext
          onClick={() => {
            if (answer) {
              setAnswer(null);
              setStep(0);
            } else setStep((s) => s + 1);
          }}
        >
          {answer ? "Start over" : "Continue"}
        </DialogueNext>
      )}
    </Dialogue>
  );
}
