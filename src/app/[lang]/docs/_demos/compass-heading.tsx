"use client";

import { useState } from "react";
import { Compass } from "@/components/zero/compass";
import { Slider } from "@/components/zero/slider";

const markers = [
  { bearing: 80, label: "Drop zone" },
  { bearing: 350, label: "North gate", tone: "legendary" as const },
  { bearing: 200, label: "Patrol", tone: "danger" as const },
];

export default function CompassHeading() {
  const [heading, setHeading] = useState(30);
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Compass heading={heading} markers={markers} />
      <Slider
        value={heading}
        onValueChange={(value) => setHeading(value as number)}
        min={0}
        max={359}
        aria-label="Turn"
      />
    </div>
  );
}
