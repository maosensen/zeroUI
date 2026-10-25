"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import { Button } from "@/components/zero/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/zero/field";
import {
  ArrowRightIcon,
  ClearIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  SearchIcon,
} from "@/components/zero/icons";
import { Input, InputAction } from "@/components/zero/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";
import { CommandsSection } from "./commands-section";
import { DataSection } from "./data-section";
import { DisclosureSection } from "./disclosure-section";
import { FeedbackSection } from "./feedback-section";
import { FormsSection } from "./forms-section";
import { IconSheet } from "./icon-sheet";
import { InputsSection } from "./inputs-section";
import { LayoutSection } from "./layout-section";
import { MoreOverlaysSection } from "./more-overlays-section";
import { NavigationSection } from "./navigation-section";
import { OverlaysSection } from "./overlays-section";

const variants = ["primary", "secondary", "danger", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
const cuts = ["end", "start", "both", "none"] as const;

const districts = {
  harbor: "Harbor",
  market: "Old market",
  rail: "Rail yards",
  tower: "Tower row",
  canal: "Canal side",
} as const;

const shifts = Object.fromEntries(
  Array.from({ length: 24 }, (_, hour) => [
    String(hour),
    `${String(hour).padStart(2, "0")}:00 shift`,
  ]),
);

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
  const [query, setQuery] = useState("rail yards");
  const [showKey, setShowKey] = useState(false);
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
        <Section title="Icons">
          <IconSheet />
        </Section>

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
                <ArrowRightIcon />
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

        <Section title="Input">
          {sizes.map((size) => (
            <Row key={size} label={size}>
              <Input
                size={size}
                placeholder="Search the board"
                className="max-w-xs"
              />
              <Input
                size={size}
                defaultValue="Courier, east district"
                className="max-w-xs"
              />
            </Row>
          ))}
          <Row label="slots">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the board"
              aria-label="Search the board"
              start={<SearchIcon />}
              end={
                query ? (
                  <InputAction aria-label="Clear" onClick={() => setQuery("")}>
                    <ClearIcon />
                  </InputAction>
                ) : null
              }
              className="max-w-xs"
            />
            <Input
              type={showKey ? "text" : "password"}
              defaultValue="lantern-42"
              aria-label="Access key"
              end={
                <InputAction
                  aria-label={showKey ? "Hide the key" : "Show the key"}
                  onClick={() => setShowKey((shown) => !shown)}
                >
                  {showKey ? <EyeOffIcon /> : <EyeIcon />}
                </InputAction>
              }
              className="max-w-xs"
            />
          </Row>
          <Row label="states">
            <Input placeholder="Disabled" disabled className="max-w-56" />
            <Input
              defaultValue="no@"
              aria-invalid
              className="max-w-56"
              aria-label="Invalid"
            />
            <Input placeholder="Cut both" cut="both" className="max-w-56" />
          </Row>
          <Row label="field">
            <div className="grid w-full max-w-sm gap-6">
              <Field
                validationMode="onChange"
                validate={(value) =>
                  typeof value === "string" &&
                  value.length > 0 &&
                  value.length < 3
                    ? "At least three characters."
                    : null
                }
              >
                <FieldLabel>Callsign</FieldLabel>
                <Input placeholder="Three or more characters" />
                <FieldDescription>
                  Shown on every job you take.
                </FieldDescription>
                <FieldError />
              </Field>
              <Field invalid>
                <FieldLabel>Drop point</FieldLabel>
                <Input defaultValue="Pier 0" />
                <FieldError match>That pier closed last season.</FieldError>
              </Field>
            </div>
          </Row>
        </Section>

        <Section title="Select">
          {sizes.map((size) => (
            <Row key={size} label={size}>
              <Select items={districts}>
                <SelectTrigger size={size} className="max-w-64">
                  <SelectValue placeholder="Pick a district" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(districts).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select items={districts} defaultValue="rail">
                <SelectTrigger size={size} className="max-w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(districts).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
          ))}
          <Row label="groups">
            <Select items={districts} defaultValue="market">
              <SelectTrigger className="max-w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Waterfront</SelectLabel>
                  <SelectItem value="harbor">Harbor</SelectItem>
                  <SelectItem value="canal">Canal side</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Inland</SelectLabel>
                  <SelectItem value="market">Old market</SelectItem>
                  <SelectItem value="rail">Rail yards</SelectItem>
                  <SelectItem value="tower" disabled>
                    Tower row
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={shifts}>
              <SelectTrigger className="max-w-64">
                <SelectValue placeholder="Long list" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {Object.entries(shifts).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>
          <Row label="states">
            <Select items={districts} disabled>
              <SelectTrigger className="max-w-56">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
            </Select>
            <Select items={districts} defaultValue="harbor">
              <SelectTrigger aria-invalid className="max-w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(districts).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>
        </Section>

        <FormsSection />

        <OverlaysSection />

        <FeedbackSection />

        <DataSection />

        <NavigationSection />

        <DisclosureSection />

        <CommandsSection />

        <InputsSection />

        <MoreOverlaysSection />

        <LayoutSection />

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
                  <ArrowRightIcon />
                </TabsTab>
                <TabsTab value="locked" disabled>
                  <LockIcon />
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
