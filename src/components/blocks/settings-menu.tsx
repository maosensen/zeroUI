"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/components/zero/button";
import { HoldButton } from "@/components/zero/hold-button";
import { Kbd } from "@/components/zero/kbd";
import { RadioGroup, RadioGroupItem } from "@/components/zero/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";
import { Slider } from "@/components/zero/slider";
import { Switch } from "@/components/zero/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

/*
 * A game's settings screen: a black title bar over tabs for each kind of setting, one setting a
 * row (its name and a line on the left, the control on the right), and a footer that applies or,
 * held, restores the defaults. Every value here is local state; wire them to your own store.
 */

const defaults = {
  resolution: "1920x1080",
  brightness: 50,
  vsync: true,
  master: 80,
  music: 55,
  voices: 90,
  subtitles: true,
  difficulty: "standard",
  hints: true,
};

const resolutions = {
  "1280x720": "1280 × 720",
  "1920x1080": "1920 × 1080",
  "2560x1440": "2560 × 1440",
  "3840x2160": "3840 × 2160",
};

const bindings = [
  ["Move", ["W", "A", "S", "D"]],
  ["Sprint", ["Shift"]],
  ["Interact", ["E"]],
  ["Open the map", ["M"]],
  ["Scrap an item", ["X"]],
] as const;

function Row({
  name,
  line,
  children,
}: {
  name: string;
  line?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-x-8 gap-y-3 border-zero-line border-b-(length:--zero-stroke-thin) py-4 last:border-b-0 sm:grid-cols-[1fr_minmax(0,16rem)]">
      <div className="grid gap-0.5">
        <span className="font-bold font-zero text-zero-md italic">{name}</span>
        {line ? (
          <span className="font-medium font-zero-text text-zero-sm text-zero-text-3">
            {line}
          </span>
        ) : null}
      </div>
      <div className="flex items-center sm:justify-end">{children}</div>
    </div>
  );
}

function Level({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex w-full items-center gap-4">
      <Slider
        value={value}
        onValueChange={(next) => onChange(next as number)}
        aria-label={label}
      />
      <span className="w-8 text-right font-semibold font-zero-text text-zero-sm tabular-nums">
        {value}
      </span>
    </div>
  );
}

export function SettingsMenu() {
  const [settings, setSettings] = useState(defaults);
  const [saved, setSaved] = useState(defaults);
  const set = <K extends keyof typeof defaults>(
    key: K,
    value: (typeof defaults)[K],
  ) => setSettings((current) => ({ ...current, [key]: value }));
  const changed = JSON.stringify(settings) !== JSON.stringify(saved);

  return (
    <section
      aria-label="Settings"
      className="grid w-full max-w-3xl border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
    >
      <Tabs defaultValue="display" className="gap-0">
        <header className="grid gap-5 bg-zero-void px-6 pt-6 pb-5">
          <h2 className="font-black font-zero text-zero-2xl italic">
            Settings
          </h2>
          <TabsList>
            <TabsTab value="display">Display</TabsTab>
            <TabsTab value="audio">Audio</TabsTab>
            <TabsTab value="controls">Controls</TabsTab>
            <TabsTab value="gameplay">Gameplay</TabsTab>
          </TabsList>
        </header>

        <TabsPanel value="display" className="px-6 py-2">
          <Row name="Resolution" line="Lower runs faster on older machines.">
            <Select
              items={resolutions}
              value={settings.resolution}
              onValueChange={(value) => set("resolution", value as string)}
            >
              <SelectTrigger aria-label="Resolution" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(resolutions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>
          <Row name="Brightness">
            <Level
              label="Brightness"
              value={settings.brightness}
              onChange={(value) => set("brightness", value)}
            />
          </Row>
          <Row name="Vertical sync" line="Stops tearing; adds a little delay.">
            <Switch
              checked={settings.vsync}
              onCheckedChange={(checked) => set("vsync", checked)}
              aria-label="Vertical sync"
            />
          </Row>
        </TabsPanel>

        <TabsPanel value="audio" className="px-6 py-2">
          <Row name="Master">
            <Level
              label="Master volume"
              value={settings.master}
              onChange={(value) => set("master", value)}
            />
          </Row>
          <Row name="Music">
            <Level
              label="Music volume"
              value={settings.music}
              onChange={(value) => set("music", value)}
            />
          </Row>
          <Row name="Voices">
            <Level
              label="Voice volume"
              value={settings.voices}
              onChange={(value) => set("voices", value)}
            />
          </Row>
          <Row name="Subtitles">
            <Switch
              checked={settings.subtitles}
              onCheckedChange={(checked) => set("subtitles", checked)}
              aria-label="Subtitles"
            />
          </Row>
        </TabsPanel>

        <TabsPanel value="controls" className="px-6 py-2">
          {bindings.map(([action, keys]) => (
            <Row key={action} name={action}>
              <span className="flex gap-1.5 text-zero-md">
                {keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            </Row>
          ))}
        </TabsPanel>

        <TabsPanel value="gameplay" className="px-6 py-2">
          <Row name="Difficulty" line="Can be changed between runs.">
            <RadioGroup
              value={settings.difficulty}
              onValueChange={(value) => set("difficulty", value as string)}
              aria-label="Difficulty"
              className="flex flex-wrap gap-x-5"
            >
              {["relaxed", "standard", "hard"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 font-medium capitalize"
                >
                  <RadioGroupItem value={level} />
                  {level}
                </label>
              ))}
            </RadioGroup>
          </Row>
          <Row name="Hints" line="Marks where to go next on the map.">
            <Switch
              checked={settings.hints}
              onCheckedChange={(checked) => set("hints", checked)}
              aria-label="Hints"
            />
          </Row>
        </TabsPanel>
      </Tabs>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-zero-line border-t-(length:--zero-stroke-thin) bg-zero-void px-6 py-4">
        <HoldButton size="sm" onConfirm={() => setSettings(defaults)}>
          Hold to restore defaults
        </HoldButton>
        <Button disabled={!changed} onClick={() => setSaved(settings)}>
          {changed ? "Apply" : "Applied"}
        </Button>
      </footer>
    </section>
  );
}
