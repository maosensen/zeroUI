"use client";

import { useState } from "react";
import { CellIcon } from "@/components/zero/icons/cell";
import { ChipIcon } from "@/components/zero/icons/chip";
import { CrateIcon } from "@/components/zero/icons/crate";
import { FlareIcon } from "@/components/zero/icons/flare";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { RadialMenu, RadialMenuItem } from "@/components/zero/radial-menu";

const wheel = [
  { value: "kit", label: "Repair kit", icon: KitIcon },
  { value: "cell", label: "Power cell", icon: CellIcon },
  { value: "flare", label: "Signal flare", icon: FlareIcon },
  { value: "chip", label: "Route chip", icon: ChipIcon },
  { value: "key", label: "Gate key", icon: KeyIcon },
  { value: "crate", label: "Drop the crate", icon: CrateIcon, disabled: true },
];

export default function RadialMenuQuick() {
  const [used, setUsed] = useState<string | null>(null);
  return (
    <div className="grid justify-items-center gap-4">
      <RadialMenu aria-label="Quick use" onSelect={setUsed}>
        {wheel.map((item) => (
          <RadialMenuItem
            key={item.value}
            value={item.value}
            label={item.label}
            disabled={item.disabled}
          >
            <item.icon />
          </RadialMenuItem>
        ))}
      </RadialMenu>
      <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
        {used
          ? `Used: ${wheel.find((item) => item.value === used)?.label}`
          : "Point anywhere, then click; or use the arrows and Enter."}
      </p>
    </div>
  );
}
