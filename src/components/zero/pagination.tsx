import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/zero/button";
import { ChevronLeftIcon } from "@/components/zero/icons/chevron-left";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { MoreIcon } from "@/components/zero/icons/more";
import { cn } from "@/lib/zero/cn";

/*
 * A row of pages. Every page is a small Button slab cut on both sides, so the row nests like the
 * tabs; the current page is filled with the accent, the others are ghosts that light when pointed
 * at. Previous and next carry a chevron and their word; PaginationEllipsis stands in for the
 * pages between. The links are anchors; `render` takes a router's link.
 */

function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = useRender.ComponentProps<"a"> & {
  /** The page being shown: filled with the accent, aria-current="page". */
  isActive?: boolean;
};

function PaginationLink({
  className,
  isActive,
  render,
  ...props
}: PaginationLinkProps) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        "aria-current": isActive ? "page" : undefined,
        className: cn(
          buttonVariants({
            variant: isActive ? "primary" : "ghost",
            size: "sm",
            cut: "both",
          }),
          "min-w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))] tabular-nums [--slab-px:0.375rem]",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "pagination-link", active: Boolean(isActive) },
  });
}

function PaginationPrevious({
  className,
  children = "Previous",
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("[--slab-px:0.625rem]", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="max-sm:sr-only">{children}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  children = "Next",
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("[--slab-px:0.625rem]", className)}
      {...props}
    >
      <span className="max-sm:sr-only">{children}</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  label = "More pages",
  ...props
}: ComponentProps<"span"> & {
  /** What screen readers hear for the pages left out. */
  label?: string;
}) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-(--height-zero-sm) w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))] items-center justify-center text-zero-text-3",
        className,
      )}
      {...props}
    >
      <MoreIcon />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  type PaginationLinkProps,
  PaginationNext,
  PaginationPrevious,
};
