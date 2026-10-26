/**
 * The signal board's data: an invented day of technology news. Companies, products, outlets and
 * authors are all made up (no invented story is hung on a real outlet or company). Times are
 * minutes before this edition's "now" (`ago`), never clock times or dates, so the server and the
 * browser agree. A story is one event: a lead report and the coverage that followed it; `heat`
 * is the number of reports in each two-hour slot of the last day (twelve, the last the latest).
 */

export type TnSourceKind = "outlet" | "wire" | "blog" | "forum" | "papers";

export type TnSource = {
  id: string;
  name: string;
  domain: string;
  kind: TnSourceKind;
};

export type TnTopic = {
  id: string;
  name: string;
  /** Two or three letters: on the board, tags and badges. */
  code: string;
  blurb: string;
};

export type TnKind =
  | "news"
  | "launch"
  | "research"
  | "funding"
  | "analysis"
  | "policy";

export type TnLink = {
  source: string;
  title: string;
  author?: string;
  /** Minutes before this edition's now. */
  ago: number;
};

export type TnComment = {
  id: string;
  author: string;
  ago: number;
  points: number;
  text: string;
  replies?: TnComment[];
};

export type TnStory = {
  id: string;
  topic: string;
  kind: TnKind;
  headline: string;
  summary: string;
  lead: TnLink;
  coverage: TnLink[];
  points: number;
  comments: number;
  heat: number[];
  tags: string[];
  thread?: TnComment[];
};

export const TN_EDITION = {
  dateLong: "Wednesday, 21 October 2026",
  dateShort: "Wed 21 Oct",
  iso: "2026-10-21",
  /** This edition's "now": 09:40 that day. */
  nowMin: 9 * 60 + 40,
} as const;

export const TN_KIND_LABEL: Record<TnKind, string> = {
  news: "News",
  launch: "Launch",
  research: "Research",
  funding: "Funding",
  analysis: "Analysis",
  policy: "Policy",
};

export const TN_TOPICS: TnTopic[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    code: "AI",
    blurb:
      "Models, agents and the companies racing to ship them, plus the papers and the regulators trying to keep up.",
  },
  {
    id: "chips",
    name: "Chips",
    code: "CHP",
    blurb:
      "Fabs, packaging, memory and the accelerators everything else is waiting on.",
  },
  {
    id: "devices",
    name: "Devices",
    code: "DEV",
    blurb:
      "Phones, glasses, headphones and the hardware people actually carry around.",
  },
  {
    id: "security",
    name: "Security",
    code: "SEC",
    blurb:
      "Breaches, patches, disclosure rules and the research that finds the holes first.",
  },
  {
    id: "space",
    name: "Space",
    code: "SPC",
    blurb:
      "Launch, landing, satellites and what they can see of the ground from up there.",
  },
  {
    id: "energy",
    name: "Climate & Energy",
    code: "NRG",
    blurb:
      "Batteries, grids, fusion bets and the power contracts that data centres are signing.",
  },
];

