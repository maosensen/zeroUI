# zzzUI — product plan

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

- **2026-10-24 — the foundation is settled; cut-in and glitch wait for a component that needs
  them.** Input and Select, the third and fourth components, changed no token, no motion function
  and no slab rule, which is phase 1's exit test. None of the four needed the cut-in or the glitch
  the plan listed among the motion functions, so they are not defined yet: the first component
  family that needs one adds it here with a dated decision, like any other new token.
- **2026-10-24 — popups are rectangles lifted by outline.** A slab's cut follows from a known
  height and a popup's height is whatever its content needs, so popups (Select now; dialogs,
  menus, popovers later) are square-cornered boxes: a thick ink border, a thin quiet line outside
  it, the surface with the hatching. They grow from their trigger on the reveal timing and leave on
  the dismiss timing.

- **2026-10-24 — icons: solid, drawn in code, by the spec in [icons.md](icons.md).** Filled
  shapes on a 24-unit grid; horizontal strokes end in the 1 : 4 slant, diagonals are 45°, corners
  are cut, curves only for things round by nature. Nineteen icons cover what the four components
  and their next uses need. zeroUI draws its own interface icons; yIcon (the matrix's icon
  producer) stays with logos and illustration, because a 16 px glyph has to sit on the pixel grid
  and on the exact slant, which generated images do not control.
- **2026-10-24 — Input holds things beside its text.** `start` and `end` take an icon or an
  `InputAction` (clear, show the password). The input now stretches across the slab and carries
  the padding instead of lying over it, so the slots have room; a click almost anywhere on the
  slab still lands in it.

- **2026-10-24 — zeroUI moves to shadcn's paths** (supersedes "zeroUI lives in `src/zero/`"):
  components and icons in `src/components/zero/`, `cn` and motion in `src/lib/zero/`, the
  foundation CSS in `src/styles/zero/`. On install shadcn rewrites `@/components/…` and `@/lib/…`
  imports to the host's aliases, but would turn `@/zero/lib/utils` into the host's own `cn` and
  flatten `@/zero/components/x` to `@/components/x`; on these paths every import lands where its
  file does.
