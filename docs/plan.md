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

- **2026-10-24 — zeroUI lives in `src/zero/`.** `foundation/` (tokens.css; motion.css and
  motion.ts, a pair holding the same numbers; slab.css), `components/`, and `lib/utils.ts`, its own
  `cn` that knows the zero type scale (a host project's `cn` would read `text-zero-md` as a colour).
  The registry ships this folder; the app only consumes it. Tokens are namespaced `zero` so they sit
  beside shadcn's variables in a host project.
- **2026-10-24 — one typeface: Montserrat** (variable weight, true italic) behind `--font-zero`.
  Labels are 800–900 and italic; display lettering is also rotated by `--zero-tilt`.
- **2026-10-24 — the slab is three clipped layers, not a border.** The element is the outer shape
  in the outline colour, `::before` the gap, `::after` the fill (with the hatching and the sheen as
  background layers). A border would be cut away on the slanted edges. One angle, `--zero-slant`
  (14°), drives every cut: a slab's cut is its height × tan(slant), and each inner layer is the
  outer shape moved inward exactly, so the outline stays even at any slant and weight.
- **2026-10-24 — focus is the selection frame:** the outline turns yellow and an ink gap opens
  inside it. Yellow on the lime accent is 1.1 : 1, so a yellow outline alone vanishes on the
  primary button; the gap makes the frame read against any fill.

- **2026-10-24 — slab inputs do not inherit** (`@property … inherits: false`); the layers read
  them through copies resolved on the element. A tab inside its track would otherwise take the
  track's fill and outline. Came out of Tabs, the second component, while the foundation was still
  allowed to move. Tabs also added one token, `--zero-inset`: the space between a track and the
  slab that moves inside it.
- **2026-10-24 — Tabs: a parallelogram track, a parallelogram slab.** Both are cut on both sides,
  so the slab sits parallel to the track's cut at either end with no first-or-last special case,
  exactly `--zero-inset` away. The slab springs (`transition.slide`) to the active tab. Each tab
  carries an ink copy of its label clipped to where the slab is that frame, so a label is ink
  exactly where it lies over the accent, never ink on the dark track mid-slide.

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

Progress: Button done (2026-10-24): four variants, three sizes, four cuts; tokens, motion and
the slab came out of it, plus the workbench at `/studio`. Tabs done (2026-10-24), second, so the
foundation could still move: it made slab inputs non-inheriting and added `--zero-inset`. Input
and Select are the exit test: they must change no token and no motion function. Input done
(2026-10-24) with no change to tokens, motion or the slab — the first half of the exit test
passed. It brought the Field parts with it (label, description, error) to show its error state.

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
