import type { ComponentProps } from "react";
import { cn } from "@/lib/zero/cn";

/*
 * Rows of data in a square-cornered box, Card's border and surface. The column heads sit on a
 * black bar in small leaning capitals; the cells are set in the text face, divided by quiet lines.
 * A row lights to the raised grey under the pointer; a selected row (data-state="selected" or
 * aria-selected) keeps it and carries the accent on its start edge. The box scrolls sideways when
 * the table is wider than it. For figures, give the cell `text-right tabular-nums`.
 */

function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto border-(length:--zero-stroke) border-zero-ink bg-zero-surface bg-(image:--zero-hatch)"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-collapse text-zero-text",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-zero-void", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-zero-ink border-t-(length:--zero-stroke) bg-zero-void font-bold",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-zero-line not-first:border-t-(length:--zero-stroke-thin)",
        "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out)",
        "in-data-[slot=table-body]:hover:bg-zero-raised",
        "data-[state=selected]:bg-zero-raised aria-selected:bg-zero-raised",
        "data-[state=selected]:[&>td:first-child]:shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent)] aria-selected:[&>td:first-child]:shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent)]",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 whitespace-nowrap px-4 text-left align-middle font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle font-medium font-zero-text text-zero-sm",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "border-zero-line border-t-(length:--zero-stroke-thin) px-4 py-3 text-left font-medium font-zero-text text-zero-sm text-zero-text-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
