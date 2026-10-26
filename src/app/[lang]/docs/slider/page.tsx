import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SliderBasic from "../_demos/slider-basic";

export const generateMetadata = metadataFor("/docs/slider");

export default async function SliderPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/slider")} />
      <DocHeader
        title="Slider"
        lead="A thin slanted well for a track, the chosen stretch in the accent, and a slab for each thumb that lifts to the accent while it is dragged."
      />
      <DocSection id="install">
        <Install item="slider" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="slider-basic" title="One value, and a range">
          <SliderBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            Pass one number for one thumb, or an array of two for a range. Arrow
            keys move the focused thumb by a step; Page Up and Page Down by
            more.
          </p>
          <p>Horizontal only. Sized in em.</p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Slider"
          base={{
            name: "Slider.Root",
            href: "https://base-ui.com/react/components/slider",
          }}
          rows={[
            {
              name: "value",
              type: "number | number[]",
              description: "The value, controlled; with onValueChange.",
            },
            {
              name: "defaultValue",
              type: "number | number[]",
              description: "The value, uncontrolled.",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "The lowest value.",
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "The highest value.",
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "How far one arrow key moves a thumb.",
            },
            {
              name: "minStepsBetweenValues",
              type: "number",
              default: "0",
              description: "For a range: how close the two thumbs may come.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
