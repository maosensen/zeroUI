"use client";

import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/zero/cn";

/*
 * Panels whose shared edge can be dragged (react-resizable-panels underneath). The edge is the
 * quiet line, with a wider grip around it; it lights to the accent while pointed at or dragged and
 * takes the focus colour from the keyboard (arrow keys move it). `withHandle` puts a slanted grip
 * on it, the slab's edge on its own.
 */

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex size-full aria-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel(props: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & { withHandle?: boolean }) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "group/handle relative flex w-(--zero-stroke-thin) shrink-0 items-center justify-center bg-zero-line outline-none",
        "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out)",
        // the grip is wider than the line
        "after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2",
        "aria-[orientation=horizontal]:h-(--zero-stroke-thin) aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-3 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2",
        "hover:bg-zero-accent data-[separator=hover]:bg-zero-accent data-[separator=active]:bg-zero-accent focus-visible:bg-zero-focus",
        className,
      )}
      {...props}
    >
      {withHandle ? (
        <span
          aria-hidden
          className={cn(
            "z-zero-raised block h-7 w-2 -skew-x-(--zero-slant) border-(length:--zero-stroke-thin) border-zero-ink bg-zero-text-3",
            "group-hover/handle:bg-zero-accent group-data-[separator=active]/handle:bg-zero-accent group-focus-visible/handle:bg-zero-focus",
            "group-aria-[orientation=horizontal]/handle:h-2 group-aria-[orientation=horizontal]/handle:w-7",
          )}
        />
      ) : null}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
