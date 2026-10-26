import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CutInTones from "../_demos/cut-in-tones";
import GlitchHeading from "../_demos/glitch-heading";

export const generateMetadata = metadataFor("/docs/cut-in");

export default async function CutInPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/cut-in")} />
      <DocHeader
        title="Cut-in"
        lead="A band thrown across the screen for a moment that matters, the way a game announces one: it wipes in on the slant, holds, and wipes out."
      />
      <DocSection id="install">
        <Install item="cut-in" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="cut-in-tones" title="Three moments">
          <CutInTones />
        </Demo>
        <Demo file="glitch-heading" title="The glitch on its own">
          <GlitchHeading />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A black band between two lines of the tone's colour (the accent,
            danger, or the legendary tier), a leaning eyebrow, a big tilted
            title that glitches as it lands, and a line under it. It closes by
            itself after <code>duration</code>, on Escape or on a click
            elsewhere; it does not take focus or block the page, and it is
            announced politely.
          </p>
          <p>
            The two motions are the foundation's: <code>cut-in</code>, a wipe
            whose edge leans on the slant (on <code>--zero-dur-cut</code>), and{" "}
            <code>glitch</code>, a few stepped jumps that split a heading into a
            red and a blue ghost (on <code>--zero-dur-glitch</code>). Use{" "}
            <code>glitch</code> on any heading. Under reduced motion neither
            plays: the band appears and goes.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="CutIn"
          rows={[
            {
              name: "open / defaultOpen / onOpenChange",
              type: "boolean / boolean / (open) => void",
              description: "Open, controlled or not.",
            },
            {
              name: "duration",
              type: "number",
              default: "2400",
              description: "Milliseconds it holds; 0 keeps it until dismissed.",
            },
          ]}
        />
        <PropsTable
          part="CutInContent"
          rows={[
            {
              name: "tone",
              type: '"accent" | "danger" | "legendary"',
              default: '"accent"',
              description: "The colour of its lines and eyebrow.",
            },
          ]}
        />
        <PropsTable
          part="CutInEyebrow, CutInTitle, CutInDescription, CutInTrigger"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