- **2026-10-24 — the registry is the `@zeroui` namespace.** Install is two commands: once
  `pnpm dlx shadcn@latest registry add @zeroui=https://zeroui.catforest.dev/r/{name}.json`, then
  `pnpm dlx shadcn@latest add @zeroui/button`. Items name each other `@zeroui/…`, so no host is
  baked into the registry (pointing the namespace at localhost tests it). Items: `font`
  (Montserrat), `foundation` (cn, motion, all the CSS), `theme` (the host's shadcn variables drawn
  from zeroUI's tokens: the host goes dark), `icon` and one item per icon plus `icons`, and the
  five components.
- **2026-10-24 — the foundation CSS reaches the host through the item, not an @import.** shadcn
  merges an item's `css` into the host stylesheet but cannot know the path from that stylesheet to
  a file it wrote. `scripts/build-registry.mts` converts `src/styles/zero/*.css`: `@theme`
  declarations go to `cssVars.theme` (shadcn writes them into `@theme inline`; colours as a raw
  `--zero-*` on `:root` plus `--color-zero-*` pointing at it, shadcn's own pattern), everything
  else to `css`. The sheen lost its nested `@media` for this: no hover or reduced motion now set
  its duration to zero.
- **2026-10-24 — installing into a fresh shadcn project works.** `shadcn init -d -b base` (Next,
  no `src/`), the namespace pointed at the local registry, all five components plus theme and
  icons added in one command: imports resolved, the project builds with type checks, and the page
  looks and behaves as the studio does (tabs slide, select opens, clear clears, sheen keyframes
  present). Known gap: shadcn's font item cannot ask for italics, so Montserrat's italic is
  synthesised until the user adds `style: ["normal", "italic"]`; the install message says so.

- **2026-10-24 — SEO through the matrix module, levels 0 and 1.** `src/lib/seo/` came from yPulse
  `matrix:seo --write`; zeroUI's own `src/seo/` lists every public page once (title,
  description, breadcrumb), and the metadata, sitemap, llms.txt and JSON-LD all read it. The
  home page is a product landing page (`SoftwareApplication`, no offers); the docs pages are
  `WebPage`s about it with breadcrumbs; every page embeds the catforest `Organization`. robots
  allows every crawler and names each AI crawler. The share card is drawn with the components
  (`/studio/og`, captured by `pnpm og:capture`, since Chrome's `--screenshot` fires before the
  tab slab hydrates). The audit (`pnpm seo:audit`) is the gate. Live the same day: L0 10/10 and
  L1 21/21 against zeroui.catforest.dev, the sitemap pushed to IndexNow (202), and yPulse switched
  to `seo: public`. Submitting the sitemap in Search Console and Bing is the author's step.

- **2026-10-25 — `tilt`, the foundation's way to lean big lettering** (found by the author: a
  long post title in the board's sheet rose out of the sheet's top). Rotating on the left end
  lifts the right end by width × sin(tilt), so a wide or wrapping heading leaves its box. The
  `tilt` utility (type.css) rotates, makes the heading as wide as its text, and keeps that much
  room above it in a `::before` (a block's percentage padding is a share of its width), rounded
  up to whole pixels so what follows does not land between pixels. Dialog, Sheet and Alert dialog
  titles, the docs' page headings and every block's title use it; the nine block baselines grew
  by their title's room.
- **2026-10-25 — rotation only for short display lettering** (the author: leaning a heading is
  risky, a long one makes the page unpredictable; amends "display lettering is also rotated by
  `--zero-tilt`"). `tilt` stays for lettering whose length is known: the logo, the home page's
  own headings, the share card, a game's name on the title screen, the cut-in. Headings that
  carry content are level, black and italic: Dialog, Sheet and Alert dialog titles, docs and
  guide headings, the examples page, every block's title. The lean of the italic stays.

- **2026-10-25 — SEO level 2: guides.** The docs leads already put the conclusion first and
  `src/seo/keywords.ts` is the keyword map; what level 2 lacked was deep content at its own
  address. Three guides under `/docs/guides` (a settings menu, the damage trail, theming), each an
  `Article` by the brand about the library, breadcrumb through Guides, linking to the components
  and blocks they use. Writing the theming guide showed that the studio's "Copy CSS" exported
  `--color-zero-*`, which a host's Tailwind utilities never read (its theme is `inline` and
  points at the raw `--zero-*`); it now exports the raw names. Level 2 is accepted by the author's
  review.

- **2026-10-26 — renamed zzzUI** (supersedes "public name zeroUI"). zeroUI was already taken
  several times over. The author chose zzzUI, after Zenless Zone Zero, as an open-source fan work:
  non-commercial, never registered as a trademark, and saying plainly that it is fan-made,
  unofficial and not affiliated with HoYoverse or the game (README, the site's footer, llms.txt).
  Still nothing from the game itself: no logos, fonts, icons, art, screenshots or text. The brand,
  the registry namespace (`@zzzui`) and the domain (zzzui.catforest.dev; zeroui.catforest.dev
  redirects to it, so installs set up with the old namespace keep working) change; the `zero`
  prefix in the code (tokens, classes, `components/zero/`) does not, so installed components and
  the classes written against them stay valid. Risk taken knowingly: the guideline relied on is
  HoYoverse's fan-work guideline for another game; MIT lets others use zzzUI commercially; the
  worst likely outcome is a request to rename. The GitHub repo and the local folder follow last.

- **2026-10-25 — MIT license.** The author chose MIT: GitHub's standard text, copyright
  maosensen. Tags up to v0.1.1 were cut before `LICENSE` existed.

- **2026-10-24 — two faces** (amends "one typeface: Montserrat"). The author likes Outfit's
  compact, orderly letters, but Outfit has no italic, and zeroUI's labels are 800–900 italics. So
  each face sets what it is good at: Montserrat (`--font-zero`, the display face) everything that
  leans — labels, buttons, tabs, Select rows, headings; Outfit (`--font-zero-text`, the text face)
  what is read or typed — running text, descriptions, the values in Input and the Select trigger,
  job titles on the showcase. The text face is never italic (no browser-drawn obliques), so
  placeholders became upright. The registry ships Outfit as `@zeroui/font-text`, a dependency of
  the foundation; `@zeroui/font` stays Montserrat, so v0.1.0 installs keep working. The docs'
  code is Martian Mono, a site choice outside the library.

## Phases

Each phase has an exit test; the next one does not start until it passes.

### Phase 0 — skeleton (2026-10-24, done)

Next 16, React 19, Tailwind v4, Biome, React Compiler, pnpm; shadcn on Base UI with every
component pulled in as a starting point; dark only; port 4374; registered in the matrix (yPulse).

### Phase 1 — the foundation: tokens, motion, icons (2026-10-24, done)

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
Select done (2026-10-24), again with no foundation change: **the exit test passed.** Icons done
(2026-10-24): the specification and nineteen icons, replacing the one-off chevrons. **Phase 1 is
complete.**

**Exit:** the four components are done, and building the third and fourth changed no token and no
motion function. If they still change, the foundation is not settled yet.

### Phase 2 — registry and site (2026-10-24, done: v0.1.0)

Progress: the registry is done and installs into a fresh shadcn project (2026-10-24). The docs
are done (2026-10-24): getting started, a page per component and one for the icons, each with the
install commands per package manager, live demos whose shown code is the demo file itself, the
behaviour in words, and a props table per part pointing at the Base UI part underneath. The
showcase is done (2026-10-24): the home page puts the components to work in a job board you can
search, filter, take jobs from and hand them in, lets a dial turn `--zero-slant` under a button,
tabs and a well, and lists every component. The deploy is prepared (2026-10-24): OpenNext on
Cloudflare Workers, the domain in `wrangler.jsonc` and `src/lib/site.ts`, the bundle checked in a
local Workers preview (pages, `/studio` a 404, the registry serving JSON and installing into a
fresh project). **Live since 2026-10-24** at https://zeroui.catforest.dev (Worker version
`bdfd755c`): every route checked, the zone's analytics beacon present once and reporting 204,
and the documented install commands, run against the live registry in a fresh shadcn project,
install all five components, the theme and the icons into a project that builds and renders.
Registered in yPulse; public for SEO the same day (see the SEO decision). Left: v0.1.0.

`registry.json` → `shadcn build` → `public/r/*.json`; installing a component into a fresh shadcn
project works. A docs page per component and the showcase. Deployed on Cloudflare Workers
(`zeroui.catforest.dev` until it earns its own domain). First release v0.1.0.

### Phase 3 onward — the rest of shadcn, by family

Progress: forms done (2026-10-24) — Checkbox, Radio group, Switch, Textarea, Slider. No token or
motion function changed: the small controls reuse the slab, the Tabs nesting geometry
(`--zero-inset` all round, parallel at both ends) and the release timing, and are sized in em so
they follow their label. Textarea is a square box, like popups, since its height is not known.

Overlays done (2026-10-24) — Dialog, Sheet, Popover, Tooltip, Dropdown menu. The family added to
the foundation (allowed for a family, recorded here): `panel` (panel.css), the popup look Select
had written out by hand, and `pop` / `fade` (motion.css), opening and closing on the reveal and
dismiss timings with `--zero-pop-from` / `--zero-pop-to` dropping to no stretch under reduced
motion. Select now uses them. Tooltip is the one overlay that is a slab: a single line has a known
height. No submenus yet.

Feedback done (2026-10-24) — Alert, Progress, Skeleton, Toast. Added to the foundation: the
`--zero-dur-loop` timing (1.6 s; `duration.loop` in motion.ts) for anything that repeats while
waiting, the `zero-sweep` animation (a block carried end to end and back, for Progress with no
value) and the `glint` utility (a faint band dragged along the slant, for Skeleton). Under reduced
motion the loop drops to zero: the sweep's block is drawn as a still dim fill and the glint stays
out of sight. One icon, `done` (a check knocked out of the badge), so each Alert tone has its own
badge. No new colours: the tones are text-2, the accent, the focus yellow and danger. The utility
is `glint`, not `shimmer`: shadcn's stylesheet already has a `shimmer` (a text effect with
`background-clip: text`) that would blank a placeholder in any shadcn project.

