"use client";

import { useRef } from "react";
import { AccentSwitch } from "@/components/zero/accent-switch";
import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Progress } from "@/components/zero/progress";
import { Switch } from "@/components/zero/switch";
import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

export default function AccentSwitchPreview() {
  // this demo recolours only the box below; without `target` it recolours the page
  const box = useRef<HTMLDivElement>(null);
  return (
    <div className="grid w-full max-w-md gap-4">
      {/* five of the twelve: the ones clear of every rarity tier's hue */}
      <AccentSwitch
        accents={["lime", "cyan", "magenta", "leaf", "mono"]}
        target={() => box.current}
        storageKey={null}
        aria-label="Accent of the preview"
      />
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
        <Tabs defaultValue="open" size="sm">
          <TabsList>
            <TabsTab value="open">Open</TabsTab>
            <TabsTab value="taken">Taken</TabsTab>
          </TabsList>
        </Tabs>
        <Progress value={62} aria-label="Route done" />
      </div>
    </div>
  );
}
