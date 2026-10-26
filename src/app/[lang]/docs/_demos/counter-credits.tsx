"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { Counter } from "@/components/zero/counter";

export default function CounterCredits() {
  const [credits, setCredits] = useState(12480);
  return (
    <div className="grid justify-items-start gap-5">
      <p className="flex items-baseline gap-2">
        <Counter value={credits} delta className="text-zero-2xl" />
        <span className="font-black font-zero text-zero-accent text-zero-md italic">
          cr
        </span>
      </p>
      <div className="flex flex-wrap gap-3">
        <Button size="sm" onClick={() => setCredits((c) => c + 3100)}>
          Deliver the crate
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCredits((c) => c - 450)}
        >
          Pay for repairs
        </Button>
      </div>
    </div>
  );
}
