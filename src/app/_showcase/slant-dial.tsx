"use client";

import { type CSSProperties, useState } from "react";
import { Button } from "@/components/zero/button";
import { SearchIcon } from "@/components/zero/icons";
import { Input } from "@/components/zero/input";
import { Slider } from "@/components/zero/slider";
import { Tabs, TabsList, TabsTab } from "@/components/zero/tabs";

/** One slider on --zero-slant, and the components beside it all re-cut to follow. */
export function SlantDial() {
  const [slant, setSlant] = useState(14);
  return (
    <div className="grid min-w-0 gap-6 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void p-5 sm:p-8">
      <div className="grid gap-2">
        <span className="flex items-baseline justify-between font-bold font-zero text-zero-sm text-zero-text-2 italic">
          --zero-slant
          <span className="font-black text-zero-accent text-zero-xl tabular-nums">
            {slant}°
          </span>
        </span>
        <Slider
          min={0}
          max={30}
          value={slant}
          onValueChange={(value) => setSlant(value as number)}
          aria-label="Slant, in degrees"
        />
      </div>
      <div
        style={{ "--zero-slant": `${slant}deg` } as CSSProperties}
        className="grid justify-items-start gap-4"
      >
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary" cut="both">
            Both cut
          </Button>
        </div>
        <Tabs defaultValue="one" size="sm">
          <TabsList>
            <TabsTab value="one">One</TabsTab>
            <TabsTab value="two">Two</TabsTab>
            <TabsTab value="three">Three</TabsTab>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Even the wells"
          aria-label="Example"
          start={<SearchIcon />}
          className="max-w-xs"
        />
      </div>
    </div>
  );
}
