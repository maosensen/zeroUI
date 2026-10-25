import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Button } from "@/components/zero/button";
import { cn } from "@/lib/zero/cn";

/*
 * A file sent or about to be sent: a mark (an icon in a slanted black well, or the picture itself),
 * its name in leaning type with a line under it, and small actions. `state` tells where it is:
 * idle (a dashed outline, not sent yet), uploading and processing (the picture dimmed, the name
 * quiet), error (outlined in red), done. AttachmentTrigger makes the whole card open the file;
 * AttachmentGroup lines several up in a row that scrolls sideways.
 */

const attachmentVariants = cva(
  [
    "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 items-center",
    "border-(length:--zero-stroke-thin) border-zero-line bg-zero-surface text-zero-text",
    "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out)",
    "has-[>[data-slot=attachment-trigger]]:hover:bg-zero-raised has-[>[data-slot=attachment-trigger]:focus-visible]:border-zero-focus",
    "data-[state=idle]:border-dashed data-[state=error]:border-zero-danger",
  ],
  {
    variants: {
      size: {
        default: "min-w-48 gap-3 p-2 pe-3",
        sm: "min-w-40 gap-2.5 p-1.5 pe-2.5",
      },
      orientation: {
        horizontal: "",
        vertical: "w-28 min-w-0 flex-col items-stretch pe-2",
      },
    },
    defaultVariants: { size: "default", orientation: "horizontal" },
  },
);

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done";
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  );
}

const attachmentMediaVariants = cva(
  "relative flex shrink-0 items-center justify-center overflow-hidden [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        /** An icon in a slanted black well. */
        icon: [
          "slab slab-cut-both w-[calc(var(--slab-h)*(1+tan(var(--zero-slant))))] text-zero-text-2",
          "[--slab-h:2.5rem] [--slab-px:0px] [--slab-o:var(--zero-stroke-thin)] [--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
          "group-data-[size=sm]/attachment:[--slab-h:2rem] [&_svg:not([class*='size-'])]:size-5",
          "group-data-[state=error]/attachment:text-zero-danger group-data-[state=error]/attachment:[--slab-line:var(--color-zero-danger)]",
        ],
        /** The picture, in an ink frame; dimmed until it is done. */
        image: [
          "aspect-square w-10 border-(length:--zero-stroke-thin) border-zero-ink group-data-[size=sm]/attachment:w-8",
          "group-data-[orientation=vertical]/attachment:w-full",
          "opacity-50 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100",
          "[&_img]:size-full [&_img]:object-cover",
        ],
      },
    },
    defaultVariants: { variant: "icon" },
  },
);

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function AttachmentContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn("min-w-0 flex-1 leading-tight", className)}
      {...props}
    />
  );
}

function AttachmentTitle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block min-w-0 truncate pe-[0.2em] font-bold font-zero text-zero-sm italic",
        "group-data-[state=processing]/attachment:text-zero-text-2 group-data-[state=uploading]/attachment:text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

function AttachmentDescription({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-0.5 block min-w-0 truncate font-medium font-zero-text text-zero-text-3 text-zero-xs tabular-nums",
        "group-data-[state=error]/attachment:text-zero-danger",
        className,
      )}
      {...props}
    />
  );
}

function AttachmentActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-zero-raised flex shrink-0 items-center gap-0.5",
        "group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3",
        className,
      )}
      {...props}
    />
  );
}

/** A small icon button on the card: remove, retry, download. Needs an aria-label. */
function AttachmentAction({
  className,
  variant = "ghost",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant}
      size="sm"
      cut="both"
      className={cn(
        "w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))] [--slab-px:0px]",
        className,
      )}
      {...props}
    />
  );
}

/** Makes the whole card a button or a link (`render`), under its actions. */
function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        className: cn("absolute inset-0 outline-none", className),
      },
      props,
    ),
    render,
    state: { slot: "attachment-trigger" },
  });
}

function AttachmentGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className,
      )}
      {...props}
    />
  );
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
};
