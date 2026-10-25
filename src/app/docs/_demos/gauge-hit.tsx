"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";

export default function GaugeHit() {
  const [hull, setHull] = useState(84);
  return (
    <div className="grid w-full max-w-md gap-5">
      <Gauge value={hull} max={120} low={0.25}>
        <GaugeLabel>Hull</GaugeLabel>
        <GaugeValue />
      </Gauge>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="danger"
          size="sm"
          onClick={() => setHull((h) => Math.max(0, h - 26))}
        >
          Take a hit
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setHull((h) => Math.min(120, h + 30))}
        >
          Patch up
        </Button>
      </div>
    </div>
  );
}
