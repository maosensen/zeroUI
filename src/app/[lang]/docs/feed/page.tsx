import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "An event feed for React, the way a game reports what just happened: bands that slide in at the edge of the screen and fold away.",
          zh: "React 事件播报组件，仿照游戏中的战况播报，展示刚刚发生的事件：横条从屏幕边缘滑入，随后收起。",
        })}
      />
      <DocSection id="install">
        <Install item="feed" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="feed-events"
          title={pick({ en: "Events coming in", zh: "陆续出现的事件" })}
        >
          <FeedEvents />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Each event is a dark band fading out to the left with an edge
                  in its tone, sliding in from the right; the newest is at the
                  bottom. After <code>duration</code> it calls{" "}
                  <code>onExpire</code>: drop it from your list and it folds
                  away while the rest close up.
                </p>
                <p>
                  The list is a polite live region, so each new event is read
                  out once. <code>FeedActor</code> sets who did it in the
                  display face and the tone; <code>FeedTarget</code> what it was
                  done to. Under reduced motion they appear and go without
                  sliding.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每条事件是一道向左渐隐的深色横条，一侧边缘以该条的色调着色，从右侧滑入；最新的一条在最下方。经过{" "}
                  <code>duration</code> 后调用 <code>onExpire</code>
                  ：将该条从列表中移除，它就会收起，其余条目随之合拢。
                </p>
                <p>
                  列表是 polite 级别的实时区域，每条新事件只读出一次。
                  <code>FeedActor</code> 以展示字体和该条的色调标出执行者；
                  <code>FeedTarget</code>{" "}
                  标出作用对象。开启「减少动态效果」时，事件直接出现和消失，不再滑动。
                </p>
              </>
            ),
          })}
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
              description: pick({
                en: "Its edge, and the actor's colour.",
                zh: "边缘颜色，以及执行者的颜色。",
              }),
            },
            {
              name: "duration",
              type: "number",
              default: "5000",
              description: pick({
                en: "Milliseconds before onExpire; 0 keeps it.",
                zh: "触发 onExpire 前的毫秒数；为 0 时常驻。",
              }),
            },
            {
              name: "onExpire",
              type: "() => void",
              description: pick({
                en: "Time to drop it.",
                zh: "应移除该条目时调用。",
              }),
            },
          ]}
        />
        <PropsTable part="Feed, FeedActor, FeedTarget" rows={[]} />
      </DocSection>
    </>
  );
}
