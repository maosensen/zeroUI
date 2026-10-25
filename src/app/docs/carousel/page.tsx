import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CarouselCrates from "../_demos/carousel-crates";

export const metadata = pageMetadata("/docs/carousel");

export default function CarouselPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/carousel")} />
      <DocHeader
        title="Carousel"
        lead="Slides that move one after another: dragged, swiped, or stepped with the arrow keys and two raised slab buttons beside it."
      />
      <DocSection id="install" title="Install">
        <Install item="carousel" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="carousel-crates" title="Four jobs to swipe through">
          <CarouselCrates />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            CarouselDots is a row of slanted pips, one per slide, the current
            one longer and in the accent; each pip goes to its slide. It is
            Embla underneath: <code>opts</code> and <code>plugins</code> are
            Embla's, and <code>setApi</code> hands you its API.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Carousel"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Which way the slides run.",
            },
            {
              name: "opts",
              type: "EmblaOptions",
              description: "Embla's options, such as loop or align.",
            },
            {
              name: "setApi",
              type: "(api) => void",
              description: "Receives Embla's API.",
            },
          ]}
        />
        <PropsTable
          part="CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
