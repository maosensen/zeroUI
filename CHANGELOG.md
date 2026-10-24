# Changelog

All notable changes to zeroUI are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/); this project uses
[semantic versioning](https://semver.org/).

## [Unreleased]

### Added

- Select: the trigger is the same sunken well as Input, its chevron flipping
  when open; the list drops from it in a square box lifted by a double outline,
  grows in and folds away faster. The highlighted row fills with the accent and
  the chosen one carries a small slanted mark. Groups, separators, disabled
  rows, and long lists that scroll.
- Input: a sunken well with a quiet outline; the whole slab takes the click.
  Focus draws the yellow frame, an invalid value turns the outline red, and the
  caret is the accent. Three sizes and the four cuts.
- Field: label, description and error around a control, with Base UI's
  validation. The error slides in under a small slanted mark and leaves faster.
- Tabs: a track cut on the slant at both ends and an accent slab that springs
  to the active tab, sitting parallel to the track's cut at either end. While
  it slides, the part of each label over the slab turns dark and the rest stays
  light. Three sizes; keyboard focus draws the yellow frame.
- Button: primary, secondary, danger and ghost; three sizes; the slanted cut on
  the end, the start, both sides or neither. It shrinks fast when pressed and
  springs back past its rest; pointing at it sends a band of light across.
  Keyboard focus draws a yellow frame with a dark gap inside it.
- The foundation: colour, type, control heights, outline weights and one slant
  angle as tokens; named durations, easings and transitions; the slab, the cut
  block every component is drawn from. One typeface, Montserrat.
- The studio (local only): every button, input, select and tab state, with dials for the slant and the
  outline weight.

- The project: a clean shadcn app on Base UI, dark only, with every shadcn
  component pulled in as a starting point, and the plan for building zeroUI's
  tokens, motion and icons from its first four components.
