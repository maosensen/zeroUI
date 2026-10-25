"use client";

import { useState } from "react";
import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import {
  Objective,
  ObjectiveCount,
  Objectives,
  ObjectiveTitle,
} from "@/components/zero/objectives";

/*
 * Today, as a game plans a day: four shifts side by side (they stack on a phone), the one under
 * way framed and marked NOW, those gone by dimmed, each with its errands as objectives. The
 * current errand can be marked done, and the next one becomes current. The day is made up; feed
 * your own clock and errands.
 */

type Shift = {
  id: string;
  name: string;
  hours: string;
  errands: string[];
};

const shifts: Shift[] = [
  {
    id: "dawn",
    name: "Dawn",
    hours: "05–09",
    errands: ["Charge the rig", "Coffee at the yards"],
  },
  {
    id: "day",
    name: "Day",
    hours: "09–17",
    errands: ["Two market runs", "Patch the hull", "Sleep"],
  },
  {
    id: "dusk",
    name: "Dusk",
    hours: "17–22",
    errands: ["Pick up the route chip", "Meet Rook at the canal"],
  },
  {
    id: "night",
    name: "Night",
    hours: "22–05",
    errands: [
      "Collect the sealed crates",
      "Cross before the gate shuts",
      "Hand over at the North gate",
    ],
  },
];

const now = 2;

export function DailySchedule() {
  const [done, setDone] = useState(1);
  const errands = shifts[now].errands;

  return (
    <section
      aria-labelledby="today-title"
      className="@container grid w-full max-w-6xl gap-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="today-title"
          className="font-black font-zero text-zero-2xl italic"
        >
          Today
        </h2>
        <Button
          size="sm"
          variant="secondary"
          disabled={done >= errands.length}
          onClick={() => setDone((d) => d + 1)}
        >
          {done >= errands.length
            ? "Shift's errands done"
            : "Mark the current errand done"}
        </Button>
      </div>
      <ol className="grid gap-3 @2xl:grid-cols-2 @5xl:grid-cols-4">
        {shifts.map((shift, index) => {
          const past = index < now;
          const isNow = index === now;
          return (
            <li
              key={shift.id}
              aria-current={isNow ? "time" : undefined}
              className={
                "grid content-start gap-3 border-(length:--zero-stroke) border-zero-ink bg-zero-surface p-4 " +
                (isNow
                  ? "outline-(length:--zero-stroke-thin) outline-solid outline-zero-focus outline-offset-2"
                  : past
                    ? "opacity-60"
                    : "")
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid">
                  <span className="font-black font-zero text-zero-xl uppercase italic">
                    {shift.name}
                  </span>
                  <span className="font-semibold font-zero-text text-zero-sm text-zero-text-3 tabular-nums">
                    {shift.hours}
                  </span>
                </span>
                {isNow ? <Badge>Now</Badge> : null}
              </div>
              <Objectives
                aria-label={`${shift.name} errands`}
                className="max-w-none bg-none p-0"
              >
                {shift.errands.map((errand, i) => (
                  <Objective
                    key={errand}
                    state={
                      past
                        ? "done"
                        : isNow
                          ? i < done
                            ? "done"
                            : i === done
                              ? "active"
                              : "pending"
                          : "pending"
                    }
                  >
                    <ObjectiveTitle className="text-zero-sm">
                      {errand}
                    </ObjectiveTitle>
                    {isNow && i === done ? (
                      <ObjectiveCount>
                        {i + 1}/{shift.errands.length}
                      </ObjectiveCount>
                    ) : null}
                  </Objective>
                ))}
              </Objectives>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
