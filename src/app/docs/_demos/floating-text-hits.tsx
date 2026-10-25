"use client";

import { useRef } from "react";
import { Button } from "@/components/zero/button";
import {
  FloatingTextLayer,
  useFloatingText,
} from "@/components/zero/floating-text";
import { CrateIcon } from "@/components/zero/icons/crate";

export default function FloatingTextHits() {
  const floats = useFloatingText();
  // a little scatter, so hits in a row do not stack on one spot
  const hits = useRef(0);
  const at = () => {
    hits.current += 1;
    return {
      x: 120 + ((hits.current * 37) % 70) - 35,
      y: 76 - (hits.current % 3) * 14,
    };
  };
  return (
    <div className="grid justify-items-center gap-5">
      <div className="relative grid h-36 w-60 place-items-center border-(length:--zero-stroke-thin) border-zero-line bg-zero-void">
        <CrateIcon className="size-16 text-zero-text-2" />
        <FloatingTextLayer floats={floats} />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => floats.spawn({ text: "−18", ...at() })}
        >
          Hit
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => floats.spawn({ text: "−54", kind: "crit", ...at() })}
        >
          Critical
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => floats.spawn({ text: "+30", kind: "heal", ...at() })}
        >
          Repair
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            floats.spawn({ text: "Sealed!", kind: "info", ...at() })
          }
        >
          Seal
        </Button>
      </div>
    </div>
  );
}
