# Changelog

All notable changes to zeroUI are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/); this project uses
[semantic versioning](https://semver.org/).

## [Unreleased]

### Added

- **Rarity** — five tiers of worth, common to legendary, as colour tokens and as
  a `rarity` on Badge (its fill), Card (a top edge) and Item (its title and
  start edge), the way a game grades its loot.

### Changed

- **The home page puts the later components to work** — a dispatch console
  with a command palette that raises toasts, a channel you can type into, and
  the week in a chart. The share card and the README count all 63 components.
- **Quiet text and red are brighter** — `--color-zero-text-3` is now #8c8c8c
  and `--color-zero-danger` #f2543a, so small labels and error text pass WCAG AA
  contrast on the ground and on panels.
- **Slider names its thumbs** — an `aria-label` on the Slider reaches each
  thumb's input (with "from" and "to" on a range).
- **SidebarInset takes `render`**, for a page that already has a `<main>`.
- **Calendar reads days by their number first** ("27 October 2026, Tuesday").

### Fixed

- **Focus frames that never showed** — a focused Slider thumb, a checked
  Checkbox, Radio or Switch, and every outline frame (links, accordion
  headings, bubbles, items, the calendar's menus) now show the yellow frame
  when reached from the keyboard.
- **Native select inside a Field** is named by its FieldLabel.

## [0.1.3] - 2026-10-25

The chat pieces (messages, bubbles, attachments, code blocks, agent traces, a
message scroller and a questionnaire), a Form, several values in the Combobox,
and floating and inset sidebars.

### Added

- **Form** — Base UI's form around Fields: validation on submit, a server's
  errors shown in each field, and fieldsets under leaning legends.
- **Several values in the Combobox** — with `multiple`, chosen items sit in the
  field as small slabs, each with a button that takes it out.
- **Floating and inset sidebars** — the Sidebar as a panel standing off the
  edge, or on the black ground with the page set in beside it.
- **Chat pieces** — Message, Bubble (a square box with the corner toward the
  speaker cut off), Marker, Attachment, Code block (line numbers, copy, added
  and removed lines), Trace (an agent's steps), Message scroller (keeps to the
  newest turn) and Questionnaire (one question at a time).
- **Arrow down and copy icons.**

## [0.1.2] - 2026-10-25

Twenty-eight more components: disclosure and toggles, commands, more inputs
and overlays, layout pieces, and the calendar, carousel, chart and resizable
panels. zeroUI is now MIT-licensed.

### Added

- **MIT license** — zeroUI can be used, changed and shared freely, with the
  copyright notice kept.
- **Accordion** — sections that open one at a time, divided by quiet lines,
  each heading led by a slanted sliver that lights with the accent while open.
- **Collapsible** — a panel that unfolds to its own height in place and folds
  back faster.
- **Toggle** — a Button that stays down, filled with the accent while on.
- **Toggle group** — toggles cut on both sides, nesting in a row, for one value
  or several.
- **Separator** — a quiet line, across or upright.
- **Command** — a search over a list of actions, always open: type to narrow
  it, Enter to run the highlighted one; inline, or floating as a ⌘K palette.
- **Combobox** — Input's well that suggests as you type, over Select's panel
  and rows.
- **Context menu** — the Dropdown menu, opened where you right-click.
- **Menubar** — a black bar of menus that open one after another.
- **Hover card** — a preview panel that opens while a link is pointed at.
- **Submenus in the Dropdown menu** — a row that opens another menu beside it.
- **Input OTP** — a one-time code in slanted cells, a tall leaning character
  to each, filled by typing or pasting.
- **Input group** — Input's well with text, icons, keys or small buttons at
  either end.
- **Button group** — buttons set close and cut on both sides so they nest.
- **Native select** — the browser's own select in Input's well.
- **Kbd** — a key to press, as a small raised slab.
- **Label** — a control's name in leaning type, outside a Field.
- **Alert dialog** — a Dialog that asks before something that cannot be
  undone and waits for an answer.
- **Drawer** — a panel that comes up from the bottom with a slanted grip,
  follows the finger and swipes away.
- **Navigation menu** — a row of menus sharing one panel of links that
  resizes and slides between them.
- **Item** — one thing in a list: a mark, a leaning title with a line
  beneath it, and actions.
- **Empty** — what a place shows when it has nothing in it yet.
- **Scroll area** — scrollbars with a thin track and a slanted thumb.
- **Aspect ratio** — a box that keeps a ratio of width to height.
- **Spinner** — the spinner icon, turning, still under reduced motion.
- **Calendar** — a month of slanted day cells for one day or a range, with
  month and year menus.
- **Carousel** — slides to drag or swipe, raised slab arrows, and a row of
  slanted pips.
- **Chart** — Recharts in zeroUI's colours: quiet axes, slanted swatches and a
  panel tooltip, with five series colours taken from the tokens.
- **Resizable** — panels with a draggable edge and a slanted grip.

## [0.1.1] - 2026-10-24

Twenty-one more components, in five families: forms, overlays, feedback, data
display and navigation. Running text now has its own typeface.

### Added

- **Checkbox** — a small slanted well that fills with the accent when checked,
  an ink check springing in; an indeterminate minus for a box that stands for
  several others. It sizes with the label beside it.
- **Radio group** — the same well for one choice of several; the chosen one
  holds a slab of the accent, nested like the Tabs slab in its track.
- **Switch** — a slanted track and a slab that springs across to the other end
  when turned on, the track filling with the accent.
- **Textarea** — several lines in the same sunken well as Input, growing with
  what is typed, and the Field's control inside a Field.
- **Slider** — a slanted track with an accent fill and slab thumbs that lift to
  the accent while dragged; one value, or two for a range.
- **Dialog** — a panel over a dimmed page, with a black header bar holding a
  tilted title and a close button in its corner; it opens out of its centre and
  folds back faster.
- **Sheet** — a dialog that slides in from any edge of the screen and holds on
  to it.
- **Popover** — a panel beside its trigger for a few lines or a small form.
- **Tooltip** — a one-line label on a light slab cut on both sides, opening on
  hover and on keyboard focus.
- **Dropdown menu** — actions in Select's rows, filled with the accent while
  highlighted, with icons, shortcuts, checkbox and radio rows, and a red row
  for destructive actions.
- **Alert** — a message set into the page in four tones (info, success,
  warning, danger), each with its own slanted badge and its start edge in the
  tone's colour.
- **Progress** — a thin slanted track filling with the accent, a segmented
  gauge whose cells light up one by one, and a block sweeping back and forth
  when the amount is unknown.
- **Skeleton** — loading placeholders as blocks, slanted text lines and
  control-sized slabs, with a faint glint passing along the slant.
- **Toast** — messages that slide into the bottom-right corner in Alert's
  tones, stack three high, swipe away to the right and leave on their own,
  with an optional action button.
- **Done icon** — a check knocked out of the badge, beside alert and info.
- **Card** — a square-cornered box with a black header bar for the title and
  an action, the content and a footer; an interactive card lights its outline
  in the accent when pointed at.
- **Table** — column heads on a black bar in small leaning capitals, quiet
  lines between rows, a row that lights under the pointer and a selected row
  with the accent on its edge.
- **Badge** — a small slab cut on both sides in four variants, with an icon or
  as a link.
- **Avatar** — a round picture or initials in an ink ring, in the three
  control heights, with a status dot and overlapping groups.
- **Breadcrumb** — the pages above this one in leaning type, set apart by
  short slanted bars; the current page is the brightest.
- **Pagination** — pages as small slabs cut on both sides, nesting like the
  tabs, the current one filled with the accent.
- **Sidebar** — a black, hatched strip of rows for an app's side, the current
  page in the accent; it folds away or down to an icon rail with tooltips,
  opens as a sheet on phones, and toggles with ⌘B / Ctrl+B.
- **More and sidebar icons** — three small leaning slabs for what is left
  out, and a frame with its side column filled.
- **Waiting motion** — a loop timing for things that repeat while something
  loads: a sweep for an unknown amount and a glint across placeholders, both
  still under reduced motion.

### Changed

- **Two typefaces** — what you read or type (running text, descriptions, the
  values in Input and Select) is now set in Outfit, compact and orderly, while
  labels, buttons and tabs keep Montserrat's heavy italics. Installing any
  component brings both fonts; placeholders are now upright.
- **Code in Martian Mono** — the docs' code blocks and install commands are
  set in a wide, geometric monospace that sits with the heavy italic labels,
  instead of a thin, neutral one.
- **Select's list holds still under reduced motion** — it now only fades, like
  every other popup.

## [0.1.0] - 2026-10-24

The first release: a dark-only component library with a game-UI look, built on
shadcn and Base UI, at https://zeroui.catforest.dev.

### Added

- **Install from a shadcn registry** — add the `@zeroui` namespace to a shadcn
  project once, then `shadcn add @zeroui/button` (or input, field, select,
  tabs, icons). The code lands in your project, yours to change; the first
  component also writes the foundation into your stylesheet and loads
  Montserrat in your layout.
- **Go dark in one command** — `@zeroui/theme` points your project's shadcn
  variables at zeroUI's colours, so the rest of the page matches.
- **Button** — a slab cut on the slant and outlined in ink: primary, secondary,
  danger and ghost; three sizes; the cut on the end, the start, both sides or
  neither. It drops when pressed, springs back past its rest, and sends a band
  of light across when pointed at.
- **Input** — a sunken well with an accent caret, an icon or an action at
  either end (a search glass, a clear button, a show-password toggle), and a
  red outline when the value is invalid.
- **Field** — label, help text and an error that slides in under a small
  slanted mark, with Base UI's validation.
- **Select** — the same sunken well as a trigger, and a list that grows out of
  it in a box lifted by a double outline; the highlighted row fills with the
  accent and the chosen one carries a slanted mark.
- **Tabs** — an accent slab that springs along a slanted track to the active
  tab; while it slides, the part of each label over it turns dark.
- **Nineteen icons** — solid glyphs drawn for zeroUI on one grid, their strokes
  ending on the same slant as the slabs: chevrons and arrows, check, close,
  alert, info, lock, plus, minus, search, clear, eye, eye-off, external and a
  spinner. They size with the text beside them and take its colour.
- **One foundation under everything** — colours, type, control heights,
  outline weights and a single slant angle as tokens; named timings for every
  motion; the slab, the cut block every component is drawn from. Keyboard focus
  is a yellow frame everywhere, and motion holds still when the system asks for
  reduced motion.
- **Docs for every component** — install commands for pnpm, npm, yarn and bun,
  live demos with their code, how each component behaves, and every prop.
- **A showcase** — the home page puts the components to work in a job board you
  can search, filter, take jobs from and hand them in, and a dial that turns
  the slant under a button, tabs and a field.

[Unreleased]: https://github.com/maosensen/zeroUI/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/maosensen/zeroUI/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/maosensen/zeroUI/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/maosensen/zeroUI/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/maosensen/zeroUI/releases/tag/v0.1.0
