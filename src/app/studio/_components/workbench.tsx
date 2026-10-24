"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import { Button } from "@/zero/components/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/zero/components/tabs";

const variants = ["primary", "secondary", "danger", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
const cuts = ["end", "start", "both", "none"] as const;

/** A placeholder glyph for checking how a button holds an icon, until the icon set exists. */
function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M4 2h4l5 6-5 6H4l5-6z" />
    </svg>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-6 border-t-2 border-zero-line py-5">
      <span className="font-bold text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Dial({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-zero-sm">
      <span className="flex justify-between font-bold text-zero-text-2 italic">
        {label}
        <span className="text-zero-text tabular-nums">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-48 accent-zero-accent"
      />
    </label>
  );
}

export function Workbench() {
  const [slant, setSlant] = useState(14);
  const [stroke, setStroke] = useState(3);
  const tuned = {
    "--zero-slant": `${slant}deg`,
    "--zero-stroke": `${stroke}px`,
  } as CSSProperties;

  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch)">
      <header className="sticky top-0 z-zero-sticky flex items-center gap-8 bg-zero-void px-8 py-4">
        <p className="rotate-(--zero-tilt) font-black text-zero-xl italic">
          zero<span className="text-zero-accent">UI</span>
          <span className="ml-3 text-zero-text-3">studio</span>
        </p>
        <div className="ml-auto flex gap-8">
          <Dial
            label="Slant"
            value={slant}
            unit="°"
            min={0}
            max={30}
            step={1}
            onChange={setSlant}
          />
          <Dial
            label="Outline"
            value={stroke}
            unit="px"
            min={0}
            max={6}
            step={0.5}
            onChange={setStroke}
          />
        </div>
      </header>

      <main style={tuned} className="mx-auto grid max-w-6xl gap-14 px-8 py-12">
        <Section title="Button">
          {variants.map((variant) => (
            <Row key={variant} label={variant}>
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Accept commission
                </Button>
              ))}
              <Button variant={variant}>
                Next
                <Chevron />
              </Button>
              <Button variant={variant} disabled>
                Claimed
              </Button>
            </Row>
          ))}
        </Section>

        <Section title="Cut">
          {cuts.map((cut) => (
            <Row key={cut} label={cut}>
              {variants.map((variant) => (
                <Button key={variant} variant={variant} cut={cut}>
                  Claim all
                </Button>
              ))}
            </Row>
          ))}
          <Row label="nested">
            <div className="flex">
              <Button cut="end">Notifications</Button>
              <Button
                variant="secondary"
                cut="both"
                className="-ml-[calc(var(--height-zero-md)*tan(var(--zero-slant))-4px)]"
              >
                Level
              </Button>
              <Button
                variant="secondary"
                cut="start"
                className="-ml-[calc(var(--height-zero-md)*tan(var(--zero-slant))-4px)]"
              >
                Schedule
              </Button>
            </div>
          </Row>
        </Section>

        <Section title="Tabs">
          {sizes.map((size) => (
            <Row key={size} label={size}>
              <Tabs size={size} defaultValue="notes">
                <TabsList>
                  <TabsTab value="notes">Notes</TabsTab>
                  <TabsTab value="level">Level</TabsTab>
                  <TabsTab value="schedule">Schedule</TabsTab>
                </TabsList>
              </Tabs>
            </Row>
          ))}
          <Row label="widths">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTab value="all">All</TabsTab>
                <TabsTab value="commissions">Open commissions</TabsTab>
                <TabsTab value="me">Me</TabsTab>
                <TabsTab value="archive">
                  Archive
                  <Chevron />
                </TabsTab>
                <TabsTab value="locked" disabled>
                  Locked
                </TabsTab>
              </TabsList>
            </Tabs>
          </Row>
          <Row label="panels">
            <Tabs defaultValue="today" className="w-full">
              <TabsList>
                <TabsTab value="today">Today</TabsTab>
                <TabsTab value="week">This week</TabsTab>
                <TabsTab value="later">Later</TabsTab>
              </TabsList>
              <TabsPanel
                value="today"
                className="font-semibold text-zero-md text-zero-text-2"
              >
                Three errands, one delivery across the river, a call at nine.
              </TabsPanel>
              <TabsPanel
                value="week"
                className="font-semibold text-zero-md text-zero-text-2"
              >
                The workshop reopens on Thursday; the parts arrive the day
                before.
              </TabsPanel>
              <TabsPanel
                value="later"
                className="font-semibold text-zero-md text-zero-text-2"
              >
                Nothing planned yet.
              </TabsPanel>
            </Tabs>
          </Row>
        </Section>
      </main>
    </div>
  );
}
