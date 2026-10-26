import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CompassHeading from "../_demos/compass-heading";

export const generateMetadata = metadataFor("/docs/compass");

export default async function CompassPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/compass")} />
      <DocHeader
        title="Compass"
        lead="A game compass strip for React: ticks and the eight points sliding past a notch, with markers for objectives at their bearings."
      />
      <DocSection id="install">
        <Install item="compass" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="compass-heading" title="Turn and watch the markers">
          <CompassHeading />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A slab cut on both sides holding a tick every 15°, the eight points
            lettered (north in the accent), a notch in the middle for where you
            face, and the bearing under it. Markers ride the strip at their
            bearing; one outside the view waits at the nearer edge with a
            chevron pointing the way.
          </p>
          <p>
            Feed <code>heading</code> from your game every frame: the strip
            draws, it does not animate. Screen readers get the heading and each
            marker's direction in words ("Drop zone: 50 degrees right").
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Compass"
          rows={[
            {
              name: "heading",
              type: "number",
              description: "Where you face, in degrees; 0 is north, 90 east.",
            },
            {
              name: "markers",
              type: '{ bearing: number; label: string; tone?: "accent" | "danger" | "rare" | "legendary" }[]',
              default: "[]",
              description: "Things to point at.",
            },
            {
              name: "fov",
              type: "number",
              default: "180",
              description: "How many degrees the strip spans.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
