"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import {
  DropdownMenuCheckboxItem,
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
  menuPopup,
} from "@/components/zero/dropdown-menu";
import { cn } from "@/lib/zero/cn";

/*
 * The Dropdown menu, opened where you right-click (or long-press) inside an area instead of from a
 * button. Its rows, labels, separators and submenus are the Dropdown menu's own parts, under
 * ContextMenu names.
 */

const ContextMenu = ContextMenuPrimitive.Root;

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner className="z-zero-popover outline-none">
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(menuPopup, className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export {
  ContextMenu,
  DropdownMenuCheckboxItem as ContextMenuCheckboxItem,
  ContextMenuContent,
  DropdownMenuGroup as ContextMenuGroup,
  DropdownMenuItem as ContextMenuItem,
  DropdownMenuLabel as ContextMenuLabel,
  DropdownMenuRadioGroup as ContextMenuRadioGroup,
  DropdownMenuRadioItem as ContextMenuRadioItem,
  DropdownMenuSeparator as ContextMenuSeparator,
  DropdownMenuShortcut as ContextMenuShortcut,
  DropdownMenuSub as ContextMenuSub,
  DropdownMenuSubContent as ContextMenuSubContent,
  DropdownMenuSubTrigger as ContextMenuSubTrigger,
  ContextMenuTrigger,
};
