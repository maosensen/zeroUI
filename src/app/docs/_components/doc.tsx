import type { ReactNode } from "react";
import { ExternalIcon } from "@/components/zero/icons";

/** The parts every docs page is made of. */

export function DocHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="grid gap-4">
      <h1 className="origin-left rotate-(--zero-tilt) font-black font-zero text-zero-2xl italic">
        {title}
      </h1>
      <p className="max-w-2xl font-medium text-zero-lg text-zero-text-2">
        {lead}
      </p>
    </header>
  );
}

export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="grid min-w-0 scroll-mt-24 gap-5">
      <h2 className="flex items-center gap-3 font-black font-zero text-zero-xl italic before:h-[0.8em] before:w-[0.35em] before:-skew-x-(--zero-slant) before:bg-zero-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="grid max-w-2xl gap-3 font-medium text-zero-md text-zero-text-2 leading-relaxed [&_code]:bg-zero-raised [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-zero-text [&_strong]:text-zero-text [&_a]:font-bold [&_a]:text-zero-accent [&_a]:underline-offset-4 [&_a:hover]:underline">
      {children}
    </div>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-bold text-zero-accent underline-offset-4 hover:underline"
    >
      {children}
      <ExternalIcon className="size-[1em]" />
    </a>
  );
}

export type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

/** One table per part. `base` names the Base UI part whose props pass through. */
export function PropsTable({
  part,
  rows,
  base,
}: {
  part: string;
  rows: PropRow[];
  base?: { name: string; href: string };
}) {
  return (
    <div className="grid min-w-0 gap-3">
      <h3 className="font-black font-zero text-zero-lg italic">{part}</h3>
      {rows.length > 0 ? (
        <div className="overflow-x-auto border-(length:--zero-stroke-thin) border-zero-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-zero-sm">
            <thead className="bg-zero-void font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
              <tr>
                <th className="px-4 py-2.5">Prop</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Default</th>
                <th className="px-4 py-2.5">Description</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.name}
                  className="border-zero-line border-t-(length:--zero-stroke-thin) align-top"
                >
                  <td className="px-4 py-3 font-bold font-mono text-zero-accent">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-zero-text-2">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 font-mono text-zero-text-2">
                    {row.default ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-medium text-zero-text-2">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {base ? (
        <p className="font-medium text-zero-sm text-zero-text-3">
          Also takes every prop of Base UI's{" "}
          <ExternalLink href={base.href}>{base.name}</ExternalLink>.
        </p>
      ) : null}
    </div>
  );
}