export const TN_SOURCES: TnSource[] = [
  {
    id: "circuit",
    name: "The Circuit",
    domain: "circuit.news",
    kind: "outlet",
  },
  {
    id: "ledgerline",
    name: "Ledgerline",
    domain: "ledgerline.com",
    kind: "outlet",
  },
  {
    id: "relay",
    name: "Morning Relay",
    domain: "morningrelay.com",
    kind: "outlet",
  },
  { id: "arc", name: "Arc Review", domain: "arcreview.org", kind: "outlet" },
  {
    id: "wirehouse",
    name: "Wirehouse",
    domain: "wirehouse.press",
    kind: "wire",
  },
  {
    id: "siliconomics",
    name: "Siliconomics",
    domain: "siliconomics.co",
    kind: "outlet",
  },
  { id: "fold", name: "The Fold", domain: "thefold.media", kind: "outlet" },
  {
    id: "orbit",
    name: "Orbit Desk",
    domain: "orbitdesk.space",
    kind: "outlet",
  },
  {
    id: "gridline",
    name: "Gridline",
    domain: "gridline.energy",
    kind: "outlet",
  },
  { id: "docket", name: "Docket", domain: "docket.law", kind: "outlet" },
  {
    id: "patchnotes",
    name: "Patchnotes",
    domain: "patchnotes.sec",
    kind: "blog",
  },
  {
    id: "northern",
    name: "Northern Byte",
    domain: "northernbyte.io",
    kind: "blog",
  },
  {
    id: "halfstack",
    name: "Halfstack",
    domain: "halfstack.blog",
    kind: "blog",
  },
  {
    id: "kernel",
    name: "Kernel Weekly",
    domain: "kernelweekly.dev",
    kind: "blog",
  },
  {
    id: "paperstream",
    name: "Paperstream",
    domain: "paperstream.ai",
    kind: "papers",
  },
  {
    id: "threadbare",
    name: "Threadbare",
    domain: "threadbare.net",
    kind: "forum",
  },
];

