"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, useEffect, useState } from "react";
import { Button } from "@/components/zero/button";
import { CheckIcon } from "@/components/zero/icons/check";
import { CopyIcon } from "@/components/zero/icons/copy";
import { cn } from "@/lib/zero/cn";

/*
 * Code in a black well with an ink border, the host's monospace face. An optional header holds a
 * leaning title and actions (CodeBlockCopyButton copies the code and shows a check); without a
 * header, the actions sit in the corner and show when the block is pointed at. CodeBlockContent
 * can number its lines; CodeBlockLine marks one added (the accent on its edge, a +), removed (red,
 * a −) or highlighted (the raised grey and the accent edge). The well scrolls sideways, or wraps.
 */

const codeBlockVariants = cva(
  [
    "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden",
    "border-(length:--zero-stroke) bg-zero-void text-zero-text",
    "has-[>[data-slot=code-block-content]:focus-visible]:border-zero-focus",
    "text-zero-sm data-[size=sm]:text-zero-xs",
  ],
  {
    variants: {
      variant: {
        default: "border-zero-ink",
        danger: "border-zero-danger text-zero-danger",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function CodeBlock({
  className,
  variant = "default",
  size = "default",
  ...props
}: ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  );
}

function CodeBlockHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 border-zero-line border-b-(length:--zero-stroke-thin) px-4 py-2 group-data-[size=sm]/code-block:px-3",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "flex min-w-0 items-center gap-1.5 truncate font-bold font-zero text-zero-text-2 text-zero-xs uppercase italic tracking-[0.06em]",
        "group-data-[variant=danger]/code-block:text-zero-danger [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/** Actions at the header's end; without a header, in the corner, shown when pointed at. */
function CodeBlockActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn(
        "ms-auto flex shrink-0 items-center gap-1",
        "[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-zero-raised",
        "[[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:duration-(--zero-dur-fast)",
        "[[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockCopyButton({
  value,
  className,
  onClick,
  labels,
  ...props
}: ComponentProps<typeof Button> & {
  value: string;
  /** The button's name before and after copying ("Copy", "Copied"). */
  labels?: { copy?: string; copied?: string };
}) {
  const copyLabel = labels?.copy ?? "Copy";
  const copiedLabel = labels?.copied ?? "Copied";
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant="ghost"
        size="sm"
        cut="both"
        aria-label={copied ? copiedLabel : copyLabel}
        className={cn(
          "w-[calc(var(--height-zero-sm)*(1+tan(var(--zero-slant))))] [--slab-px:0px] data-copied:[--slab-ink:var(--color-zero-accent)]",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {});
        }}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}

function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: ComponentProps<"pre"> & {
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean;
  lineNumbers?: boolean;
  startLine?: number;
}) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable from the keyboard
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      className={cn(
        "min-h-0 min-w-0 overflow-auto px-4 py-3 text-start font-mono leading-relaxed outline-none",
        // where each line starts: wider when some line carries a + or a −
        "[--line-ps:1rem] group-data-[size=sm]/code-block:[--line-ps:0.75rem] has-[[data-variant=added],[data-variant=removed]]:[--line-ps:1.75rem]",
        "[scrollbar-color:var(--color-zero-text-3)_transparent] [scrollbar-width:thin]",
        "group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-2.5",
        "data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap",
        className,
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
      >
        {lineNumbers && typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: lines are fixed and in order
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  );
}

const codeBlockLineVariants = cva(
  [
    "relative -mx-4 block min-h-lh ps-(--line-ps) pe-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:pe-3",
    "before:min-w-6 before:text-end before:text-zero-text-3 after:absolute after:start-2.5 after:top-0 after:select-none",
    "in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-4",
    "in-data-numbered:[counter-increment:line] in-data-numbered:before:select-none in-data-numbered:before:content-[counter(line)]",
  ],
  {
    variants: {
      variant: {
        default: "",
        added:
          "bg-zero-raised shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent)] after:text-zero-accent after:content-['+']",
        removed:
          "bg-zero-danger/10 shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-danger)] after:text-zero-danger after:content-['−']",
        highlighted:
          "bg-zero-raised shadow-[inset_var(--zero-stroke-thick)_0_0_var(--color-zero-accent)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function CodeBlockLine({
  className,
  variant = "default",
  children,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof codeBlockLineVariants>) {
  // an empty line holds a newline, so copying a selection keeps blank lines
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);
  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-content" className="min-w-0">
        {empty ? "\n" : children}
      </span>
    </span>
  );
}

function CodeBlockFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 border-zero-line border-t-(length:--zero-stroke-thin) px-4 py-2 font-medium font-zero-text text-zero-text-3 text-zero-xs",
        className,
      )}
      {...props}
    />
  );
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
};
