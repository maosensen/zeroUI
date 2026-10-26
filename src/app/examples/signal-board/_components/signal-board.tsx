"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AccentSwitch } from "@/components/zero/accent-switch";
import { Badge } from "@/components/zero/badge";
import { Button } from "@/components/zero/button";
import { Gauge } from "@/components/zero/gauge";
import { ArrowLeftIcon } from "@/components/zero/icons/arrow-left";
import { SearchIcon } from "@/components/zero/icons/search";
import { Input } from "@/components/zero/input";
import { Kbd } from "@/components/zero/kbd";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/zero/sheet";
import { Sparkline } from "@/components/zero/sparkline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/zero/table";
import {
  Ticker,
  TickerItem,
  TickerLive,
  TickerValue,
} from "@/components/zero/ticker";
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";
import {
  TN_EDITION,
  TN_KIND_LABEL,
  TN_SOURCES,
  TN_STORIES,
  TN_TOPICS,
  type TnComment,
  type TnStory,
  tnAgo,
  tnAllLinks,
  tnClock,
  tnCommentCount,
  tnScore,
  tnSource,
  tnTopic,
} from "../_data";

/*
 * The signal board: a day of technology news drawn as a board to scan, not a page to read. A
 * ticker of the latest, five readings, a heat-ranked table walked with j and k (or the arrows)
 * beside a preview of the chosen row, the topics, and a story opening in a sheet with its
 * coverage and discussion. Every piece is a zzzUI component; the data is invented.
 */

type Sort = "hot" | "new" | "discussed";

const sorters: Record<Sort, (a: TnStory, b: TnStory) => number> = {
  hot: (a, b) => tnScore(b) - tnScore(a),
  new: (a, b) => a.lead.ago - b.lead.ago,
  discussed: (a, b) => b.comments - a.comments,
};

const code = (s: TnStory) => tnTopic(s.topic).code;
const sum = (rows: number[][]) =>
  rows[0]?.map((_, i) => rows.reduce((n, r) => n + (r[i] ?? 0), 0)) ?? [];

const maxScore = Math.max(...TN_STORIES.map(tnScore));
// the top quarter by heat wears the accent; the rest stay grey
const hotLine = [...TN_STORIES.map(tnScore)].sort((a, b) => b - a)[
  Math.floor(TN_STORIES.length / 4)
];
const isHot = (s: TnStory) => tnScore(s) > hotLine;

function Code({ children }: { children: string }) {
  return (
    <Badge variant="outline" className="shrink-0 font-zero-text not-italic">
      {children}
    </Badge>
  );
}

function Heat({ story }: { story: TnStory }) {
  const score = tnScore(story);
  return (
    <div className="flex items-center gap-2.5">
      <Gauge
        value={score}
        max={maxScore}
        segments={8}
        tone={isHot(story) ? "accent" : "quiet"}
        aria-label={`Heat ${score}`}
        className="w-20 text-zero-xs"
      />
      <span
        className={`w-8 font-black font-zero italic tabular-nums ${isHot(story) ? "text-zero-accent" : "text-zero-text-2"}`}
      >
        {score}
      </span>
    </div>
  );
}

