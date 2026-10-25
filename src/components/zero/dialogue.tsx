"use client";

import {
  type ComponentProps,
  createContext,
  type KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChevronDownIcon } from "@/components/zero/icons/chevron-down";
import { cn } from "@/lib/zero/cn";

/*
 * Someone speaking, the way a game puts a line on screen: a black band with the speaker's name
 * on a slab breaking its top edge, the line typed out a few letters at a time, a mark that
 * blinks when the line is complete, and the replies as numbered rows. A click on the line or on
 * Continue while it is still typing (or Enter or Space anywhere in the box) shows it all at once;
 * the replies wait until it has. While focus is in the box, the number keys pick a reply. Screen readers get each whole line, politely,
 * not the typing. Under reduced motion the line appears whole.
 *
 *   <Dialogue aria-label="Conversation">
 *     <DialogueSpeaker>Mara</DialogueSpeaker>
 *     <DialogueText key={line}>{line}</DialogueText>
 *     <DialogueNext onClick={next} />
 *   </Dialogue>
 *
 * Give DialogueText a new `key` for each line so the typing starts over.
 */

type DialogueState = {
  /** The whole line is on screen. */
  done: boolean;
  setDone: (done: boolean) => void;
  /** Show the rest of the line now. */
  skip: number;
  setSkip: (skip: (n: number) => number) => void;
  /** The current line, for the box's live region. */
  setLine: (line: string) => void;
};

const DialogueContext = createContext<DialogueState>({
  done: true,
  setDone: () => {},
  skip: 0,
  setSkip: () => {},
  setLine: () => {},
});

function Dialogue({
  className,
  onKeyDown,
  children,
  ...props
}: ComponentProps<"section">) {
  const [done, setDone] = useState(true);
  const [skip, setSkip] = useState(0);
  const [line, setLine] = useState("");
  // number keys pick a reply: the nth enabled choice in the box
  const pick = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    // Enter or Space on anything in the box shows the rest of a line still typing
    if (!done && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setSkip((n) => n + 1);
      return;
    }
    const n = Number(event.key);
    if (!done || !n) return;
    const choices = event.currentTarget.querySelectorAll<HTMLButtonElement>(
      '[data-slot="dialogue-choice"]:not(:disabled)',
    );
    choices[n - 1]?.click();
  };
  return (
    <DialogueContext.Provider value={{ done, setDone, skip, setSkip, setLine }}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: number keys pressed on a reply inside pick a reply; the replies are buttons */}
      <section
        data-slot="dialogue"
        data-typing={done ? undefined : ""}
        onKeyDown={pick}
        className={cn(
          "group/dialogue relative grid gap-4 border-zero-accent border-t-(length:--zero-stroke-thick) bg-zero-void bg-(image:--zero-hatch) px-6 pt-7 pb-5",
          className,
        )}
        {...props}
      >
        {children}
        {/* the whole line, said once, while the box shows it being typed */}
        <span className="sr-only" aria-live="polite">
          {line}
        </span>
      </section>
    </DialogueContext.Provider>
  );
}

/** The speaker's name, on a slab breaking the band's top edge. */
function DialogueSpeaker({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="dialogue-speaker"
      className={cn(
        "slab slab-cut-both absolute -top-[calc(var(--height-zero-sm)/2)] start-5 inline-flex items-center",
        "[--slab-fill:var(--color-zero-accent)] [--slab-h:var(--height-zero-sm)] [--slab-ink:var(--color-zero-ink)] [--slab-px:0.875rem]",
        "font-black font-zero text-zero-sm uppercase italic tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

/** The line, typed out at `speed` letters a second. A string. */
function DialogueText({
  className,
  children,
  speed = 45,
  onDone,
  ...props
}: Omit<ComponentProps<"p">, "children"> & {
  children: string;
  speed?: number;
  onDone?: () => void;
}) {
  const { setDone, skip, setSkip, setLine } = useContext(DialogueContext);
  const [shown, setShown] = useState(0);
  const [start] = useState(skip);
  const all = children.length;
  const whole = shown >= all || skip !== start;

  useEffect(() => setLine(children), [children, setLine]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onDone is the caller's; the line's end is what matters
  useEffect(() => {
    setDone(whole);
    if (whole) onDone?.();
  }, [whole, setDone]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once per line; `shown` only seeds a restart
  useEffect(() => {
    if (whole) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(all);
      return;
    }
    const begin = performance.now() - (shown / speed) * 1000;
    let frame = requestAnimationFrame(function tick(now) {
      const next = Math.min(all, Math.floor(((now - begin) / 1000) * speed));
      setShown(next);
      if (next < all) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [whole, all, speed]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Continue does the same from the keyboard
    <p
      data-slot="dialogue-text"
      onClick={() => setSkip((n) => n + 1)}
      className={cn(
        "min-h-[3lh] max-w-[60ch] font-medium font-zero-text text-zero-lg leading-relaxed",
        className,
      )}
      {...props}
    >
      <span aria-hidden>{whole ? children : children.slice(0, shown)}</span>
    </p>
  );
}

/** Continue: shows the rest while it types, otherwise does `onClick`. A blinking mark when ready. */
function DialogueNext({
  className,
  onClick,
  children = "Continue",
  ...props
}: ComponentProps<"button">) {
  const { done, setSkip } = useContext(DialogueContext);
  return (
    <button
      type="button"
      data-slot="dialogue-next"
      onClick={(event) => {
        if (!done) setSkip((n) => n + 1);
        else onClick?.(event);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 justify-self-end font-bold font-zero text-zero-sm text-zero-text-2 italic outline-none",
        "transition-colors duration-(--zero-dur-fast) hover:text-zero-accent",
        "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-4",
        "group-data-typing/dialogue:text-zero-text-3",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-zero-accent group-data-typing/dialogue:invisible group-not-data-typing/dialogue:animate-zero-pulse" />
    </button>
  );
}

/** The replies. Hidden until the line is whole. */
function DialogueChoices({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="dialogue-choices"
      className={cn(
        "grid gap-1.5 group-data-typing/dialogue:invisible",
        className,
      )}
      {...props}
    />
  );
}

/** One reply: its number (the key that picks it) and what is said. */
function DialogueChoice({
  className,
  index,
  children,
  ...props
}: ComponentProps<"button"> & { index: number }) {
  return (
    <li className="contents">
      <button
        type="button"
        data-slot="dialogue-choice"
        aria-keyshortcuts={String(index)}
        className={cn(
          "group/choice flex w-full items-center gap-3 px-3 py-2 text-start font-medium font-zero-text text-zero-md outline-none",
          "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:bg-zero-raised",
          "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:-outline-offset-2",
          "disabled:text-zero-text-3",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="grid size-6 shrink-0 -skew-x-(--zero-slant) place-items-center bg-zero-raised font-black font-zero text-zero-accent text-zero-sm group-hover/choice:bg-zero-accent group-hover/choice:text-zero-ink"
        >
          <span className="skew-x-(--zero-slant)">{index}</span>
        </span>
        {children}
      </button>
    </li>
  );
}

export {
  Dialogue,
  DialogueChoice,
  DialogueChoices,
  DialogueNext,
  DialogueSpeaker,
  DialogueText,
};
