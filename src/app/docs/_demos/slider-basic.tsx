"use client";

import { useState } from "react";
import { Slider } from "@/components/zero/slider";

export default function SliderBasic() {
  const [volume, setVolume] = useState(40);
  const [hours, setHours] = useState([9, 17]);
  return (
    <div className="grid w-full max-w-md gap-6">
      <div className="grid gap-2">
        <span className="flex justify-between font-bold font-zero text-zero-sm text-zero-text-2 italic">
          Radio volume
          <span className="text-zero-text tabular-nums">{volume}</span>
        </span>
        <Slider
          value={volume}
          onValueChange={(value) => setVolume(value as number)}
          aria-label="Radio volume"
        />
      </div>
      <div className="grid gap-2">
        <span className="flex justify-between font-bold font-zero text-zero-sm text-zero-text-2 italic">
          On duty
          <span className="text-zero-text tabular-nums">
            {hours[0]}:00 – {hours[1]}:00
          </span>
        </span>
        <Slider
          value={hours}
          onValueChange={(value) => setHours(value as number[])}
          min={0}
          max={24}
          minStepsBetweenValues={1}
          aria-label="On duty"
        />
      </div>
    </div>
  );
}
