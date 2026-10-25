"use client";

import type { ComponentProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/zero/collapsible";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { cn } from "@/lib/zero/cn";

/*
 * The steps an agent took, one line each: an icon, what it did, and a quiet figure at the end (how
 * long, how many). A step still running is in the accent; one that failed, in red; one not yet
 * started, dimmed. A step can open (TraceCollapsible) to show what it read or wrote, behind a quiet
 * line, unfolding like Collapsible.
 */

function Trace({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="trace"
      className={cn("flex w-full min-w-0 flex-col gap-2.5", className)}
      {...props}
    />
  );
}

function TraceLine({
  className,
  status,
  ...props
}: ComponentProps<"span"> & { status?: "running" | "error" | "pending" }) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      className={cn(
        "flex w-fit max-w-full min-w-0 items-center gap-2 font-medium font-zero-text text-zero-sm text-zero-text-2",
        "transition-colors duration-(--zero-dur-fast)",
        "data-[status=running]:text-zero-accent data-[status=error]:text-zero-danger data-[status=pending]:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

function TraceIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TraceTitle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-title"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  );
}

function TraceDescription({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="trace-description"
      className={cn(
        "shrink-0 font-semibold text-zero-text-3 text-zero-xs tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

function TraceCollapsible({
  className,
  ...props
}: ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  );
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsibleTrigger>) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn(
        "group/trace-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 text-left outline-none",
        "[&:hover_[data-slot=trace-line]:not([data-status])]:text-zero-text",
        "focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      {children}
      <TraceIcon className="text-zero-text-3 transition-transform duration-(--zero-dur-base) ease-(--zero-ease-out) group-data-panel-open/trace-trigger:rotate-90">
        <ChevronRightIcon />
      </TraceIcon>
    </CollapsibleTrigger>
  );
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent data-slot="trace-collapsible-content" {...props}>
      <div
        className={cn(
          "mt-2 mb-1 ms-[0.4375rem] min-w-0 border-zero-line border-s-(length:--zero-stroke-thin) ps-4 font-medium font-zero-text text-zero-sm text-zero-text-2 leading-relaxed wrap-break-word",
          className,
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
};
