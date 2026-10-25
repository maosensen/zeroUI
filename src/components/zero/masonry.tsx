import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Cards of different heights packed into columns, a feed's wall: as many columns of at least
 * `columnWidth` as fit, each item kept whole. It is CSS columns, so the server sends the final
 * layout and nothing moves once scripts run. Items read down the first column, then the next, in
 * the order they are written, which is also the order Tab and screen readers follow.
 *
 *   <Masonry columnWidth="17rem">{posts.map((p) => <PostCard key={p.id}>…</PostCard>)}</Masonry>
 */

function Masonry({
  className,
  columnWidth = "17rem",
  style,
  ...props
}: ComponentProps<"div"> & {
  /** The narrowest a column may be. */
  columnWidth?: string;
}) {
  return (
    <div
      data-slot="masonry"
      style={{ "--masonry-w": columnWidth, ...style } as CSSProperties}
      className={cn(
        "columns-(--masonry-w) gap-6 *:mb-6 *:break-inside-avoid",
        className,
      )}
      {...props}
    />
  );
}

export { Masonry };