Data display done (2026-10-24) — Card, Table, Badge, Avatar (Progress went with feedback). No
foundation change. Card and Table are square-cornered boxes with Alert's border and surface, their
headers on the Dialog's black bar; Badge is the one slab of the family. A slab cannot be hollow
(its outline is painted under the fill), so Badge's `outline` variant is a black well with a quiet
outline, like Input's. Avatar is round, the radius tokens.css keeps for things round by nature,
sized to the three control heights. The docs' sample portraits (`public/samples/`) are drawn for
zeroUI.

Navigation done (2026-10-24) — Breadcrumb, Pagination, Sidebar. No foundation change; two icons,
`more` (three small leaning slabs, for ellipses) and `sidebar`. Breadcrumb's separator is the
slab's slanted edge on its own. Pagination's pages are Button slabs cut on both sides, so they nest
like the tabs. Sidebar keeps shadcn's parts and behaviour (offcanvas or icon rail on wide screens,
a Sheet below 768 px, ⌘B) on a black hatched strip with the Dropdown menu's rows; left out for now:
the floating and inset variants, the drag rail, menu actions and skeletons, and the cookie that
remembers the state (a host can control `open` itself). With navigation, the families planned for
phase 3 are all in.

The rest of shadcn follows in the same way, family by family (2026-10-25): disclosure and
toggles, then commands (Command, Combobox, Context menu, Menubar, Hover card), then what is left.

