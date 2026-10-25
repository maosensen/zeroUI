"use client";

import { type KeyboardEvent, useState } from "react";
import { Button } from "@/components/zero/button";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { HoldButton } from "@/components/zero/hold-button";
import { Kbd } from "@/components/zero/kbd";
import { Stat, Stats } from "@/components/zero/stats";

/*
 * A pause menu over the game: the scene behind dimmed and blurred, a panel with the run so far
 * (time, crates, credits, hull), the ways out of it, and abandoning the run held so it never
 * happens by a slip. Escape (while focus is on the screen) or Resume brings the game back; Escape
 * again pauses it. The game behind is a drawn stand-in.
 */

export function PauseMenu() {
  const [paused, setPaused] = useState(true);
  const [abandoned, setAbandoned] = useState(false);

  const toggle = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") setPaused((p) => !p);
  };

  return (
    <section
      aria-label="Game"
      onKeyDown={toggle}
      className="relative grid min-h-[30rem] w-full max-w-5xl place-items-center overflow-hidden border-(length:--zero-stroke) border-zero-ink p-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, color-mix(in srgb, var(--color-zero-accent) 20%, transparent), transparent 60%), repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-zero-text) 5%, transparent) 0 1px, transparent 1px 48px), linear-gradient(var(--color-zero-void), var(--color-zero-ground))",
      }}
    >
      {/* the game: a gauge in the corner, so there is something to pause */}
      <div className="absolute top-4 left-4 w-56 max-w-[60%]">
        <Gauge value={74} max={120}>
          <GaugeLabel>Hull</GaugeLabel>
          <GaugeValue />
        </Gauge>
      </div>

      {paused ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgb(0_0_0/0.6)] backdrop-blur-sm"
          />
          <section
            aria-labelledby="pause-title"
            className="relative grid w-full max-w-md gap-5 border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) p-6"
          >
            <h2
              id="pause-title"
              className="origin-left rotate-(--zero-tilt) font-black font-zero text-zero-2xl uppercase italic"
            >
              Paused
            </h2>
            <Stats>
              <Stat label="Time" value={34} unit=" min" />
              <Stat label="Crates" value={3} unit=" / 5" />
              <Stat label="Earned" value={4250} unit=" cr" />
            </Stats>
            <div className="grid gap-2">
              <Button
                size="lg"
                onClick={() => setPaused(false)}
                className="w-full"
              >
                Resume
              </Button>
              <Button variant="secondary" className="w-full">
                Settings
              </Button>
              <Button variant="secondary" className="w-full">
                Map
              </Button>
              <HoldButton
                variant="danger"
                duration={1600}
                onConfirm={() => setAbandoned(true)}
                className="w-full"
              >
                {abandoned ? "Run abandoned" : "Hold to abandon the run"}
              </HoldButton>
            </div>
            <p className="flex items-center gap-2 font-semibold font-zero-text text-zero-sm text-zero-text-3">
              <Kbd>Esc</Kbd> Resume
            </p>
          </section>
        </>
      ) : (
        <Button variant="secondary" onClick={() => setPaused(true)}>
          <Kbd>Esc</Kbd> Pause
        </Button>
      )}
    </section>
  );
}
