import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { cn } from "@/lib/zero/cn";
import { CodeBlock } from "../../_components/code-block";
import { Install } from "../../_components/install";
import { ChartCode } from "./chart-code";

/**
 * One chart of the gallery, live, with its name and a button that opens its install command and
 * source: the chart file itself (src/components/charts/<name>.tsx), the one the registry ships.
 */
export function ChartDisplay({
  name,
  wide,
  children,
}: {
  name: string;
  /** Takes the whole row: the charts with a control of their own. */
  wide?: boolean;
  children: ReactNode;
}) {
  const source = readFileSync(
    join(process.cwd(), "src/components/charts", `${name}.tsx`),
    "utf8",
  ).replace(/^"use client";\n+/, "");
  return (
    <section
      className={cn(
        "grid min-w-0 content-start gap-2",
        wide && "md:col-span-2",
      )}
    >
      <div data-demo={name} className="grid min-w-0">
        {children}
      </div>
      <div className="flex items-center justify-between gap-4 ps-1">
        <span className="truncate font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
          {name}
        </span>
        <ChartCode name={name}>
          <Install item={name} />
          <CodeBlock code={source} title={`${name}.tsx`} />
        </ChartCode>
      </div>
    </section>
  );
}

/** The gallery: two to a row from a tablet's width, one on a phone. */
export function ChartGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">{children}</div>;
}