function Panel({
  title,
  index,
  children,
  className = "",
}: {
  title: string;
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={`grid content-start gap-3 border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) p-4 ${className}`}
    >
      <h2 className="flex items-baseline gap-2 border-zero-line border-b-(length:--zero-stroke-thin) pb-2 font-black font-zero text-zero-xs uppercase italic tracking-[0.14em]">
        <span className="text-zero-accent">{index}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Thread({ comments }: { comments: TnComment[] }) {
  return (
    <ul className="grid gap-3">
      {comments.map((c) => (
        <li key={c.id} className="grid gap-1">
          <p className="flex flex-wrap items-baseline gap-x-2 font-zero-text text-zero-xs text-zero-text-3">
            <span className="font-bold font-zero text-zero-sm text-zero-text italic">
              {c.author}
            </span>
            {c.points} points · {tnAgo(c.ago)} ago
          </p>
          <p className="text-zero-sm text-zero-text-2">{c.text}</p>
          {c.replies?.length ? (
            <div className="ms-1 border-zero-line border-s-(length:--zero-stroke-thin) ps-4">
              <Thread comments={c.replies} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function SignalBoard() {
  const [sort, setSort] = useState<Sort>("hot");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState<TnStory | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const fromKeys = useRef(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...TN_STORIES]
      .filter((s) => !topic || s.topic === topic)
      .filter(
        (s) =>
          !q ||
          [s.headline, tnTopic(s.topic).name, code(s), ...s.tags].some((t) =>
            t.toLowerCase().includes(q),
          ),
      )
      .sort(sorters[sort]);
  }, [sort, query, topic]);
  const story = rows[Math.min(selected, rows.length - 1)];

  const openStory = (s: TnStory) => {
    setOpen(s);
    setIsOpen(true);
  };

  // j / k (or the arrows) walk the board, Enter opens, / goes to the filter
  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        isOpen ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "") ||
        target?.closest("[role=radiogroup],[role=group]")
      )
        return;
      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        fromKeys.current = true;
        setSelected((i) => Math.min(rows.length - 1, i + 1));
      } else if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        fromKeys.current = true;
        setSelected((i) => Math.max(0, i - 1));
      } else if (event.key === "Enter" && story) {
        if (target?.closest("a,button")) return;
        event.preventDefault();
        setOpen(story);
        setIsOpen(true);
      } else if (event.key === "/") {
        event.preventDefault();
        document.getElementById("board-filter")?.focus();
      }
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, [rows.length, story, isOpen]);

  // only a move made with the keys scrolls the chosen row into view, never the first paint
  useEffect(() => {
    if (!fromKeys.current) return;
    fromKeys.current = false;
    document
      .querySelector('[data-board-row][aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  });

  const readings = [
    { label: "Events", value: TN_STORIES.length },
    { label: "Sources", value: TN_SOURCES.length },
    {
      label: "Reports",
      value: TN_STORIES.reduce((n, s) => n + s.coverage.length + 1, 0),
    },
    {
      label: "Comments",
      value: TN_STORIES.reduce((n, s) => n + s.comments, 0),
    },
  ];
  const byTopic = TN_TOPICS.map((t) => {
    const stories = TN_STORIES.filter((s) => s.topic === t.id);
    return {
      topic: t,
      stories,
      heat: sum(stories.map((s) => s.heat)),
      score: stories.reduce((n, s) => n + tnScore(s), 0),
    };
  });
  const hottest = [...byTopic].sort((a, b) => b.score - a.score)[0];
  const latest = [...TN_STORIES]
    .sort((a, b) => a.lead.ago - b.lead.ago)
    .slice(0, 10);

  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch) text-zero-text">
      <Ticker aria-label="Latest reports" duration={90}>
        <TickerLive />
        {latest.map((s) => (
          <TickerItem key={s.id}>
            <Code>{code(s)}</Code>
            <button
              type="button"
              className="text-zero-text outline-none hover:text-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
              onClick={() => openStory(s)}
            >
              {s.headline}
            </button>
            <TickerValue>{tnScore(s)}</TickerValue>
          </TickerItem>
        ))}
      </Ticker>

      <header className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-zero-void px-4 py-3 sm:px-8">
        <Link
          href="/examples"
          aria-label="Back to the examples"
          className="grid size-9 place-items-center text-zero-text-2 outline-none hover:text-zero-text focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus"
        >
          <ArrowLeftIcon />
        </Link>
        <p className="tilt font-black font-zero text-zero-xl italic">
          SIGNAL<span className="text-zero-accent">/</span>BOARD
        </p>
        <ToggleGroup
          aria-label="Topic"
          size="sm"
          value={topic ? [topic] : []}
          onValueChange={(value) => {
            setTopic(value[0] ?? null);
            setSelected(0);
          }}
          className="max-lg:hidden"
        >
          {TN_TOPICS.map((t) => (
            <ToggleGroupItem key={t.id} value={t.id}>
              {t.code}
              <span className="sr-only">{t.name}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="ms-auto flex items-center gap-5">
          <span className="font-semibold font-zero-text text-zero-sm text-zero-text-3 tabular-nums">
            {TN_EDITION.dateShort} · {tnClock(0)}
          </span>
          <AccentSwitch className="max-sm:hidden" />
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8">
        <div className="grid gap-3 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <div className="grid gap-2">
            <p className="font-black font-zero text-zero-accent text-zero-xs uppercase italic tracking-[0.14em]">
              Edition · {TN_EDITION.dateLong}
            </p>
            <h1 className="font-black font-zero text-zero-2xl italic leading-none">
              What tech is talking about
            </h1>
          </div>
          <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
            Every event ranked by heat: points, comments and how many outlets
            picked it up, decayed by age. Walk the board with <Kbd>J</Kbd>{" "}
            <Kbd>K</Kbd>, open a story with <Kbd>Enter</Kbd>, filter with{" "}
            <Kbd>/</Kbd>.
          </p>
        </div>

        <Panel title="Readings" index={1}>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {readings.map((r) => (
              <div key={r.label} className="grid gap-1">
                <dt className="font-zero-text text-zero-xs text-zero-text-3 lowercase">
                  {r.label}
                </dt>
                <dd className="font-black font-zero text-zero-xl italic tabular-nums">
                  {r.value.toLocaleString("en-US")}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-1 gap-1">
              <dt className="font-zero-text text-zero-xs text-zero-text-3">
                hottest
              </dt>
              <dd className="flex items-center gap-2">
                <Code>{hottest.topic.code}</Code>
                <span className="truncate font-bold font-zero text-zero-sm italic">
                  {hottest.topic.name}
                </span>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="font-zero-text text-zero-xs text-zero-text-3">
                reports, 24h
              </dt>
              <dd className="text-zero-xl">
                <Sparkline
                  values={sum(TN_STORIES.map((s) => s.heat))}
                  hot
                  label="Reports over the last 24 hours, rising"
                />
              </dd>
            </div>
          </dl>
        </Panel>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <Panel title="Board" index={2} className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <ToggleGroup
                aria-label="Sort by"
                size="sm"
                value={[sort]}
                onValueChange={(value) => {
                  if (value[0]) setSort(value[0] as Sort);
                  setSelected(0);
                }}
              >
                <ToggleGroupItem value="hot">Hot</ToggleGroupItem>
                <ToggleGroupItem value="new">New</ToggleGroupItem>
                <ToggleGroupItem value="discussed">Discussed</ToggleGroupItem>
              </ToggleGroup>
              <Input
                id="board-filter"
                size="sm"
                aria-label="Filter the board"
                placeholder="Filter"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setQuery("");
                    event.currentTarget.blur();
                  } else if (
                    event.key === "Enter" ||
                    event.key === "ArrowDown"
                  ) {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
                start={<SearchIcon />}
                end={<Kbd>/</Kbd>}
                className="w-56"
              />
              {topic ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTopic(null)}
                >
                  {tnTopic(topic).code} · show all
                </Button>
              ) : null}
              <span className="ms-auto font-zero-text text-zero-xs text-zero-text-3">
                sorted by {sort} · {rows.length} of {TN_STORIES.length}
              </span>
            </div>
            <Table aria-label="Stories, by heat">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>heat</TableHead>
                  <TableHead>story</TableHead>
                  <TableHead className="max-md:hidden text-right">
                    src
                  </TableHead>
                  <TableHead className="max-md:hidden text-right">
                    cmt
                  </TableHead>
                  <TableHead className="max-md:hidden">24h</TableHead>
                  <TableHead className="text-right">age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((s, i) => (
                  <TableRow
                    key={s.id}
                    data-board-row
                    aria-selected={s === story}
                    onPointerEnter={() => setSelected(i)}
                    onClick={() => setSelected(i)}
                  >
                    <TableCell className="font-black font-zero text-zero-text-3 italic tabular-nums">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <Heat story={s} />
                    </TableCell>
                    <TableCell className="max-w-0 min-w-56">
                      <span className="flex items-center gap-2.5">
                        <Code>{code(s)}</Code>
                        <button
                          type="button"
                          onClick={() => openStory(s)}
                          className="truncate text-start font-semibold outline-none hover:text-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus"
                        >
                          {s.headline}
                        </button>
                      </span>
                      <span className="block truncate font-zero-text text-zero-xs text-zero-text-3 in-aria-selected:text-zero-text-2 in-[tr:hover]:text-zero-text-2">
                        {tnSource(s.lead.source).name} · {TN_KIND_LABEL[s.kind]}
                      </span>
                    </TableCell>
                    <TableCell className="max-md:hidden text-right tabular-nums">
                      {s.coverage.length + 1}
                    </TableCell>
                    <TableCell className="max-md:hidden text-right tabular-nums">
                      {s.comments}
                    </TableCell>
                    <TableCell className="max-md:hidden">
                      <Sparkline values={s.heat} hot={isHot(s)} />
                    </TableCell>
                    <TableCell className="text-right text-zero-text-3 tabular-nums in-aria-selected:text-zero-text-2 in-[tr:hover]:text-zero-text-2">
                      {tnAgo(s.lead.ago)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {rows.length === 0 ? (
              <p className="py-6 text-center text-zero-sm text-zero-text-3">
                Nothing matches “{query}”.
              </p>
            ) : null}
          </Panel>

          {story ? (
            <Panel
              title="Preview"
              index={3}
              className="max-xl:hidden xl:sticky xl:top-4"
            >
              <div className="flex items-center gap-2">
                <Code>{code(story)}</Code>
                <Badge variant="secondary">{TN_KIND_LABEL[story.kind]}</Badge>
                <span className="ms-auto">
                  <Heat story={story} />
                </span>
              </div>
              <h3 className="font-black font-zero text-zero-lg italic leading-tight">
                {story.headline}
              </h3>
              <p className="border-zero-accent border-s-(length:--zero-stroke-thick) ps-3 text-zero-sm text-zero-text-2">
                {story.summary}
              </p>
              <ol className="grid gap-2">
                {tnAllLinks(story)
                  .slice(0, 4)
                  .map((link) => (
                    <li
                      key={link.title}
                      className="grid gap-0.5 font-zero-text text-zero-xs"
                    >
                      <span className="text-zero-text-3">
                        {tnClock(link.ago)} · {tnSource(link.source).name}
                        {link === story.lead ? (
                          <span className="ms-2 text-zero-accent">first</span>
                        ) : null}
                      </span>
                      <span className="text-zero-sm text-zero-text">
                        {link.title}
                      </span>
                    </li>
                  ))}
              </ol>
              <p className="flex flex-wrap gap-1.5">
                {story.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </p>
              <Button onClick={() => openStory(story)}>Open story</Button>
            </Panel>
          ) : null}
        </div>

        <Panel title="Topics" index={4}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {byTopic.map(({ topic: t, stories, heat }) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTopic(t.id);
                    setSelected(0);
                    document
                      .getElementById("board-filter")
                      ?.scrollIntoView({ block: "center" });
                  }}
                  className="grid w-full gap-2 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void p-4 text-start outline-none transition-colors duration-(--zero-dur-fast) hover:border-zero-accent focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <Code>{t.code}</Code>
                      <span className="font-black font-zero italic">
                        {t.name}
                      </span>
                    </span>
                    <Sparkline values={heat} hot={t === hottest.topic} />
                  </span>
                  <span className="text-zero-sm text-zero-text-2">
                    {t.blurb}
                  </span>
                  <span className="font-zero-text text-zero-xs text-zero-text-3">
                    {stories.length} stories
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <p className="text-center font-zero-text text-zero-xs text-zero-text-3">
          An example built with zzzUI. The outlets, companies and stories are
          invented.
        </p>
      </main>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          {open ? (
            <>
              <SheetHeader>
                <SheetTitle>{open.headline}</SheetTitle>
                <SheetDescription>
                  {tnTopic(open.topic).name} · {TN_KIND_LABEL[open.kind]} · heat{" "}
                  {tnScore(open)}
                </SheetDescription>
              </SheetHeader>
              <SheetBody>
                <p className="text-zero-text-2">{open.summary}</p>
                <section className="grid gap-3">
                  <h3 className="font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]">
                    Coverage
                  </h3>
                  <ol className="grid gap-3 border-zero-line border-s-(length:--zero-stroke-thin) ps-4">
                    {tnAllLinks(open).map((link) => (
                      <li key={link.title} className="relative grid gap-0.5">
                        <span
                          aria-hidden
                          className={`absolute top-1.5 -start-[calc(1rem+5px)] size-2 -skew-x-(--zero-slant) ${link === open.lead ? "bg-zero-accent" : "bg-zero-text-3"}`}
                        />
                        <span className="font-zero-text text-zero-xs text-zero-text-3">
                          {tnClock(link.ago)} · {tnSource(link.source).name}
                          {link.author ? ` · ${link.author}` : ""}
                          {link === open.lead ? (
                            <span className="ms-2 text-zero-accent">first</span>
                          ) : null}
                        </span>
                        <span className="text-zero-sm">{link.title}</span>
                      </li>
                    ))}
                  </ol>
                </section>
                {open.thread?.length ? (
                  <section className="grid gap-3">
                    <h3 className="font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]">
                      Discussion · {tnCommentCount(open.thread)}
                    </h3>
                    <Thread comments={open.thread} />
                  </section>
                ) : null}
              </SheetBody>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
