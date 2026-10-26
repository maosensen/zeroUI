"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { AccentPicker } from "@/components/zero/accent-picker";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/zero/attachment";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { Badge } from "@/components/zero/badge";
import { Bubble, BubbleContent } from "@/components/zero/bubble";
import { Button } from "@/components/zero/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/zero/code-block";
import { Counter } from "@/components/zero/counter";
import { Feed, FeedActor, FeedItem, FeedTarget } from "@/components/zero/feed";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/zero/gauge";
import { HoldButton } from "@/components/zero/hold-button";
import { AlertIcon } from "@/components/zero/icons/alert";
import { ArrowLeftIcon } from "@/components/zero/icons/arrow-left";
import { CheckIcon } from "@/components/zero/icons/check";
import { ChipIcon } from "@/components/zero/icons/chip";
import { SpinnerIcon } from "@/components/zero/icons/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/zero/input-group";
import { Marker, MarkerContent, MarkerIcon } from "@/components/zero/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/zero/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/zero/message-scroller";
import {
  Objective,
  type ObjectiveState,
  Objectives,
  ObjectivesHeader,
  ObjectiveTitle,
} from "@/components/zero/objectives";
import { Sparkline } from "@/components/zero/sparkline";
import { Stat, Stats } from "@/components/zero/stats";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/zero/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  Trace as TraceList,
  TraceTitle,
} from "@/components/zero/trace";
import { usePick } from "@/lib/i18n/client";
import {
  ALERTS,
  type Alert,
  DIFF,
  INCIDENT,
  LATE_ALERT,
  LOG_LINES,
  ME,
  RESPONDERS,
  ROUTINE,
  RUNBOOK,
  RUNBOOK_DONE,
  RUNBOOK_START,
  SERVICES,
  type Service,
  type ServiceStatus,
  service,
  TIMELINE,
  type Turn,
} from "../_data";

/*
 * The ops console: an afternoon on call for the courier network, as one app under a black bar.
 * Three tabs that Q and E step through: the wall (a tile per service, live), the alert queue (to
 * acknowledge, or open as an incident) and the incident (a war room in the chat components beside
 * its runbook, resolved by holding). The runbook is the thread: each step done moves the route
 * planner's numbers, its alerts and the timeline. What happens is reported in the corner. Every
 * piece is a zzzUI component; the data is invented.
 */

type Tab = "wall" | "alerts" | "incident";
type Filter = "open" | "resolved" | "all";
type FeedEvent = {
  id: string;
  tone: "default" | "accent" | "danger";
  actor: string;
  text: string;
  target: string;
};

/** One wall tick, in ms; four of them make a minute on the console's clock. */
const TICK = 2500;
/** When the late alert fires, in ticks. */
const LATE_AT = 10;

// a wobble that is the same on every run, so the wall is not random from one load to the next
const wobble = (tick: number, i: number) =>
  (((tick * 7919 + i * 104729) % 97) / 97 - 0.5) * 2;

const clock = (tick: number) =>
  `14:${String(Math.min(59, 12 + Math.floor(tick / 4))).padStart(2, "0")}`;

/** Where the planner's p95 sits, by how far the runbook has got. */
const plannerTarget = (step: number, baseline: number) =>
  step <= 2 ? 920 : step === 3 ? 410 : baseline;

const plannerStatus = (step: number): ServiceStatus =>
  step <= 2 ? "down" : step === 3 ? "degraded" : "up";

const statusBadge: Record<
  ServiceStatus,
  { label: string; variant: "outline" | "secondary" | "danger" }
> = {
  up: { label: "Up", variant: "outline" },
  degraded: { label: "Degraded", variant: "secondary" },
  down: { label: "Down", variant: "danger" },
};

const severityVariant = {
  P1: "danger",
  P2: "secondary",
  P3: "outline",
} as const;

const focusRing =
  "outline-none focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2";

