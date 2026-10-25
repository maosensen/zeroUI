import { createIcon } from "./icon";

/** A power cell: a slab-shaped body with a terminal at its end, its spent third a hole. */
export const CellIcon = createIcon("cell", {
  d: "M6 6h14l-3 12H3zM13 10h3l-1 4h-3zM19 10h2.5l-1 4H18z",
  fillRule: "evenodd",
});
