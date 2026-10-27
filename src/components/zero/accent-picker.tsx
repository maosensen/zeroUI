"use client";

import { type CSSProperties, useId, useState } from "react";
import {
  type Accent,
  type AccentLabels,
  type AccentLabelsInput,
  type AccentOptions,
  type AccentPreset,
  AccentSwatches,
  accentColor,
  accentContrast,
  accentLabel,
  MIN_CONTRAST,
  useAccent,
  withAccentLabels,
} from "@/components/zero/accent-switch";
import { Button } from "@/components/zero/button";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { Input } from "@/components/zero/input";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/zero/popover";
import { cn } from "@/lib/zero/cn";

/*
 * The accent, chosen from a small button: a slanted swatch of the colour in use that opens a
 * popover with the presets as a grid of swatches and, unless `custom` is false, a colour of your
 * own: a colour well and a hex field. Your own is applied as you pick it, provided ink text reads
 * on it (MIN_CONTRAST, the presets' floor); a darker one is refused, and the note under the field
 * says why and by how much. It keeps and writes the accent as AccentSwitch does (same options:
 * target, storageKey, value), so it pairs with AccentScript in <head>.
 *
 *   <AccentPicker />                                   the whole page, remembered
 *   <AccentPicker accents={["lime", "sky"]} custom={false} />
 *   <AccentPicker labels={{ title: "强调色", own: "自定义" }} />   any part of accentLabels
 */

/** "#abc123", "abc123" or "#ABC123" → "#abc123"; anything else → null. */
const toHex = (text: string) => {
  const hex = text.trim().replace(/^#?/, "#").toLowerCase();
  return /^#[0-9a-f]{6}$/.test(hex) ? (hex as `#${string}`) : null;
};

function OwnColour({
  accent,
  onChoose,
  labels,
}: {
  accent: Accent;
  onChoose: (accent: Accent) => void;
  labels: AccentLabels;
}) {
  const id = useId();
  const [text, setText] = useState(accent.startsWith("#") ? accent : "");
  const hex = toHex(text);
  const ratio = hex ? accentContrast(hex) : null;
  const legible = ratio !== null && ratio >= MIN_CONTRAST;

  const take = (value: string) => {
    setText(value);
    const next = toHex(value);
    if (next && accentContrast(next) >= MIN_CONTRAST) onChoose(next);
  };

  return (
    <div className="grid gap-2 border-zero-line border-t-(length:--zero-stroke-thin) pt-3">
      <label
        htmlFor={`${id}-hex`}
        className="font-black font-zero text-zero-xs uppercase italic tracking-[0.14em]"
      >
        {labels.own}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={labels.pick}
          value={hex ?? (accent.startsWith("#") ? accent : "#cde31c")}
          onChange={(event) => take(event.target.value)}
          className={cn(
            "h-(--height-zero-sm) w-12 shrink-0 cursor-pointer appearance-none border-(length:--zero-stroke-thin) border-zero-line bg-zero-void p-0.5 outline-none",
            "[&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0",
            "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
          )}
        />
        <Input
          id={`${id}-hex`}
          size="sm"
          value={text}
          onChange={(event) => take(event.target.value)}
          placeholder="#ff8a5c"
          spellCheck={false}
          autoComplete="off"
          aria-invalid={(hex !== null && !legible) || undefined}
          aria-describedby={`${id}-note`}
        />
      </div>
      <p
        id={`${id}-note`}
        aria-live="polite"
        className={cn(
          "font-zero-text text-zero-xs",
          hex !== null && !legible ? "text-zero-danger" : "text-zero-text-2",
        )}
      >
        {hex === null
          ? text.trim()
            ? labels.invalid
            : labels.hint(MIN_CONTRAST)
          : legible
            ? labels.reads(ratio.toFixed(1))
            : labels.tooDark((ratio ?? 0).toFixed(1), MIN_CONTRAST)}
      </p>
    </div>
  );
}

function AccentPicker({
  className,
  accents,
  custom = true,
  side = "bottom",
  align = "end",
  labels: given,
  "aria-label": label = "Accent colour",
  ...options
}: AccentOptions & {
  className?: string;
  /** Which presets to offer; all twelve when omitted. */
  accents?: readonly AccentPreset[];
  /** Offer a colour of your own. */
  custom?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  /** What it says, in another language: any part of accentLabels. */
  labels?: AccentLabelsInput;
  "aria-label"?: string;
}) {
  const [accent, choose] = useAccent(options);
  const labels = withAccentLabels(given);
  // on the whole page, the swatch reads the accent from CSS, so it is right from the first paint
  // (AccentScript sets it before React has read the stored choice)
  const fill = options.target
    ? accentColor(accent)
    : "var(--color-zero-accent)";
  return (
    <Popover>
      <PopoverTrigger
        data-slot="accent-picker"
        aria-label={labels.trigger(label, accentLabel(accent, labels.names))}
        render={<Button variant="secondary" size="sm" cut="both" />}
        className={cn("[--slab-px:0.625rem]", className)}
      >
        <span
          aria-hidden
          style={{ "--accent-picker-fill": fill } as CSSProperties}
          className="h-[0.875em] w-[1.75em] -skew-x-(--zero-slant) bg-(--accent-picker-fill) shadow-[0_0_0_var(--zero-stroke-thin)_var(--color-zero-ink)]"
        />
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverContent side={side} align={align} className="w-64 gap-3">
        <PopoverTitle>{labels.title}</PopoverTitle>
        <AccentSwatches
          value={accent}
          onValueChange={choose}
          accents={accents}
          names={labels.names}
          aria-label={label}
          className="grid grid-cols-4 justify-items-start gap-2.5 text-zero-lg"
        />
        {custom ? (
          <OwnColour accent={accent} onChoose={choose} labels={labels} />
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export { AccentPicker };
