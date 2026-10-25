"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useCallback, useRef, useState } from "react";
import { cn } from "@/lib/zero/cn";
import { transition } from "@/lib/zero/motion";

/*
 * Numbers and words thrown off something as it happens: damage, a heal, a critical hit, "+1
 * level". Each one pops where it is spawned, rises and fades. A `crit` comes in bigger, in the
 * legendary orange, with a harder pop; `damage` is plain, `heal` green, `info` the accent. They
 * are decoration (the real value belongs somewhere screen readers can find it), so the layer is
 * hidden from them. Under reduced motion they fade where they are.
 *
 *   const floats = useFloatingText();
 *   <div className="relative">
 *     …
 *     <FloatingTextLayer floats={floats} />
 *   </div>
 *   floats.spawn({ text: "−42", x: 120, y: 40, kind: "crit" });
 *
 * x and y are in px from the layer's top-left (the layer fills its positioned parent).
 */

const kinds = {
  damage: "text-zero-text text-zero-lg",
  crit: "text-zero-rarity-legendary text-zero-xl",
  heal: "text-zero-rarity-uncommon text-zero-lg",
  info: "text-zero-accent text-zero-md",
} as const;

type FloatingTextKind = keyof typeof kinds;

type FloatingTextItem = {
  id: number;
  text: string;
  x: number;
  y: number;
  kind: FloatingTextKind;
};

function useFloatingText() {
  const [items, setItems] = useState<FloatingTextItem[]>([]);
  const next = useRef(0);
  const spawn = useCallback(
    (
      item: Omit<FloatingTextItem, "id" | "kind"> & { kind?: FloatingTextKind },
    ) => {
      next.current += 1;
      const id = next.current;
      setItems((list) => [...list.slice(-24), { kind: "damage", ...item, id }]);
    },
    [],
  );
  const remove = useCallback(
    (id: number) => setItems((list) => list.filter((item) => item.id !== id)),
    [],
  );
  return { items, spawn, remove };
}

type FloatingText = ReturnType<typeof useFloatingText>;

function FloatingTextLayer({
  className,
  floats,
  ...props
}: ComponentProps<"div"> & { floats: FloatingText }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      data-slot="floating-text"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible",
        className,
      )}
      {...props}
    >
      <AnimatePresence>
        {floats.items.map((item) => (
          <motion.span
            key={item.id}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black font-zero italic tabular-nums",
              "[text-shadow:0_2px_0_var(--color-zero-ink),0_0_6px_var(--color-zero-ink)]",
              kinds[item.kind],
            )}
            style={{ left: item.x, top: item.y }}
            initial={{
              opacity: 1,
              scale: reduce ? 1 : item.kind === "crit" ? 1.8 : 1.3,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: 1,
              y: reduce ? 0 : item.kind === "crit" ? "-2.2em" : "-1.6em",
            }}
            transition={{
              ...transition.float,
              scale: transition.release,
            }}
            onAnimationComplete={() => floats.remove(item.id)}
          >
            {item.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export {
  type FloatingText,
  type FloatingTextItem,
  type FloatingTextKind,
  FloatingTextLayer,
  useFloatingText,
};
