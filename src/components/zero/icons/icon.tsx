import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * The shape every zeroUI icon shares: a 24-unit grid, filled in currentColor, 1.25em square so it
 * follows the text beside it. The rules the paths follow are in docs/icons.md.
 */

type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  /** Makes the icon meaningful on its own: role="img", named by this title. */
  title?: string;
  /** An ink outline around the whole shape, for an icon on the accent or an image. */
  outline?: boolean;
};

type IconShape = {
  /** The shape. */
  d: string;
  fillRule?: "nonzero" | "evenodd";
  /** A region cut out of `d` (a gap a fill rule cannot make, like the one around a slash). */
  cut?: string;
  /** Drawn over the cut shape, untouched by the cut. */
  over?: string;
};

function createIcon(name: string, shape: IconShape) {
  const { d, fillRule = "nonzero", cut, over } = shape;
  // Every instance of an icon draws the same mask, so a shared id is safe.
  const maskId = `zero-icon-cut-${name}`;

  function Icon({ title, outline, className, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden={title ? undefined : true}
        role={title ? "img" : undefined}
        aria-label={title}
        data-slot="icon"
        data-icon={name}
        className={cn(
          "size-[1.25em] shrink-0",
          // drawn under the fill at twice the width, so the full --zero-stroke shows outside it
          outline &&
            "overflow-visible stroke-zero-ink [paint-order:stroke] [stroke-linejoin:miter] [stroke-width:calc(var(--zero-stroke)*2)] [&>path]:[vector-effect:non-scaling-stroke]",
          className,
        )}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {cut ? (
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x={-2}
            y={-2}
            width={28}
            height={28}
          >
            <rect x={-2} y={-2} width={28} height={28} fill="white" />
            <path d={cut} fill="black" />
          </mask>
        ) : null}
        <path
          d={d}
          fillRule={fillRule}
          mask={cut ? `url(#${maskId})` : undefined}
        />
        {over ? <path d={over} /> : null}
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

export { createIcon, type IconProps, type IconShape };
