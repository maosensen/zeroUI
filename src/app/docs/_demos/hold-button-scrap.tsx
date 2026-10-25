"use client";

import { useState } from "react";
import { HoldButton } from "@/components/zero/hold-button";
import { Kbd } from "@/components/zero/kbd";

export default function HoldButtonScrap() {
  const [scrapped, setScrapped] = useState(0);
  return (
    <div className="grid justify-items-start gap-4">
      <div className="flex flex-wrap gap-3">
        <HoldButton hotkey="x" onConfirm={() => setScrapped((n) => n + 1)}>
          <Kbd>X</Kbd> Hold to scrap
        </HoldButton>
        <HoldButton variant="danger" duration={2000}>
          Abandon the run
        </HoldButton>
      </div>
      <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
        Crates scrapped: <span className="text-zero-text">{scrapped}</span>
      </p>
    </div>
  );
}