Disclosure and toggles done (2026-10-25) — Accordion, Collapsible, Toggle, Toggle group,
Separator. No foundation change. Toggle is a Button that stays down (the accent while pressed);
Toggle group's items are cut on both sides so the row nests. Collapsible and Accordion share one
unfolding (`unfold` in collapsible.tsx): Base UI's measured panel height on the reveal and dismiss
timings, instant under reduced motion. Accordion's headings lean, led by a slanted sliver that
lights with the accent while open.

Commands done (2026-10-25) — Command, Combobox, Context menu, Menubar, Hover card. No foundation
change. Command is built on Base UI's Autocomplete (inline, always open, the first match always
highlighted), not on cmdk as shadcn's is: no new dependency, and its items are data, filtered by
their `label`. Combobox is Input's well over Select's panel and rows; chips for several values are
left for later. Context menu and Menubar reuse the Dropdown menu's parts, which gained submenus.

More inputs done (2026-10-25) — Input OTP, Input group, Button group, Native select, Kbd, Label.
No foundation change. Every field here is Input's well: Input OTP's cells (Base UI's OTPField,
each input wrapped in a slab frame through `render`, since an input cannot carry the slab's
layers), Input group (the well with any number of addons), Native select. Button group forces the
both-sides cut on whatever slabs it holds, so the row nests. Kbd is a small raised slab sized in em.

More overlays done (2026-10-25) — Alert dialog, Drawer, Navigation menu. No foundation change.
Alert dialog is the Dialog without its corner close and outside dismissal. Drawer is Base UI's
swipeable drawer in the Sheet's look, with a slanted grip; it moves on the slow timing (a longer
throw than a popup) and returns on the base one. Navigation menu's shared panel resizes on the base
timing and its contents slide in the direction of travel.

Layout and the rest done (2026-10-25) — Item, Empty, Scroll area, Aspect ratio, Spinner. No
foundation change. The scroll thumb leans like a slab; the spinner turns once per half waiting loop
and so stops with the loop under reduced motion.

The last four (2026-10-25), on the libraries shadcn's own use, which the author approved:
Calendar (react-day-picker), Carousel (Embla), Chart (Recharts), Resizable
(react-resizable-panels); the app already had them, the registry items now depend on them. No
foundation change. Calendar's days are slabs cut on both sides, so a week nests and a range is one
slanted band; it reads today's date, so under cacheComponents it renders inside Suspense. Chart's
five series colours are aliases of tokens (`--zero-chart-1…5`), set on the container, not new
colours. A slab cannot be hollow, so today is marked by its number (accent, underlined), not by an
outline. Two names to avoid in data attributes: shadcn's stylesheet defines `data-selected`,
`data-open` and others as custom variants, so an attribute such as `data-selected-single` is never
generated; the calendar uses `data-single`.

