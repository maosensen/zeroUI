/*
 * The ops console's data: the courier network's eight services, the alert queue, and one open
 * incident with its war-room timeline and runbook. Everything here is invented; the times are one
 * afternoon, the incident opened at 13:58.
 */

export type ServiceStatus = "up" | "degraded" | "down";

export type Service = {
  id: string;
  code: string;
  name: string;
  team: string;
  status: ServiceStatus;
  /** Share of the month's error budget left, 0–1. */
  budget: number;
  /** p95 latency in ms, oldest first; the live wall adds to it. */
  p95: number[];
  /** What p95 settles around when it is well. */
  baseline: number;
  /** Where p95 sits while it is unwell, if it is. */
  unwell?: number;
  /** Requests per second. */
  rps: number;
};

export const SERVICES: Service[] = [
  {
    id: "dispatch",
    code: "DSP",
    name: "Dispatch API",
    team: "Dispatch",
    status: "up",
    budget: 0.82,
    p95: [142, 150, 139, 147, 152, 144, 149, 141, 146, 151, 143, 148],
    baseline: 146,
    rps: 412,
  },
  {
    id: "planner",
    code: "RTE",
    name: "Route planner",
    team: "Routing",
    status: "down",
    budget: 0.31,
    p95: [182, 176, 190, 185, 412, 655, 781, 842, 905, 880, 931, 948],
    baseline: 184,
    rps: 268,
  },
  {
    id: "relay",
    code: "GTE",
    name: "Gate relay",
    team: "Gates",
    status: "degraded",
    budget: 0.58,
    p95: [96, 101, 98, 104, 99, 118, 131, 142, 139, 151, 147, 158],
    baseline: 100,
    unwell: 156,
    rps: 96,
  },
  {
    id: "tracker",
    code: "TRK",
    name: "Parcel tracker",
    team: "Customers",
    status: "up",
    budget: 0.64,
    p95: [221, 236, 249, 262, 240, 231, 226, 219, 224, 218, 222, 216],
    baseline: 220,
    rps: 534,
  },
  {
    id: "ledger",
    code: "LDG",
    name: "Credit ledger",
    team: "Payments",
    status: "up",
    budget: 0.91,
    p95: [64, 61, 66, 63, 62, 65, 60, 63, 64, 62, 61, 63],
    baseline: 63,
    rps: 88,
  },
  {
    id: "signin",
    code: "AUT",
    name: "Sign-in",
    team: "Identity",
    status: "up",
    budget: 0.95,
    p95: [48, 51, 47, 49, 52, 50, 48, 47, 50, 49, 51, 48],
    baseline: 49,
    rps: 147,
  },
  {
    id: "tiles",
    code: "MAP",
    name: "Map tiles",
    team: "Routing",
    status: "up",
    budget: 0.73,
    p95: [118, 124, 131, 127, 122, 129, 133, 126, 121, 128, 125, 130],
    baseline: 126,
    rps: 1290,
  },
  {
    id: "notify",
    code: "NTF",
    name: "Notifier",
    team: "Customers",
    status: "up",
    budget: 0.47,
    p95: [77, 74, 79, 81, 76, 83, 88, 85, 91, 89, 94, 97],
    baseline: 80,
    unwell: 104,
    rps: 203,
  },
];

export type Severity = "P1" | "P2" | "P3";
export type AlertState = "firing" | "acked" | "resolved";

export type Alert = {
  id: string;
  severity: Severity;
  title: string;
  service: string;
  /** When it started firing, "HH:MM". */
  since: string;
  state: AlertState;
  /** Who acknowledged it. */
  owner?: string;
  /** The incident it belongs to. */
  incident?: string;
};

export const ALERTS: Alert[] = [
  {
    id: "ALR-2207",
    severity: "P1",
    title: "p95 latency over 800 ms",
    service: "planner",
    since: "13:58",
    state: "acked",
    owner: "Mara",
    incident: "INC-0427",
  },
  {
    id: "ALR-2208",
    severity: "P1",
    title: "Routes sent through closed gates",
    service: "planner",
    since: "14:01",
    state: "firing",
    incident: "INC-0427",
  },
  {
    id: "ALR-2209",
    severity: "P2",
    title: "Failover lag over 120 ms",
    service: "relay",
    since: "14:06",
    state: "firing",
  },
  {
    id: "ALR-2205",
    severity: "P2",
    title: "Error rate over 2%",
    service: "tracker",
    since: "13:41",
    state: "acked",
    owner: "Teo",
  },
  {
    id: "ALR-2201",
    severity: "P3",
    title: "Cache hit rate under 80%",
    service: "tiles",
    since: "13:20",
    state: "acked",
    owner: "Juno",
  },
  {
    id: "ALR-2199",
    severity: "P3",
    title: "Retries rising",
    service: "notify",
    since: "13:02",
    state: "resolved",
  },
  {
    id: "ALR-2196",
    severity: "P2",
    title: "Slow commits",
    service: "ledger",
    since: "12:10",
    state: "resolved",
  },
];

