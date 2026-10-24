"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { CheckIcon, ClearIcon, SearchIcon } from "@/components/zero/icons";
import { Input, InputAction } from "@/components/zero/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/zero/select";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

/*
 * A working screen built from zeroUI's components: a job board you can search, filter, take jobs
 * from and hand them in. Everything in it is invented for the showcase.
 */

const districts = {
  all: "All districts",
  harbor: "Harbor",
  market: "Old market",
  rail: "Rail yards",
  canal: "Canal side",
} as const;

type District = Exclude<keyof typeof districts, "all">;
type Status = "open" | "taken" | "done";
type Job = {
  id: string;
  title: string;
  district: District;
  reward: number;
  status: Status;
};

const start: Job[] = [
  {
    id: "courier",
    title: "Courier run across the river",
    district: "harbor",
    reward: 1200,
    status: "open",
  },
  {
    id: "relay",
    title: "Reset the signal relay on the water tower",
    district: "rail",
    reward: 2400,
    status: "open",
  },
  {
    id: "cat",
    title: "Find a grey cat last seen by the lock gates",
    district: "canal",
    reward: 600,
    status: "open",
  },
  {
    id: "crate",
    title: "Escort a sealed crate through the yards",
    district: "rail",
    reward: 3100,
    status: "open",
  },
  {
    id: "parts",
    title: "Haggle for spare parts at the night stalls",
    district: "market",
    reward: 900,
    status: "open",
  },
  {
    id: "hull",
    title: "Repaint the ferry's hull number",
    district: "harbor",
    reward: 750,
    status: "taken",
  },
  {
    id: "lanterns",
    title: "Deliver lanterns to the canal teahouse",
    district: "canal",
    reward: 400,
    status: "done",
  },
];

const tabs: { status: Status; label: string; empty: string }[] = [
  { status: "open", label: "Open", empty: "Nothing open here." },
  { status: "taken", label: "Taken", empty: "Take a job from the open ones." },
  { status: "done", label: "Done", empty: "Hand a job in to see it here." },
];

const next: Record<Status, Status> = {
  open: "taken",
  taken: "done",
  done: "done",
};

export function JobBoard() {
  const [jobs, setJobs] = useState(start);
  const [tab, setTab] = useState<Status>("open");
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState<keyof typeof districts>("all");

  const shown = jobs.filter(
    (job) =>
      (district === "all" || job.district === district) &&
      job.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const count = (status: Status) =>
    jobs.filter((job) => job.status === status).length;
  const advance = (id: string) =>
    setJobs((all) =>
      all.map((job) =>
        job.id === id ? { ...job, status: next[job.status] } : job,
      ),
    );

  return (
    <section
      aria-label="Job board"
      className="grid min-w-0 border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) outline-(length:--zero-stroke-thin) outline-zero-line outline-solid"
    >
      <header className="flex items-center justify-between gap-4 bg-zero-void px-5 py-4">
        <h2 className="rotate-(--zero-tilt) font-black font-zero text-zero-xl italic">
          Job board
        </h2>
        <p className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
          <span className="text-zero-accent">{count("open")}</span> open ·{" "}
          {count("taken")} taken
        </p>
      </header>

      <div className="grid gap-5 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs"
            aria-label="Search jobs"
            start={<SearchIcon />}
            end={
              query ? (
                <InputAction aria-label="Clear" onClick={() => setQuery("")}>
                  <ClearIcon />
                </InputAction>
              ) : null
            }
          />
          <Select
            items={districts}
            value={district}
            onValueChange={(value) =>
              setDistrict(value as keyof typeof districts)
            }
          >
            <SelectTrigger aria-label="District">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{districts.all}</SelectItem>
              <SelectSeparator />
              {(Object.keys(districts) as (keyof typeof districts)[])
                .filter((key) => key !== "all")
                .map((key) => (
                  <SelectItem key={key} value={key}>
                    {districts[key]}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as Status)}
          className="gap-4"
        >
          <TabsList>
            {tabs.map(({ status, label }) => (
              <TabsTab key={status} value={status}>
                {label}
                <span className="tabular-nums opacity-60 max-sm:hidden">
                  {count(status)}
                </span>
              </TabsTab>
            ))}
          </TabsList>
          {tabs.map(({ status, empty }) => {
            const rows = shown.filter((job) => job.status === status);
            return (
              // tall enough for every open job, so switching tabs never moves the page
              <TabsPanel
                key={status}
                value={status}
                className="min-h-[23.5rem] max-sm:min-h-[28.5rem]"
              >
                {rows.length === 0 ? (
                  <p className="py-6 font-bold font-zero text-zero-md text-zero-text-3 italic">
                    {empty}
                  </p>
                ) : (
                  <ul className="grid gap-2">
                    {rows.map((job) => (
                      <li
                        key={job.id}
                        className="slab slab-cut-end flex items-center gap-4 [--slab-fill:var(--color-zero-raised)] [--slab-h:4.5rem] [--slab-px:1.25rem] max-sm:[--slab-h:5.5rem]"
                      >
                        <div className="grid min-w-0 flex-1 gap-1">
                          <span className="font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
                            {districts[job.district]}
                          </span>
                          <span className="line-clamp-2 font-bold font-zero-text text-zero-md sm:truncate">
                            {job.title}
                          </span>
                        </div>
                        <span className="font-black font-zero text-zero-lg tabular-nums italic max-sm:hidden">
                          {job.reward.toLocaleString("en")}
                          <span className="ms-1 text-zero-text-3 text-zero-xs">
                            cr
                          </span>
                        </span>
                        {job.status === "done" ? (
                          <span className="flex w-24 items-center justify-end gap-1.5 font-bold font-zero text-zero-sm text-zero-text-2 italic">
                            <CheckIcon className="text-zero-accent" />
                            Done
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant={
                              job.status === "open" ? "primary" : "secondary"
                            }
                            className="w-24"
                            onClick={() => advance(job.id)}
                          >
                            {job.status === "open" ? "Take" : "Hand in"}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </TabsPanel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