The remainder (2026-10-25): Form (Base UI's Form and Fieldset; server errors show in a plain
FieldError, and a Field's own `validate` gives its message, rather than the browser's), Combobox
chips (the field wraps, so it is Textarea's square well, the chips small raised slabs), and the
Sidebar's floating (the strip as a panel) and inset (the strip on the void, SidebarInset a panel)
variants. With these, shadcn's core set has zeroUI counterparts.

Chat done (2026-10-25) — Message, Bubble, Marker, Attachment, Code block, Trace, Message scroller,
Questionnaire. No foundation change; two icons, `arrow-down` and `copy`. A bubble is a
square box (its height is its text) with the one corner toward the speaker cut off at 45°, the
corner rule the icons follow; outlined bubbles keep their corners, since the cut would take the
border. Message scroller and Questionnaire sit on @shadcn/react, as shadcn's own do. Code block
uses the host's monospace face, not Martian Mono, which is the docs' choice. Left: the Direction
provider, which a host can take from Base UI directly.

### Quality (2026-10-25)

- **Accessibility gate.** `pnpm a11y` opens every page in the sitemap in headless Chrome and runs
  axe-core; `--focus` also Tabs through each page and lists any stop that shows no yellow frame.
  It is a release gate (against the Workers preview). The first run found, and these were fixed:
  - `--color-zero-text-3` was #707070, 3.7 : 1 on the ground, under WCAG AA for the small text it
    sets (labels, times, captions). Now #8c8c8c: 5.4 : 1 on the ground, 4.9 : 1 on a panel, still a
    step below text-2. `--color-zero-danger` #e5432c was 4.05 : 1 on a panel; now #f2543a (4.8 : 1,
    and ink on it 5.8 : 1). Both are foundation changes, recorded here.
  - In Tailwind v4, `outline-none` sets the outline style to none, and `focus-visible:outline-(…)`
    only sets the width: such frames never showed. Every outline frame now also says
    `focus-visible:outline-solid`.
  - The Slider styled `focus-visible` on the thumb, but the range input inside it takes focus:
    now `has-focus-visible`. Checked Checkbox, Radio and Switch set their line to ink after the
    focus rule set it to yellow: a checked control now keeps the yellow while focused.
  - Missing names: Select triggers and sliders in demos, the first OTP cell (Base UI hands it the
    Field's label, so an OTP is named through a Field), a native select in a Field (now the Field's
    Control), the calendar's days (read by their number first) and its two navs on one page.
- **Screenshot regression.** `pnpm snapshots` photographs every docs demo (`[data-demo]`) with
  motion held still and compares it, pixel by pixel, with its baseline in `tests/snapshots/`
  (0.1% tolerance for anti-aliasing); `--update` rewrites the baselines after a change that was
  meant. A token change shows up as the demos it moved: changing the accent marks the primary
  button. Two demos move by themselves and are left out (the timed progress bar, the calendar that
  marks today). It is a release gate beside `pnpm a11y`.

- **Phone width** (2026-10-25). `pnpm a11y --mobile` runs the same checks at 375 × 812 with
  mobile emulation, and adds one: a page must not scroll sideways (it names what sticks out, past
  any box that scrolls or clips it). `pnpm snapshots --mobile` keeps a second set of baselines at
  375 px in `tests/snapshots/375/`. The first run found no page wider than the phone, but the
  props tables, which scroll inside their box there, could not be reached from the keyboard: they
  are now a named, focusable region with the focus frame. Both are release gates.

### zeroUI's own (2026-10-25)

- **Rarity** (the phase 1 token list named it; now built). Five tiers, common `#a6a6a6`, uncommon
  `#4fcf6a`, rare `#4a9eff`, epic `#b67cff`, legendary `#ff9b2f`: hues kept clear of the accent,
  the focus yellow and danger, each at least 6.3 : 1 on the ground and 5 : 1 on raised, ink on each
  at least 6.9 : 1. Badge takes a `rarity` fill, Card a top edge, Item a title colour and start
  edge. Card and Item spell the tier type out themselves, so neither depends on Badge.