/** Fires a while after the page opens, so the queue is seen to move. */
export const LATE_ALERT: Alert = {
  id: "ALR-2210",
  severity: "P3",
  title: "Queue depth over 5,000",
  service: "notify",
  since: "14:14",
  state: "firing",
};

export type Responder = { name: string; initials: string; role: string };

export const RESPONDERS: Record<string, Responder> = {
  Mara: { name: "Mara Okafor", initials: "MO", role: "Incident lead" },
  Teo: { name: "Teo Brandt", initials: "TB", role: "Routing" },
  Juno: { name: "Juno Hale", initials: "JH", role: "Gates" },
  Wren: { name: "Wren Ito", initials: "WI", role: "On call" },
};

/** You, in the war room. */
export const ME = "Wren";

export type Turn =
  | { kind: "marker"; id: string; time: string; text: string; alert?: boolean }
  | {
      kind: "message";
      id: string;
      time: string;
      author: string;
      text: string;
      attach?: "diff" | "logs";
    }
  | { kind: "runbook"; id: string; time: string };

export const INCIDENT = {
  id: "INC-0427",
  severity: "P1" as Severity,
  title: "Route planner sends couriers through closed gates",
  service: "planner",
  opened: "13:58",
  summary:
    "Since deploy 412, the planner serves routes built from yesterday's gate closures. Couriers are sent to gates that are shut and turned back.",
  /** What the incident costs, now and before it began. */
  impact: { failed: 1184, failedBefore: 22, share: 7.9, couriers: 63 },
};

export const TIMELINE: Turn[] = [
  {
    kind: "marker",
    id: "t1",
    time: "13:58",
    text: "ALR-2207 fired: route planner p95 over 800 ms",
    alert: true,
  },
  {
    kind: "marker",
    id: "t2",
    time: "13:59",
    text: "Mara joined as incident lead",
  },
  {
    kind: "message",
    id: "t3",
    time: "14:00",
    author: "Mara",
    text: "Routes coming out of the planner are built on yesterday's closures. Couriers are being sent to Gate 4 again.",
  },
  {
    kind: "message",
    id: "t4",
    time: "14:02",
    author: "Teo",
    text: "Deploy 412 went out at 13:52, six minutes before the first alert. It changed how long the planner keeps closures.",
    attach: "diff",
  },
  { kind: "runbook", id: "t5", time: "14:04" },
  {
    kind: "message",
    id: "t6",
    time: "14:06",
    author: "Juno",
    text: "Planner logs from the first ten minutes. Every bad route has a closure older than a day.",
    attach: "logs",
  },
  {
    kind: "marker",
    id: "t7",
    time: "14:09",
    text: "Status set to identified",
  },
  {
    kind: "message",
    id: "t8",
    time: "14:11",
    author: "Mara",
    text: "Wren, can you take the cache purge once the rollback lands? Then we watch it for fifteen minutes.",
  },
];

export const DIFF = {
  title: "planner/closures.ts",
  removed: "export const CLOSURE_TTL = minutes(1);",
  added: "export const CLOSURE_TTL = hours(24);",
};

export const LOG_LINES = `14:01:07 WARN closure age=86012s gate=4 route=R-55120 served
14:01:09 WARN closure age=86014s gate=4 route=R-55127 served
14:01:12 WARN closure age=85998s gate=9 route=R-55131 served`;

/** The runbook for a bad planner deploy, in order. */
export const RUNBOOK = [
  "Page the on-call",
  "Find the change",
  "Roll back deploy 412",
  "Purge the closure cache",
  "Watch errors for 15 minutes",
];

/** How far the runbook had got when the page opened: two steps done. */
export const RUNBOOK_START = 2;

/** What each step adds to the timeline when it is done. */
export const RUNBOOK_DONE: Record<number, string> = {
  2: "Deploy 412 rolled back",
  3: "Closure cache purged",
  4: "Errors back under 0.5% for 15 minutes",
};

/** The routine that scrolls past in the corner while the wall is open. */
export const ROUTINE: { actor: string; text: string; target: string }[] = [
  { actor: "Deploy 418", text: "rolled out to", target: "Parcel tracker" },
  { actor: "Autoscaler", text: "added two workers to", target: "Dispatch API" },
  { actor: "Certificates", text: "renewed for", target: "Sign-in" },
  { actor: "Failover drill", text: "passed on", target: "Credit ledger" },
  { actor: "Deploy 419", text: "rolled out to", target: "Map tiles" },
];

export const service = (id: string) =>
  SERVICES.find((s) => s.id === id) ?? SERVICES[0];