function Panel({
  title,
  index,
  action,
  children,
  className = "",
}: {
  title: string;
  index: number;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={`grid min-w-0 grid-cols-1 content-start gap-3 border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) p-4 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3 border-zero-line border-b-(length:--zero-stroke-thin) pb-2">
        <h2 className="flex items-baseline gap-2 font-black font-zero text-zero-xs uppercase italic tracking-[0.14em]">
          <span className="text-zero-accent">{index}</span>
          {title}
        </h2>
        {action ? <div className="ms-auto">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function ServiceCode({ id }: { id: string }) {
  return (
    <Badge variant="outline" className="shrink-0 font-zero-text not-italic">
      {service(id).code}
    </Badge>
  );
}

function Tile({
  s,
  status,
  alerts,
}: {
  s: Service;
  status: ServiceStatus;
  alerts: number;
}) {
  const last = s.p95.at(-1) ?? 0;
  const slow = last > s.baseline * 1.5;
  return (
    <li
      className={`grid content-start gap-4 border-(length:--zero-stroke-thin) bg-zero-void p-4 ${status === "down" ? "border-zero-danger" : status === "degraded" ? "border-zero-line shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-danger)]" : "border-zero-line"}`}
    >
      <div className="flex items-center gap-2">
        <ServiceCode id={s.id} />
        <h3 className="min-w-0 truncate font-black font-zero italic">
          {s.name}
        </h3>
        <Badge
          variant={statusBadge[status].variant}
          className="ms-auto shrink-0"
        >
          {statusBadge[status].label}
        </Badge>
      </div>
      <Gauge
        value={Math.round(s.budget * 100)}
        max={100}
        low={0.25}
        tone="quiet"
        className="text-zero-xs"
      >
        <GaugeLabel className="text-zero-xs">Error budget</GaugeLabel>
        <GaugeValue>{(_, value) => `${value}%`}</GaugeValue>
      </Gauge>
      <div className="flex items-end justify-between gap-3">
        <p className="grid gap-0.5">
          <span className="font-zero-text text-zero-text-3 text-zero-xs">
            p95
          </span>
          <span
            className={`whitespace-nowrap font-black font-zero text-zero-lg italic tabular-nums ${slow ? "text-zero-danger" : ""}`}
          >
            {last} ms
          </span>
        </p>
        <Sparkline
          values={s.p95}
          label={`p95 latency over the last ${s.p95.length} readings: from ${s.p95[0]} to ${last} ms`}
          className={`text-zero-xl ${status === "up" ? "" : "text-zero-danger"}`}
        />
      </div>
      <p className="flex justify-between gap-3 font-zero-text text-zero-text-3 text-zero-xs">
        <span>
          {s.team} · {s.rps.toLocaleString("en-US")} req/s
        </span>
        {alerts ? (
          <span className="font-semibold text-zero-danger">
            {alerts} firing
          </span>
        ) : null}
      </p>
    </li>
  );
}

function Who({ author }: { author: string }) {
  const who = RESPONDERS[author];
  return (
    <MessageAvatar>
      <Avatar size="sm">
        <AvatarFallback>{who?.initials ?? author.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </MessageAvatar>
  );
}

/** The bot's turn: the runbook's steps as a trace, each in the state the incident has reached. */
function Runbook({ step, time }: { step: number; time: string }) {
  const line = (index: number, done: string, doing: string) => {
    const status =
      index < step ? undefined : index === step ? "running" : "pending";
    return (
      <TraceLine status={status}>
        <TraceIcon>
          {status === "running" ? (
            <SpinnerIcon className="animate-spin [animation-duration:calc(var(--zero-dur-loop)/2)]" />
          ) : (
            <CheckIcon />
          )}
        </TraceIcon>
        <TraceTitle>{index < step ? done : doing}</TraceTitle>
      </TraceLine>
    );
  };
  return (
    <Message>
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>RB</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>
          <strong>Runbook</strong>
          {time}
        </MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>
            <TraceList>
              <TraceLine>
                <TraceIcon>
                  <CheckIcon />
                </TraceIcon>
                <TraceTitle>Pulled the last five deploys</TraceTitle>
                <TraceDescription>0.8 s</TraceDescription>
              </TraceLine>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <CheckIcon />
                    </TraceIcon>
                    <TraceTitle>Compared errors around deploy 412</TraceTitle>
                    <TraceDescription>1.2 s</TraceDescription>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  Errors went from 0.2% to 7.9% within four minutes of the
                  rollout. No other deploy in the window touched the planner.
                </TraceCollapsibleContent>
              </TraceCollapsible>
              {line(2, "Rolled back deploy 412", "Rolling back deploy 412")}
              {line(3, "Purged the closure cache", "Purge the closure cache")}
              {line(
                4,
                "Watched errors for 15 minutes",
                "Watch errors for 15 minutes",
              )}
            </TraceList>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

function TurnView({ turn, step }: { turn: Turn; step: number }) {
  if (turn.kind === "marker")
    return (
      <Marker className={turn.alert ? "text-zero-danger" : undefined}>
        {turn.alert ? (
          <MarkerIcon>
            <AlertIcon />
          </MarkerIcon>
        ) : null}
        <MarkerContent>
          {turn.time} · {turn.text}
        </MarkerContent>
      </Marker>
    );
  if (turn.kind === "runbook") return <Runbook step={step} time={turn.time} />;
  const mine = turn.author === ME;
  return (
    <Message align={mine ? "end" : "start"}>
      {mine ? null : <Who author={turn.author} />}
      <MessageContent>
        <MessageHeader>
          <strong>{mine ? "You" : turn.author}</strong>
          {turn.time}
        </MessageHeader>
        <Bubble variant={mine ? "default" : "secondary"}>
          <BubbleContent>{turn.text}</BubbleContent>
        </Bubble>
        {turn.attach === "diff" ? (
          <CodeBlock size="sm" className="max-w-md">
            <CodeBlockHeader>
              <CodeBlockTitle>{DIFF.title}</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={DIFF.added} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>
              <CodeBlockLine variant="removed">{DIFF.removed}</CodeBlockLine>
              <CodeBlockLine variant="added">{DIFF.added}</CodeBlockLine>
            </CodeBlockContent>
          </CodeBlock>
        ) : null}
        {turn.attach === "logs" ? (
          <>
            <Attachment size="sm">
              <AttachmentMedia>
                <ChipIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>planner-1352-1402.log</AttachmentTitle>
                <AttachmentDescription>184 KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <CodeBlock size="sm" variant="danger" className="max-w-md">
              <CodeBlockContent>{LOG_LINES}</CodeBlockContent>
            </CodeBlock>
          </>
        ) : null}
      </MessageContent>
    </Message>
  );
}

export function OpsConsole() {
  // the app speaks English; the way back keeps the page's language
  const backTo = usePick().link("/examples");
  const [tab, setTab] = useState<Tab>("wall");
  const [tick, setTick] = useState(0);
  const [services, setServices] = useState(SERVICES);
  const [alerts, setAlerts] = useState(ALERTS);
  const [filter, setFilter] = useState<Filter>("open");
  const [step, setStep] = useState(RUNBOOK_START);
  const [resolvedAt, setResolvedAt] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>(TIMELINE);
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [draft, setDraft] = useState("");

  const report = (event: Omit<FeedEvent, "id">) =>
    setEvents((list) => [...list.slice(-3), { id: nanoid(), ...event }]);

  // the wall's clock: every tick each service takes a reading, the routine passes in the corner,
  // and once, an alert fires late
  const runbook = useRef(step);
  runbook.current = step;
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), TICK);
    return () => clearInterval(timer);
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once per tick, reading the latest state
  useEffect(() => {
    if (tick === 0) return;
    const at = runbook.current;
    setServices((list) =>
      list.map((s, i) => {
        const target =
          s.id === "planner"
            ? plannerTarget(at, s.baseline)
            : (s.unwell ?? s.baseline);
        const last = s.p95.at(-1) ?? target;
        // drift halfway towards where it should be, plus a little noise
        const next = Math.round(
          last + (target - last) / 2 + wobble(tick, i) * target * 0.05,
        );
        const burning = s.id === "planner" && at <= 3;
        return {
          ...s,
          p95: [...s.p95.slice(1), Math.max(1, next)],
          budget: burning ? Math.max(0.04, s.budget - 0.006) : s.budget,
          rps: Math.max(
            1,
            Math.round(s.rps + wobble(tick + 3, i) * s.rps * 0.04),
          ),
        };
      }),
    );
    if (tick === LATE_AT) {
      setAlerts((list) => [LATE_ALERT, ...list]);
      report({
        tone: "danger",
        actor: LATE_ALERT.id,
        text: "fired on",
        target: service(LATE_ALERT.service).name,
      });
    } else if (tick % 3 === 0) {
      const r = ROUTINE[(tick / 3 - 1) % ROUTINE.length];
      report({ tone: "default", ...r });
    }
  }, [tick]);

  const now = clock(tick);
  const statusOf = (s: Service) =>
    resolvedAt && s.id === "planner"
      ? "up"
      : s.id === "planner"
        ? plannerStatus(step)
        : s.status;
  const firing = alerts.filter((a) => a.state === "firing");
  const shown = alerts.filter((a) =>
    filter === "all"
      ? true
      : filter === "open"
        ? a.state !== "resolved"
        : a.state === "resolved",
  );
  const up = services.filter((s) => statusOf(s) === "up").length;
  const planner = services.find((s) => s.id === "planner") ?? services[0];
  const incidentStatus = resolvedAt
    ? "Resolved"
    : step < 3
      ? "Identified"
      : "Monitoring";

  // when the control that had focus goes away, focus moves on to what comes next
  const focusSoon = (find: () => HTMLElement | null | undefined) =>
    requestAnimationFrame(() => find()?.focus());

  const acknowledge = (alert: Alert) => {
    const from = shown.indexOf(alert);
    focusSoon(
      () =>
        [...document.querySelectorAll<HTMLElement>("[data-ack]")].find(
          (b) => Number(b.dataset.ack) > from,
        ) ??
        document.querySelector<HTMLElement>("[data-ack]") ??
        document.querySelector<HTMLElement>(
          "#alert-filter [aria-pressed=true]",
        ),
    );
    setAlerts((list) =>
      list.map((a) =>
        a.id === alert.id ? { ...a, state: "acked", owner: ME } : a,
      ),
    );
    report({
      tone: "accent",
      actor: "You",
      text: "acknowledged",
      target: alert.id,
    });
  };

  const say = (text: string) =>
    setTurns((list) => [
      ...list,
      { kind: "message", id: nanoid(), time: now, author: ME, text },
    ]);
  const mark = (text: string) =>
    setTurns((list) => [
      ...list,
      { kind: "marker", id: nanoid(), time: now, text },
    ]);

  const finishStep = () => {
    if (step >= RUNBOOK.length) return;
    mark(RUNBOOK_DONE[step] ?? `${RUNBOOK[step]}: done`);
    report({
      tone: "accent",
      actor: "Runbook",
      text: "step done:",
      target: RUNBOOK[step],
    });
    setStep((s) => s + 1);
    if (step === RUNBOOK.length - 1)
      focusSoon(() => document.getElementById("incident-resolve"));
  };

  const resolve = () => {
    setResolvedAt(now);
    focusSoon(() => document.getElementById("war-room-input"));
    mark(`Resolved by you. ${INCIDENT.id} closed`);
    setAlerts((list) =>
      list.map((a) =>
        a.incident === INCIDENT.id ? { ...a, state: "resolved" } : a,
      ),
    );
    report({
      tone: "accent",
      actor: INCIDENT.id,
      text: "resolved:",
      target: "Route planner",
    });
  };

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    say(text);
    setDraft("");
  };

  const objective = (index: number): ObjectiveState =>
    index < step || resolvedAt ? "done" : index === step ? "active" : "pending";

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="min-h-svh gap-0 bg-zero-ground bg-(image:--zero-hatch) text-zero-text"
    >
      <header className="z-zero-sticky flex flex-wrap items-center gap-x-6 gap-y-3 bg-zero-void px-4 py-3 sm:sticky sm:top-0 sm:px-8">
        <Link
          href={backTo}
          aria-label="Back to the examples"
          className={`grid size-9 place-items-center text-zero-text-2 hover:text-zero-text ${focusRing}`}
        >
          <ArrowLeftIcon />
        </Link>
        <p className="tilt font-black font-zero text-zero-xl italic">
          OPS<span className="text-zero-accent">/</span>CONSOLE
        </p>
        <TabsList hotkeys={["q", "e"]} className="max-w-full">
          <TabsTab value="wall">Wall</TabsTab>
          <TabsTab value="alerts">Alerts · {firing.length}</TabsTab>
          <TabsTab value="incident">Incident</TabsTab>
        </TabsList>
        <div className="ms-auto flex items-center gap-5">
          <span className="flex items-center gap-2 font-semibold font-zero-text text-zero-sm text-zero-text-2">
            <Avatar size="sm">
              <AvatarFallback>{RESPONDERS[ME].initials}</AvatarFallback>
            </Avatar>
            <span className="max-sm:sr-only">On call</span>
          </span>
          <span className="font-semibold font-zero-text text-zero-sm text-zero-text-3 tabular-nums">
            {now}
          </span>
          <AccentPicker />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8">
        <h1 className="sr-only">Ops console</h1>

        <TabsPanel value="wall" className="grid gap-6">
          <Panel title="Network" index={1}>
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="grid gap-1">
                <dt className="font-zero-text text-zero-text-3 text-zero-xs">
                  services up
                </dt>
                <dd className="font-black font-zero text-zero-xl italic tabular-nums">
                  {up}
                  <span className="text-zero-text-3"> / {services.length}</span>
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-zero-text text-zero-text-3 text-zero-xs">
                  alerts firing
                </dt>
                <dd
                  className={`font-black font-zero text-zero-xl italic tabular-nums ${firing.length ? "text-zero-danger" : ""}`}
                >
                  {firing.length}
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-zero-text text-zero-text-3 text-zero-xs">
                  requests a second
                </dt>
                <dd>
                  <Counter
                    value={services.reduce((n, s) => n + s.rps, 0)}
                    className="text-zero-xl"
                  />
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-zero-text text-zero-text-3 text-zero-xs">
                  incident
                </dt>
                <dd className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTab("incident")}
                    className={`font-black font-zero text-zero-lg italic hover:text-zero-accent ${focusRing}`}
                  >
                    {INCIDENT.id}
                  </button>
                  <Badge variant={resolvedAt ? "outline" : "danger"}>
                    {incidentStatus}
                  </Badge>
                </dd>
              </div>
            </dl>
          </Panel>
          <Panel title="Services" index={2}>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((s) => (
                <Tile
                  key={s.id}
                  s={s}
                  status={statusOf(s)}
                  alerts={firing.filter((a) => a.service === s.id).length}
                />
              ))}
            </ul>
          </Panel>
        </TabsPanel>

        <TabsPanel value="alerts">
          <Panel
            title="Alert queue"
            index={1}
            action={
              <ToggleGroup
                id="alert-filter"
                aria-label="Show"
                size="sm"
                value={[filter]}
                onValueChange={(value) => {
                  if (value[0]) setFilter(value[0] as Filter);
                }}
              >
                <ToggleGroupItem value="open">Open</ToggleGroupItem>
                <ToggleGroupItem value="resolved">Resolved</ToggleGroupItem>
                <ToggleGroupItem value="all">All</ToggleGroupItem>
              </ToggleGroup>
            }
          >
            <p className="font-zero-text text-zero-text-3 text-zero-xs">
              {firing.length} firing ·{" "}
              {alerts.filter((a) => a.state === "acked").length} acknowledged ·{" "}
              {alerts.filter((a) => a.state === "resolved").length} resolved
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Sev</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead className="w-20 max-sm:hidden">Since</TableHead>
                  <TableHead className="w-32">State</TableHead>
                  <TableHead className="w-44">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <Badge variant={severityVariant[a.severity]}>
                        {a.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-0 min-w-56">
                      <span
                        className={`block truncate font-semibold ${a.state === "resolved" ? "text-zero-text-2" : ""}`}
                      >
                        {service(a.service).name}: {a.title}
                      </span>
                      <span className="block truncate font-zero-text text-zero-text-3 text-zero-xs in-[tr:hover]:text-zero-text-2">
                        {a.id} · {service(a.service).team}
                        {a.incident ? ` · ${a.incident}` : ""}
                      </span>
                    </TableCell>
                    <TableCell className="tabular-nums max-sm:hidden">
                      {a.since}
                    </TableCell>
                    <TableCell>
                      {a.state === "firing" ? (
                        <Badge variant="danger">Firing</Badge>
                      ) : a.state === "acked" ? (
                        <span className="font-zero-text text-zero-sm text-zero-text-2">
                          Acked · {a.owner === ME ? "you" : a.owner}
                        </span>
                      ) : (
                        <span className="font-zero-text text-zero-sm text-zero-text-2">
                          Resolved
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="flex justify-end gap-2">
                        {a.state === "firing" ? (
                          <Button
                            size="sm"
                            variant="secondary"
                            aria-label={`Acknowledge ${a.id}`}
                            data-ack={shown.indexOf(a)}
                            onClick={() => acknowledge(a)}
                          >
                            Acknowledge
                          </Button>
                        ) : null}
                        {a.incident && a.state !== "resolved" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-label={`Open incident ${a.incident}`}
                            onClick={() => setTab("incident")}
                          >
                            {a.incident}
                          </Button>
                        ) : null}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {shown.length === 0 ? (
              <p className="py-6 text-center text-zero-sm text-zero-text-2">
                Nothing here.
              </p>
            ) : null}
          </Panel>
        </TabsPanel>

        <TabsPanel
          value="incident"
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]"
        >
          <section
            aria-labelledby="incident-title"
            className="grid min-w-0 grid-cols-1 gap-4 border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch) p-4"
          >
            <div className="grid gap-2">
              <p className="flex flex-wrap items-center gap-2">
                <Badge variant="danger">{INCIDENT.severity}</Badge>
                <Badge variant="outline" className="font-zero-text not-italic">
                  {INCIDENT.id}
                </Badge>
                <Badge variant={resolvedAt ? "default" : "secondary"}>
                  {incidentStatus}
                </Badge>
                <span className="font-zero-text text-zero-text-3 text-zero-xs">
                  Opened {INCIDENT.opened}
                  {resolvedAt ? ` · resolved ${resolvedAt}` : ""}
                </span>
              </p>
              <h2
                id="incident-title"
                className="font-black font-zero text-zero-xl italic leading-tight"
              >
                {INCIDENT.title}
              </h2>
              <p className="max-w-prose text-zero-sm text-zero-text-2">
                {INCIDENT.summary}
              </p>
            </div>
            <div className="h-[min(34rem,65svh)] border-(length:--zero-stroke-thin) border-zero-line bg-zero-void">
              <MessageScrollerProvider>
                <MessageScroller>
                  <MessageScrollerViewport aria-label="War room" tabIndex={0}>
                    <MessageScrollerContent className="gap-5 p-4">
                      <MessageScrollerItem>
                        <Marker variant="separator">
                          <MarkerContent>War room</MarkerContent>
                        </Marker>
                      </MessageScrollerItem>
                      {turns.map((turn, index) => (
                        <MessageScrollerItem
                          key={turn.id}
                          scrollAnchor={index === turns.length - 1}
                        >
                          <TurnView turn={turn} step={step} />
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </MessageScrollerProvider>
            </div>
            <form onSubmit={send}>
              <InputGroup>
                <InputGroupInput
                  id="war-room-input"
                  aria-label="Message the war room"
                  placeholder="Write to the war room"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <InputGroupAddon align="end">
                  <InputGroupButton type="submit" disabled={!draft.trim()}>
                    Send
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </section>

          <div className="grid gap-6">
            <Panel title="Runbook" index={1}>
              <Objectives aria-label="Runbook">
                <ObjectivesHeader>
                  {resolvedAt
                    ? "Done"
                    : `Step ${Math.min(step + 1, RUNBOOK.length)} of ${RUNBOOK.length}`}
                </ObjectivesHeader>
                {RUNBOOK.map((title, index) => (
                  <Objective key={title} state={objective(index)}>
                    <ObjectiveTitle>{title}</ObjectiveTitle>
                  </Objective>
                ))}
              </Objectives>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={finishStep}
                  disabled={step >= RUNBOOK.length || Boolean(resolvedAt)}
                >
                  Mark step done
                </Button>
                <HoldButton
                  id="incident-resolve"
                  size="sm"
                  onConfirm={resolve}
                  disabled={step < RUNBOOK.length || Boolean(resolvedAt)}
                >
                  Hold to resolve
                </HoldButton>
              </div>
            </Panel>
            <Panel title="Impact" index={2}>
              <Stats>
                <Stat
                  label="Failed routes"
                  value={INCIDENT.impact.failed}
                  compare={INCIDENT.impact.failedBefore}
                  better="lower"
                />
                <Stat
                  label="p95"
                  value={planner.p95.at(-1) ?? 0}
                  compare={planner.baseline}
                  better="lower"
                  unit=" ms"
                />
                <Stat
                  label="Couriers turned back"
                  value={INCIDENT.impact.couriers}
                />
              </Stats>
              <Gauge
                value={Math.round(planner.budget * 100)}
                max={100}
                low={0.25}
                tone="quiet"
                className="text-zero-xs"
              >
                <GaugeLabel className="text-zero-xs">
                  Planner error budget
                </GaugeLabel>
                <GaugeValue>{(_, value) => `${value}%`}</GaugeValue>
              </Gauge>
            </Panel>
            <Panel title="Responders" index={3}>
              <ul className="grid gap-3">
                {Object.entries(RESPONDERS).map(([key, who]) => (
                  <li key={key} className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{who.initials}</AvatarFallback>
                    </Avatar>
                    <span className="grid">
                      <span className="font-bold font-zero italic">
                        {who.name}
                        {key === ME ? " (you)" : ""}
                      </span>
                      <span className="font-zero-text text-zero-text-3 text-zero-xs">
                        {who.role}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </TabsPanel>
      </main>

      <aside
        aria-label="Events"
        className="pointer-events-none fixed end-4 bottom-4 z-zero-sticky w-80 max-w-[calc(100%-2rem)]"
      >
        <Feed aria-label="Events">
          {events.map((e) => (
            <FeedItem
              key={e.id}
              tone={e.tone}
              onExpire={() =>
                setEvents((list) => list.filter((x) => x.id !== e.id))
              }
            >
              <FeedActor>{e.actor}</FeedActor> {e.text}{" "}
              <FeedTarget>{e.target}</FeedTarget>
            </FeedItem>
          ))}
        </Feed>
      </aside>
    </Tabs>
  );
}
