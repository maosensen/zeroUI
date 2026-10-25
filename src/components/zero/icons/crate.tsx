import { createIcon } from "./icon";

/** A chamfered box with one brace across it at 45°: the two triangles either side are holes. */
export const CrateIcon = createIcon("crate", {
  d: "M4 3h16l1 1v16l-1 1H4l-1-1V4zM6 6h9l-9 9zM18 9v9H9z",
  fillRule: "evenodd",
});
