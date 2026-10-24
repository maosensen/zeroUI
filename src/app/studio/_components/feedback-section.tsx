"use client";

import { type ReactNode, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/zero/alert";
import { Button } from "@/components/zero/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/zero/progress";
import { Skeleton, SkeletonText } from "@/components/zero/skeleton";
import { Slider } from "@/components/zero/slider";
import { ToastProvider, useToast } from "@/components/zero/toast";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

const messages = {
  info: ["Route updated", "The north gate opens an hour later tonight."],
  success: ["Job taken", "Reach the north gate before 22:00."],
  warning: ["Low on fuel", "Refuel before you take the next job."],
  danger: ["Crate damaged", "The reward drops by half."],
} as const;

/** The feedback family: alert, progress, skeleton, toast. */
export function FeedbackSection() {
  return (
    <ToastProvider>
      <Feedback />
    </ToastProvider>
  );
}

function Feedback() {
  const [value, setValue] = useState(40);
  const toast = useToast();
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Feedback</h2>
      <div>
        <Row label="alert">
          <div className="grid w-full max-w-xl gap-3">
            {(Object.keys(messages) as (keyof typeof messages)[]).map(
              (variant) => (
                <Alert key={variant} variant={variant}>
                  <AlertTitle>{messages[variant][0]}</AlertTitle>
                  <AlertDescription>{messages[variant][1]}</AlertDescription>
                </Alert>
              ),
            )}
            <Alert variant="success">
              <AlertTitle>Title only</AlertTitle>
            </Alert>
          </div>
        </Row>
        <Row label="progress">
          <div className="grid w-full max-w-xl gap-6">
            <Slider
              value={value}
              onValueChange={(next) => setValue(next as number)}
            />
            <Progress value={value}>
              <ProgressLabel>Uploading the route</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={value} segments={10}>
              <ProgressLabel>Charges</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={null}>
              <ProgressLabel>Finding a driver</ProgressLabel>
            </Progress>
          </div>
        </Row>
        <Row label="skeleton">
          <div className="grid w-full max-w-xl grid-cols-[6rem_1fr] gap-4">
            <Skeleton className="size-24" />
            <div className="grid content-start gap-4">
              <SkeletonText />
              <Skeleton shape="slab" />
            </div>
          </div>
        </Row>
        <Row label="toast">
          {(Object.keys(messages) as (keyof typeof messages)[]).map((type) => (
            <Button
              key={type}
              variant="secondary"
              onClick={() =>
                toast.add({
                  type,
                  title: messages[type][0],
                  description: messages[type][1],
                })
              }
            >
              {type}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={() =>
              toast.add({
                type: "info",
                title: "Driver found",
                description: "Mara takes the crate at 21:10.",
                actionProps: { children: "Call" },
              })
            }
          >
            With an action
          </Button>
        </Row>
      </div>
    </section>
  );
}
