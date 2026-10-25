import { cn } from "@/lib/zero/cn";
import { highlight, type Language } from "../_lib/highlight";
import { CopyButton } from "./copy-button";

/** A highlighted block of code with a copy button, in a well like the inputs'. */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: Language;
  title?: string;
  className?: string;
}) {
  const lines = await highlight(code, lang);
  return (
    <figure
      className={cn(
        "grid min-w-0 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-4 border-zero-line border-b-(length:--zero-stroke-thin) py-1 ps-4 pe-1">
        <span className="font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tracking-[0.08em]">
          {title ?? lang}
        </span>
        <CopyButton text={code.replace(/\n$/, "")} />
      </figcaption>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable from the keyboard */}
      <pre
        tabIndex={0}
        className="max-h-[28rem] overflow-auto p-4 font-mono text-[0.8125rem] leading-6 outline-none focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:-outline-offset-2"
      >
        <code>
          {lines.map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines are fixed for a given block
            <span key={index} className="block min-h-6">
              {line.map((token, at) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: tokens are fixed for a given line
                  key={at}
                  style={{
                    color: token.color,
                    // shiki's font style bit flags: 1 italic, 2 bold
                    fontStyle:
                      token.style && token.style & 1 ? "italic" : undefined,
                    fontWeight:
                      token.style && token.style & 2 ? 700 : undefined,
                  }}
                >
                  {token.content}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
