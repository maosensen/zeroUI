"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { type CSSProperties, useEffect, useRef } from "react";
import { transition } from "@/zero/foundation/motion";
import { cn } from "@/zero/lib/utils";

/*
 * Tabs: a track cut on both sides, and a slab of the accent sliding inside it to the active tab.
 * The slab is cut on both sides too and every edge leans the same way, so at either end of the
 * track it sits parallel to the track's own cut, --zero-inset away all round.
 *
 * Each tab carries its label twice: once in the text colour, and once in ink, clipped to where
 * the slab is right now. While the slab slides, whatever part of a label lies over it is ink and
 * the rest is not, so no label is ever ink on the dark track.
 *
 * Geometry the parts share, as custom properties on the root and the track:
 *   --tabs-h          a tab's (and the slab's) height, from the size
 *   --tabs-slab-x/w   the slab's current left and width in the track, written every frame
 *   --tabs-tab-x      on each tab: its left in the track
 */

const sizes = {
  sm: "[--tabs-h:var(--height-zero-sm)] text-zero-sm",
  md: "[--tabs-h:var(--height-zero-md)] text-zero-md",
  lg: "[--tabs-h:var(--height-zero-lg)] text-zero-lg",
} as const;

type TabsProps = TabsPrimitive.Root.Props & { size?: keyof typeof sizes };

function Tabs({ className, size = "md", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", sizes[size], className)}
      {...props}
    />
  );
}

/** The accent slab. Springs to the active tab and reports where it is to the track. */
function TabsSlab({ left, width }: { left: number; width: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(left);
  const w = useMotionValue(width);
  const reduceMotion = useReducedMotion();
  const placed = useRef(false);

  useEffect(() => {
    // the first placement, and every move under reduced motion, lands without travelling
    if (!placed.current || reduceMotion) {
      placed.current = true;
      x.jump(left);
      w.jump(width);
      return;
    }
    const slideX = animate(x, left, transition.slide);
    const slideW = animate(w, width, transition.slide);
    return () => {
      slideX.stop();
      slideW.stop();
    };
  }, [left, width, reduceMotion, x, w]);

  useEffect(() => {
    const track = ref.current?.parentElement;
    if (!track) return;
    const report = () => {
      track.style.setProperty("--tabs-slab-x", `${x.get()}px`);
      track.style.setProperty("--tabs-slab-w", `${w.get()}px`);
    };
    report();
    const offX = x.on("change", report);
    const offW = w.on("change", report);
    return () => {
      offX();
      offW();
    };
  }, [x, w]);

  return (
    <motion.span
      ref={ref}
      aria-hidden
      style={{ x, width: w }}
      className={cn(
        "slab slab-cut-both pointer-events-none absolute top-[calc(var(--zero-stroke-thin)+var(--zero-inset))] left-0",
        "[--slab-h:var(--tabs-h)] [--slab-o:0px] [--slab-px:0px] [--slab-fill:var(--color-zero-accent)]",
      )}
    />
  );
}

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Each tab's left in the track, for clipping its ink label to the slab.
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const measure = () => {
      for (const tab of track.querySelectorAll<HTMLElement>(
        "[data-slot=tabs-tab]",
      )) {
        tab.style.setProperty("--tabs-tab-x", `${tab.offsetLeft}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const tab of track.children) observer.observe(tab);
    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "slab slab-cut-both inline-flex w-fit max-w-full items-center",
        "[--slab-o:var(--zero-stroke-thin)] [--slab-line:var(--color-zero-line)] [--slab-fill:var(--color-zero-void)] [--slab-hatch:var(--zero-hatch)]",
        // tall enough for a tab plus the outline and the inset above and below
        "[--slab-h:calc(var(--tabs-h)+2*(var(--zero-stroke-thin)+var(--zero-inset)))]",
        // padding that puts the slab, at either end, exactly --zero-inset inside the track's cut
        "[--slab-px:calc((var(--zero-inset)+var(--zero-stroke-thin))/cos(var(--zero-slant))-var(--tabs-h)*tan(var(--zero-slant))/2)]",
        className,
      )}
      {...props}
    >
      <TabsPrimitive.Indicator
        render={(_, state) =>
          state.activeTabPosition && state.activeTabSize ? (
            <TabsSlab
              left={state.activeTabPosition.left}
              width={state.activeTabSize.width}
            />
          ) : (
            <span hidden />
          )
        }
      />
      {children}
    </TabsPrimitive.List>
  );
}

// The slab's shape, moved into the tab's own coordinates.
const inkClip = {
  "--tabs-ink-clip": `polygon(
    calc(var(--tabs-slab-x, 0px) - var(--tabs-tab-x, 0px) + var(--tabs-h) * tan(var(--zero-slant))) 0,
    calc(var(--tabs-slab-x, 0px) - var(--tabs-tab-x, 0px) + var(--tabs-slab-w, 0px)) 0,
    calc(var(--tabs-slab-x, 0px) - var(--tabs-tab-x, 0px) + var(--tabs-slab-w, 0px) - var(--tabs-h) * tan(var(--zero-slant))) 100%,
    calc(var(--tabs-slab-x, 0px) - var(--tabs-tab-x, 0px)) 100%
  )`,
} as CSSProperties;

function TabsTab({ className, children, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "group/tab slab slab-cut-both inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap select-none outline-none",
        "font-zero font-black italic tracking-[0.01em]",
        "[--slab-h:var(--tabs-h)] [--slab-px:1rem] [--slab-fill:transparent] [--slab-line:transparent]",
        "hover:not-data-active:[--slab-ink:var(--color-zero-accent)]",
        // the selection frame; an active tab fills itself in the accent, so the frame is never
        // drawn while the slab is still on its way
        "focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-fill:var(--color-zero-raised)]",
        "data-active:focus-visible:[--slab-fill:var(--color-zero-accent)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-ink:var(--color-zero-text-3)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden
        style={inkClip}
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center gap-[inherit] px-[inherit] text-zero-ink",
          "[clip-path:var(--tabs-ink-clip)] group-data-active/tab:group-focus-visible/tab:[clip-path:none]",
        )}
      >
        {children}
      </span>
    </TabsPrimitive.Tab>
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn(
        "outline-none focus-visible:outline-(length:--zero-stroke) focus-visible:outline-zero-focus focus-visible:outline-offset-4 focus-visible:outline-solid",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsPanel, TabsTab, type TabsProps };
