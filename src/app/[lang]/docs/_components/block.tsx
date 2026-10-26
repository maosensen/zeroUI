import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

/**
 * A block, live and full width, then its source: the block file itself
 * (src/components/blocks/<name>.tsx), the one the registry ships.
 */
export function Block({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const source = readFileSync(
    join(process.cwd(), "src/components/blocks", `${name}.tsx`),
    "utf8",
  ).replace(/^"use client";\n+/, "");
  return (
    <section className="grid min-w-0 gap-3">
      <div
        data-demo={`block-${name}`}
        className="grid justify-items-center overflow-x-auto border-(length:--zero-stroke-thin) border-zero-line bg-zero-ground bg-(image:--zero-hatch) p-3 sm:p-8"
      >
        {children}
      </div>
      <CodeBlock code={source} title={`${name}.tsx`} />
    </section>
  );
}
