"use client";

import { type ComponentType, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { Button } from "@/components/zero/button";
import { CellIcon } from "@/components/zero/icons/cell";
import { ChipIcon } from "@/components/zero/icons/chip";
import { CrateIcon } from "@/components/zero/icons/crate";
import { FlareIcon } from "@/components/zero/icons/flare";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { InventorySlot } from "@/components/zero/inventory";
import { ProfileChip } from "@/components/zero/profile-chip";
import { RewardTier, RewardTrack } from "@/components/zero/reward-track";

/*
 * A rank page, the way a game's season pass reads: who you are and how far to the next level at
 * the top, then a row per level with its rewards. Levels you have passed and not claimed light up
 * with Claim; "Claim all" takes every one at once and says how many things it gave. Levels ahead
 * are locked and say what it takes. The levels and rewards are made up; feed your own.
 */

type Reward = {
  name: string;
  icon: ComponentType;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  count: number;
};

const kit: Reward = {
  name: "Repair kit",
  icon: KitIcon,
  rarity: "uncommon",
  count: 1,
};
const cell: Reward = {
  name: "Power cell",
  icon: CellIcon,
  rarity: "common",
  count: 3,
};
const flare: Reward = {
  name: "Signal flare",
  icon: FlareIcon,
  rarity: "common",
  count: 5,
};
const crate: Reward = {
  name: "Sealed crate",
  icon: CrateIcon,
  rarity: "rare",
  count: 1,
};
const chip: Reward = {
  name: "Route chip",
  icon: ChipIcon,
  rarity: "epic",
  count: 1,
};
const key: Reward = {
  name: "Gate key",
  icon: KeyIcon,
  rarity: "legendary",
  count: 1,
};

const levels: { level: number; rewards: Reward[]; note?: string }[] = [
  { level: 1, rewards: [cell] },
  { level: 2, rewards: [flare, cell] },
  { level: 3, rewards: [kit] },
  { level: 4, rewards: [cell, kit] },
  { level: 5, rewards: [crate, flare], note: "Night routes open" },
  { level: 6, rewards: [kit, cell] },
  { level: 7, rewards: [chip] },
  { level: 8, rewards: [key, crate], note: "North gate pass" },
];

const current = 5;

export function LevelRewards({
  header = true,
}: {
  /** The title and profile chip; leave them out where the page already shows who you are. */
  header?: boolean;
}) {
  const [claimed, setClaimed] = useState([1, 2, 3]);
  const [gained, setGained] = useState(0);
  const state = (level: number) =>
    level > current ? "locked" : claimed.includes(level) ? "claimed" : "ready";
  const ready = levels.filter((l) => state(l.level) === "ready");
  const claim = (list: typeof levels) => {
    setClaimed((c) => [...c, ...list.map((l) => l.level)]);
    setGained(
      (g) =>
        g +
        list.reduce(
          (n, l) => n + l.rewards.reduce((m, r) => m + r.count, 0),
          0,
        ),
    );
  };

  return (
    <section
      aria-labelledby={header ? "rank-title" : undefined}
      aria-label={header ? undefined : "Courier rank"}
      className="grid w-full max-w-3xl border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
    >
      {header ? (
        <header className="flex flex-wrap items-end justify-between gap-4 bg-zero-void px-6 pt-6 pb-5">
          <h2
            id="rank-title"
            className="font-black font-zero text-zero-2xl italic"
          >
            Courier rank
          </h2>
          <ProfileChip
            name="Wren"
            level={current}
            xp={410}
            xpMax={600}
            avatar={
              <Avatar size="sm">
                <AvatarFallback>WR</AvatarFallback>
              </Avatar>
            }
          />
        </header>
      ) : null}
      <div className="grid gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            aria-live="polite"
            className="font-medium font-zero-text text-zero-sm text-zero-text-2"
          >
            {ready.length > 0
              ? `${ready.length} level${ready.length > 1 ? "s" : ""} to claim.`
              : "Nothing to claim."}
            {gained > 0 ? ` ${gained} things claimed so far.` : ""}
          </p>
          <Button
            size="sm"
            disabled={ready.length === 0}
            onClick={() => claim(ready)}
          >
            Claim all
          </Button>
        </div>
        <RewardTrack aria-label="Levels">
          {levels.map((l) => (
            <RewardTier
              key={l.level}
              level={l.level}
              state={state(l.level)}
              current={l.level === current}
              onClaim={() => claim([l])}
              note={l.note}
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
    </section>
  );
}
