"use client";

import { useState } from "react";
import { Bubble, BubbleContent } from "@/components/zero/bubble";
import { Button } from "@/components/zero/button";
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

const lines = [
  "Leaving the yards now.",
  "Gate 4 is shut.",
  "Taking the canal.",
  "Passing Tower 9.",
  "Two minutes out.",
  "At the north gate.",
];

export default function MessageScrollerChat() {
  const [turns, setTurns] = useState(lines.slice(0, 4));
  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="h-72 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-4 p-4">
                <MessageScrollerItem>
                  <Marker variant="separator">
                    <MarkerContent>Tonight</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
                {turns.map((line, index) => (
                  <MessageScrollerItem
                    key={line}
                    scrollAnchor={index === turns.length - 1}
                  >
                    <Message align={index % 2 ? "end" : "start"}>
                      <MessageContent>
                        <MessageHeader>
                          <strong>{index % 2 ? "You" : "Mara"}</strong>
                          21:{String(4 + index).padStart(2, "0")}
                        </MessageHeader>
                        <Bubble variant={index % 2 ? "default" : "secondary"}>
                          <BubbleContent>{line}</BubbleContent>
                        </Bubble>
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
      <Button
        variant="secondary"
        size="sm"
        disabled={turns.length === lines.length}
        onClick={() => setTurns(lines.slice(0, turns.length + 1))}
      >
        Next message
      </Button>
    </div>
  );
}
