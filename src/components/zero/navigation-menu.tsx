"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { cn } from "@/lib/zero/cn";

/*
 * A site's top navigation: a row of quiet slabs, some of which open a panel of links below them.
 * The panel is shared: moving from one menu to the next, it changes size and its contents slide
 * across in the direction you moved. Inside it, each link is a block with a leaning title and a
 * line of text, raised when pointed at. A plain link in the row takes navigationMenuTriggerStyle.
 */

function NavigationMenu({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative w-fit", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          sideOffset={8}
          collisionPadding={16}
          className="z-zero-popover h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--zero-dur-base) ease-(--zero-ease-out) data-instant:transition-none"
        >
          <NavigationMenuPrimitive.Popup
            data-slot="navigation-menu-popup"
            className="panel pop relative h-(--popup-height) w-(--popup-width) overflow-hidden outline-none transition-[opacity,scale,width,height] duration-(--zero-dur-base) ease-(--zero-ease-out)"
          >
            <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

/** The row's look, for a trigger or a plain link beside the triggers. */
const navigationMenuTriggerStyle = cn(
  "slab slab-cut-end inline-flex items-center gap-1.5 outline-none select-none",
  "font-bold font-zero text-zero-md italic",
  "[--slab-h:var(--height-zero-md)] [--slab-o:0px] [--slab-px:0.875rem] [--slab-fill:transparent] [--slab-line:transparent] [--slab-ink:var(--color-zero-text-2)]",
  "hover:[--slab-fill:var(--color-zero-raised)] hover:[--slab-ink:var(--color-zero-text)]",
  "data-popup-open:[--slab-fill:var(--color-zero-raised)] data-popup-open:[--slab-ink:var(--color-zero-text)]",
  "aria-[current=page]:[--slab-fill:var(--color-zero-accent)] aria-[current=page]:[--slab-ink:var(--color-zero-ink)]",
  "focus-visible:[--slab-o:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-ink:var(--color-zero-text)]",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle, className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="transition-transform duration-(--zero-dur-base) ease-(--zero-ease-out) data-popup-open:rotate-180">
        <ChevronDownIcon className="size-[1em]" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "h-full w-[calc(100vw-2rem)] p-(--zero-inset) sm:w-max sm:max-w-md",
        "transition-[opacity,translate] duration-(--zero-dur-base) ease-(--zero-ease-out)",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "data-starting-style:data-[activation-direction=left]:-translate-x-1/3 data-starting-style:data-[activation-direction=right]:translate-x-1/3",
        "data-ending-style:data-[activation-direction=left]:translate-x-1/3 data-ending-style:data-[activation-direction=right]:-translate-x-1/3",
        "motion-reduce:translate-x-0",
        className,
      )}
      {...props}
    />
  );
}

/** A link inside a panel: a block with a leaning title (its first line) and a line of text. */
function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block p-3 font-medium font-zero-text text-zero-sm text-zero-text-2 outline-none",
        "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:bg-zero-raised hover:text-zero-text",
        "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:-outline-offset-2",
        "aria-[current=page]:shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent)]",
        "[&>strong]:mb-1 [&>strong]:block [&>strong]:font-black [&>strong]:font-zero [&>strong]:text-zero-md [&>strong]:text-zero-text [&>strong]:italic",
        className,
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
