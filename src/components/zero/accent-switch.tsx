"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Chooses the accent: a row of small slabs, one per preset in the foundation (tokens.css), each
 * filled with its colour. The chosen one is framed in white with an ink gap; focus frames in the
 * yellow. It is a radio group, so the arrow keys move between them. `accents` picks which presets
 * the row offers (all twelve by default). The choice is written as data-zero-accent on <html> (or
 * on `target`, for one part of a page) and remembered in localStorage under `storageKey` (null to
 * forget). Put AccentScript in <head> so a remembered accent is on the page before it paints, not
 * after it hydrates. For many colours in little room, and a colour of your own, use AccentPicker.
 *
 *   <AccentSwitch />                                     the whole page, remembered
 *   <AccentSwitch accents={["lime", "cyan", "mono"]} />  three of the twelve
 *   <AccentSwitch target={() => box.current} storageKey={null} />
 *
 * An accent is a preset's name or a colour of your own, "#rrggbb". Your own must keep ink text on
 * it legible (MIN_CONTRAST, the presets' own floor); `accentContrast` measures it.
 */

const ACCENTS = [
  { value: "lime", label: "Lime" },
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
  { value: "amber", label: "Amber" },
  { value: "mint", label: "Mint" },
  { value: "sky", label: "Sky" },
  { value: "violet", label: "Violet" },
  { value: "mono", label: "Mono" },
  { value: "yellow", label: "Yellow" },
  { value: "leaf", label: "Leaf" },
  { value: "iris", label: "Iris" },
  { value: "orchid", label: "Orchid" },
] as const;

type AccentPreset = (typeof ACCENTS)[number]["value"];
type Accent = AccentPreset | `#${string}`;

/** Ink text on an accent must reach this ratio: magenta, the darkest preset, is 7 : 1. */
const MIN_CONTRAST = 7;
const INK = "#0a0a0a";

const isPreset = (value: unknown): value is AccentPreset =>
  ACCENTS.some((accent) => accent.value === value);

const isHex = (value: unknown): value is `#${string}` =>
  typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** How well ink text reads on a colour, as a WCAG contrast ratio (1 to 21). */
function accentContrast(hex: string) {
  const [hi, lo] = [luminance(hex), luminance(INK)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/** A preset, or a colour of your own that ink reads on. */
const isAccent = (value: unknown): value is Accent =>
  isPreset(value) || (isHex(value) && accentContrast(value) >= MIN_CONTRAST);

/** The colour an accent paints, as CSS: its preset's token in the foundation, or itself. */
const accentColor = (accent: Accent) =>
  isPreset(accent) ? `var(--zero-accent-${accent})` : accent;

const accentLabel = (accent: Accent) =>
  ACCENTS.find((preset) => preset.value === accent)?.label ??
  accent.toUpperCase();

/** Writes an accent onto an element: a preset by name, your own as "custom" plus the colour. */
function applyAccent(element: HTMLElement, accent: Accent) {
  if (isPreset(accent)) {
    element.setAttribute("data-zero-accent", accent);
    element.style.removeProperty("--zero-accent");
    element.style.removeProperty("--color-zero-accent");
  } else {
    element.setAttribute("data-zero-accent", "custom");
    element.style.setProperty("--zero-accent", accent);
    element.style.setProperty("--color-zero-accent", accent);
  }
}

type AccentOptions = {
  value?: Accent;
  defaultValue?: Accent;
  onValueChange?: (value: Accent) => void;
  /** Where to write data-zero-accent; <html> when omitted. */
  target?: () => HTMLElement | null;
  /** Where the choice is remembered; null to keep it only for this page view. */
  storageKey?: string | null;
};

/**
 * The accent, kept: read from storage after hydration (so the server and the first render
 * agree), written to the target whenever it changes, and remembered when someone chooses one
 * (not the default a visit starts with).
 */
function useAccent({
  value,
  defaultValue = "lime",
  onValueChange,
  target,
  storageKey = "zero-accent",
}: AccentOptions) {
  const [own, setOwn] = useState<Accent>(defaultValue);
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
    applyAccent(target?.() ?? document.documentElement, current);
  }, [ready, current, target]);

  const choose = (next: Accent) => {
    if (!isAccent(next)) return;
    if (value === undefined) setOwn(next);
    if (storageKey)
      try {
        localStorage.setItem(storageKey, next);
      } catch {}
    onValueChange?.(next);
  };

  return [current, choose] as const;
}

/** The presets as a radio group of swatches, with no state of its own: AccentSwitch and
 * AccentPicker both draw it. A colour of your own checks none of them. */
function AccentSwatches({
  className,
  value,
  onValueChange,
  accents,
  "aria-label": label = "Accent colour",
}: {
  className?: string;
  value: Accent;
  onValueChange: (value: Accent) => void;
  accents?: readonly AccentPreset[];
  "aria-label"?: string;
}) {
  const shown = accents
    ? ACCENTS.filter((accent) => accents.includes(accent.value))
    : ACCENTS;
  return (
    <RadioGroupPrimitive
      data-slot="accent-switch"
      aria-label={label}
      value={isPreset(value) ? value : null}
      onValueChange={(next) => {
        if (isPreset(next)) onValueChange(next);
      }}
      className={cn("inline-flex flex-wrap items-center gap-1.5", className)}
    >
      {shown.map((accent) => (
        <RadioPrimitive.Root
          key={accent.value}
          value={accent.value}
          aria-label={accent.label}
          data-slot="accent-switch-swatch"
          style={{ "--slab-fill": accentColor(accent.value) } as CSSProperties}
          className={cn(
            "slab slab-cut-both w-[2.25em] shrink-0 outline-none",
            "[--slab-h:1.25em] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px] [--slab-line:var(--color-zero-ink)]",
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

function AccentSwitch({
  className,
  accents,
  "aria-label": label,
  ...options
}: AccentOptions & {
  className?: string;
  /** Which presets to offer, in the foundation's order; all twelve when omitted. */
  accents?: readonly AccentPreset[];
  "aria-label"?: string;
}) {
  const [accent, choose] = useAccent(options);
  return (
    <AccentSwatches
      className={className}
      value={accent}
      onValueChange={choose}
      accents={accents}
      aria-label={label}
    />
  );
}

/**
 * Applies a remembered accent before the page paints. Put it in <head>; the <html> element needs
 * suppressHydrationWarning, since the attribute (and, for a colour of your own, the style) it
 * writes is not in the server's markup.
 */
function AccentScript({ storageKey = "zero-accent" }: { storageKey?: string }) {
  const presets = JSON.stringify(ACCENTS.map((accent) => accent.value));
  const code = `try{var a=localStorage.getItem(${JSON.stringify(storageKey)}),e=document.documentElement;if(${presets}.indexOf(a)>-1)e.setAttribute("data-zero-accent",a);else if(/^#[0-9a-f]{6}$/i.test(a)){e.setAttribute("data-zero-accent","custom");e.style.setProperty("--zero-accent",a);e.style.setProperty("--color-zero-accent",a)}}catch(e){}`;
  // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed script built from the presets, no outside input
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export {
  type Accent,
  ACCENTS,
  type AccentOptions,
  type AccentPreset,
  AccentScript,
  AccentSwatches,
  AccentSwitch,
  accentColor,
  accentContrast,
  accentLabel,
  applyAccent,
  isAccent,
  MIN_CONTRAST,
  useAccent,
};
