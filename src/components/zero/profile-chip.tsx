import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Who is playing, at the corner of the screen: a slab cut on both sides holding the avatar, the
 * name over a thin experience bar (in the rare blue, with the points written on it), and the
 * level, big and leaning, with LEVEL under it. Its height is fixed, so it is a slab. Screen
 * readers get one sentence: "Lumen, level 8, 685 of 790 experience".
 *
 *   <ProfileChip name="Lumen" level={8} xp={685} xpMax={790} avatar={<Avatar>…</Avatar>} />
 */

function ProfileChip({
  className,
  name,
  level,
  xp,
  xpMax,
  avatar,
  label = (name, level, xp, xpMax) =>
    `${name}, level ${level}, ${xp} of ${xpMax} experience`,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  name: string;
  level: number;
  xp: number;
  xpMax: number;
  avatar?: ReactNode;
  /** The sentence screen readers hear in place of the chip's parts. */
  label?: (name: string, level: number, xp: number, xpMax: number) => string;
}) {
  const share = Math.min(1, Math.max(0, xp / (xpMax || 1)));
  return (
    <div
      data-slot="profile-chip"
      className={cn(
        "slab slab-cut-both inline-flex max-w-full items-center gap-3",
        "[--slab-fill:var(--color-zero-surface)] [--slab-h:3.25rem] [--slab-line:var(--color-zero-line)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0.5rem]",
        className,
      )}
      {...props}
    >
      <span className="sr-only">{label(name, level, xp, xpMax)}</span>
      {avatar ? (
        <span aria-hidden className="shrink-0">
          {avatar}
        </span>
      ) : null}
      <span aria-hidden className="grid min-w-0 flex-1 gap-1">
        <span className="truncate font-black font-zero text-zero-md italic leading-none">
          {name}
        </span>
        <span className="relative h-4 w-24 max-w-full -skew-x-(--zero-slant) sm:w-36 overflow-hidden bg-zero-void">
          <span
            className="absolute inset-y-0 left-0 bg-zero-rarity-rare transition-[width] duration-(--zero-dur-slow) ease-(--zero-ease-out)"
            style={{ width: `${share * 100}%` }}
          />
          <span className="absolute inset-0 flex skew-x-(--zero-slant) items-center px-1.5 font-bold font-zero-text text-zero-xs text-zero-text tabular-nums [text-shadow:0_1px_0_var(--color-zero-ink)]">
            {xp}/{xpMax}
          </span>
        </span>
      </span>
      <span aria-hidden className="grid shrink-0 justify-items-center pe-1">
        <span className="font-black font-zero text-zero-xl italic tabular-nums leading-none">
          {String(level).padStart(2, "0")}
        </span>
        <span className="font-bold font-zero text-zero-xs text-zero-text-3 uppercase italic tracking-[0.14em]">
          Level
        </span>
      </span>
    </div>
  );
}

export { ProfileChip };
