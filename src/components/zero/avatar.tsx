"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A face, or initials when there is no picture. Round, the one shape zzzUI allows a radius
 * (round by nature, tokens.css), lifted like a panel: an ink ring and a quiet line outside it.
 * Initials are set in the display face's leaning capitals. Three sizes, the control heights, so
 * an avatar lines up with a button beside it. AvatarBadge is a status dot on its edge;
 * AvatarGroup overlaps several, their ink rings keeping them apart.
 */

type AvatarSize = "sm" | "md" | "lg";

function Avatar({
  className,
  size = "md",
  ...props
}: AvatarPrimitive.Root.Props & { size?: AvatarSize }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 select-none rounded-zero-round border-(length:--zero-stroke) border-zero-ink bg-zero-raised outline-(length:--zero-stroke-thin) outline-zero-line",
        "size-(--height-zero-md) data-[size=lg]:size-(--height-zero-lg) data-[size=sm]:size-(--height-zero-sm)",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-zero-round object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-zero-round font-black font-zero text-zero-sm text-zero-text-2 uppercase italic",
        "group-data-[size=lg]/avatar:text-zero-md group-data-[size=sm]/avatar:text-zero-xs",
        className,
      )}
      {...props}
    />
  );
}

/** A status dot on the avatar's edge: the accent by default; colour it with a bg-* class. */
function AvatarBadge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute -right-0.5 -bottom-0.5 z-zero-raised size-[30%] rounded-zero-round border-(length:--zero-stroke-thin) border-zero-ink bg-zero-accent",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex *:not-first:-ms-[0.6rem] *:data-[slot=avatar]:outline-none",
        className,
      )}
      {...props}
    />
  );
}

/** The last place in a group: how many more there are. */
function AvatarGroupCount({
  className,
  size = "md",
  ...props
}: ComponentProps<"div"> & { size?: AvatarSize }) {
  return (
    <div
      data-slot="avatar-group-count"
      data-size={size}
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-zero-round border-(length:--zero-stroke) border-zero-ink bg-zero-lifted font-black font-zero text-zero-text text-zero-xs italic",
        "size-(--height-zero-md) data-[size=lg]:size-(--height-zero-lg) data-[size=sm]:size-(--height-zero-sm)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  type AvatarSize,
};
