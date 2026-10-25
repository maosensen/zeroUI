import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

/**
 * A live demo and its source. The source shown is the demo file itself
 * (src/app/docs/_demos/<file>.tsx), so the two cannot drift apart.
 */
export function Demo({
  file,
  title,
  children,
}: {
  file: string;
  title: string;
  children: ReactNode;
}) {
  const source = readFileSync(
    join(process.cwd(), "src/app/docs/_demos", `${file}.tsx`),
    "utf8",
  ).replace(/^"use client";\n+/, "");
  return (
    <section className="grid min-w-0 gap-3">
      <h3 className="font-black font-zero text-zero-lg italic">{title}</h3>
      <div
        data-demo={file}
        className="flex min-h-40 flex-wrap items-center justify-center-safe gap-4 overflow-x-auto border-(length:--zero-stroke-thin) border-zero-line bg-zero-ground bg-(image:--zero-hatch) p-4 sm:p-8"
      >
        {children}
      </div>
      <CodeBlock code={source} title={`${file}.tsx`} />
    </section>
  );
}
