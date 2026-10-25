"use client";

import { useState } from "react";
import { Button } from "@/components/zero/button";
import { Feed, FeedActor, FeedItem, FeedTarget } from "@/components/zero/feed";

type Event = {
  id: number;
  tone: "default" | "accent" | "danger" | "legendary";
  who: string;
  did: string;
  what: string;
  stays?: boolean;
};

const more: Omit<Event, "id">[] = [
  { tone: "accent", who: "You", did: "delivered", what: "a sealed crate" },
  { tone: "danger", who: "Patrol", did: "spotted", what: "Juniper" },
  { tone: "legendary", who: "Nightjar", did: "found", what: "the gate key" },
  { tone: "default", who: "Tallow", did: "joined", what: "the shift" },
];

export default function FeedEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      tone: "default",
      who: "Rook",
      did: "picked up",
      what: "two power cells",
      stays: true,
    },
    {
      id: 2,
      tone: "accent",
      who: "Sable-9",
      did: "delivered",
      what: "a sealed crate",
      stays: true,
    },
  ]);
  const [next, setNext] = useState(3);
  return (
    <div className="grid w-full max-w-md justify-items-end gap-5">
      <Feed aria-label="Events" className="min-h-40 content-end">
        {events.map((e) => (
          <FeedItem
            key={e.id}
            tone={e.tone}
            duration={e.stays ? 0 : 5000}
            onExpire={() =>
              setEvents((list) => list.filter((x) => x.id !== e.id))
            }
          >
            <FeedActor>{e.who}</FeedActor> {e.did}{" "}
            <FeedTarget>{e.what}</FeedTarget>
          </FeedItem>
        ))}
      </Feed>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setEvents((list) => [
            ...list.slice(-4),
            { id: next, ...more[next % more.length] },
          ]);
          setNext((n) => n + 1);
        }}
      >
        Something happens
      </Button>
    </div>
  );
}