- **The cut-in and the glitch** (phase 1 named both and waited for a component that needed them;
  the Cut-in is that component). `glitch`: three stepped jumps over `--zero-dur-glitch` (320 ms),
  the heading thrown sideways, sliced, and split into a danger-red and a rare-blue ghost, then
  still; stepped so it reads as a signal breaking up. `cut-in`: a wipe whose edge leans on the
  slant, in on `--zero-dur-cut` (the slow timing) and out at 0.6 of it. Both drop to nothing under
  reduced motion; `--zero-dur-cut` is its own token so that does not also stop what uses slow.
- **The studio** (done): dials for the slant, the outline, motion speed (every timing scaled) and
  four accent presets (hover and pressed shades mixed from the accent), written on the root so
  portalled popups follow; "Copy CSS" exports what changed as a `:root` override to paste into a
  project. Its dials are the zeroUI Slider.
- **Direction**: Base UI's provider re-exported. The slant does not mirror in right-to-left: the
  lean is part of the look, like the italic.

Forms (checkbox, radio, switch, slider, textarea), overlays (dialog, sheet, popover, tooltip,
dropdown menu), navigation (breadcrumb, pagination, sidebar), data display (card, table, badge,
avatar, progress), feedback (toast, alert, skeleton). Each family may add tokens; it does not
change the ones phase 1 settled without a dated decision here.

### Game pieces (2026-10-25)

What shadcn has no counterpart for, and the reason to pick zeroUI over a re-skin: a group of its
own in the docs ("Game"), the nav and llms.txt.

