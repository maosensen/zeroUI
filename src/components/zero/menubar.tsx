"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import {
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
} from "@/components/zero/dropdown-menu";
import { cn } from "@/lib/zero/cn";

/*
 * The row of menus across the top of an application: a black bar holding the menus' names, each
 * a quiet slab that lights while pointed at and fills with the accent while its menu is open.
 * Once one menu is open, moving along the bar opens the next. The menus are Dropdown menus.
 */

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex w-fit items-center gap-0.5 bg-zero-void p-(--zero-inset)",
        className,
      )}
      {...props}
    />
  );
}

const MenubarMenu = MenuPrimitive.Root;

function MenubarTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "slab slab-cut-end flex items-center outline-none select-none",
        "font-bold font-zero text-zero-sm italic",
        "[--slab-h:var(--height-zero-sm)] [--slab-o:0px] [--slab-px:0.75rem] [--slab-fill:transparent] [--slab-line:transparent] [--slab-ink:var(--color-zero-text-2)]",
        "hover:[--slab-fill:var(--color-zero-raised)] hover:[--slab-ink:var(--color-zero-text)]",
        "focus-visible:[--slab-o:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-ink:var(--color-zero-text)]",
        "data-popup-open:[--slab-fill:var(--color-zero-accent)] data-popup-open:[--slab-ink:var(--color-zero-ink)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-ink:var(--color-zero-text-3)]",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  side = "bottom",
  align = "start",
  ...props
}: DropdownMenuContentProps) {
  return <DropdownMenuContent side={side} align={align} {...props} />;
}

export {
  Menubar,
  DropdownMenuCheckboxItem as MenubarCheckboxItem,
  MenubarContent,
  DropdownMenuGroup as MenubarGroup,
  DropdownMenuItem as MenubarItem,
  DropdownMenuLabel as MenubarLabel,
  MenubarMenu,
  DropdownMenuRadioGroup as MenubarRadioGroup,
  DropdownMenuRadioItem as MenubarRadioItem,
  DropdownMenuSeparator as MenubarSeparator,
  DropdownMenuShortcut as MenubarShortcut,
  DropdownMenuSub as MenubarSub,
  DropdownMenuSubContent as MenubarSubContent,
  DropdownMenuSubTrigger as MenubarSubTrigger,
  MenubarTrigger,
};
