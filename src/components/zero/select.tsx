"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { cn } from "@/lib/zero/cn";

/*
 * Select: a trigger drawn as the same inset well as Input, and a popup that drops from it.
 *
 * The popup is a panel (panel.css): a square box lifted by outline. It grows out of the trigger
 * and folds back faster (`pop`, motion.css).
 *
 * The popup always drops below (or above) the trigger rather than laying the chosen row over it,
 * so a long list scrolls inside it; Base UI's scroll arrows belong to the other mode and are not used.
 *
 * Rows are slabs cut at the end. The highlighted row fills with the accent; the chosen one carries
 * a small slanted mark before its label.
 */

const Select = SelectPrimitive.Root;

const triggerVariants = cva(
  [
    "group/trigger slab flex w-full min-w-0 items-center gap-2 text-left outline-none select-none",
    "font-semibold font-zero-text",
    "[--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)] [--slab-ink:var(--color-zero-text)]",
    "hover:not-focus-visible:not-data-popup-open:[--slab-line:var(--color-zero-text-3)]",
    "focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
    "data-popup-open:[--slab-line:var(--color-zero-focus)]",
    "aria-invalid:[--slab-line:var(--color-zero-danger)] data-invalid:[--slab-line:var(--color-zero-danger)]",
    "data-disabled:pointer-events-none data-disabled:[--slab-fill:var(--color-zero-raised)] data-disabled:[--slab-line:var(--color-zero-ink)] data-disabled:[--slab-ink:var(--color-zero-text-3)]",
  ],
  {
    variants: {
      size: {
        sm: "[--slab-h:var(--height-zero-sm)] [--slab-px:0.75rem] text-zero-sm",
        md: "[--slab-h:var(--height-zero-md)] [--slab-px:1rem] text-zero-md",
        lg: "[--slab-h:var(--height-zero-lg)] [--slab-px:1.25rem] text-zero-lg",
      },
      cut: {
        end: "slab-cut-end",
        start: "slab-cut-start",
        both: "slab-cut-both",
        none: "slab-cut-none",
      },
    },
    defaultVariants: {
      size: "md",
      cut: "end",
    },
  },
);

type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof triggerVariants>;

function SelectTrigger({
  className,
  size,
  cut,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(triggerVariants({ size, cut, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-zero-text-2 transition-[rotate] duration-(--zero-dur-base) ease-(--zero-ease-spring) group-data-popup-open/trigger:rotate-180 group-data-popup-open/trigger:text-zero-focus" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "min-w-0 flex-1 truncate",
        "in-data-placeholder:text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "side">;

function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        align={align}
        alignItemWithTrigger={false}
        className="z-zero-popover outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto overscroll-contain p-(--zero-inset) outline-none",
            "panel pop",
            "data-[side=bottom]:mt-2 data-[side=top]:mb-2",
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
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
      {/* the mark's slot is always there, so labels line up whether chosen or not */}
      <span className="flex w-[0.45em] shrink-0 justify-center">
        <SelectPrimitive.ItemIndicator className="h-[1em] w-[0.45em] -skew-x-(--zero-slant) bg-zero-accent in-data-highlighted:bg-zero-ink" />
      </span>
      <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("grid", className)}
      {...props}
    />
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3 pt-2 pb-1 font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("my-1.5 h-(--zero-stroke-thin) bg-zero-line", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  type SelectContentProps,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  type SelectTriggerProps,
  SelectValue,
};
