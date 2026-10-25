"use client";

import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";
import type { ComponentProps } from "react";
import { Button } from "@/components/zero/button";
import { ArrowDownIcon } from "@/components/zero/icons/arrow-down";
import { cn } from "@/lib/zero/cn";

/*
 * The scrolling column of a conversation (@shadcn/react underneath): it keeps to the newest turn
 * while you are there, stays put while you read back, and offers a raised slab with an arrow to go
 * back down. The scrollbar is thin and quiet.
 */

function MessageScrollerProvider(
  props: ComponentProps<typeof MessageScrollerPrimitive.Provider>,
) {
  return <MessageScrollerPrimitive.Provider {...props} />;
}

function MessageScroller({
  className,
  ...props
}: ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function MessageScrollerViewport({
  className,
  ...props
}: ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content",
        "[scrollbar-color:var(--color-zero-text-3)_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin]",
        "data-pending-scroll:invisible",
        className,
      )}
      {...props}
    />
  );
}

function MessageScrollerContent({
  className,
  ...props
}: ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex h-max min-h-full flex-col gap-6", className)}
      {...props}
    />
  );
}

function MessageScrollerItem({
  className,
  scrollAnchor = false,
  ...props
}: ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      className={cn(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        className,
      )}
      {...props}
    />
  );
}

/** Back to the newest turn (or the first, with direction="start"); shown only when away from it. */
function MessageScrollerButton({
  direction = "end",
  className,
  children,
  render,
  ...props
}: ComponentProps<typeof MessageScrollerPrimitive.Button>) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      direction={direction}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))] [--slab-px:0px]",
        "transition-[translate,opacity] duration-(--zero-dur-base) ease-(--zero-ease-out)",
        "data-[active=false]:pointer-events-none data-[active=false]:opacity-0 data-[active=false]:ease-(--zero-ease-in)",
        "data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-2",
        "data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-2 data-[direction=start]:[&_svg]:rotate-180",
        className,
      )}
      render={render ?? <Button variant="secondary" size="sm" cut="both" />}
      {...props}
    >
      {children ?? (
        <>
          <ArrowDownIcon />
          <span className="sr-only">
            {direction === "end"
              ? "Scroll to the newest"
              : "Scroll to the start"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  );
}

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
};