- **Gauge** (Base UI Meter). A drop leaves a pale trail where the fill was, which waits and then
  catches up; a rise sends a faint trail ahead and the fill climbs after. Which layer waits is
  decided by the direction of the last change (React's previous-render pattern). Added to the
  foundation: `--zero-dur-hold` (480 ms, `duration.hold`), the wait, zero under reduced motion;
  the `pulse` animation (opacity dips once a loop) for a gauge under its `low` mark.
- **Inventory.** Slots are square boxes, not slabs: item art needs a square, and a cut corner
  would lose its line on the diagonal. The size is `--zero-slot` (4 rem, new); in the grid the
  columns are `minmax(0, --zero-slot)` so a bag narrows on a phone. One Tab stop with roving focus
  written in the component (Base UI's composite is not public): arrows move in two dimensions,
  Home and End within the row, with Ctrl to the ends. Selected is the accent frame; focus replaces
  it with the yellow.
- **Hold button.** The fill is the slab's hatch layer, a gradient whose stop is `--hold-p`, a
  registered percentage (slab.css) so it can animate. It is run with the Web Animations API, not a
  transition, because Button's press transitions own `transition-duration`. Its pace does not
  change under reduced motion: it says how long to hold.
- **Counter.** Rolls on the new `roll` transition and throws its change on `float` (motion.ts).
  It writes the new value in render and puts the old one back in a layout effect before paint,
  then rolls, so there is no flash of the end value. Numbers default to `en-US`.
- **Objectives.** A mark per state, a strike drawn with a background line growing from the start.
- **Item icons.** crate, cell, flare, key, chip, kit, to the icon spec: thirty icons in all.

### Game pieces, second batch (2026-10-25)

- **Dialogue.** The typing is a reveal of a string (`DialogueText` takes a string, a new `key`
  per line); the box holds a polite live region with the whole current line, since a region that
  remounts with each line may not be announced. Enter or Space anywhere in the box, a click on the
  line, or Continue shows the rest; replies are hidden until the line is whole, and the number
  keys pick them.
- **Compass.** It draws, it does not animate: the game feeds `heading` every frame. Ticks are keyed
  by their unwrapped bearing so they slide instead of jumping at north. Off-view markers wait at
  the nearer edge with zeroUI's chevrons. Its name for screen readers is the heading and each
  marker's turn in words.
- **Floating text.** A hook keeps the list, a layer draws it; each removes itself when its
  animation ends. Decoration, hidden from screen readers. Uses the `float` and `release`
  transitions.
- **Feed.** motion's presence and layout animations: in on `reveal`, out on `dismiss`, the rest
  closing up. Expiry is the caller's (`onExpire`), so the list stays theirs.
- **Stats.** A description list; better or worse depends on `better`, and is said in words.
- **Radial menu.** Pointer direction, not reach, picks an item; arrow keys go round; focus stays
  on the wheel with the picked item as its active descendant. The wheel is round (things round by
  nature may be), its items are slanted squares.

### The board pieces (2026-10-25)

The author asked whether yLookbook's Inter-Knot replica could come in. Not as it is: it is a
replica of the game's forum, measured from screenshots, with the game's name and a logo after
the game's, which "the look is ours" rules out. Its patterns are generic and zeroUI lacked them,
so they are rebuilt here in zeroUI's own language, names and art: components first, then blocks,
then an example app. The lookbook replica stays as it is.

- **Post card.** A square-cornered card (its height is the picture's plus the text's). The title
  holds the one link or button, stretched over the card, so the card is one Tab stop named by its
  title. Covers in the docs are posters made from tokens, item icons and leaning type.
- **Masonry.** CSS columns, not measured in the browser: no layout shift. Reading order is down
  each column, which is stated in the docs.
- **Profile chip.** Fixed height, so a slab; one hidden sentence instead of its parts.
- **Reward track.** Rows with a hidden lead-in ("Level 5, ready to claim") rather than an
  `aria-label` on the list item, which some readers would read instead of its contents.
- **Blocks.** A community feed (the post opens in a Sheet that keeps its content while it
  leaves, and focus returns to the post), level rewards (a `header` switch so an app can show the
  profile once, and a milestone `note` on RewardTier that is never dimmed, after a locked note
  failed contrast at 40% opacity), a daily schedule (the current shift is the list's current item).
- **The example app.** `/examples/board`: the three blocks, unchanged, under one app bar (back,
  profile chip, tabs paged with Q and E). The bar sticks only from `sm` up: on a phone it would
  take a quarter of the screen. `/examples` lists apps; the site header links to it.
- **Tab hotkeys.** On TabsList: two keys that step through the tabs from anywhere outside a
  text field, shown at the track's ends; Tabs now depends on Kbd.

### Blocks (2026-10-25)

Whole screens built from the components, for what a game needs most often: a settings menu, a
mission briefing, a loadout, a leaderboard, a HUD.

- **Registry shape.** `registry:block` items, each one file, `src/components/blocks/<name>.tsx`,
  installed to `@components/blocks/`. Its registry dependencies are read from its imports, so
  installing a block brings exactly the components and icons it uses; blocks import icons file by
  file for that reason. The state is written out in the file (local state, made-up data) so the
  wiring between pieces is visible and easy to replace.
- **Layout follows the block's own box** (container queries, `@container` / `@3xl:` / `@4xl:`),
  not the viewport: the same block sits in a narrow docs column and a wide app.
- **Docs.** `/docs/blocks` lists them; each has its page with the install command, the block live
  (`Block`, which reads the block file like `Demo` reads a demo and marks its box
  `data-demo="block-<name>"` for the screenshot gate) and what it is built from. The breadcrumb
  goes through Blocks. The header links to them, and the home page runs the HUD.
- **Second batch** (same day): a title screen, a pause menu and a character select. The title
  screen's menu is buttons with the arrow keys moving focus between them (not an active
  descendant), so mouse, Tab and keys agree; its title sizes by container units. The pause panel
  is a labelled section, not a dialog, since it is drawn inline and does not manage focus; in a
  game, put it in a Dialog. The roster's cards are toggle buttons with the focus frame on the
  button itself.
- **A HUD's key numbers** are drawn from `data-key` in CSS and given as `aria-keyshortcuts`, so
  they are announced as shortcuts and do not clash with the slot's name.

## The look is ours

(Since 2026-10-26 the library is zzzUI, named in tribute to the game; see that decision. What
follows still holds for everything but the name and the disclaimer.)

zeroUI takes its mood from a game UI; it takes nothing else. No logos, fonts, icons, character art
or screenshots from the game or its publisher, and no game name in the product, the package or
the site. Every glyph, illustration and sample string is newly made.
