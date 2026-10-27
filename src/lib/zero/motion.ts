/**
 * zzzUI motion, JS side: the named durations, easings and transitions every animated component
 * uses with `motion`. The CSS twin is motion.css; the two files hold the same numbers.
 *
 * Nothing in a component picks its own timing. A move that has no name here gets one here first.
 */
import type { Transition } from "motion/react";

/** Seconds, as `motion` wants them. motion.css has the same values in ms. */
export const duration = {
  instant: 0.07,
  fast: 0.14,
  base: 0.24,
  slow: 0.42,
  /** One pass of a waiting loop (sweep, glint). */
  loop: 1.6,
  /** The glitch: a few hard jumps, once. */
  glitch: 0.32,
  /** How long a gauge's trail waits before it catches up. */
  hold: 0.48,
  /** A chart's marks growing to their values when it comes into view. */
  draw: 0.72,
} as const;

export const ease = {
  out: [0.2, 0.7, 0.2, 1],
  in: [0.5, 0, 0.75, 0],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.7, 0.5, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** How far a pressed slab shrinks. Mirrors --zero-press-scale. */
export const pressScale = 0.94;

/** The named transitions. */
export const transition = {
  /** A slab going down under the pointer. */
  press: { duration: duration.instant, ease: ease.out },
  /** A slab coming back up, past its rest and settling. */
  release: { duration: duration.base, ease: ease.spring },
  /** The selection slab sliding between items (tabs, segmented controls). Stiff, barely bouncing. */
  slide: { type: "spring", stiffness: 640, damping: 44, mass: 0.9 },
  /** Something appearing: popups, panels, rows. */
  reveal: { duration: duration.base, ease: ease.out },
  /** Something leaving. Faster than it came. */
  dismiss: { duration: duration.fast, ease: ease.in },
  /** A number rolling to its new value (Counter). */
  roll: { duration: duration.slow, ease: ease.out },
  /** A number thrown off something (a counter's change) rising and fading. */
  float: { duration: duration.slow * 2, ease: ease.out },
} as const satisfies Record<string, Transition>;
