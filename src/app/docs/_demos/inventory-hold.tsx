"use client";

import { useState } from "react";
import {
  CellIcon,
  ChipIcon,
  CrateIcon,
  FlareIcon,
  KeyIcon,
  KitIcon,
} from "@/components/zero/icons";
import { Inventory, InventorySlot } from "@/components/zero/inventory";

const cargo = [
  { name: "Sealed crate", icon: CrateIcon, rarity: "rare", count: 2 },
  { name: "Power cell", icon: CellIcon, rarity: "uncommon", count: 6 },
  { name: "Signal flare", icon: FlareIcon, rarity: "common", count: 12 },
  { name: "Gate key", icon: KeyIcon, rarity: "legendary", count: 1 },
  { name: "Route chip", icon: ChipIcon, rarity: "epic", count: 1 },
  { name: "Repair kit", icon: KitIcon, rarity: "uncommon", count: 3 },
  { name: "Spare cell", icon: CellIcon, rarity: "common", count: 2 },
] as const;

export default function InventoryHold() {
  const [chosen, setChosen] = useState(0);
  const item = cargo[chosen];
  return (
    <div className="grid gap-4">
      <Inventory columns={6} aria-label="Cargo hold">
        {cargo.map((thing, index) => (
          <InventorySlot
            key={thing.name}
            rarity={thing.rarity}
            count={thing.count}
            selected={index === chosen}
            cooldown={thing.name === "Repair kit" ? 0.6 : undefined}
            aria-label={`${thing.name}, ${thing.count}`}
            onClick={() => setChosen(index)}
          >
            <thing.icon />
          </InventorySlot>
        ))}
        {Array.from({ length: 11 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: empty slots have nothing else to tell them apart
          <InventorySlot key={index} aria-label="Empty" />
        ))}
      </Inventory>
      <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
        <span className="font-bold font-zero text-zero-text italic">
          {item.name}
        </span>{" "}
        · {item.count} in the hold · {item.rarity}
      </p>
    </div>
  );
}
