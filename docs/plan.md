# zeroUI — product plan

zeroUI is a public, dark-only component library with a strong game-UI look: black bars,
charcoal ground, a fluorescent lime accent, slabs with one edge cut on the slant, thick black
outlines, big tilted lettering. It is built on shadcn and Base UI and installed the shadcn way,
from a registry: `pnpm dlx shadcn@latest add https://<site>/r/<component>.json`.

Decisions land here with their date, in the commit that acts on them.

## Decisions

- **2026-10-24 — the library exists.** Working codename zzzUI, public name **zeroUI**. Public from
  the start (track `oss`).
- **2026-10-24 — a clean shadcn project, not yTemplate.** yTemplate is a dashboard starter: Appica
  controls on the matrix's neutral size ladder, light and dark themes with presets, data-view,
  kanban and grid kits. zeroUI builds its own Select and has one theme, so all of that would have
  to be removed and could leak into what the registry ships. Matrix plumbing (ledger, release card,
  analytics, favicon, SEO) is added piece by piece when it is needed.
- **2026-10-24 — Base UI underneath** (`shadcn init --base base`, style `base-maia`), the matrix's
  behaviour engine. Radix is not used.
- **2026-10-24 — dark only.** One set of tokens; the theme provider forces `dark`. Contrast is
  still checked: lime on black, grey on charcoal.
- **2026-10-24 — one app, three faces.** `/` the showcase, `/docs` the documentation (a live demo,
  the props, the install command per component), `/studio` the workbench for tuning tokens and
  motion, which only runs locally and is never deployed.

## Phases

Each phase has an exit test; the next one does not start until it passes.

### Phase 0 — skeleton (2026-10-24, done)

Next 16, React 19, Tailwind v4, Biome, React Compiler, pnpm; shadcn on Base UI with every
component pulled in as a starting point; dark only; port 4374; registered in the matrix (yPulse).

### Phase 1 — the foundation: tokens, motion, icons

Build four components and distil the foundation out of them, rather than designing the
foundation in the abstract and fitting components to it:

| Component | What it settles |
|---|---|
| Button | press and release, hover, the cut-corner slab, outline weight |
| Input | focus, typing, error, the inset well |
| Select | the popup: open and close, the list, the highlighted row |
| Tabs | the sliding slab with a slanted inner edge, the signature motion |

Out of it come:

- **Tokens** — colour (ground, surface, line, text, accent, danger, rarity), type scale, radius
  (mostly none: corners are cut, not rounded), outline weights, the slant angle, spacing,
  elevation by outline rather than shadow, z-layers.
- **Motion** — a small set of named functions (durations, easings and the transitions built from
  them: press, slide the slab, reveal, the cut-in, the glitch), used by every component and nothing
  ad hoc.
- **Icons** — a specification (grid, stroke, cut corner, black outline) and the twenty or so icons
  these four components need. The full set comes in later phases.

References for the look: yLookbook's Inter-Knot and Band Tuner sections, which were rebuilt from
screenshots with everything newly drawn.

**Exit:** the four components are done, and building the third and fourth changed no token and no
motion function. If they still change, the foundation is not settled yet.

### Phase 2 — registry and site

`registry.json` → `shadcn build` → `public/r/*.json`; installing a component into a fresh shadcn
project works. A docs page per component and the showcase. Deployed on Cloudflare Workers
(`zeroui.catforest.dev` until it earns its own domain). First release v0.1.0.

### Phase 3 onward — the rest of shadcn, by family

Forms (checkbox, radio, switch, slider, textarea), overlays (dialog, sheet, popover, tooltip,
dropdown menu), navigation (breadcrumb, pagination, sidebar), data display (card, table, badge,
avatar, progress), feedback (toast, alert, skeleton). Each family may add tokens; it does not
change the ones phase 1 settled without a dated decision here.

## The look is ours

zeroUI takes its mood from a game UI; it takes nothing else. No logos, fonts, icons, character art
or screenshots from the game or its publisher, and no game name in the product, the package or
the site. Every glyph, illustration and sample string is newly made.
