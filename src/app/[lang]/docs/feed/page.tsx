import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import FeedEvents from "../_demos/feed-events";

export const generateMetadata = metadataFor("/docs/feed");

export default async function FeedPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/feed")} />
      <DocHeader
        title="Feed"
        lead="An event feed for React, the way a game reports what just happened: bands that slide in at the edge of the screen and fold away."
      />
      <DocSection id="install">
        <Install item="feed" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="feed-events" title="Events coming in">
          <FeedEvents />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Each event is a dark band fading out to the left with an edge in its
            tone, sliding in from the right; the newest is at the bottom. After{" "}
            <code>duration</code> it calls <code>onExpire</code>: drop it from
            your list and it folds away while the rest close up.
          </p>
          <p>
            The list is a polite live region, so each new event is read out
            once. <code>FeedActor</code> sets who did it in the display face and
            the tone; <code>FeedTarget</code> what it was done to. Under reduced
            motion they appear and go without sliding.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="FeedItem"
          rows={[
            {
              name: "tone",
              type: '"default" | "accent" | "danger" | "rare" | "legendary"',
              default: '"default"',
              description: "Its edge, and the actor's colour.",
            },
            {
              name: "duration",
              type: "number",
              default: "5000",
              description: "Milliseconds before onExpire; 0 keeps it.",
            },
            {
              name: "onExpire",
              type: "() => void",
              description: "Time to drop it.",
            },
          ]}
        />
        <PropsTable part="Feed, FeedActor, FeedTarget" rows={[]} />
      </DocSection>
    </>
  );
}
