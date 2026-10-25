"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { unfold } from "@/components/zero/collapsible";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { cn } from "@/lib/zero/cn";

/*
 * Sections that open one at a time (or several, with `multiple`), divided by quiet lines. Each
 * heading leans, led by a slanted sliver that lights with the accent while its section is open;
 * the chevron at the end turns over. The section unfolds like Collapsible.
 */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-zero-line border-b-(length:--zero-stroke-thin)",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center gap-3 py-4 text-left outline-none",
          "font-bold font-zero text-zero-md text-zero-text-2 italic",
          "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:text-zero-text data-panel-open:text-zero-text",
          "focus-visible:text-zero-text focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
          "data-disabled:pointer-events-none data-disabled:text-zero-text-3",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="h-[1em] w-[0.35em] shrink-0 -skew-x-(--zero-slant) bg-zero-line transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) group-data-panel-open:bg-zero-accent"
        />
        {children}
        <ChevronDownIcon className="ms-auto size-[1.1em] text-zero-text-3 transition-transform duration-(--zero-dur-base) ease-(--zero-ease-out) group-data-panel-open:rotate-180 motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(unfold, "h-(--accordion-panel-height)")}
      {...props}
    >
      <div
        className={cn(
          "ps-[calc(0.35em+0.75rem)] pb-4 font-medium font-zero-text text-zero-sm text-zero-text-2",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
