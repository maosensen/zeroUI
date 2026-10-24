import { createIcon } from "./icon";

/** The eye, struck through by a 45° bar with a cut's width clear on each side. */
export const EyeOffIcon = createIcon("eye-off", {
  d: "M2 12l6-6h8l6 6-6 6H8zM6 12l4 3h4l4-3-4-3h-4zM9.5 12a2.5 2.5 0 1 1 5 0a2.5 2.5 0 1 1-5 0z",
  // a band wider than the slash, so the eye stands clear of it
  cut: "M0 4l4-4 20 20-4 4z",
  over: "M2 4l2-2 18 18-2 2z",
});
