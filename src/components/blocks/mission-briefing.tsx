"use client";

import { useState } from "react";
import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Counter } from "@/components/zero/counter";
import {
  CutIn,
  CutInContent,
  CutInDescription,
  CutInEyebrow,
  CutInTitle,
} from "@/components/zero/cut-in";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { HoldButton } from "@/components/zero/hold-button";
import { CrateIcon } from "@/components/zero/icons/crate";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { Inventory, InventorySlot } from "@/components/zero/inventory";
import { Kbd } from "@/components/zero/kbd";
import {
  Objective,
  Objectives,
  ObjectivesHeader,
  ObjectiveTitle,
} from "@/components/zero/objectives";

/*
 * A briefing before a job: the contract's name glitching in over a route map, what has to be
 * done, how dangerous it is, and what it pays. Accepting it is held, so it is never taken by a
 * stray click; once taken, a cut-in announces it. The map is drawn in place (a grid, a route, two
 * marks), so swap it for your own picture.
 */

const route = "M40 196 L120 150 L170 162 L250 92 L330 70 L410 34";

export function MissionBriefing() {
  const [taken, setTaken] = useState(false);
  const [announce, setAnnounce] = useState(false);

  return (
    // two columns once its own box is wide enough, wherever it is placed
    <div className="@container w-full max-w-5xl">
      <article
        aria-labelledby="briefing-title"
        className="grid border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) @4xl:grid-cols-[1.25fr_1fr]"
      >
        <div className="grid content-start gap-5 bg-zero-void p-6">
          <div className="grid gap-3">
            <p className="flex items-center gap-2.5 font-black font-zero text-zero-accent text-zero-sm uppercase italic tracking-[0.14em] before:h-[0.9em] before:w-[0.45em] before:-skew-x-(--zero-slant) before:bg-zero-accent">
              Contract · J-104
            </p>
            <h2
              id="briefing-title"
              className="glitch font-black font-zero text-zero-2xl italic"
            >
              Sealed crate run
            </h2>
          </div>

          <figure className="grid gap-2">
            <svg
              viewBox="0 0 440 230"
              role="img"
              aria-label="Route from the rail yards to the North gate, across the river"
              className="w-full border-(length:--zero-stroke-thin) border-zero-line bg-zero-ground"
            >
              <defs>
                <pattern
                  id="briefing-grid"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M22 0H0V22"
                    fill="none"
                    stroke="var(--color-zero-line)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="440" height="230" fill="url(#briefing-grid)" />
              <path
                d="M0 120 C80 100 140 140 220 118 S360 80 440 100 L440 128 C360 108 300 150 220 146 S80 128 0 148Z"
                fill="var(--color-zero-raised)"
              />
              <path
                d={route}
                fill="none"
                stroke="var(--color-zero-accent)"
                strokeWidth="4"
                strokeDasharray="10 6"
              />
              <polygon
                points="36,188 52,188 48,204 32,204"
                fill="var(--color-zero-text)"
              />
              <polygon
                points="406,26 422,26 418,42 402,42"
                fill="var(--color-zero-accent)"
              />
            </svg>
            <figcaption className="flex justify-between font-medium font-zero-text text-zero-sm text-zero-text-3">
              <span>Rail yards</span>
              <span>River crossing</span>
              <span className="text-zero-accent">North gate</span>
            </figcaption>
          </figure>
        </div>

        <div className="grid content-start gap-6 p-6">
          <Objectives aria-label="What has to be done" className="max-w-none">
            <ObjectivesHeader>Objectives</ObjectivesHeader>
            <Objective state={taken ? "active" : "pending"}>
              <ObjectiveTitle>Collect five sealed crates</ObjectiveTitle>
            </Objective>
            <Objective>
              <ObjectiveTitle>Cross before the gate shuts</ObjectiveTitle>
            </Objective>
            <Objective>
              <ObjectiveTitle>Hand over at the North gate</ObjectiveTitle>
            </Objective>
          </Objectives>

          <Gauge value={3} max={5} segments={5} tone="danger">
            <GaugeLabel>Threat</GaugeLabel>
            <GaugeValue>{() => "High"}</GaugeValue>
          </Gauge>

          <div className="grid gap-3">
            <span className="font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]">
              Reward
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="flex items-baseline gap-1.5">
                <Counter value={3100} className="text-zero-xl" />
                <span className="font-black font-zero text-zero-accent italic">
                  cr
                </span>
              </p>
              <Inventory columns={3} aria-label="Loot" className="gap-1">
                <InventorySlot rarity="legendary" aria-label="Gate key">
                  <KeyIcon />
                </InventorySlot>
                <InventorySlot
                  rarity="rare"
                  count={2}
                  aria-label="Sealed crate, 2"
                >
                  <CrateIcon />
                </InventorySlot>
                <InventorySlot
                  rarity="uncommon"
                  count={3}
                  aria-label="Repair kit, 3"
                >
                  <KitIcon />
                </InventorySlot>
              </Inventory>
            </div>
            <p className="flex flex-wrap gap-2">
              <Badge rarity="legendary">1 legendary</Badge>
              <Badge variant="secondary">Night only</Badge>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-zero-line border-t-(length:--zero-stroke-thin) pt-5">
            {taken ? (
              <Button variant="ghost" onClick={() => setTaken(false)}>
                Hand it back
              </Button>
            ) : (
              <>
                <Button variant="ghost">Decline</Button>
                <HoldButton
                  hotkey="e"
                  onConfirm={() => {
                    setTaken(true);
                    setAnnounce(true);
                  }}
                >
                  <Kbd>E</Kbd> Hold to accept
                </HoldButton>
              </>
            )}
          </div>
        </div>

        <CutIn open={announce} onOpenChange={setAnnounce}>
          <CutInContent>
            <CutInEyebrow>Job taken</CutInEyebrow>
            <CutInTitle>Sealed crate run</CutInTitle>
            <CutInDescription>
              Rail yards → North gate · 3,100 cr
            </CutInDescription>
          </CutInContent>
        </CutIn>
      </article>
    </div>
  );
}
