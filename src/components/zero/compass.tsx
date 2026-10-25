import type { ComponentProps } from "react";
import { ChevronLeftIcon } from "@/components/zero/icons/chevron-left";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { cn } from "@/lib/zero/cn";

/*
 * Which way you face, as a strip across the top of the screen: a slab cut on both sides holding
 * a tick every 15°, the eight points lettered (north in the accent), a notch at the middle for
 * where you face, and the bearing under it. Markers (where an objective is, where a friend is)
 * ride the strip at their bearing; one outside the view waits at the nearer edge with an arrow.
 * Feed it `heading` every frame from your game; it draws, it does not animate. Screen readers get
 * the heading and each marker's direction in words.
 *
 *   <Compass heading={heading} markers={[{ bearing: 40, label: "Drop zone" }]} />
 */

const tones = {
  accent: "text-zero-accent",
  danger: "text-zero-danger",
  rare: "text-zero-rarity-rare",
  legendary: "text-zero-rarity-legendary",
} as const;

type CompassMarker = {
  bearing: number;
  label: string;
  tone?: keyof typeof tones;
};

const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const words = [
  "north",
  "north-east",
  "east",
  "south-east",
  "south",
  "south-west",
  "west",
  "north-west",
];

/** 0–360, whatever comes in. */
const wrap = (deg: number) => ((deg % 360) + 360) % 360;
/** The shortest turn from `from` to `to`, −180–180. */
const turn = (from: number, to: number) => ((to - from + 540) % 360) - 180;
const point = (deg: number) => Math.round(wrap(deg) / 45) % 8;

function Compass({
  className,
  heading,
  markers = [],
  fov = 180,
  ...props
}: ComponentProps<"div"> & {
  /** Where you face, in degrees; 0 is north, 90 east. */
  heading: number;
  markers?: CompassMarker[];
  /** How many degrees the strip spans. */
  fov?: number;
}) {
  const h = wrap(heading);
  const x = (offset: number) => `${(offset / fov + 0.5) * 100}%`;
  // ticks keep their key (their bearing, unwrapped) so they slide rather than jump
  const first = Math.ceil((heading - fov / 2) / 15) * 15;
  const ticks = [];
  for (let b = first; b <= heading + fov / 2; b += 15) ticks.push(b);

  return (
    <div
      role="img"
      aria-label={`Facing ${words[point(h)]}, ${Math.round(h)} degrees. ${markers
        .map((m) => {
          const t = Math.round(turn(h, m.bearing));
          return `${m.label}: ${t === 0 ? "ahead" : `${Math.abs(t)} degrees ${t > 0 ? "right" : "left"}`}`;
        })
        .join(". ")}`}
      data-slot="compass"
      className={cn(
        "grid w-full max-w-xl justify-items-center gap-1",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "slab slab-cut-both relative w-full overflow-hidden",
          "[--slab-fill:rgb(0_0_0/0.72)] [--slab-h:2.5rem] [--slab-line:var(--color-zero-line)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0px]",
        )}
      >
        {ticks.map((b) => {
          const major = wrap(b) % 45 === 0;
          return (
            <span
              key={b}
              className="absolute top-0 bottom-0 flex -translate-x-1/2 flex-col items-center justify-end pb-1"
              style={{ left: x(b - heading) }}
            >
              {major ? (
                <span
                  className={cn(
                    "font-black font-zero text-zero-xs italic leading-none",
                    wrap(b) === 0 ? "text-zero-accent" : "text-zero-text",
                  )}
                >
                  {points[wrap(b) / 45]}
                </span>
              ) : null}
              <span
                className={cn(
                  "mt-0.5 w-0.5 -skew-x-(--zero-slant)",
                  major ? "h-2 bg-zero-text-2" : "h-1.5 bg-zero-text-3",
                )}
              />
            </span>
          );
        })}
        {markers.map((m) => {
          const t = turn(h, m.bearing);
          const off = Math.abs(t) > fov / 2 - 6;
          return (
            <span
              key={m.label}
              className={cn(
                "absolute top-1 -translate-x-1/2",
                tones[m.tone ?? "accent"],
              )}
              style={{
                left: x(Math.max(-fov / 2 + 6, Math.min(fov / 2 - 6, t))),
              }}
            >
              {off ? (
                t < 0 ? (
                  <ChevronLeftIcon className="-mt-0.5 size-3.5" />
                ) : (
                  <ChevronRightIcon className="-mt-0.5 size-3.5" />
                )
              ) : (
                <span className="block size-2.5 -skew-x-(--zero-slant) bg-current" />
              )}
            </span>
          );
        })}
        <span className="absolute top-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[7px] border-t-zero-accent" />
      </div>
      <span className="font-black font-zero text-zero-sm italic tabular-nums">
        {String(Math.round(h) % 360).padStart(3, "0")}
      </span>
    </div>
  );
}

export { Compass, type CompassMarker };
