import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A key to press: a small raised slab cut on both sides, outlined in ink, with the key's name in
 * the text face. Sized in em, so it follows the text it sits in. KbdGroup sets a chord.
 */
function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "slab slab-cut-both inline-flex min-w-[2.2em] items-center justify-center align-middle",
        "[--slab-h:1.7em] [--slab-px:0.35em] [--slab-o:var(--zero-stroke-thin)] [--slab-fill:var(--color-zero-raised)] [--slab-ink:var(--color-zero-text-2)]",
        "font-semibold font-zero-text text-[0.8em] not-italic tracking-[0.04em]",
        "[&_svg]:size-[1em]",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
