"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";

export default function GlitchHeading() {
  const [run, setRun] = useState(0);
  return (
    <div className="grid justify-items-start gap-6">
      <h3
        key={run}
        className="glitch origin-left rotate-(--zero-tilt) font-black font-zero text-zero-3xl italic"
      >
        Signal lost
      </h3>
      <Button variant="secondary" size="sm" onClick={() => setRun(run + 1)}>
        Again
      </Button>
    </div>
  );
}
