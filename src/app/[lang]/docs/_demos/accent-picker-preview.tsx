"use client";

import { useRef } from "react";
import { AccentPicker } from "@/components/zero/accent-picker";
import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Progress } from "@/components/zero/progress";
import { Switch } from "@/components/zero/switch";

export default function AccentPickerPreview() {
  // this demo recolours only the box below; without `target` it recolours the page
  const box = useRef<HTMLDivElement>(null);
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center gap-3">
        <AccentPicker
          target={() => box.current}
          storageKey={null}
          align="start"
          aria-label="Accent of the preview"
        />
        <span className="font-zero-text text-zero-sm text-zero-text-2">
          Twelve presets, or a colour of your own
        </span>
      </div>
      <div
        ref={box}
        data-zero-accent="lime"
        className="grid gap-5 border-(length:--zero-stroke) border-zero-ink bg-zero-surface p-5"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>Take the job</Button>
          <Badge>Rush</Badge>
          <Switch defaultChecked aria-label="Night routes" />
        </div>
        <Progress value={62} aria-label="Route done" />
      </div>
    </div>
  );
}
