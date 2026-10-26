import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TickerHarbour from "../_demos/ticker-harbour";

export const generateMetadata = metadataFor("/docs/ticker");

export default async function TickerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/ticker")} />
      <DocHeader
        title="Ticker"
        lead={pick({
          en: "A news ticker for React: a band of short items that scrolls across the top of a screen without end, stops when pointed at, and stands still for reduced motion.",
          zh: "React 新闻滚动条：一条由短讯组成的横带，在屏幕顶部循环滚动；指针悬停时暂停，开启「减少动态效果」时保持静止。",
        })}
      />
      <DocSection id="install">
        <Install item="ticker" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="ticker-harbour"
          title={pick({
            en: "Notices on a harbour board",
            zh: "港口公告栏上的通知",
          })}
        >
          <TickerHarbour />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The items are written twice and the row is moved by half its
                  width, so the loop has no seam. The second copy is{" "}
                  <code>aria-hidden</code> and <code>inert</code>: screen
                  readers hear each item once, and Tab does not visit it twice.
                </p>
                <p>
                  It stops while the pointer is over it or focus is inside, so a
                  link in an item can be read and followed. Under reduced motion
                  it does not move at all; the band scrolls sideways by hand
                  instead. <code>duration</code> is one full pass in seconds:
                  give a longer list more time, so it reads at the same speed.
                </p>
                <p>
                  Name it with <code>aria-label</code>; it is a section, so it
                  shows up among the page&apos;s landmarks.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  条目渲染两遍，整行平移自身宽度的一半，因此循环首尾无缝衔接。第二份副本设为{" "}
                  <code>aria-hidden</code> 与 <code>inert</code>
                  ：读屏软件对每个条目只朗读一次，按 Tab 也不会重复经过。
                </p>
                <p>
                  指针位于其上或焦点位于其中时停止滚动，以便阅读并访问条目中的链接。开启「减少动态效果」时完全不移动，改为可手动横向滚动。
                  <code>duration</code>{" "}
                  是完整滚动一轮所需的秒数：条目越多，时间应越长，阅读速度才能保持一致。
                </p>
                <p>
                  请用 <code>aria-label</code> 为其命名；它是一个 section
                  元素，会出现在页面的地标（landmark）中。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Ticker"
          rows={[
            {
              name: "duration",
              type: "number",
              default: "80",
              description: pick({
                en: "Seconds for one full pass.",
                zh: "完整滚动一轮所需的秒数。",
              }),
            },
            {
              name: "aria-label",
              type: "string",
              description: pick({
                en: "What the band carries.",
                zh: "说明这条滚动条的内容。",
              }),
            },
          ]}
        />
        <PropsTable
          part="TickerItem / TickerValue / TickerLive"
          rows={[
            {
              name: "children",
              type: "ReactNode",
              default: 'TickerLive: "Live"',
              description: pick({
                en: "An item's line (links inside are styled), the value after it, or the live mark's word.",
                zh: "条目的文字（其中的链接带样式）、条目后的数值，或实时标记上的文字。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
