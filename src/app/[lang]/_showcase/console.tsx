"use client";

import { type FormEvent, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/zero/attachment";
import { Badge } from "@/components/zero/badge";
import { Bubble, BubbleContent } from "@/components/zero/bubble";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/zero/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/zero/chart";
import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/zero/command";
import { ArrowRightIcon, CheckIcon } from "@/components/zero/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/zero/input-group";
import { Marker, MarkerContent } from "@/components/zero/marker";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@/components/zero/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/zero/message-scroller";
import { ToastProvider, useToast } from "@/components/zero/toast";
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/zero/trace";

/*
 * The home page's second scene: a dispatch console built from the later components. A command
 * palette whose actions raise toasts, a channel you can type into, and the week in a chart. All
 * of it is invented for the showcase.
 */

type Action = { value: string; label: string; keys?: string; note: string };

const actions: { value: string; items: Action[] }[] = [
  {
    value: "Jobs",
    items: [
      {
        value: "take",
        label: "Take the next rush job",
        keys: "⌘T",
        note: "Sealed crate, rail yards → north gate.",
      },
      {
        value: "hand-in",
        label: "Hand in the cold box",
        note: "Signed for at the old market.",
      },
      {
        value: "reroute",
        label: "Reroute past Tower 9",
        note: "Six minutes longer, much quieter.",
      },
    ],
  },
  {
    value: "Channel",
    items: [
      {
        value: "ping",
        label: "Ping the north gate",
        keys: "⌘P",
        note: "The gate answered: open until 22:00.",
      },
      {
        value: "mute",
        label: "Mute the east district",
        note: "Muted for an hour.",
      },
    ],
  },
];

const week = [
  { day: "Mon", jobs: 13 },
  { day: "Tue", jobs: 9 },
  { day: "Wed", jobs: 14 },
  { day: "Thu", jobs: 11 },
  { day: "Fri", jobs: 19 },
  { day: "Sat", jobs: 7 },
  { day: "Sun", jobs: 4 },
];

const chartConfig = {
  jobs: { label: "Jobs", color: "var(--zero-chart-1)" },
} satisfies ChartConfig;

type Turn = { who: "Mara" | "You"; text: string; time: string };

const opening: Turn[] = [
  { who: "Mara", text: "Gate 4 is shut tonight.", time: "21:04" },
  { who: "You", text: "Take the canal then.", time: "21:05" },
  { who: "Mara", text: "On it. Eighteen minutes.", time: "21:05" },
];

function Palette() {
  const toast = useToast();
  return (
    <Command items={actions} className="max-h-80">
      <CommandInput placeholder="Type a command" aria-label="Command" />
      <CommandList>
        {(group: (typeof actions)[number]) => (
          <CommandGroup key={group.value} items={group.items}>
            <CommandGroupLabel>{group.value}</CommandGroupLabel>
            <CommandCollection>
              {(item: Action) => (
                <CommandItem
                  key={item.value}
                  value={item}
                  onClick={() =>
                    toast.add({
                      type: "success",
                      title: item.label,
                      description: item.note,
                    })
                  }
                >
                  {item.label}
                  {item.keys ? (
                    <CommandShortcut>{item.keys}</CommandShortcut>
                  ) : null}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
      <CommandEmpty>Nothing matches.</CommandEmpty>
    </Command>
  );
}

function Channel() {
  const [turns, setTurns] = useState(opening);
  const [draft, setDraft] = useState("");
  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const minute = 6 + turns.length - opening.length;
    setTurns([
      ...turns,
      { who: "You", text, time: `21:${String(minute).padStart(2, "0")}` },
    ]);
    setDraft("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>East district</CardTitle>
        <CardDescription>Channel · 3 drivers on shift</CardDescription>
        <CardAction>
          <Badge>Live</Badge>
        </CardAction>
      </CardHeader>
      <div className="h-[26rem] bg-zero-void">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-4 p-4">
                <MessageScrollerItem>
                  <Marker variant="separator">
                    <MarkerContent>Tonight</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
                <MessageScrollerItem>
                  <Trace>
                    <TraceLine>
                      <TraceIcon>
                        <CheckIcon />
                      </TraceIcon>
                      <TraceTitle>
                        Dispatch assigned the sealed crate
                      </TraceTitle>
                      <TraceDescription>21:02</TraceDescription>
                    </TraceLine>
                  </Trace>
                </MessageScrollerItem>
                {turns.map((turn, index) => (
                  <MessageScrollerItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: turns only ever append
                    key={index}
                    scrollAnchor={index === turns.length - 1}
                  >
                    <Message align={turn.who === "You" ? "end" : "start"}>
                      <MessageContent>
                        <MessageHeader>
                          <strong>{turn.who}</strong> {turn.time}
                        </MessageHeader>
                        <Bubble
                          variant={turn.who === "You" ? "default" : "secondary"}
                        >
                          <BubbleContent>{turn.text}</BubbleContent>
                        </Bubble>
                        {index === 0 ? (
                          <Attachment size="sm">
                            <AttachmentMedia variant="image">
                              {/* biome-ignore lint/performance/noImgElement: a small SVG drawn for the showcase */}
                              <img src="/samples/route-map.svg" alt="" />
                            </AttachmentMedia>
                            <AttachmentContent>
                              <AttachmentTitle>route-map.svg</AttachmentTitle>
                              <AttachmentDescription>
                                12 KB
                              </AttachmentDescription>
                            </AttachmentContent>
                          </Attachment>
                        ) : null}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <CardContent className="py-3">
        <form onSubmit={send}>
          <InputGroup size="sm">
            <InputGroupInput
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Say something to the district"
              aria-label="Message"
            />
            <InputGroupAddon align="end">
              <InputGroupButton type="submit" aria-label="Send">
                <ArrowRightIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export function Console() {
  return (
    <ToastProvider>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid gap-6">
          <Palette />
          <Card>
            <CardHeader>
              <CardTitle>This week</CardTitle>
              <CardDescription>Jobs handed in, east district</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="aspect-[5/2] w-full"
              >
                <BarChart data={week} accessibilityLayer>
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor
                  />
                  <Bar dataKey="jobs" fill="var(--color-jobs)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Channel />
      </div>
    </ToastProvider>
  );
}
