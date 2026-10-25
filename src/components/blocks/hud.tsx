"use client";

import {
  type ComponentType,
  type KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { Counter } from "@/components/zero/counter";
import {
  CutIn,
  CutInContent,
  CutInDescription,
  CutInEyebrow,
  CutInTitle,
} from "@/components/zero/cut-in";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { CellIcon } from "@/components/zero/icons/cell";
import { FlareIcon } from "@/components/zero/icons/flare";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { Inventory, InventorySlot } from "@/components/zero/inventory";
import {
  Objective,
  Objectives,
  ObjectivesHeader,
  ObjectiveTitle,
} from "@/components/zero/objectives";

/*
 * An in-game HUD over a scene: the hull and shield at the top left, credits and objectives at the
 * top right, a hotbar along the bottom. Using a slot (a click, or its number while the HUD has
 * focus) does what the item does and puts it on cooldown: the kit patches the hull, the cell
 * charges the shield, the flare and the key each finish an objective. Finishing them all pays out,
 * announced by a cut-in. The scene is a drawn backdrop; put your game behind it.
 */

type Use = "kit" | "cell" | "flare" | "key";

const bar: {
  id: Use;
  name: string;
  icon: ComponentType;
  rarity: "common" | "uncommon" | "legendary";
  cooldown: number;
}[] = [
  {
    id: "kit",
    name: "Repair kit",
    icon: KitIcon,
    rarity: "uncommon",
    cooldown: 4000,
  },
  {
    id: "cell",
    name: "Power cell",
    icon: CellIcon,
    rarity: "uncommon",
    cooldown: 3000,
  },
  {
    id: "flare",
    name: "Signal flare",
    icon: FlareIcon,
    rarity: "common",
    cooldown: 2000,
  },
  {
    id: "key",
    name: "Gate key",
    icon: KeyIcon,
    rarity: "legendary",
    cooldown: 0,
  },
];

/** A slot's key number in its corner, drawn from data-key so it is not part of its name. */
const key =
  "before:absolute before:start-1.5 before:top-1 before:font-bold before:font-zero-text before:text-zero-text-3 before:text-zero-xs before:content-[attr(data-key)]";

const goals = [
  { id: "flare", title: "Mark the drop zone" },
  { id: "key", title: "Open the north gate" },
] as const;

export function Hud() {
  const [hull, setHull] = useState(46);
  const [shield, setShield] = useState(1);
  const [stock, setStock] = useState({ kit: 3, cell: 6, flare: 12, key: 1 });
  const [done, setDone] = useState<string[]>([]);
  const [credits, setCredits] = useState(12480);
  const [paid, setPaid] = useState(false);
  const [announce, setAnnounce] = useState(false);
  // when each slot's cooldown ends, and the clock that redraws the sweeps
  const [ready, setReady] = useState<Partial<Record<Use, number>>>({});
  const [now, setNow] = useState(0);

  useEffect(() => {
    const waiting = Object.values(ready).some((at) => at && at > now);
    if (!waiting) return;
    const frame = requestAnimationFrame((t) => setNow(t));
    return () => cancelAnimationFrame(frame);
  }, [ready, now]);

  const use = (slot: (typeof bar)[number]) => {
    if (stock[slot.id] === 0 || (ready[slot.id] ?? 0) > now) return;
    if (slot.id === "kit") setHull((h) => Math.min(120, h + 30));
    if (slot.id === "cell") setShield((s) => Math.min(4, s + 1));
    if (slot.id === "flare" || slot.id === "key") {
      const next = done.includes(slot.id) ? done : [...done, slot.id];
      setDone(next);
      if (next.length === goals.length && !paid) {
        setPaid(true);
        setAnnounce(true);
        setCredits((c) => c + 3100);
      }
    }
    setStock((s) => ({ ...s, [slot.id]: s[slot.id] - 1 }));
    if (slot.cooldown) {
      const t = performance.now();
      setNow(t);
      setReady((r) => ({ ...r, [slot.id]: t + slot.cooldown }));
    }
  };

  const keys = (event: KeyboardEvent<HTMLElement>) => {
    const slot = bar[Number(event.key) - 1];
    if (slot) use(slot);
  };

  return (
    <section
      aria-label="Heads-up display"
      onKeyDown={keys}
      className="grid min-h-[28rem] w-full max-w-6xl grid-rows-[auto_1fr_auto] gap-6 overflow-hidden border-(length:--zero-stroke) border-zero-ink p-4 sm:p-6"
      style={{
        // the backdrop: a glow low in the accent, a floor grid, and a dark sky
        background:
          "radial-gradient(ellipse at 50% 115%, color-mix(in srgb, var(--color-zero-accent) 22%, transparent), transparent 60%), repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-zero-text) 5%, transparent) 0 1px, transparent 1px 48px), linear-gradient(var(--color-zero-void), var(--color-zero-ground))",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="grid w-full max-w-64 gap-3 bg-[linear-gradient(to_right,rgb(0_0_0/0.72)_55%,transparent)] py-3 ps-4 pe-10">
          <Gauge value={hull} max={120} low={0.25}>
            <GaugeLabel>Hull</GaugeLabel>
            <GaugeValue />
          </Gauge>
          <Gauge value={shield} max={4} segments={4} tone="rare">
            <GaugeLabel>Shield</GaugeLabel>
            <GaugeValue />
          </Gauge>
        </div>
        <div className="grid justify-items-end gap-3">
          <p className="flex items-baseline gap-1.5">
            <Counter value={credits} delta className="text-zero-xl" />
            <span className="font-black font-zero text-zero-accent italic">
              cr
            </span>
          </p>
          <Objectives aria-label="Objectives" className="w-72">
            <ObjectivesHeader>Night shift</ObjectivesHeader>
            {goals.map((goal) => (
              <Objective
                key={goal.id}
                state={done.includes(goal.id) ? "done" : "active"}
              >
                <ObjectiveTitle>{goal.title}</ObjectiveTitle>
              </Objective>
            ))}
          </Objectives>
        </div>
      </div>

      <div />

      <Inventory
        columns={6}
        aria-label="Hotbar"
        className="justify-self-center bg-[rgb(0_0_0/0.6)] p-2"
      >
        {bar.map((slot, index) => {
          const left = Math.max(0, (ready[slot.id] ?? 0) - now);
          return (
            <InventorySlot
              key={slot.id}
              rarity={slot.rarity}
              count={stock[slot.id]}
              cooldown={
                left && slot.cooldown ? left / slot.cooldown : undefined
              }
              disabled={stock[slot.id] === 0}
              aria-label={`${slot.name}, ${stock[slot.id]}`}
              aria-keyshortcuts={String(index + 1)}
              data-key={index + 1}
              onClick={() => use(slot)}
              className={key}
            >
              <slot.icon />
            </InventorySlot>
          );
        })}
        <InventorySlot aria-label="Empty" data-key={5} className={key} />
        <InventorySlot aria-label="Empty" data-key={6} className={key} />
      </Inventory>

      <CutIn open={announce} onOpenChange={setAnnounce}>
        <CutInContent>
          <CutInEyebrow>Run complete</CutInEyebrow>
          <CutInTitle>Night shift</CutInTitle>
          <CutInDescription>+3,100 cr</CutInDescription>
        </CutInContent>
      </CutIn>
    </section>
  );
}
