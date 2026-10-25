"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { Badge } from "@/components/zero/badge";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { Kbd } from "@/components/zero/kbd";

/*
 * A title screen: the game's name big and tilted, glitching in, a column of large menu entries
 * moved through with the arrow keys (the chosen one lit with the accent and a marker), news in a
 * corner, and the keys along the bottom. Every entry is a button; the arrows move focus between
 * them, so the mouse, Tab and the keys all agree. Wire `onChoose` to your router or state.
 */

const entries = [
  {
    id: "continue",
    label: "Continue",
    line: "Night 4 · North gate · 12,480 cr",
  },
  { id: "new", label: "New run", line: "Start a fresh shift" },
  { id: "settings", label: "Settings", line: "Display, audio, controls" },
  { id: "credits", label: "Credits", line: "Who made this" },
  { id: "quit", label: "Quit", line: "Back to the desktop" },
];

export function TitleScreen({ onChoose }: { onChoose?: (id: string) => void }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  const move = (event: KeyboardEvent<HTMLUListElement>) => {
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + entries.length) % entries.length;
    setActive(next);
    list.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section
      aria-label="Title screen"
      className="@container relative grid min-h-[34rem] w-full max-w-6xl grid-rows-[1fr_auto] overflow-hidden border-(length:--zero-stroke) border-zero-ink"
      style={{
        // a backdrop: the accent low on the horizon, a far grid, the dark
        background:
          "radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--color-zero-accent) 18%, transparent), transparent 55%), repeating-linear-gradient(0deg, color-mix(in srgb, var(--color-zero-text) 4%, transparent) 0 1px, transparent 1px 40px), linear-gradient(160deg, var(--color-zero-void), var(--color-zero-ground))",
      }}
    >
      <div className="grid content-center gap-10 p-6 sm:p-10 @3xl:grid-cols-[1fr_18rem] @3xl:items-end">
        <div className="grid gap-8">
          <div className="grid gap-6">
            <p className="font-black font-zero text-zero-accent text-zero-sm uppercase italic tracking-[0.2em]">
              A courier's night
            </p>
            <h2 className="glitch origin-left rotate-(--zero-tilt) font-black font-zero text-[clamp(3rem,10cqi,6.5rem)] uppercase italic leading-[0.9]">
              Night
              <br />
              shift
            </h2>
          </div>
          <ul
            ref={list}
            onKeyDown={move}
            aria-label="Main menu"
            className="grid w-full max-w-sm gap-1"
          >
            {entries.map((entry, index) => (
              <li key={entry.id}>
                <button
                  type="button"
                  data-active={index === active ? "" : undefined}
                  onFocus={() => setActive(index)}
                  onPointerEnter={() => setActive(index)}
                  onClick={() => onChoose?.(entry.id)}
                  className="group grid w-full grid-cols-[1.25rem_1fr] items-center gap-x-2 px-2 py-1.5 text-start outline-none focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus"
                >
                  <ChevronRightIcon className="invisible text-zero-accent group-data-active:visible" />
                  <span className="font-black font-zero text-zero-text-2 text-zero-xl italic transition-colors duration-(--zero-dur-fast) group-data-active:text-zero-accent">
                    {entry.label}
                  </span>
                  <span className="col-start-2 hidden font-medium font-zero-text text-zero-sm text-zero-text-3 group-data-active:block">
                    {entry.line}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <aside
          aria-label="News"
          className="grid gap-2 border-zero-accent border-s-(length:--zero-stroke-thick) bg-[rgb(0_0_0/0.6)] p-4"
        >
          <Badge className="w-fit">New</Badge>
          <p className="font-black font-zero text-zero-lg italic">
            The canal docks open
          </p>
          <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
            A new district, two new couriers, and night markets every third
            shift.
          </p>
        </aside>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 bg-zero-void px-6 py-3 font-semibold font-zero-text text-zero-sm text-zero-text-3">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> Choose
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>Enter</Kbd> Confirm
          </span>
        </span>
        <span>v0.4.2</span>
      </footer>
    </section>
  );
}
