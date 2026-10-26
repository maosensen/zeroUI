"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "@/lib/zero/cn";

/*
 * Something that opens and closes in place. The trigger brings no look of its own (give it a
 * Button through `render`); the panel unfolds to its own height on the reveal timing and folds
 * back faster, and simply appears under reduced motion.
 */

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

/** The height a Base UI panel unfolds to, on zzzUI's reveal and dismiss timings. */
const unfold = cn(
  "overflow-hidden transition-[height] duration-(--zero-dur-base) ease-(--zero-ease-out)",
  "data-starting-style:h-0 data-ending-style:h-0 data-ending-style:duration-(--zero-dur-fast) data-ending-style:ease-(--zero-ease-in)",
  "motion-reduce:transition-none",
);

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(unfold, "h-(--collapsible-panel-height)", className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger, unfold };
