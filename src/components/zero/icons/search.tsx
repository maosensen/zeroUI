import { createIcon } from "./icon";

/** A round lens (round by nature) and a 45° handle, kept a cut's width apart. */
export const SearchIcon = createIcon("search", {
  d: "M2.5 10a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0-15 0zM6 10a4 4 0 1 0 8 0a4 4 0 1 0-8 0zM15 18l3-3 4 4-3 3z",
  fillRule: "evenodd",
});
