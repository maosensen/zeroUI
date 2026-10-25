"use client";

import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/zero/button";
import { CheckIcon } from "@/components/zero/icons/check";
import { inputVariants } from "@/components/zero/input";
import { cn } from "@/lib/zero/cn";

/*
 * Questions asked one at a time, in a conversation (@shadcn/react underneath): a leaning question,
 * its choices as rows, or a field to type in, then Previous, Skip and Next. A choice row is a
 * square box with a slanted well that fills with the accent (a check for several answers, a slab
 * for one); with `shortcuts` each row shows the key that picks it. Required questions say so in
 * red when left empty.
 */

function Questionnaire({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex w-full min-w-0 flex-col gap-5", className)}
      {...props}
    />
  );
}

function QuestionnaireProgress({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      className={cn(
        "w-fit font-bold font-zero text-zero-text-3 text-zero-xs uppercase italic tabular-nums tracking-[0.06em]",
        className,
      )}
      {...props}
    />
  );
}

function QuestionnaireItem({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn(
        "m-0 flex min-w-0 flex-col gap-4 border-0 p-0 outline-none",
        className,
      )}
      {...props}
    />
  );
}

function QuestionnaireTitle({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn(
        // a legend stands outside the fieldset's gap, so it keeps its own distance
        "mb-4 font-black font-zero text-zero-lg italic text-pretty has-[~[data-slot=questionnaire-description]]:mb-1.5",
        className,
      )}
      {...props}
    />
  );
}

function QuestionnaireDescription({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2 text-pretty",
        className,
      )}
      {...props}
    />
  );
}

function QuestionnaireChoices({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn("grid min-w-0 gap-2", className)}
      {...props}
    />
  );
}

function QuestionnaireChoice({
  children,
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        "group/choice relative flex min-h-(--height-zero-md) cursor-pointer items-start gap-3 px-4 py-3 text-start select-none",
        "border-(length:--zero-stroke-thin) border-zero-line bg-zero-surface",
        "transition-colors duration-(--zero-dur-fast) ease-(--zero-ease-out) hover:bg-zero-raised",
        "has-[>input:focus-visible]:border-zero-focus data-checked:border-zero-accent data-checked:bg-zero-raised data-invalid:border-zero-danger",
        "data-disabled:pointer-events-none data-disabled:text-zero-text-3",
        className,
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        className="absolute inset-0 z-zero-raised size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "slab slab-cut-both pointer-events-none flex shrink-0 items-center justify-center",
          "w-[calc(1.25rem*(1+tan(var(--zero-slant))))] [--slab-h:1.25rem] [--slab-px:0px] [--slab-o:var(--zero-stroke-thin)] [--slab-fill:var(--color-zero-void)] [--slab-line:var(--color-zero-line)]",
          "group-data-checked/choice:[--slab-fill:var(--color-zero-accent)] group-data-checked/choice:[--slab-ink:var(--color-zero-ink)] group-data-checked/choice:[--slab-line:var(--color-zero-ink)]",
        )}
      >
        <CheckIcon className="hidden size-3.5 group-data-[type=checkbox]/choice:group-data-checked/choice:block" />
        <span className="hidden h-2 w-1.5 -skew-x-(--zero-slant) bg-zero-ink group-data-[type=radio]/choice:group-data-checked/choice:block" />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        className="flex min-w-0 flex-1 flex-col gap-1 font-bold font-zero text-zero-md italic leading-snug"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className={cn(
          "slab slab-cut-both pointer-events-none ms-auto hidden min-w-7 items-center justify-center group-data-shortcut/choice:inline-flex",
          "[--slab-h:1.5rem] [--slab-px:0.3rem] [--slab-o:var(--zero-stroke-thin)] [--slab-fill:var(--color-zero-raised)] [--slab-ink:var(--color-zero-text-2)]",
          "font-semibold font-zero-text text-zero-xs not-italic",
        )}
      />
    </QuestionnairePrimitive.Choice>
  );
}

function QuestionnaireChoiceDescription({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      className={cn(
        "font-medium font-zero-text text-zero-sm text-zero-text-2 not-italic",
        className,
      )}
      {...props}
    />
  );
}

/** A typed answer, in Input's well. */
function QuestionnaireInput({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <span data-slot="input" className={cn(inputVariants(), className)}>
      <QuestionnairePrimitive.Input
        data-slot="input-control"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-(--input-px) outline-none",
          "font-semibold font-zero-text text-inherit [font-size:inherit] caret-zero-accent placeholder:text-zero-text-3",
        )}
        {...props}
      />
    </span>
  );
}

function QuestionnaireError({
  className,
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn(
        "font-bold font-zero text-zero-danger text-zero-sm italic",
        className,
      )}
      {...props}
    />
  );
}

function QuestionnaireActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn(
        "grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2",
        className,
      )}
      {...props}
    />
  );
}

type NavProps = { size?: "sm" | "md" | "lg" };

function QuestionnairePrevious({
  children,
  className,
  size = "md",
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Previous> & NavProps) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      className={cn(
        buttonVariants({ variant: "ghost", size, cut: "start" }),
        "col-start-1 row-start-1 justify-self-start",
        className,
      )}
      {...props}
    >
      {children ?? "Previous"}
    </QuestionnairePrimitive.Previous>
  );
}

function QuestionnaireSkip({
  children,
  className,
  size = "md",
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Skip> & NavProps) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      className={cn(
        buttonVariants({ variant: "secondary", size, cut: "both" }),
        "col-start-2 row-start-1",
        className,
      )}
      {...props}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  );
}

function QuestionnaireNext({
  children,
  className,
  size = "md",
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Next> & NavProps) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      className={cn(
        buttonVariants({ variant: "primary", size }),
        "col-start-3 row-start-1",
        className,
      )}
      {...props}
    >
      {children ?? "Next"}
    </QuestionnairePrimitive.Next>
  );
}

function QuestionnaireSubmit({
  children,
  className,
  size = "md",
  ...props
}: ComponentProps<typeof QuestionnairePrimitive.Submit> & NavProps) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      className={cn(
        buttonVariants({ variant: "primary", size }),
        "col-start-3 row-start-1",
        className,
      )}
      {...props}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  );
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
};
