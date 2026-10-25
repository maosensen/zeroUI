"use client";

import { type ComponentType, useState } from "react";
import { Badge, type Rarity } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Counter } from "@/components/zero/counter";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { HoldButton } from "@/components/zero/hold-button";
import { CellIcon } from "@/components/zero/icons/cell";
import { ChipIcon } from "@/components/zero/icons/chip";
import { CrateIcon } from "@/components/zero/icons/crate";
import { FlareIcon } from "@/components/zero/icons/flare";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { Inventory, InventorySlot } from "@/components/zero/inventory";

/*
 * A loadout screen: the hold on one side, what is chosen on the other — its tier, what it is,
 * how worn and how heavy, and what to do with it. Equipping puts it in one of three slots on the
 * belt; scrapping it is held, and pays its worth into the credits, which count up. The items are
 * local state; feed your own.
 */

type Thing = {
  id: string;
  name: string;
  icon: ComponentType;
  rarity: Rarity;
  count: number;
  line: string;
  durability: number;
  weight: number;
  worth: number;
};

const hold: Thing[] = [
  {
    id: "key",
    name: "Gate key",
    icon: KeyIcon,
    rarity: "legendary",
    count: 1,
    line: "Opens any gate on the north wall, once.",
    durability: 100,
    weight: 1,
    worth: 2400,
  },
  {
    id: "crate",
    name: "Sealed crate",
    icon: CrateIcon,
    rarity: "rare",
    count: 2,
    line: "Contents unknown. The seal must reach the gate unbroken.",
    durability: 72,
    weight: 4,
    worth: 900,
  },
  {
    id: "chip",
    name: "Route chip",
    icon: ChipIcon,
    rarity: "epic",
    count: 1,
    line: "Shows the patrols' routes for one night.",
    durability: 55,
    weight: 1,
    worth: 1300,
  },
  {
    id: "cell",
    name: "Power cell",
    icon: CellIcon,
    rarity: "uncommon",
    count: 6,
    line: "Refills the shield by a third.",
    durability: 90,
    weight: 2,
    worth: 120,
  },
  {
    id: "kit",
    name: "Repair kit",
    icon: KitIcon,
    rarity: "uncommon",
    count: 3,
    line: "Patches the hull by thirty.",
    durability: 100,
    weight: 2,
    worth: 160,
  },
  {
    id: "flare",
    name: "Signal flare",
    icon: FlareIcon,
    rarity: "common",
    count: 12,
    line: "Marks a spot on everyone's map for a minute.",
    durability: 100,
    weight: 1,
    worth: 15,
  },
];

const SLOTS = 20;
const BELT = 3;

export function Loadout() {
  const [things, setThings] = useState(hold);
  const [chosen, setChosen] = useState(hold[0].id);
  const [belt, setBelt] = useState<string[]>(["kit"]);
  const [credits, setCredits] = useState(8640);
  const thing = things.find((t) => t.id === chosen);

  const scrap = (id: string) => {
    const gone = things.find((t) => t.id === id);
    if (!gone) return;
    setCredits((c) => c + gone.worth);
    if (gone.count > 1) {
      setThings((list) =>
        list.map((t) => (t.id === id ? { ...t, count: t.count - 1 } : t)),
      );
      return;
    }
    const rest = things.filter((t) => t.id !== id);
    setThings(rest);
    setBelt((list) => list.filter((b) => b !== id));
    setChosen(rest[0]?.id ?? "");
  };

  const worn = belt.includes(chosen);
  return (
    <div className="@container w-full max-w-5xl">
      <section
        aria-labelledby="loadout-title"
        className="grid border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
      >
        <header className="flex flex-wrap items-end justify-between gap-4 bg-zero-void px-6 pt-6 pb-5">
          <h2
            id="loadout-title"
            className="origin-left rotate-(--zero-tilt) font-black font-zero text-zero-2xl italic"
          >
            Loadout
          </h2>
          <p className="flex items-baseline gap-1.5">
            <Counter value={credits} delta className="text-zero-xl" />
            <span className="font-black font-zero text-zero-accent italic">
              cr
            </span>
          </p>
        </header>

        <div className="grid gap-8 p-6 @3xl:grid-cols-[auto_1fr]">
          <div className="grid content-start gap-5">
            <Inventory columns={5} aria-label="Cargo hold">
              {Array.from({ length: SLOTS }, (_, index) => {
                const t = things[index];
                if (!t)
                  // biome-ignore lint/suspicious/noArrayIndexKey: empty slots are only their place
                  return <InventorySlot key={index} aria-label="Empty" />;
                return (
                  <InventorySlot
                    key={t.id}
                    rarity={t.rarity}
                    count={t.count}
                    selected={t.id === chosen}
                    aria-label={`${t.name}, ${t.count}`}
                    onClick={() => setChosen(t.id)}
                  >
                    <t.icon />
                  </InventorySlot>
                );
              })}
            </Inventory>
            <div className="grid gap-2">
              <span className="font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]">
                Belt
              </span>
              <Inventory columns={BELT} aria-label="Belt">
                {Array.from({ length: BELT }, (_, index) => {
                  const t = things.find((x) => x.id === belt[index]);
                  return t ? (
                    <InventorySlot
                      key={t.id}
                      rarity={t.rarity}
                      aria-label={`${t.name}, on the belt`}
                      onClick={() => setChosen(t.id)}
                    >
                      <t.icon />
                    </InventorySlot>
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: empty slots are only their place
                    <InventorySlot key={index} aria-label="Empty belt slot" />
                  );
                })}
              </Inventory>
            </div>
          </div>

          {thing ? (
            <div className="grid content-start gap-5">
              <div className="grid gap-2">
                <Badge rarity={thing.rarity} className="w-fit">
                  {thing.rarity}
                </Badge>
                <h3 className="font-black font-zero text-zero-xl italic">
                  {thing.name}
                </h3>
                <p className="font-medium font-zero-text text-zero-md text-zero-text-2">
                  {thing.line}
                </p>
              </div>
              <Gauge value={thing.durability} tone="uncommon" low={0.3}>
                <GaugeLabel>Durability</GaugeLabel>
                <GaugeValue />
              </Gauge>
              <Gauge value={thing.weight} max={5} segments={5} tone="legendary">
                <GaugeLabel>Weight</GaugeLabel>
                <GaugeValue />
              </Gauge>
              <p className="font-medium font-zero-text text-zero-sm text-zero-text-3">
                Worth {thing.worth.toLocaleString("en-US")} cr each ·{" "}
                {thing.count} in the hold
              </p>
              <div className="flex flex-wrap gap-3 border-zero-line border-t-(length:--zero-stroke-thin) pt-5">
                <Button
                  disabled={!worn && belt.length >= BELT}
                  onClick={() =>
                    setBelt((list) =>
                      worn
                        ? list.filter((b) => b !== chosen)
                        : [...list, chosen],
                    )
                  }
                >
                  {worn ? "Take off the belt" : "Put on the belt"}
                </Button>
                <HoldButton onConfirm={() => scrap(thing.id)}>
                  Hold to scrap
                </HoldButton>
              </div>
            </div>
          ) : (
            <p className="font-medium font-zero-text text-zero-text-3">
              The hold is empty.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
