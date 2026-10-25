import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Keeps its content to a ratio of width to height (16 / 9 by default): for pictures, video and
 * maps that must not jump while they load. The content fills it.
 */
function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style } as CSSProperties}
      className={cn(
        "relative w-full overflow-hidden [&>*]:size-full [&>img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}

export { AspectRatio };
