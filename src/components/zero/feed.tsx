"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/zero/cn";
import { transition } from "@/lib/zero/motion";

/*
 * What just happened, as a game reports it at the edge of the screen: "Rook delivered a sealed
 * crate", "Shield down". Each event is a dark band fading out to the left, with an edge in its
 * tone, sliding in from the right; after `duration` it calls `onExpire` and, once you drop it,
 * folds away. The newest is at the bottom. The list is a polite live region, so each new event is
 * read out once. Under reduced motion they appear and go without sliding.
 *
 *   <Feed aria-label="Events">
 *     {events.map((e) => (
 *       <FeedItem key={e.id} tone={e.tone} onExpire={() => drop(e.id)}>
 *         <FeedActor>Rook</FeedActor> delivered a sealed crate
 *       </FeedItem>
 *     ))}
 *   </Feed>
 */

const tones = {
  // a quiet edge, a bright name
  default:
    "[--feed-actor:var(--color-zero-text)] [--feed-tone:var(--color-zero-text-3)]",
  accent: "[--feed-tone:var(--color-zero-accent)]",
  danger: "[--feed-tone:var(--color-zero-danger)]",
  rare: "[--feed-tone:var(--color-zero-rarity-rare)]",
  legendary: "[--feed-tone:var(--color-zero-rarity-legendary)]",
} as const;

function Feed({
  className,
  children,
  ...props
}: Omit<ComponentProps<"ol">, "children"> & { children?: ReactNode }) {
  return (
    <ol
      data-slot="feed"
      aria-live="polite"
      aria-relevant="additions"
      className={cn("grid w-full max-w-80 justify-items-end gap-1", className)}
      {...props}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ol>
  );
}

function FeedItem({
  className,
  tone = "default",
  duration = 5000,
  onExpire,
  children,
}: {
  className?: string;
  tone?: keyof typeof tones;
  /** Milliseconds before `onExpire`; 0 keeps it. */
  duration?: number;
  onExpire?: () => void;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const expire = useRef(onExpire);
  expire.current = onExpire;
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => expire.current?.(), duration);
    return () => clearTimeout(timer);
  }, [duration]);
  return (
    <motion.li
      layout={!reduce}
      data-slot="feed-item"
      initial={{ opacity: 0, x: reduce ? 0 : "1.5em" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: transition.dismiss }}
      transition={transition.reveal}
      className={cn(
        "w-fit max-w-full bg-[linear-gradient(to_left,rgb(0_0_0/0.78)_60%,transparent)] py-1.5 ps-8 pe-3",
        "shadow-[inset_calc(-1*var(--zero-stroke-thick))_0_0_var(--feed-tone)]",
        "font-medium font-zero-text text-zero-sm text-zero-text-2",
        tones[tone],
        className,
      )}
    >
      {children}
    </motion.li>
  );
}

/** Who did it: in the display face, in the item's tone. */
function FeedActor({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="feed-actor"
      className={cn(
        "font-black font-zero text-(--feed-actor,var(--feed-tone)) italic",
        className,
      )}
      {...props}
    />
  );
}

/** What it was done to: bright, upright. */
function FeedTarget({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="feed-target"
      className={cn("font-semibold text-zero-text", className)}
      {...props}
    />
  );
}

export { Feed, FeedActor, FeedItem, FeedTarget };
