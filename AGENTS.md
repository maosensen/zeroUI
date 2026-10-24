# AGENTS.md

## What this project is

**zeroUI** — a public, dark-only component library with a strong game-UI look, built on shadcn
and Base UI and installed from a shadcn registry. One Next app with three faces: `/` the
showcase, `/docs` the documentation, `/studio` the local-only workbench. The plan, the phases and
their exit tests, and every dated decision: **[docs/plan.md](docs/plan.md) — read it first.**

Rules that hold on every change:

- **Dark only.** There is no light theme; the provider forces `dark`. Never add `dark:` variants
  or a theme toggle.
- **Base UI underneath** (shadcn style `base-maia`). Do not add Radix.
- **`src/components/ui/` is shadcn's neutral set, a starting point, not the product.** zeroUI's
  own components, tokens, motion and icons are what the registry ships; they never import from
  the neutral set once forked.
- **Foundation first.** Colours, sizes, outlines, the slant, durations and easings come from the
  token and motion modules; a component that needs a value they lack adds it there, never inline.
- **The look is ours.** Nothing from the game it takes its mood from or its publisher: no logos,
  fonts, icons, art, screenshots, and no game name in code, copy, package or site. Every glyph and
  sample string is newly made.
- Dev server on port **4374**, run through the workspace manager:
  `~/github/catforest/dev start zeroUI` (never a second `pnpm dev`).
- Feature ledger: `.roadmap/features.yaml` (yPulse `docs/feature-ledger.md`); finishing a feature
  marks it done in the same commit. `CHANGELOG.md` keeps an `[Unreleased]` section.
- Workspace rules (commit by default, release only when asked, identity `maosensen`):
  `~/github/catforest/CLAUDE.md`.

Project conventions for AI coding agents (Claude Code, Cursor, etc.). Read this before making changes.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (components live in-repo under `src/components/ui/`, edit them freely)
- **Lint & format:** Biome — single tool, do not add ESLint or Prettier
- **Package manager:** pnpm — do not generate `package-lock.json` or `yarn.lock`; delete them if they appear
- **Dev server:** Turbopack (default via `next dev`) — do not fall back to webpack unless there is a concrete incompatibility
- **Path alias:** `@/*` → `src/*`

## Standard libraries

Use these for their respective domains. Do not introduce alternatives without explicit approval.

| Domain | Library |
|---|---|
| Logging | `pino` (+ `pino-pretty` in dev) — import from `@/lib/logger` |
| Client state | `zustand` — stores under `src/lib/stores/` |
| IDs | `nanoid` |
| Animation | `motion` (the package formerly known as framer-motion) |
| Date / time | `date-fns` |
| Server state / fetching | `@tanstack/react-query` — `QueryClient` factory at `@/lib/get-query-client` |
| Theme | `next-themes` — wrapped in `@/components/theme-provider` |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` |

**Explicitly out of scope:**
- ❌ `axios` — use native `fetch` (react-query handles caching)
- ❌ ESLint / Prettier — Biome covers both
- ❌ `npm` / `yarn` commands — always `pnpm`
- ❌ `moment` / `dayjs` — `date-fns` only

## Conventions

### File layout

```
src/
├── app/                  # App Router routes, layouts, route handlers
├── components/
│   ├── ui/               # shadcn components — edit freely
│   ├── providers.tsx     # Root provider stack (QueryClient + Theme)
│   └── theme-provider.tsx
└── lib/
    ├── logger.ts
    ├── get-query-client.ts
    ├── stores/           # zustand stores, one file per store
    └── utils.ts          # shadcn-generated `cn()` lives here
```

### Logging

- Always import the shared logger: `import { logger } from "@/lib/logger"`
- Don't `console.log` in committed code — use `logger.debug` / `logger.info` / `logger.warn` / `logger.error`
- Log structured objects, not concatenated strings: `logger.info({ userId, action }, "user logged in")`

### State

- **Client-only ephemeral state:** `useState` / `useReducer`
- **Cross-component client state:** zustand store under `src/lib/stores/`
- **Server data:** `@tanstack/react-query` — never put server response data into zustand

### Forms

- Schema first: define a `zod` schema, infer the TS type from it
- Wire to `react-hook-form` via `@hookform/resolvers/zod`
- Don't write manual validation logic alongside zod

### shadcn components

- Run `pnpm dlx shadcn@latest add <component>` to add new ones — don't hand-write equivalents
- Edit generated components in `src/components/ui/` freely; they're owned by this repo
- For new themes / token changes, prefer `pnpm dlx shadcn@latest init --preset <id> --pointer` over manual CSS variable edits

### Provider stack

Root layout wraps children in `<Providers>` from `@/components/providers`. The order is `QueryClientProvider` → `ThemeProvider`. Don't change the order without a reason — `next-themes` reads from `localStorage` and needs to be inside any client-only context.

`<html>` must carry `suppressHydrationWarning` for `next-themes` to work without console noise.

## Common commands

```bash
pnpm dev              # Turbopack dev server
pnpm build            # Production build
pnpm start            # Run production build
pnpm biome check      # Lint + format check
pnpm biome check --write  # Apply fixes
```

## Before committing

1. `pnpm biome check` passes
2. `pnpm build` passes (catches type errors that dev mode tolerates)
3. No `console.log` in committed code
4. No new top-level dependencies introduced without justification

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
