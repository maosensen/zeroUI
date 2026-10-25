"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { CellIcon } from "@/components/zero/icons/cell";
import { ChipIcon } from "@/components/zero/icons/chip";
import { CrateIcon } from "@/components/zero/icons/crate";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { InventorySlot } from "@/components/zero/inventory";
import { RewardTier, RewardTrack } from "@/components/zero/reward-track";

const current = 4;
const levels = [
  {
    level: 2,
    rewards: [
      { name: "Power cell", icon: CellIcon, rarity: "common", count: 2 },
    ],
  },
  {
    level: 3,
    rewards: [
      { name: "Repair kit", icon: KitIcon, rarity: "uncommon", count: 1 },
      { name: "Power cell", icon: CellIcon, rarity: "common", count: 3 },
    ],
  },
  {
    level: 4,
    rewards: [
      { name: "Sealed crate", icon: CrateIcon, rarity: "rare", count: 1 },
    ],
  },
  {
    level: 5,
    rewards: [
      { name: "Route chip", icon: ChipIcon, rarity: "epic", count: 1 },
      { name: "Repair kit", icon: KitIcon, rarity: "uncommon", count: 2 },
    ],
  },
  {
    level: 6,
    rewards: [
      { name: "Gate key", icon: KeyIcon, rarity: "legendary", count: 1 },
    ],
  },
] as const;

export default function RewardTrackLevels() {
  const [claimed, setClaimed] = useState<number[]>([2]);
  const state = (level: number) =>
    level > current ? "locked" : claimed.includes(level) ? "claimed" : "ready";
  const ready = levels.filter((l) => state(l.level) === "ready");
  return (
    <div className="grid w-full max-w-2xl gap-3">
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="secondary"
          disabled={ready.length === 0}
          onClick={() =>
            setClaimed((c) => [...c, ...ready.map((l) => l.level)])
          }
        >
          Claim all
        </Button>
      </div>
      <RewardTrack aria-label="Courier levels">
        {levels.map((l) => (
          <RewardTier
            key={l.level}
            level={l.level}
            state={state(l.level)}
            current={l.level === current}
            onClaim={() => setClaimed((c) => [...c, l.level])}
          >
            {l.rewards.map((r) => (
              <InventorySlot
                key={r.name}
                rarity={r.rarity}
                count={r.count}
                aria-label={`${r.name}, ${r.count}`}
              >
                <r.icon />
              </InventorySlot>
            ))}
          </RewardTier>
        ))}
      </RewardTrack>
    </div>
  );
}
