"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { CloseIcon } from "@/components/zero/icons/close";
import { inputVariants } from "@/components/zero/input";
import { cn } from "@/lib/zero/cn";

/*
 * A text field that suggests as you type: Input's well, with a clear button and a chevron at its
 * end, over Select's panel and rows. Typing filters the list; the highlighted row fills with the
 * accent and the chosen one carries the slanted mark. Pass the items to the root and render each
 * from ComboboxList's function child.
 *
 * With `multiple`, the chosen items sit in the field as small slabs (ComboboxChip), each with a
 * button that takes it out; the field wraps them, so it is Textarea's square well rather than a
 * slab. Backspace at the start of the text takes out the last one.
 *
 *   <Combobox items={districts}>
 *     <ComboboxInput placeholder="District" />
 *     <ComboboxContent>
 *       <ComboboxEmpty>No district by that name.</ComboboxEmpty>
 *       <ComboboxList>{(item) => <ComboboxItem key={item.value} value={item}>{item.label}</ComboboxItem>}</ComboboxList>
 *     </ComboboxContent>
 *   </Combobox>
 */

const Combobox = ComboboxPrimitive.Root;
const ComboboxValue = ComboboxPrimitive.Value;
const ComboboxCollection = ComboboxPrimitive.Collection;

type ComboboxInputProps = Omit<ComboboxPrimitive.Input.Props, "size"> &
  Pick<VariantProps<typeof inputVariants>, "size" | "cut"> & {
    /** Hides the clear button. */
    showClear?: boolean;
  };

const action =
  "-mx-1 grid h-full place-items-center px-1 text-zero-text-2 outline-none hover:text-zero-accent focus-visible:text-zero-focus [&_svg]:size-[1.1em]";

function ComboboxInput({
  className,
  size,
  cut,
  showClear = true,
  ...props
}: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="input"
      className={cn(inputVariants({ size, cut }), className)}
    >
      <ComboboxPrimitive.Input
        data-slot="input-control"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-(--input-px) outline-none",
          "font-semibold font-zero-text text-inherit [font-size:inherit] [line-height:inherit] caret-zero-accent",
          "placeholder:text-zero-text-3 selection:bg-zero-accent selection:text-zero-ink",
        )}
        {...props}
      />
      <span
        data-slot="input-end"
        className="flex h-full shrink-0 items-center gap-1 pe-(--input-px) text-zero-text-3"
      >
        {showClear ? (
          <ComboboxPrimitive.Clear aria-label="Clear" className={action}>
            <CloseIcon />
          </ComboboxPrimitive.Clear>
        ) : null}
        <ComboboxPrimitive.Trigger
          aria-label="Show suggestions"
          className={cn(
            action,
            "[&_svg]:transition-transform [&_svg]:duration-(--zero-dur-base) data-popup-open:[&_svg]:rotate-180",
          )}
        >
          <ChevronDownIcon />
        </ComboboxPrimitive.Trigger>
      </span>
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, "side" | "align">;

function ComboboxContent({
  className,
  side = "bottom",
  align = "start",
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        align={align}
        className="z-zero-popover outline-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "panel pop max-h-[min(var(--available-height),22rem)] min-w-(--anchor-width) overflow-y-auto overscroll-contain p-(--zero-inset) outline-none",
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2",
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("grid empty:hidden", className)}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "slab slab-cut-end flex w-full cursor-default items-center gap-2.5 outline-none select-none",
        "font-bold font-zero text-zero-md italic",
        "[--slab-h:var(--height-zero-md)] [--slab-o:0px] [--slab-px:0.75rem] [--slab-fill:transparent] [--slab-line:transparent]",
        "data-highlighted:[--slab-fill:var(--color-zero-accent)] data-highlighted:[--slab-ink:var(--color-zero-ink)]",
        "data-disabled:pointer-events-none data-disabled:[--slab-ink:var(--color-zero-text-3)]",
        className,
      )}
      {...props}
    >
      <span className="flex w-[0.45em] shrink-0 justify-center">
        <ComboboxPrimitive.ItemIndicator className="h-[1em] w-[0.45em] -skew-x-(--zero-slant) bg-zero-accent in-data-highlighted:bg-zero-ink" />
      </span>
      <span className="min-w-0 flex-1 truncate pe-[0.2em]">{children}</span>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "px-3 py-2 font-medium font-zero-text text-zero-sm text-zero-text-3 empty:hidden",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("grid", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-3 pt-2 pb-1 font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("my-1.5 h-(--zero-stroke-thin) bg-zero-line", className)}
      {...props}
    />
  );
}

/** The field for several values: Textarea's square well, wrapping the chips and the text. */
function ComboboxChips({
  className,
  children,
  ...props
}: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-(--height-zero-md) w-full min-w-0 cursor-text items-center border-(length:--zero-stroke) border-zero-line bg-zero-void p-1",
        "hover:not-has-focus-visible:border-zero-text-3 has-focus-visible:border-zero-focus",
        "has-aria-invalid:border-zero-danger has-disabled:pointer-events-none has-disabled:bg-zero-raised",
        className,
      )}
    >
      <ComboboxPrimitive.Chips
        className="flex min-w-0 flex-1 flex-wrap items-center gap-1"
        {...props}
      >
        {children}
      </ComboboxPrimitive.Chips>
    </ComboboxPrimitive.InputGroup>
  );
}

/** A chosen item: a small raised slab with a button that takes it out. */
function ComboboxChip({
  className,
  children,
  ...props
}: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "slab slab-cut-both inline-flex items-center gap-1 outline-none",
        "[--slab-h:calc(var(--height-zero-md)-0.75rem)] [--slab-o:var(--zero-stroke-thin)] [--slab-px:0.5rem] [--slab-fill:var(--color-zero-raised)]",
        "font-bold font-zero text-zero-xs italic",
        "data-highlighted:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-line:var(--color-zero-focus)]",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ChipRemove
        aria-label="Remove"
        className="-me-0.5 grid place-items-center text-zero-text-3 outline-none hover:text-zero-danger [&_svg]:size-[1.1em]"
      >
        <CloseIcon />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  );
}

/** The text inside ComboboxChips, after the chips. */
function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chips-input"
      className={cn(
        "h-[calc(var(--height-zero-md)-0.75rem)] min-w-24 flex-1 bg-transparent px-2 font-semibold font-zero-text text-zero-md text-zero-text outline-none caret-zero-accent placeholder:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  type ComboboxContentProps,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  type ComboboxInputProps,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
};
