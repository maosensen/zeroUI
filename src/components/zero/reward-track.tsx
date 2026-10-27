import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/zero/button";
import { CheckIcon } from "@/components/zero/icons/check";
import { LockIcon } from "@/components/zero/icons/lock";
import { cn } from "@/lib/zero/cn";

/*
 * What each level gives, the way a game's season or rank page lists it: a row per level with the
 * level's number big and leaning in a slanted well, its rewards (InventorySlots) in the middle,
 * and at the end what can be done about them. A tier is `claimed` (dimmed, a check), `ready`
 * (an accent edge, the number lit, a Claim button) or `locked` (dim, a lock, and what it takes).
 * `current` marks the level you are on. Each row starts with its level and state in words, so a
 * screen reader hears "Level 5, ready to claim" before its rewards.
 *
 *   <RewardTrack aria-label="Courier levels">
 *     <RewardTier level={5} state="ready" onClaim={() => claim(5)}>
 *       <InventorySlot rarity="rare" aria-label="Sealed crate"><CrateIcon /></InventorySlot>
 *     </RewardTier>
 *   </RewardTrack>
 */

type RewardState = "claimed" | "ready" | "locked";

/** What a tier says: its lead-in for screen readers, its button, its claimed mark, what a locked
 * tier takes. English by default. */
type RewardTierLabels = {
  /** "Level 5, ready to claim, your level." */
  tier: (level: number, state: RewardState, current: boolean) => string;
  claim: string;
  claimed: string;
  locked: (level: number) => string;
};

const states: Record<RewardState, string> = {
  claimed: "claimed",
  ready: "ready to claim",
  locked: "locked",
};

const rewardTierLabels: RewardTierLabels = {
  tier: (level, state, current) =>
    `Level ${level}, ${states[state]}${current ? ", your level" : ""}.`,
  claim: "Claim",
  claimed: "Claimed",
  locked: (level) => `Reach level ${level}`,
};

function RewardTrack({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="reward-track"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function RewardTier({
  className,
  level,
  state,
  current,
  onClaim,
  labels,
  locked,
  note,
  children,
  ...props
}: Omit<ComponentProps<"li">, "children"> & {
  level: number;
  state: RewardState;
  /** The level you are on now. */
  current?: boolean;
  onClaim?: () => void;
  /** What it says, in another language: any part of rewardTierLabels. */
  labels?: Partial<RewardTierLabels>;
  /** What a locked tier says it takes; labels.locked(level) when omitted. */
  locked?: ReactNode;
  /** A line about the level itself ("Night routes open"), never dimmed. */
  note?: ReactNode;
  /** The rewards: InventorySlots. */
  children?: ReactNode;
}) {
  const said = { ...rewardTierLabels, ...labels };
  return (
    <li
      data-slot="reward-tier"
      data-state={state}
      data-current={current ? "" : undefined}
      className={cn(
        "group/tier grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 bg-zero-surface py-3 ps-3 pe-4 sm:grid-cols-[4.5rem_1fr_auto]",
        "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
        "data-[state=ready]:shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent),inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
        "data-current:bg-zero-raised data-[state=locked]:bg-zero-ground",
        className,
      )}
      {...props}
    >
      <span className="sr-only">
        {said.tier(level, state, Boolean(current))}
      </span>
      <span
        aria-hidden
        className={cn(
          "grid h-12 -skew-x-(--zero-slant) place-items-center bg-zero-void font-black font-zero text-zero-xl italic tabular-nums",
          "text-zero-text-3 group-data-[state=ready]/tier:text-zero-accent group-data-current/tier:text-zero-text",
        )}
      >
        <span className="skew-x-(--zero-slant)">
          {String(level).padStart(2, "0")}
        </span>
      </span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          data-slot="reward-tier-rewards"
          className={cn(
            "flex flex-wrap gap-1.5 [--zero-slot:3.25rem]",
            "group-data-[state=claimed]/tier:opacity-50 group-data-[state=locked]/tier:opacity-40",
          )}
        >
          {children}
        </div>
        {note ? (
          <span
            data-slot="reward-tier-note"
            className="font-black font-zero text-zero-accent text-zero-sm italic"
          >
            {note}
          </span>
        ) : null}
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2 sm:col-span-1">
        {state === "ready" ? (
          <Button size="sm" onClick={onClaim}>
            {said.claim}
          </Button>
        ) : state === "claimed" ? (
          <span className="flex items-center gap-1.5 font-bold font-zero text-zero-sm text-zero-text-3 italic">
            <CheckIcon className="size-4" />
            {said.claimed}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 font-semibold font-zero-text text-zero-sm text-zero-text-3">
            <LockIcon className="size-4" />
            {locked ?? said.locked(level)}
          </span>
        )}
      </div>
    </li>
  );
}

export {
  RewardTier,
  type RewardTierLabels,
  RewardTrack,
  type RewardState,
  rewardTierLabels,
};
