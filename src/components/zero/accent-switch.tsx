"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useEffect, useState } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Chooses the accent: a row of small slabs, one per preset in the foundation (tokens.css), each
 * filled with its colour. The chosen one is framed in white with an ink gap; focus frames in the
 * yellow. It is a radio group, so the arrow keys move between them. The choice is written as
 * data-zero-accent on <html> (or on `target`, for one part of a page) and remembered in
 * localStorage under `storageKey` (null to forget). Put AccentScript in <head> so a remembered
 * accent is on the page before it paints, not after it hydrates.
 *
 *   <AccentSwitch />                                     the whole page, remembered
 *   <AccentSwitch target={() => box.current} storageKey={null} />
 */

const ACCENTS = [
  { value: "lime", label: "Lime" },
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
] as const;

type Accent = (typeof ACCENTS)[number]["value"];

const isAccent = (value: unknown): value is Accent =>
  ACCENTS.some((accent) => accent.value === value);

const swatches: Record<Accent, string> = {
  lime: "[--slab-fill:var(--zero-accent-lime)]",
  cyan: "[--slab-fill:var(--zero-accent-cyan)]",
  magenta: "[--slab-fill:var(--zero-accent-magenta)]",
};

function AccentSwitch({
  className,
  value,
  defaultValue = "lime",
  onValueChange,
  target,
  storageKey = "zero-accent",
  "aria-label": label = "Accent colour",
}: {
  className?: string;
  value?: Accent;
  defaultValue?: Accent;
  onValueChange?: (value: Accent) => void;
  /** Where to write data-zero-accent; <html> when omitted. */
  target?: () => HTMLElement | null;
  /** Where the choice is remembered; null to keep it only for this page view. */
  storageKey?: string | null;
  "aria-label"?: string;
}) {
  const [own, setOwn] = useState<Accent>(defaultValue);
  // the stored choice is read after hydration, so the server and the first render agree
  const [ready, setReady] = useState(false);
  const current = value ?? own;

  // biome-ignore lint/correctness/useExhaustiveDependencies: read the stored choice once, on mount
  useEffect(() => {
    if (value === undefined && storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (isAccent(saved)) setOwn(saved);
      } catch {}
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    (target?.() ?? document.documentElement).setAttribute(
      "data-zero-accent",
      current,
    );
  }, [ready, current, target]);

  return (
    <RadioGroupPrimitive
      data-slot="accent-switch"
      aria-label={label}
      value={current}
      onValueChange={(next) => {
        if (!isAccent(next)) return;
        if (value === undefined) setOwn(next);
        // only a choice someone made is remembered, not the default a visit starts with
        if (storageKey)
          try {
            localStorage.setItem(storageKey, next);
          } catch {}
        onValueChange?.(next);
      }}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      {ACCENTS.map((accent) => (
        <RadioPrimitive.Root
          key={accent.value}
          value={accent.value}
          aria-label={accent.label}
          data-slot="accent-switch-swatch"
          className={cn(
            "slab slab-cut-both w-[2.25em] shrink-0 outline-none",
            "[--slab-h:1.25em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px] [--slab-line:var(--color-zero-ink)]",
            swatches[accent.value],
            "transition-[scale] duration-(--zero-dur-base) ease-(--zero-ease-spring) active:scale-(--zero-press-scale)",
            // chosen: a white frame with an ink gap; focus: the yellow one
            "data-checked:[--slab-gap-fill:var(--color-zero-ink)] data-checked:[--slab-gap:var(--zero-stroke-thin)] data-checked:[--slab-line:var(--color-zero-text)]",
            "focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)]",
          )}
        />
      ))}
    </RadioGroupPrimitive>
  );
}

/**
 * Applies a remembered accent before the page paints. Put it in <head>; the <html> element needs
 * suppressHydrationWarning, since the attribute it writes is not in the server's markup.
 */
function AccentScript({ storageKey = "zero-accent" }: { storageKey?: string }) {
  const values = JSON.stringify(ACCENTS.map((accent) => accent.value));
  const code = `try{var a=localStorage.getItem(${JSON.stringify(storageKey)});if(${values}.indexOf(a)>-1)document.documentElement.setAttribute("data-zero-accent",a)}catch(e){}`;
  // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed script built from the presets, no outside input
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export { type Accent, ACCENTS, AccentScript, AccentSwitch };
