import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TickerHarbour from "../_demos/ticker-harbour";

export const metadata = pageMetadata("/docs/ticker");

export default function TickerPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/ticker")} />
      <DocHeader
        title="Ticker"
        lead="A news ticker for React: a band of short items that scrolls across the top of a screen without end, stops when pointed at, and stands still for reduced motion."
      />
      <DocSection id="install" title="Install">
        <Install item="ticker" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="ticker-harbour" title="Notices on a harbour board">
          <TickerHarbour />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The items are written twice and the row is moved by half its width,
            so the loop has no seam. The second copy is <code>aria-hidden</code>{" "}
            and <code>inert</code>: screen readers hear each item once, and Tab
            does not visit it twice.
          </p>
          <p>
            It stops while the pointer is over it or focus is inside, so a link
            in an item can be read and followed. Under reduced motion it does
            not move at all; the band scrolls sideways by hand instead.{" "}
            <code>duration</code> is one full pass in seconds: give a longer
            list more time, so it reads at the same speed.
          </p>
          <p>
            Name it with <code>aria-label</code>; it is a section, so it shows
            up among the page&apos;s landmarks.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Ticker"
          rows={[
            {
              name: "duration",
              type: "number",
              default: "80",
              description: "Seconds for one full pass.",
            },
            {
              name: "aria-label",
              type: "string",
              description: "What the band carries.",
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
              description:
                "An item's line (links inside are styled), the value after it, or the live mark's word.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
