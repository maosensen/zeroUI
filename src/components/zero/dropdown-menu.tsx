"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import type { ComponentProps } from "react";
import { CheckIcon } from "@/components/zero/icons/check";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { cn } from "@/lib/zero/cn";

/*
 * A list of actions in a panel that drops from its trigger. The rows are Select's: slabs cut at
 * the end, filled with the accent while highlighted. A row can carry an icon and a shortcut; a
 * checkbox row shows a check, a radio row the small slanted mark of a chosen Select row. A
 * submenu opens beside its row, which stays raised while it is open.
 */

const DropdownMenu = MenuPrimitive.Root;
const DropdownMenuTrigger = MenuPrimitive.Trigger;
const DropdownMenuGroup = MenuPrimitive.Group;
const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

/** The panel every menu shares: dropdown, context menu, menubar. */
const popup =
  "panel pop max-h-(--available-height) min-w-48 overflow-y-auto overscroll-contain p-(--zero-inset) outline-none";

type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "side" | "align">;

function DropdownMenuContent({
  className,
  side = "bottom",
  align = "start",
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        className="z-zero-popover outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            popup,
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2 data-[side=left]:me-2 data-[side=right]:ms-2",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/** The row every item shares: Select's row (select.tsx), with room for a mark before the label. */
const row = cn(
  "slab slab-cut-end flex w-full cursor-default items-center gap-2.5 outline-none select-none",
  "font-bold font-zero text-zero-md italic",
  "[--slab-h:var(--height-zero-md)] [--slab-o:0px] [--slab-px:0.75rem] [--slab-fill:transparent] [--slab-line:transparent]",
  "data-highlighted:[--slab-fill:var(--color-zero-accent)] data-highlighted:[--slab-ink:var(--color-zero-ink)]",
  "data-disabled:pointer-events-none data-disabled:[--slab-ink:var(--color-zero-text-3)]",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
);

const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        row,
        "data-popup-open:[--slab-fill:var(--color-zero-raised)] data-popup-open:data-highlighted:[--slab-fill:var(--color-zero-accent)]",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto size-[1.1em]" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

/** A submenu's panel: the menu's own, opening beside its row. */
function DropdownMenuSubContent({
  side = "right",
  align = "start",
  ...props
}: DropdownMenuContentProps) {
  return <DropdownMenuContent side={side} align={align} {...props} />;
}

function DropdownMenuItem({
  className,
  danger,
  ...props
}: MenuPrimitive.Item.Props & { danger?: boolean }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        row,
        danger &&
          "[--slab-ink:var(--color-zero-danger)] data-highlighted:[--slab-fill:var(--color-zero-danger)]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(row, className)}
      {...props}
    >
      <span className="flex w-[1.1em] shrink-0 justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-[1.1em] text-zero-accent in-data-highlighted:text-zero-ink" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(row, className)}
      {...props}
    >
      <span className="flex w-[1.1em] shrink-0 justify-center">
        <MenuPrimitive.RadioItemIndicator className="h-[1em] w-[0.45em] -skew-x-(--zero-slant) bg-zero-accent in-data-highlighted:bg-zero-ink" />
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      className={cn(
        "px-3 pt-2 pb-1 font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("my-1.5 h-(--zero-stroke-thin) bg-zero-line", className)}
      {...props}
    />
  );
}

/** A key hint at the end of a row. */
function DropdownMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ms-auto ps-4 font-semibold font-zero-text text-zero-text-3 text-zero-xs not-italic tracking-[0.08em] in-data-highlighted:text-zero-ink/70",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  popup as menuPopup,
  row as menuRow,
};
