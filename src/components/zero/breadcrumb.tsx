import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { MoreIcon } from "@/components/zero/icons/more";
import { cn } from "@/lib/zero/cn";

/*
 * Where this page sits: the pages above it in leaning type, set apart by a short slanted bar, the
 * slab's edge on its own. The pages above are quiet and light up when pointed at; the page itself
 * is the brightest and heaviest. BreadcrumbEllipsis stands in for pages left out. `render` on
 * BreadcrumbLink takes a router's link (<BreadcrumbLink render={<Link href="…" />}>).
 */

function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={className}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1 break-words font-bold font-zero text-zero-sm text-zero-text-2 italic",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "outline-none transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:text-zero-text",
          "focus-visible:text-zero-text focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "breadcrumb-link" },
  });
}

function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-black text-zero-text", className)}
      {...props}
    />
  );
}

/** The slanted bar between two pages. Pass children to use something else. */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center", className)}
      {...props}
    >
      {children ?? (
        <span className="block h-[0.9em] w-[0.2em] -skew-x-(--zero-slant) bg-zero-text-3" />
      )}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center text-zero-text-3", className)}
      {...props}
    >
      <MoreIcon />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
