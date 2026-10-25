import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CounterCredits from "../_demos/counter-credits";

export const metadata = pageMetadata("/docs/counter");

export default function CounterPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/counter")} />
      <DocHeader
        title="Counter"
        lead="An animated number counter for React: it rolls to each new value and throws the change off it, the way a game counts gold."
      />
      <DocSection id="install" title="Install">
        <Install item="counter" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="counter-credits" title="Credits">
          <CounterCredits />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Set in the display face, leaning, with figures of one width so it
            does not shake as it counts. It rolls on the <code>roll</code>{" "}
            transition; with <code>delta</code>, each change rises off it and
            fades, in the accent when it grows and red when it shrinks.
          </p>
          <p>
            Screen readers get the final value, not the count. Under reduced
            motion it jumps and the change does not rise. It writes numbers in{" "}
            <code>en-US</code> unless given a locale, so the server and the
            browser agree.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Counter"
          rows={[
            {
              name: "value",
              type: "number",
              description: "The number.",
            },
            {
              name: "format",
              type: "Intl.NumberFormatOptions",
              description: "How to write it.",
            },
            {
              name: "locale",
              type: "string",
              default: '"en-US"',
              description: "Whose way of writing numbers.",
            },
            {
              name: "delta",
              type: "boolean",
              description: "Throw each change off the number.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
