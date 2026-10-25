# zeroUI icons — the specification

zeroUI's icons are drawn for it, in code, on one grid and by one set of rules, so that they read
as the same family as the slabs and the 900-weight italic lettering. Nothing is taken from an icon
library or from the game the library takes its mood from.

## The grid

- `viewBox="0 0 24 24"`. The live area is 2–22 on both axes; nothing is drawn outside it.
- Coordinates are whole numbers or halves, so edges land on pixels at 24 px and stay crisp at
  16 px and 20 px.

## The rules

1. **Solid, not stroked.** Every icon is filled shapes (`fill="currentColor"`). A stroked icon
   looks thin beside 800–900 lettering. Openings are holes cut out of a solid (`fill-rule`
   `evenodd`), never thin lines.
2. **Weight.** Main strokes are 4 units thick (6 units measured vertically on a 45° stroke,
   which is 4.2 across). Secondary parts (a frame, a ring) may go down to 3.
3. **The slant is 1 : 4.** A horizontal stroke ends in a cut that leans like a slab edge: the top
   one unit further right than the bottom for every four units of height (14.04°, the
   `--zero-slant` of 14° on whole units). Vertical strokes end square. Shapes that stand for a slab
   (the badge behind alert, info, done and clear; the body of the lock) are parallelograms at the same
   lean. Icons are fixed paths, so they do not follow the studio's slant dial.
4. **Diagonals are 45°**, and their ends are cut flush to the horizontal or the vertical.
5. **Corners are cut, never rounded.** A corner that needs softening is chamfered at 45°. The only
   curves are things round by nature: the lens of the search glass, the pupil of the eye, the
   spinner's ring.
6. **Glyphs inside a badge lean too.** The `!` of alert and the `i` of info are italic, at 1 : 4.

## Size and colour

- An icon is `1.25em` square by default, so it follows the text it sits with: about 16, 19 and
  24 px beside the sm, md and lg labels. A `size-*` class overrides it.
- It takes `currentColor`, so a control's ink colours its icon.
- `outline` draws an ink outline `--zero-stroke` wide around the whole shape (holes included),
  for an icon sitting on the accent or on an image. Off by default: at 16 px on a dark ground an
  outline only blurs the shape.

## Accessibility

Icons are decorative by default (`aria-hidden`). Give one a `title` when it stands alone and means
something (an icon-only button still needs its own `aria-label`); it then becomes `role="img"`
with that title.

## The set

| Group | Icons |
|---|---|
| Direction | chevron up / down / left / right, arrow left / right / down |
| State | check, close, alert, info, done, lock |
| Action | plus, minus, search, clear, eye, eye-off, external, more, sidebar, copy |
| Activity | spinner (static; whatever spins it supplies the motion) |

Each icon is its own file in `src/components/zero/icons/`, built with `createIcon` from `icon.tsx`, so the
registry can ship them one at a time. A shape is a path `d` with its fill rule; when an opening
cannot come from the fill rule alone, `cut` takes a region out of `d` (through a mask) and `over`
draws on top of it afterwards — that is how eye-off keeps a clear gap on both sides of its slash.

Every icon is shown at full size over the grid, at 16, 20 and 24 px, and outlined on the accent,
on the icon sheet at the top of `/studio`.
