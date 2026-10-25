"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A bag of things in square slots, the way a game keeps its loot. A slot is a black well with a
 * quiet line; what it holds sits in the middle, its count in the corner. `rarity` lights the
 * bottom edge and a glow rising from it in the tier's colour; `selected` frames it in the accent;
 * `cooldown` (0–1, what is left) darkens a sweep of it like a clock; an empty slot shows the
 * hatching. Inventory lays slots out in `columns` and is one stop on Tab: the arrow keys move
 * between slots in two dimensions, Home and End go to the ends of a row.
 *
 *   <Inventory columns={6} aria-label="Backpack">
 *     <InventorySlot rarity="rare" count={3} aria-label="Signal flare, 3">…</InventorySlot>
 *     <InventorySlot />
 *   </Inventory>
 */

type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

const rarities: Record<Rarity, string> = {
  common: "[--slot-tier:var(--color-zero-rarity-common)]",
  uncommon: "[--slot-tier:var(--color-zero-rarity-uncommon)]",
  rare: "[--slot-tier:var(--color-zero-rarity-rare)]",
  epic: "[--slot-tier:var(--color-zero-rarity-epic)]",
  legendary: "[--slot-tier:var(--color-zero-rarity-legendary)]",
};

const SLOT = '[data-slot="inventory-slot"]:not([data-disabled])';

function Inventory({
  className,
  columns = 6,
  style,
  onKeyDown,
  ...props
}: ComponentProps<"div"> & { columns?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const slots = () => [
    ...(ref.current?.querySelectorAll<HTMLElement>(SLOT) ?? []),
  ];

  // one stop on Tab: the slot last focused, or the selected one, or the first
  useEffect(() => {
    const all = slots();
    const current =
      all.find((slot) => slot.dataset.roving === "") ??
      all.find((slot) => slot.getAttribute("aria-pressed") === "true") ??
      all[0];
    for (const slot of all) slot.tabIndex = slot === current ? 0 : -1;
  });

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    const all = slots();
    const from = all.indexOf(document.activeElement as HTMLElement);
    if (from < 0) return;
    const row = from - (from % columns);
    const to = {
      ArrowRight: from + 1,
      ArrowLeft: from - 1,
      ArrowDown: from + columns,
      ArrowUp: from - columns,
      Home: event.ctrlKey ? 0 : row,
      End: event.ctrlKey
        ? all.length - 1
        : Math.min(row + columns, all.length) - 1,
    }[event.key];
    if (to === undefined) return;
    event.preventDefault();
    const next = all[Math.min(all.length - 1, Math.max(0, to))];
    for (const slot of all) {
      slot.tabIndex = slot === next ? 0 : -1;
      delete slot.dataset.roving;
    }
    next.dataset.roving = "";
    next.focus();
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would bring its own border and padding to a grid of buttons
    <div
      ref={ref}
      role="group"
      data-slot="inventory"
      onKeyDown={move}
      style={{ "--inventory-columns": columns, ...style } as CSSProperties}
      className={cn(
        // columns of one slot each, narrowing when there is no room; the slots fill them
        "grid w-fit max-w-full grid-cols-[repeat(var(--inventory-columns),minmax(0,var(--zero-slot)))] gap-1.5 [&>[data-slot=inventory-slot]]:w-auto",
        className,
      )}
      {...props}
    />
  );
}

type InventorySlotProps = ButtonPrimitive.Props & {
  rarity?: Rarity;
  selected?: boolean;
  /** How many: shown in the corner when more than one. */
  count?: number;
  /** What is left of a cooldown, 0–1; the slot darkens that share of a turn. */
  cooldown?: number;
};

function InventorySlot({
  className,
  rarity,
  selected,
  count,
  cooldown,
  children,
  ...props
}: InventorySlotProps) {
  const empty = children === undefined || children === null;
  return (
    <ButtonPrimitive
      data-slot="inventory-slot"
      data-rarity={rarity}
      data-empty={empty ? "" : undefined}
      aria-pressed={selected}
      className={cn(
        "relative grid aspect-square w-(--zero-slot) place-items-center overflow-hidden bg-zero-void outline-none",
        "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
        "transition-[background-color,outline-color] duration-(--zero-dur-fast) ease-(--zero-ease-out)",
        "hover:bg-zero-surface data-empty:bg-(image:--zero-hatch)",
        "[&>img]:size-full [&>img]:object-contain [&>svg]:size-[55%]",
        rarity &&
          cn(
            rarities[rarity],
            "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line),inset_0_calc(-1*var(--zero-stroke-thick))_0_var(--slot-tier)]",
            "bg-[linear-gradient(to_top,color-mix(in_srgb,var(--slot-tier)_24%,transparent),transparent_65%)]",
          ),
        // chosen: the accent around it; focus: the yellow frame, the ground showing as its gap
        "outline-offset-2 aria-pressed:outline-solid aria-pressed:outline-(length:--zero-stroke-thin) aria-pressed:not-focus-visible:outline-zero-accent",
        "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus",
        "data-disabled:opacity-45",
        className,
      )}
      {...props}
    >
      {children}
      {cooldown ? (
        <span
          data-slot="inventory-cooldown"
          aria-hidden
          style={{ "--slot-cooldown": cooldown } as CSSProperties}
          className="absolute inset-0 bg-[conic-gradient(rgb(0_0_0/0.72)_calc(var(--slot-cooldown)*360deg),transparent_0)]"
        />
      ) : null}
      {count !== undefined && count > 1 ? (
        <span
          data-slot="inventory-count"
          className="absolute end-1.5 bottom-1 font-bold font-zero-text text-zero-xs tabular-nums [text-shadow:0_1px_0_var(--color-zero-ink),0_0_3px_var(--color-zero-ink)]"
        >
          {count}
        </span>
      ) : null}
    </ButtonPrimitive>
  );
}

export { Inventory, InventorySlot, type InventorySlotProps };
