"use client";

import { useState } from "react";
import { Badge, type Rarity } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { HoldButton } from "@/components/zero/hold-button";
import { LockIcon } from "@/components/zero/icons/lock";

/*
 * Choosing who to play: a roster of couriers as slanted cards (the chosen one framed in the
 * accent, a locked one dimmed with its lock and how to earn it), and the chosen courier in full —
 * name, role, a line, four ratings as segmented gauges, a perk — with deploying held so it is
 * never done by a slip. The roster is one choice: the cards are toggle buttons. The couriers are
 * made up; feed your own.
 */

type Courier = {
  id: string;
  name: string;
  role: string;
  tier: Rarity;
  line: string;
  perk: string;
  ratings: { speed: number; armour: number; cargo: number; stealth: number };
  locked?: string;
};

const roster: Courier[] = [
  {
    id: "rook",
    name: "Rook",
    role: "Hauler",
    tier: "rare",
    line: "Takes the long way, and everything with him.",
    perk: "Carries two more crates. Slower on stairs.",
    ratings: { speed: 2, armour: 4, cargo: 5, stealth: 1 },
  },
  {
    id: "juniper",
    name: "Juniper",
    role: "Runner",
    tier: "uncommon",
    line: "Already there before the call ends.",
    perk: "Sprinting costs no stamina for the first ten seconds.",
    ratings: { speed: 5, armour: 1, cargo: 2, stealth: 3 },
  },
  {
    id: "sable",
    name: "Sable-9",
    role: "Ghost",
    tier: "epic",
    line: "Patrols remember the crate, never the courier.",
    perk: "Unseen while standing still in the dark.",
    ratings: { speed: 3, armour: 2, cargo: 2, stealth: 5 },
  },
  {
    id: "tallow",
    name: "Tallow",
    role: "Fixer",
    tier: "legendary",
    line: "Can patch a hull with a spoon and a promise.",
    perk: "Repair kits mend twice as much.",
    ratings: { speed: 3, armour: 3, cargo: 3, stealth: 2 },
    locked: "Finish night 6 to unlock",
  },
];

const tierText: Record<Rarity, string> = {
  common: "text-zero-rarity-common",
  uncommon: "text-zero-rarity-uncommon",
  rare: "text-zero-rarity-rare",
  epic: "text-zero-rarity-epic",
  legendary: "text-zero-rarity-legendary",
};

export function CharacterSelect() {
  const [chosen, setChosen] = useState(roster[0].id);
  const [deployed, setDeployed] = useState<string | null>(null);
  const courier = roster.find((c) => c.id === chosen) ?? roster[0];

  return (
    <div className="@container w-full max-w-5xl">
      <section
        aria-labelledby="select-title"
        className="grid border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
      >
        <header className="bg-zero-void px-6 pt-6 pb-5">
          <h2
            id="select-title"
            className="font-black font-zero text-zero-2xl italic"
          >
            Choose your courier
          </h2>
        </header>

        <div className="grid gap-8 p-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <ul
            aria-label="Couriers"
            className="grid grid-cols-2 content-start gap-3"
          >
            {roster.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={c.id === chosen}
                  aria-disabled={c.locked ? true : undefined}
                  onClick={() => !c.locked && setChosen(c.id)}
                  className="group grid w-full gap-2 text-start outline-none focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-4"
                >
                  <span
                    className={
                      "relative grid aspect-[4/3] w-full place-items-center bg-zero-void outline-offset-2 transition-[outline-color] duration-(--zero-dur-fast) " +
                      "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)] group-hover:bg-zero-raised " +
                      "group-aria-pressed:outline-solid group-aria-pressed:outline-(length:--zero-stroke-thin) group-aria-pressed:outline-zero-accent " +
                      "group-aria-disabled:opacity-50"
                    }
                  >
                    {/* a portrait stand-in: the initials, leaning, in the tier's colour */}
                    <span
                      aria-hidden
                      className={`font-black font-zero text-zero-3xl italic ${tierText[c.tier]}`}
                    >
                      {c.name.slice(0, 2).toUpperCase()}
                    </span>
                    {c.locked ? (
                      <LockIcon className="absolute top-2 right-2 size-5 text-zero-text-2" />
                    ) : null}
                  </span>
                  <span className="grid">
                    <span className="font-black font-zero text-zero-md italic group-aria-pressed:text-zero-accent">
                      {c.name}
                    </span>
                    <span className="font-medium font-zero-text text-zero-sm text-zero-text-3">
                      {c.locked ?? c.role}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="grid content-start gap-5">
            <div className="grid gap-2">
              <Badge rarity={courier.tier} className="w-fit">
                {courier.role}
              </Badge>
              <h3 className="font-black font-zero text-zero-2xl italic">
                {courier.name}
              </h3>
              <p className="font-medium font-zero-text text-zero-md text-zero-text-2">
                {courier.line}
              </p>
            </div>
            <div className="grid gap-4">
              {(
                Object.entries(courier.ratings) as [
                  keyof Courier["ratings"],
                  number,
                ][]
              ).map(([name, value]) => (
                <Gauge key={name} value={value} max={5} segments={5}>
                  <GaugeLabel>{name}</GaugeLabel>
                  <GaugeValue />
                </Gauge>
              ))}
            </div>
            <p className="border-zero-accent border-s-(length:--zero-stroke-thick) bg-zero-void px-4 py-3 font-medium font-zero-text text-zero-sm text-zero-text-2">
              <span className="me-2 font-black font-zero text-zero-accent uppercase italic tracking-[0.06em]">
                Perk
              </span>
              {courier.perk}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-3 border-zero-line border-t-(length:--zero-stroke-thin) pt-5">
              {deployed ? (
                <p className="me-auto font-medium font-zero-text text-zero-sm text-zero-accent">
                  {deployed} is on the way.
                </p>
              ) : null}
              <Button variant="ghost">Back</Button>
              <HoldButton onConfirm={() => setDeployed(courier.name)}>
                Hold to deploy
              </HoldButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
