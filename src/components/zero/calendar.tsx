"use client";

import { type ComponentProps, useEffect, useRef } from "react";
import {
  type DayButton,
  DayPicker,
  getDefaultClassNames,
  type Locale,
} from "react-day-picker";
import { buttonVariants } from "@/components/zero/button";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { ChevronLeftIcon } from "@/components/zero/icons/chevron-left";
import { ChevronRightIcon } from "@/components/zero/icons/chevron-right";
import { cn } from "@/lib/zero/cn";

/*
 * A month to pick dates from (react-day-picker underneath). Every day is a small slab cut on both
 * sides, so a week is a row of nesting parallelograms: quiet until pointed at, filled with the
 * accent when chosen, today's number in the accent and underlined. A range is its two ends in the
 * accent with the days between on the raised grey, one slanted band. The month's name leans; the
 * arrows are ghost Buttons. It has no ground of its own: set it in a Card, a Popover or the page.
 *
 * It reads the current date to mark today, so with Next's cacheComponents render it inside a
 * <Suspense> boundary (it is then rendered per request, not prerendered).
 */

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  formatters,
  components,
  labels,
  ...props
}: ComponentProps<typeof DayPicker>) {
  const defaults = getDefaultClassNames();
  const nav = cn(
    buttonVariants({ variant: "ghost", size: "sm", cut: "both" }),
    "[--slab-px:0.25rem] w-[calc(var(--cell)*(1+tan(var(--zero-slant))))] aria-disabled:pointer-events-none aria-disabled:opacity-40",
  );
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      className={cn("w-fit p-3 [--cell:2.25rem]", className)}
      labels={{
        // the day's number first, so what is read out starts with what is seen
        labelDayButton: (date, modifiers) =>
          [
            modifiers.today ? "Today" : "",
            `${date.getDate()} ${date.toLocaleDateString(locale?.code ?? "en-US", { month: "long", year: "numeric" })}, ${date.toLocaleDateString(locale?.code ?? "en-US", { weekday: "long" })}`,
            modifiers.selected ? "selected" : "",
          ]
            .filter(Boolean)
            .join(", "),
        ...labels,
      }}
      formatters={{
        // the same language as the rest of the calendar (en-US unless a locale is given), so the
        // server and the browser write the month the same way
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code ?? "en-US", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaults.root),
        months: cn("relative flex flex-col gap-6 md:flex-row", defaults.months),
        month: cn("flex w-full flex-col gap-3", defaults.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between",
          defaults.nav,
        ),
        button_previous: cn(nav, defaults.button_previous),
        button_next: cn(nav, defaults.button_next),
        month_caption: cn(
          "flex h-(--height-zero-sm) items-center justify-center px-12",
          defaults.month_caption,
        ),
        caption_label: cn(
          "font-black font-zero text-zero-md italic select-none",
          captionLayout !== "label" &&
            "flex items-center gap-1 [&>svg]:size-[0.9em] [&>svg]:text-zero-text-3",
          defaults.caption_label,
        ),
        dropdowns: cn("flex items-center gap-3", defaults.dropdowns),
        // the select itself is invisible over the label, so the label shows its focus
        dropdown_root: cn(
          "relative has-focus-visible:outline-solid has-focus-visible:outline-(length:--zero-stroke-thin) has-focus-visible:outline-zero-focus has-focus-visible:outline-offset-2",
          defaults.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 cursor-pointer bg-zero-surface opacity-0",
          defaults.dropdown,
        ),
        month_grid: cn("border-collapse", defaults.month_grid),
        weekdays: cn("flex", defaults.weekdays),
        weekday: cn(
          "w-(--cell) font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic select-none",
          defaults.weekday,
        ),
        week: cn("mt-1 flex", defaults.week),
        week_number_header: cn(
          "w-(--cell) select-none",
          defaults.week_number_header,
        ),
        week_number: cn(
          "font-semibold font-zero-text text-zero-text-3 text-zero-xs select-none",
          defaults.week_number,
        ),
        day: cn("w-(--cell) p-0 text-center select-none", defaults.day),
        range_start: defaults.range_start,
        range_middle: defaults.range_middle,
        range_end: defaults.range_end,
        today: defaults.today,
        outside: defaults.outside,
        disabled: defaults.disabled,
        hidden: cn("invisible", defaults.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={className}
            {...rootProps}
          />
        ),
        Chevron: ({ className, orientation, ...chevronProps }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeftIcon
              : orientation === "right"
                ? ChevronRightIcon
                : ChevronDownIcon;
          return <Icon className={cn("size-4", className)} {...chevronProps} />;
        },
        DayButton: (dayProps) => (
          <CalendarDayButton locale={locale} {...dayProps} />
        ),
        WeekNumber: ({ children, ...weekProps }) => (
          <td {...weekProps}>
            <div className="flex size-(--cell) items-center justify-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const single =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;
  return (
    <button
      ref={ref}
      type="button"
      data-slot="calendar-day"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-single={single || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-today={modifiers.today || undefined}
      data-outside={modifiers.outside || undefined}
      className={cn(
        "slab slab-cut-both flex w-full items-center justify-center outline-none",
        "[--slab-h:var(--cell)] [--slab-px:0px] [--slab-o:0px] [--slab-fill:transparent] [--slab-line:transparent]",
        "font-bold font-zero text-zero-sm tabular-nums italic",
        "hover:[--slab-fill:var(--color-zero-raised)]",
        "data-outside:[--slab-ink:var(--color-zero-text-3)] disabled:pointer-events-none disabled:[--slab-ink:var(--color-zero-text-3)] disabled:line-through",
        "data-today:[--slab-ink:var(--color-zero-accent)] data-today:underline data-today:decoration-2 data-today:underline-offset-4",
        "data-range-middle:[--slab-fill:var(--color-zero-raised)] data-range-middle:[--slab-ink:var(--color-zero-accent)]",
        "data-single:[--slab-fill:var(--color-zero-accent)] data-single:[--slab-ink:var(--color-zero-ink)]",
        "data-range-start:[--slab-fill:var(--color-zero-accent)] data-range-start:[--slab-ink:var(--color-zero-ink)]",
        "data-range-end:[--slab-fill:var(--color-zero-accent)] data-range-end:[--slab-ink:var(--color-zero-ink)]",
        "focus-visible:[--slab-o:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)]",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