export const TN_STORIES: TnStory[] = [
  {
    id: "meridian-4",
    topic: "ai",
    kind: "launch",
    headline:
      "Halcyon ships Meridian-4, a model that keeps one plan across a week of tool calls",
    summary:
      "Halcyon’s new flagship holds a working plan across tens of thousands of tool calls and picks it back up after interruptions. Early testers say it finished multi-day migration jobs that earlier models abandoned halfway.",
    lead: {
      source: "circuit",
      title:
        "Halcyon’s Meridian-4 is built to finish the job, not just start it",
      author: "Dana Okafor",
      ago: 312,
    },
    coverage: [
      {
        source: "ledgerline",
        title:
          "Halcyon will charge enterprises per finished task, not per token",
        author: "Priya Raman",
        ago: 268,
      },
      {
        source: "northern",
        title: "I gave Meridian-4 our legacy billing system for five days",
        author: "Tomas Lind",
        ago: 190,
      },
      {
        source: "arc",
        title: "What a week-long agent actually changes, and what it doesn’t",
        author: "Helen Achebe",
        ago: 122,
      },
      {
        source: "threadbare",
        title: "Meridian-4 discussion: anyone tried it on a real monorepo?",
        ago: 300,
      },
    ],
    points: 812,
    comments: 341,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 3, 9, 14, 11],
    tags: ["agents", "models", "enterprise"],
    thread: [
      {
        id: "c1",
        author: "sable_tern",
        ago: 290,
        points: 214,
        text: "The interesting number isn’t the benchmark, it’s that the plan survives a crash. Every agent I’ve run falls over the first time a tool times out and then confidently starts the task again from scratch.",
        replies: [
          {
            id: "c1a",
            author: "mkowal",
            ago: 271,
            points: 88,
            text: "Same experience. Resuming is the whole product. I’d trade ten points of eval score for an agent that knows where it left off.",
          },
          {
            id: "c1b",
            author: "rhee_j",
            ago: 255,
            points: 41,
            text: "They say the plan is stored as a file the model edits, not in the context. That’s a boring design and I mean that as a compliment.",
          },
        ],
      },
      {
        id: "c2",
        author: "quietpatch",
        ago: 240,
        points: 130,
        text: "Per-task pricing is going to make procurement teams very happy and finance teams very nervous. Who decides when a task is finished?",
        replies: [
          {
            id: "c2a",
            author: "lowercase_l",
            ago: 228,
            points: 52,
            text: "From the pricing page: you do. A task is billed when you mark it accepted, and there’s a cap per task you set up front.",
          },
        ],
      },
      {
        id: "c3",
        author: "fen_d",
        ago: 180,
        points: 77,
        text: "Ran it on a 400k-line monorepo overnight. It got the dependency upgrade done, wrote a migration note, and left three TODOs it couldn’t resolve with reasons. Honestly better than my last contractor.",
      },
    ],
  },
  {
    id: "northwind-2nm",
    topic: "chips",
    kind: "news",
    headline:
      "Northwind Silicon tapes out its first 2 nm accelerator, months ahead of its own plan",
    summary:
      "The chip pairs eight compute tiles with stacked memory on a single package. Northwind says samples reach cloud customers in the spring, which would put it a full product cycle ahead of where analysts expected.",
    lead: {
      source: "siliconomics",
      title: "Northwind’s 2 nm tape-out: the details that matter",
      author: "Wen Liu",
      ago: 420,
    },
    coverage: [
      {
        source: "ledgerline",
        title: "Northwind shares jump 9% on early tape-out",
        ago: 380,
      },
      {
        source: "wirehouse",
        title: "Northwind Silicon says 2 nm chip samples ship in spring",
        ago: 405,
      },
    ],
    points: 466,
    comments: 152,
    heat: [0, 0, 0, 0, 0, 0, 0, 4, 7, 6, 3, 2],
    tags: ["accelerators", "2 nm", "packaging"],
  },
  {
    id: "openhearth-dns",
    topic: "security",
    kind: "news",
    headline:
      "A flaw in OpenHearth router firmware let attackers rewrite DNS for four million homes",
    summary:
      "The bug sat in the firmware’s remote-management page for three years. A patch is out, but most of the affected routers were sold by internet providers that push updates on their own schedule.",
    lead: {
      source: "patchnotes",
      title: "OpenHearth CVE: how one unchecked header hands over your DNS",
      author: "Ines Varga",
      ago: 205,
    },
    coverage: [
      {
        source: "circuit",
        title: "Millions of home routers need an update most owners won’t get",
        author: "Marcus Bell",
        ago: 150,
      },
      {
        source: "relay",
        title: "Check your router: what the OpenHearth flaw means for you",
        ago: 96,
      },
      {
        source: "threadbare",
        title: "OpenHearth DNS hijack: patch notes and ISP status tracker",
        ago: 180,
      },
    ],
    points: 690,
    comments: 288,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 12, 15],
    tags: ["routers", "firmware", "DNS"],
    thread: [
      {
        id: "s1",
        author: "byteward",
        ago: 176,
        points: 188,
        text: "Three years in the remote-management page, which is enabled by default on the ISP builds and disabled on the retail ones. The same code, two very different exposure stories.",
        replies: [
          {
            id: "s1a",
            author: "ines_v",
            ago: 160,
            points: 97,
            text: "Author here. Yes, the retail firmware is only exposed if you turned remote management on yourself. We list both build strings in the post so people can check.",
          },
        ],
      },
      {
        id: "s2",
        author: "oldmodem",
        ago: 140,
        points: 64,
        text: "My provider’s status page still says ‘no known issues’. I’ve started a list of which ISPs have pushed the patch; replies welcome.",
      },
      {
        id: "s3",
        author: "tcp_tom",
        ago: 120,
        points: 39,
        text: "Practical advice for non-technical relatives: set the DNS on the devices themselves. It doesn’t fix the router, but it takes the hijack out of the path.",
      },
    ],
  },
  {
    id: "kestrel-landing",
    topic: "space",
    kind: "launch",
    headline:
      "Kestrel’s reusable upper stage lands on a barge for the first time",
    summary:
      "The stage came back from orbit with a ceramic heat shield and touched down 600 km offshore. Recovering the upper stage, not just the booster, is the step that would make whole rockets reusable.",
    lead: {
      source: "orbit",
      title:
        "Kestrel brings an upper stage home. Here’s why that’s the hard part",
      author: "Aiko Brandt",
      ago: 540,
    },
    coverage: [
      {
        source: "wirehouse",
        title: "Kestrel recovers upper stage after orbital flight",
        ago: 530,
      },
      {
        source: "relay",
        title: "Watch: the moment Kestrel’s second stage touched down",
        ago: 470,
      },
    ],
    points: 538,
    comments: 120,
    heat: [0, 0, 0, 0, 0, 0, 3, 8, 5, 3, 2, 1],
    tags: ["reusability", "launch"],
  },
  {
    id: "ferro-grid",
    topic: "energy",
    kind: "funding",
    headline:
      "Ferro Grid raises $420 million to build iron-air batteries beside retiring coal plants",
    summary:
      "The batteries discharge over four days rather than four hours, and the coal sites already have grid connections. The first three projects are scheduled to come online in 2028.",
    lead: {
      source: "gridline",
      title: "Iron, air and old grid connections: inside Ferro Grid’s plan",
      author: "Rosa Mendel",
      ago: 610,
    },
    coverage: [
      {
        source: "ledgerline",
        title:
          "Ferro Grid’s $420M round is the year’s largest for long storage",
        ago: 590,
      },
    ],
    points: 214,
    comments: 63,
    heat: [0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 1, 0],
    tags: ["batteries", "storage", "grid"],
  },
  {
    id: "pellucid-glasses",
    topic: "devices",
    kind: "launch",
    headline:
      "Pellucid’s second glasses weigh 41 grams and drop the tethered battery",
    summary:
      "The display now sits in one lens only, which is how Pellucid got the weight down. Reviewers liked wearing them for a whole day; fewer liked the narrower field of view.",
    lead: {
      source: "fold",
      title: "Pellucid Two review: the first smart glasses I forgot I had on",
      author: "Jun Takeda",
      ago: 255,
    },
    coverage: [
      {
        source: "circuit",
        title: "Pellucid Two hands-on: lighter, simpler, one lens",
        ago: 250,
      },
      {
        source: "halfstack",
        title: "A developer’s week with Pellucid Two’s new SDK",
        author: "Noor Haddad",
        ago: 140,
      },
    ],
    points: 402,
    comments: 197,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 4, 3],
    tags: ["AR", "wearables", "review"],
  },
  {
    id: "self-proof-geometry",
    topic: "ai",
    kind: "research",
    headline:
      "Small models trained on their own verified proofs beat models ten times their size at olympiad geometry",
    summary:
      "The paper’s trick is to keep only proofs a checker accepts, then train on them and repeat. A 7-billion-parameter model ends up solving more competition problems than models with 70 billion.",
    lead: {
      source: "paperstream",
      title: "Self-verified proof bootstrapping for geometry (preprint)",
      ago: 840,
    },
    coverage: [
      {
        source: "arc",
        title: "The verifier is doing the heavy lifting, and that’s the point",
        author: "Helen Achebe",
        ago: 600,
      },
      {
        source: "threadbare",
        title: "Geometry bootstrapping paper: code is out",
        ago: 760,
      },
    ],
    points: 377,
    comments: 98,
    heat: [0, 0, 0, 0, 2, 4, 3, 2, 3, 1, 1, 0],
    tags: ["reasoning", "papers", "small models"],
    thread: [
      {
        id: "g1",
        author: "lemma_lou",
        ago: 740,
        points: 92,
        text: "Geometry is the friendliest possible domain for this because the checker is exact. The question is how far it travels into domains where ‘verified’ means ‘a test passed’.",
        replies: [
          {
            id: "g1a",
            author: "cbrandt",
            ago: 700,
            points: 40,
            text: "Section 6 tries code with unit tests as the checker. Gains are real but much smaller, and they flag reward hacking on weak test suites.",
          },
        ],
      },
      {
        id: "g2",
        author: "nullset",
        ago: 650,
        points: 31,
        text: "Nice to see the full training loop released, including the failures they filtered out. That’s the part people usually keep.",
      },
    ],
  },
  {
    id: "ai-act-audit",
    topic: "ai",
    kind: "policy",
    headline:
      "EU regulators open the first audit under the AI Act’s general-purpose model rules",
    summary:
      "The audit asks one model provider for its training-data summary and its incident log. It is a test case: how the office handles it will set the template for every provider that follows.",
    lead: {
      source: "docket",
      title: "The first AI Act audit is here. What regulators asked for",
      author: "Lea Fournier",
      ago: 160,
    },
    coverage: [
      {
        source: "relay",
        title: "Brussels opens first AI audit; provider not named",
        ago: 130,
      },
    ],
    points: 198,
    comments: 84,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 2],
    tags: ["regulation", "EU"],
  },
  {
    id: "memory-wall",
    topic: "chips",
    kind: "analysis",
    headline:
      "Why memory, not compute, is the bottleneck for the next year of AI hardware",
    summary:
      "Stacked memory supply is sold out through next year, and every new accelerator needs more of it. The constraint shifts power from chip designers to the three companies that make the memory.",
    lead: {
      source: "arc",
      title: "The memory wall is a supply chain now",
      author: "Sam Oduya",
      ago: 720,
    },
    coverage: [
      {
        source: "siliconomics",
        title: "Stacked memory prices up 30% since spring",
        ago: 650,
      },
    ],
    points: 251,
    comments: 76,
    heat: [0, 0, 0, 0, 0, 2, 3, 2, 1, 1, 0, 1],
    tags: ["memory", "supply chain"],
  },
  {
    id: "aster-fold-pause",
    topic: "devices",
    kind: "news",
    headline: "Aster pauses its foldable after hinge failures in cold climates",
    summary:
      "Owners in Scandinavia and Canada reported screens creasing permanently below freezing. Aster has stopped sales in eleven countries and offered replacements while it changes the hinge lubricant.",
    lead: {
      source: "fold",
      title: "Aster halts Fold sales after cold-weather hinge reports",
      author: "Jun Takeda",
      ago: 75,
    },
    coverage: [
      {
        source: "wirehouse",
        title: "Aster suspends foldable sales in 11 countries",
        ago: 60,
      },
      {
        source: "threadbare",
        title: "Aster Fold hinge thread: post your temperature and photos",
        ago: 70,
      },
    ],
    points: 344,
    comments: 230,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 14],
    tags: ["foldables", "recall"],
  },
  {
    id: "breach-72h",
    topic: "security",
    kind: "policy",
    headline: "Three more US states now require breach notices within 72 hours",
    summary:
      "The new laws take effect in January and apply to any company holding residents’ data, wherever it is based. Twelve states now set a 72-hour clock.",
    lead: {
      source: "docket",
      title: "The 72-hour breach clock spreads to three more states",
      author: "Lea Fournier",
      ago: 980,
    },
    coverage: [
      {
        source: "patchnotes",
        title: "A practical checklist for the 72-hour notice rules",
        ago: 820,
      },
    ],
    points: 120,
    comments: 41,
    heat: [0, 0, 0, 2, 3, 1, 1, 0, 0, 0, 0, 0],
    tags: ["disclosure", "law"],
  },
  {
    id: "methane-cubesat",
    topic: "space",
    kind: "research",
    headline:
      "A shoebox-sized satellite measured methane leaks at the scale of single wells",
    summary:
      "The cubesat’s spectrometer resolves plumes 25 metres across, fine enough to point at one well pad. Regulators have asked for the data feed.",
    lead: {
      source: "orbit",
      title: "A cubesat that can tell which well is leaking",
      author: "Aiko Brandt",
      ago: 1100,
    },
    coverage: [
      {
        source: "gridline",
        title: "Satellite methane data could reshape leak fines",
        ago: 900,
      },
    ],
    points: 288,
    comments: 52,
    heat: [0, 0, 1, 3, 2, 2, 1, 0, 0, 0, 0, 0],
    tags: ["methane", "earth observation"],
  },
  {
    id: "brightwater-41s",
    topic: "energy",
    kind: "news",
    headline:
      "Brightwater Fusion holds a plasma for 41 seconds, a record for its compact design",
    summary:
      "The result triples the company’s previous best. Brightwater still needs the plasma to produce more energy than it takes to heat, which no one has done in a device this size.",
    lead: {
      source: "gridline",
      title: "Brightwater’s 41-second plasma, explained",
      author: "Rosa Mendel",
      ago: 360,
    },
    coverage: [
      {
        source: "relay",
        title: "Fusion start-up triples its plasma record",
        ago: 330,
      },
      {
        source: "arc",
        title: "Fusion milestones are getting longer. Are they getting closer?",
        author: "Sam Oduya",
        ago: 210,
      },
    ],
    points: 301,
    comments: 140,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 2, 1],
    tags: ["fusion", "plasma"],
  },
  {
    id: "openquarry-speech",
    topic: "ai",
    kind: "launch",
    headline:
      "OpenQuarry releases an open-weights speech model that runs on a phone",
    summary:
      "It transcribes and translates 40 languages offline at about one watt. The licence allows commercial use, which makes it the most permissive model of its size so far.",
    lead: {
      source: "kernel",
      title: "OpenQuarry Whisperline: weights, licence and benchmarks",
      author: "Ravi Menon",
      ago: 45,
    },
    coverage: [
      {
        source: "halfstack",
        title:
          "I replaced my cloud transcription with Whisperline in an afternoon",
        author: "Noor Haddad",
        ago: 20,
      },
      {
        source: "threadbare",
        title: "Whisperline: on-device speech, Apache licence",
        ago: 40,
      },
    ],
    points: 520,
    comments: 160,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
    tags: ["open weights", "speech", "on-device"],
  },
  {
    id: "tessel-arizona",
    topic: "chips",
    kind: "funding",
    headline:
      "Tessel wins $1.1 billion in subsidies for an Arizona packaging plant",
    summary:
      "Advanced packaging, where chips are stacked and stitched together, has been the slowest part of the supply chain to move onshore. Tessel’s plant would handle about a fifth of current demand.",
    lead: {
      source: "ledgerline",
      title: "Tessel lands $1.1B for advanced packaging in Arizona",
      author: "Priya Raman",
      ago: 1280,
    },
    coverage: [
      {
        source: "docket",
        title: "What strings come with Tessel’s subsidy",
        ago: 1150,
      },
    ],
    points: 175,
    comments: 49,
    heat: [0, 2, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    tags: ["packaging", "subsidies"],
  },
  {
    id: "headphone-jack",
    topic: "devices",
    kind: "analysis",
    headline: "The quiet return of the headphone jack",
    summary:
      "Four of this autumn’s mid-range phones brought the port back, citing customer surveys. The flagships still won’t, and the reasons are mostly about waterproofing and space.",
    lead: {
      source: "halfstack",
      title: "Count the jacks: a small comeback nobody announced",
      author: "Noor Haddad",
      ago: 1020,
    },
    coverage: [
      {
        source: "fold",
        title: "Why the flagships are still holding out",
        ago: 880,
      },
    ],
    points: 263,
    comments: 211,
    heat: [0, 0, 0, 2, 2, 1, 1, 0, 0, 0, 0, 0],
    tags: ["phones", "audio"],
  },
  {
    id: "lock-acoustic",
    topic: "security",
    kind: "research",
    headline:
      "Researchers recover a smart lock’s keys by listening to its motor",
    summary:
      "A phone microphone a metre away was enough to recover the unlock code in under an hour. The vendor is shipping firmware that adds random pauses to the motor.",
    lead: {
      source: "paperstream",
      title: "Acoustic side channels in consumer smart locks (preprint)",
      ago: 1350,
    },
    coverage: [
      {
        source: "patchnotes",
        title: "Your smart lock is humming its code",
        author: "Ines Varga",
        ago: 1200,
      },
    ],
    points: 340,
    comments: 88,
    heat: [1, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    tags: ["side channels", "IoT"],
  },
  {
    id: "dim-satellites",
    topic: "space",
    kind: "news",
    headline:
      "Low-orbit internet satellites will dim their undersides at night after astronomers complained",
    summary:
      "A new dark coating and a change in how the panels are angled should cut brightness by about two thirds. Astronomers say it helps, though the sheer number of satellites remains the problem.",
    lead: {
      source: "orbit",
      title: "Darker satellites, brighter skies? The new coating, tested",
      author: "Aiko Brandt",
      ago: 130,
    },
    coverage: [
      {
        source: "relay",
        title: "Satellite operator agrees to dim fleet at night",
        ago: 110,
      },
    ],
    points: 156,
    comments: 47,
    heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2],
    tags: ["astronomy", "constellations"],
  },
  {
    id: "datacentre-ppa",
    topic: "energy",
    kind: "analysis",
    headline:
      "Data centres signed more clean-power contracts this year than all of Europe’s utilities",
    summary:
      "The four biggest cloud companies account for most of it. The contracts are paying for new wind and solar, but grid connections are now the slowest step.",
    lead: {
      source: "gridline",
      title: "The cloud is now the biggest buyer of clean power",
      author: "Rosa Mendel",
      ago: 460,
    },
    coverage: [
      {
        source: "ledgerline",
        title: "Cloud giants’ power deals top 40 gigawatts",
        ago: 440,
      },
      {
        source: "arc",
        title: "Buying clean power is the easy part",
        author: "Sam Oduya",
        ago: 300,
      },
    ],
    points: 233,
    comments: 70,
    heat: [0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 1, 0],
    tags: ["data centres", "PPAs"],
  },
  {
    id: "support-metrics",
    topic: "ai",
    kind: "analysis",
    headline: "Agents are changing how support teams are measured",
    summary:
      "When an agent closes the easy tickets, the humans are left with the hard ones, and average handling time goes up. Several companies have stopped reporting it.",
    lead: {
      source: "ledgerline",
      title: "The support metric that broke when agents arrived",
      author: "Priya Raman",
      ago: 1180,
    },
    coverage: [
      {
        source: "northern",
        title: "We stopped measuring handle time. Here’s what we track now",
        author: "Tomas Lind",
        ago: 1000,
      },
    ],
    points: 142,
    comments: 66,
    heat: [0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    tags: ["agents", "work"],
  },
];

/* ── Derived values, kept beside the data ── */

export function tnSource(id: string) {
  const s = TN_SOURCES.find((x) => x.id === id);
  if (!s) throw new Error(`unknown source ${id}`);
  return s;
}

export function tnTopic(id: string) {
  const t = TN_TOPICS.find((x) => x.id === id);
  if (!t) throw new Error(`unknown topic ${id}`);
  return t;
}

export function tnStory(id: string) {
  return TN_STORIES.find((x) => x.id === id);
}

/** The clock time `ago` minutes before now, wrapping past midnight. */
export function tnClock(ago: number) {
  const m = (((TN_EDITION.nowMin - ago) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** "12m", "3h", "1d". */
export function tnAgo(ago: number) {
  if (ago < 60) return `${ago}m`;
  if (ago < 1440) return `${Math.floor(ago / 60)}h`;
  return `${Math.floor(ago / 1440)}d`;
}

/** Every report of a story, earliest first. */
export function tnAllLinks(s: TnStory) {
  return [s.lead, ...s.coverage].sort((a, b) => b.ago - a.ago);
}

/** Heat: points, comments and sources, decayed by age (the usual aggregator ranking). */
export function tnScore(s: TnStory) {
  const hours = s.lead.ago / 60;
  const raw = s.points + s.comments * 1.5 + (s.coverage.length + 1) * 40;
  return Math.round(raw / (hours + 2) ** 0.5);
}

export function tnRanked() {
  return [...TN_STORIES].sort((a, b) => tnScore(b) - tnScore(a));
}

export function tnLatest() {
  return [...TN_STORIES].sort((a, b) => a.lead.ago - b.lead.ago);
}

export function tnCommentCount(c: TnComment[] = []): number {
  return c.reduce((n, x) => n + 1 + tnCommentCount(x.replies), 0);
}
