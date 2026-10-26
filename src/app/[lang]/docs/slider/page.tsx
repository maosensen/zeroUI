import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A thin slanted well for a track, the chosen stretch in the accent, and a slab for each thumb that lifts to the accent while it is dragged.",
          zh: "轨道是一道细长的斜切凹槽，选中的区段以强调色显示；每个滑块是一块斜切块，拖动时变为强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="slider" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="slider-basic"
          title={pick({ en: "One value, and a range", zh: "单值与范围" })}
        >
          <SliderBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Pass one number for one thumb, or an array of two for a range.
                  Arrow keys move the focused thumb by a step; Page Up and Page
                  Down by more.
                </p>
                <p>Horizontal only. Sized in em.</p>
              </>
            ),
            zh: (
              <>
                <p>
                  传入一个数值时为单个滑块，传入两个数值组成的数组时为范围选择。按方向键，获得焦点的滑块移动一个步长；按
                  Page Up 或 Page Down 则移动更多。
                </p>
                <p>仅支持水平方向。尺寸以 em 为单位。</p>
              </>
            ),
          })}
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
              description: pick({
                en: "The value, controlled; with onValueChange.",
                zh: "当前值（受控），配合 onValueChange 使用。",
              }),
            },
            {
              name: "defaultValue",
              type: "number | number[]",
              description: pick({
                en: "The value, uncontrolled.",
                zh: "默认值（非受控）。",
              }),
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: pick({ en: "The lowest value.", zh: "最小值。" }),
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: pick({ en: "The highest value.", zh: "最大值。" }),
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: pick({
                en: "How far one arrow key moves a thumb.",
                zh: "步长，即按一次方向键时滑块移动的量。",
              }),
            },
            {
              name: "minStepsBetweenValues",
              type: "number",
              default: "0",
              description: pick({
                en: "For a range: how close the two thumbs may come.",
                zh: "范围选择时，两个滑块之间允许的最小间距（以步长计）。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
