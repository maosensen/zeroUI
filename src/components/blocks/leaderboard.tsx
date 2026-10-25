"use client";

import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { Badge } from "@/components/zero/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/zero/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";

/*
 * A leaderboard: a tab per period, the top of the table with the first three ranked by tier
 * (legendary, epic, rare), and your own row lit and kept at the bottom even when you are far from
 * the top. The names and numbers are made up; feed your own.
 */

type Entry = {
  rank: number;
  name: string;
  district: string;
  runs: number;
  score: number;
  you?: boolean;
};

const boards: Record<string, Entry[]> = {
  week: [
    {
      rank: 1,
      name: "Nightjar",
      district: "Canal docks",
      runs: 41,
      score: 98420,
    },
    {
      rank: 2,
      name: "Sable-9",
      district: "Old market",
      runs: 38,
      score: 91175,
    },
    {
      rank: 3,
      name: "Kilo Moth",
      district: "Rail yards",
      runs: 36,
      score: 87310,
    },
    { rank: 4, name: "Rook", district: "Tower 9", runs: 33, score: 80045 },
    { rank: 5, name: "Juniper", district: "Harbor", runs: 31, score: 76990 },
    {
      rank: 38,
      name: "Wren",
      district: "North gate",
      runs: 12,
      score: 30480,
      you: true,
    },
  ],
  all: [
    {
      rank: 1,
      name: "Sable-9",
      district: "Old market",
      runs: 702,
      score: 1840300,
    },
    {
      rank: 2,
      name: "Tallow",
      district: "Canal docks",
      runs: 655,
      score: 1712860,
    },
    {
      rank: 3,
      name: "Nightjar",
      district: "Canal docks",
      runs: 611,
      score: 1650020,
    },
    { rank: 4, name: "Quill", district: "Tower 9", runs: 590, score: 1588400 },
    { rank: 5, name: "Rook", district: "Tower 9", runs: 548, score: 1490115 },
    {
      rank: 412,
      name: "Wren",
      district: "North gate",
      runs: 96,
      score: 240880,
      you: true,
    },
  ],
};

const tiers = ["legendary", "epic", "rare"] as const;

function Rank({ rank }: { rank: number }) {
  const tier = tiers[rank - 1];
  return tier ? (
    <Badge rarity={tier} className="min-w-9 justify-center tabular-nums">
      {rank}
    </Badge>
  ) : (
    <span className="inline-block min-w-9 text-center font-black font-zero text-zero-text-2 italic tabular-nums">
      {rank}
    </span>
  );
}

function Board({ entries }: { entries: Entry[] }) {
  const top = entries.filter((entry) => !entry.you || entry.rank <= 5);
  const you = entries.find((entry) => entry.you && entry.rank > 5);
  const row = (entry: Entry) => (
    <TableRow
      key={entry.rank}
      data-state={entry.you ? "selected" : undefined}
      aria-current={entry.you ? "true" : undefined}
    >
      <TableCell className="w-16">
        <Rank rank={entry.rank} />
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback>
              {entry.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="grid">
            <span className="font-bold font-zero italic">
              {entry.name}
              {entry.you ? (
                <span className="ms-2 text-zero-accent">(you)</span>
              ) : null}
            </span>
            <span className="font-medium font-zero-text text-zero-sm text-zero-text-2">
              {entry.district}
            </span>
          </span>
        </span>
      </TableCell>
      <TableCell className="hidden text-right tabular-nums sm:table-cell">
        {entry.runs}
      </TableCell>
      <TableCell className="text-right font-semibold tabular-nums">
        {entry.score.toLocaleString("en-US")}
      </TableCell>
    </TableRow>
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Courier</TableHead>
          <TableHead className="hidden text-right sm:table-cell">
            Runs
          </TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {top.map(row)}
        {you ? (
          <>
            <TableRow aria-hidden>
              <TableCell
                colSpan={4}
                className="py-1 text-center text-zero-text-3 tracking-[0.3em]"
              >
                ···
              </TableCell>
            </TableRow>
            {row(you)}
          </>
        ) : null}
      </TableBody>
    </Table>
  );
}

export function Leaderboard() {
  return (
    <section
      aria-labelledby="leaderboard-title"
      className="grid w-full max-w-3xl border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
    >
      <Tabs defaultValue="week" size="sm" className="gap-0">
        <header className="flex flex-wrap items-end justify-between gap-4 bg-zero-void px-6 pt-6 pb-5">
          <h2
            id="leaderboard-title"
            className="tilt font-black font-zero text-zero-2xl italic"
          >
            Leaderboard
          </h2>
          <TabsList>
            <TabsTab value="week">This week</TabsTab>
            <TabsTab value="all">All time</TabsTab>
          </TabsList>
        </header>
        <TabsPanel value="week" className="p-4 sm:p-6">
          <Board entries={boards.week} />
        </TabsPanel>
        <TabsPanel value="all" className="p-4 sm:p-6">
          <Board entries={boards.all} />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
