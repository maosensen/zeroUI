# Changelog

All notable changes to zeroUI are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/); this project uses
[semantic versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/maosensen/zeroUI/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/maosensen/zeroUI/releases/tag/v0.1.0
