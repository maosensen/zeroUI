import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * One turn in a conversation: who said it (an avatar, a name in leaning type, the time), what was
 * said (Bubbles, attachments, anything), and a line under it. `align="end"` puts it on the other
 * side, for your own turns. MessageGroup stacks turns.
 */

function MessageGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-4", className)}
      {...props}
    />
  );
}

function Message({
  className,
  align = "start",
  ...props
}: ComponentProps<"div"> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(
        "group/message relative flex w-full min-w-0 gap-3 data-[align=end]:flex-row-reverse",
        className,
      )}
      {...props}
    />
  );
}

/** Holds an Avatar beside the turn, level with its last line. */
function MessageAvatar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex shrink-0 self-end group-has-data-[slot=message-footer]/message:-translate-y-6",
        className,
      )}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-2 wrap-break-word group-data-[align=end]/message:items-end",
        className,
      )}
      {...props}
    />
  );
}

/** The speaker and the time, above the turn. Put the name in a <strong>. */
function MessageHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex min-w-0 items-baseline gap-2 font-medium font-zero-text text-zero-text-3 text-zero-xs",
        "[&>strong]:font-bold [&>strong]:font-zero [&>strong]:text-zero-text-2 [&>strong]:italic",
        className,
      )}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex min-w-0 items-center gap-2 font-medium font-zero-text text-zero-text-3 text-zero-xs",
        className,
      )}
      {...props}
    />
  );
}

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
};
