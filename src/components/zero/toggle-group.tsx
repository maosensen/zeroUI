"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { createContext, useContext } from "react";
import { Toggle, type ToggleProps } from "@/components/zero/toggle";
import { cn } from "@/lib/zero/cn";

/*
 * A row of toggles that share one value: pick one, or several with `multiple`. Each item is a
 * Toggle cut on both sides, so the row nests like the tabs and pagination. Arrow keys move
 * between items. Variant and size are set once on the group.
 */

type Look = Pick<ToggleProps, "variant" | "size">;

const LookContext = createContext<Look>({});

function ToggleGroup({
  className,
  variant,
  size,
  ...props
}: ToggleGroupPrimitive.Props & Look) {
  return (
    <LookContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        className={cn(
          "flex w-fit flex-wrap items-center gap-1 data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    </LookContext.Provider>
  );
}

function ToggleGroupItem({
  variant,
  size,
  cut = "both",
  ...props
}: ToggleProps) {
  const look = useContext(LookContext);
  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? look.variant}
      size={size ?? look.size}
      cut={cut}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
