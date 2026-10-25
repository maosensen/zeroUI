import { createIcon } from "./icon";

/** A chip: a chamfered body, two pins a side, its die a slanted hole. */
export const ChipIcon = createIcon("chip", {
  d: "M7 5h10l1 1v12l-1 1H7l-1-1V6zM10 10h5l-1 4H9zM3 7h3v3H3zM3 14h3v3H3zM18 7h3v3h-3zM18 14h3v3h-3z",
  fillRule: "evenodd",
});
