"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps, ReactNode } from "react";
import { DialogBackdrop } from "@/components/zero/dialog";
import { SearchIcon } from "@/components/zero/icons/search";
import { cn } from "@/lib/zero/cn";

/*
 * A search box over a list of actions, always open: type to narrow it, arrows to move, Enter to
 * run. The first match is always highlighted. It is a panel with the search on a black bar and
 * the Dropdown menu's rows below; CommandDialog floats it over the dimmed page, for a ⌘K palette.
 * Built on Base UI's Autocomplete: pass the items (or groups of items) to Command and render them
 * from CommandList's function child; an item's `label` is what typing matches.
 *
 *   <Command items={groups}>
 *     <CommandInput placeholder="Type a command" />
 *     <CommandList>{(group) => (
 *       <CommandGroup key={group.value} items={group.items}>
 *         <CommandGroupLabel>{group.value}</CommandGroupLabel>
 *         <CommandCollection>{(item) => <CommandItem key={item.value} value={item}>{item.label}</CommandItem>}</CommandCollection>
 *       </CommandGroup>
 *     )}</CommandList>
 *     <CommandEmpty>Nothing matches.</CommandEmpty>
 *   </Command>
 */

type CommandProps = ComponentProps<typeof AutocompletePrimitive.Root> & {
  className?: string;
};

function Command({ className, children, ...props }: CommandProps) {
  return (
    <AutocompletePrimitive.Root
      open
      inline
      autoHighlight="always"
      keepHighlight
      {...props}
    >
      <div
        data-slot="command"
        className={cn(
          "panel flex max-h-[min(28rem,80dvh)] w-full flex-col overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </AutocompletePrimitive.Root>
  );
}

function CommandInput({
  className,
  ...props
}: AutocompletePrimitive.Input.Props) {
  return (
    <AutocompletePrimitive.InputGroup
      data-slot="command-input"
      className="flex shrink-0 items-center gap-3 border-transparent border-b-(length:--zero-stroke-thin) bg-zero-void px-4 text-zero-text-3 has-focus-visible:border-zero-focus has-focus-visible:text-zero-accent"
    >
      <SearchIcon className="size-[1.1em]" />
      <AutocompletePrimitive.Input
        className={cn(
          "h-12 min-w-0 flex-1 bg-transparent font-semibold font-zero-text text-zero-md text-zero-text outline-none caret-zero-accent placeholder:text-zero-text-3",
          className,
        )}
        {...props}
      />
    </AutocompletePrimitive.InputGroup>
  );
}

function CommandList({
  className,
  ...props
}: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="command-list"
      className={cn(
        "grid min-h-0 gap-1 overflow-y-auto overscroll-contain p-(--zero-inset) empty:hidden",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "px-4 py-6 font-medium font-zero-text text-zero-sm text-zero-text-3 empty:hidden",
        className,
      )}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="command-group"
      className={cn("grid", className)}
      {...props}
    />
  );
}

function CommandGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        "px-3 pt-2 pb-1 font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

const CommandCollection = AutocompletePrimitive.Collection;

function CommandItem({
  className,
  ...props
}: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        "slab slab-cut-end flex w-full cursor-default items-center gap-2.5 outline-none select-none",
        "font-bold font-zero text-zero-md italic",
        "[--slab-h:var(--height-zero-md)] [--slab-o:0px] [--slab-px:0.75rem] [--slab-fill:transparent] [--slab-line:transparent]",
        "data-highlighted:[--slab-fill:var(--color-zero-accent)] data-highlighted:[--slab-ink:var(--color-zero-ink)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-ink:var(--color-zero-text-3)]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="command-separator"
      className={cn("my-1.5 h-(--zero-stroke-thin) bg-zero-line", className)}
      {...props}
    />
  );
}

/** A key hint at the end of a row. */
function CommandShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ms-auto ps-4 font-semibold font-zero-text text-zero-text-3 text-zero-xs not-italic tracking-[0.08em] in-data-highlighted:text-zero-ink/70",
        className,
      )}
      {...props}
    />
  );
}

/** Floats a Command over the dimmed page, a third of the way down. */
function CommandDialog({
  children,
  title = "Command palette",
  ...props
}: Omit<DialogPrimitive.Root.Props, "children"> & {
  children?: ReactNode;
  title?: string;
}) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogBackdrop />
        <DialogPrimitive.Popup
          data-slot="command-dialog"
          aria-label={title}
          className="pop fixed top-[15dvh] left-1/2 z-zero-overlay w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 outline-none [--transform-origin:top_center]"
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  type CommandProps,
  CommandSeparator,
  CommandShortcut,
};
