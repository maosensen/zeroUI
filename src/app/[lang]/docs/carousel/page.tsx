import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CarouselCrates from "../_demos/carousel-crates";

export const generateMetadata = metadataFor("/docs/carousel");

export default async function CarouselPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/carousel")} />
      <DocHeader
        title="Carousel"
        lead={pick({
          en: "Slides that move one after another: dragged, swiped, or stepped with the arrow keys and two raised slab buttons beside it.",
          zh: "逐张切换的幻灯片：可拖动、滑动，也可用方向键或两侧的浮起色斜切块按钮切换。",
        })}
      />
      <DocSection id="install">
        <Install item="carousel" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="carousel-crates"
          title={pick({
            en: "Four jobs to swipe through",
            zh: "可滑动浏览的四个委托",
          })}
        >
          <CarouselCrates />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                CarouselDots is a row of slanted pips, one per slide, the
                current one longer and in the accent; each pip goes to its
                slide. It is Embla underneath: <code>opts</code> and{" "}
                <code>plugins</code> are Embla's, and <code>setApi</code> hands
                you its API.
              </p>
            ),
            zh: (
              <p>
                CarouselDots
                是一排倾斜指示条，每张幻灯片对应一条，当前一条更长并显示为强调色；点击指示条即跳转到对应的幻灯片。底层基于
                Embla：<code>opts</code> 与 <code>plugins</code> 即 Embla
                的选项与插件，<code>setApi</code> 用于获取 Embla 的 API。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Carousel"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: pick({
                en: "Which way the slides run.",
                zh: "幻灯片的排列方向。",
              }),
            },
            {
              name: "opts",
              type: "EmblaOptions",
              description: pick({
                en: "Embla's options, such as loop or align.",
                zh: "Embla 的选项，例如 loop、align。",
              }),
            },
            {
              name: "setApi",
              type: "(api) => void",
              description: pick({
                en: "Receives Embla's API.",
                zh: "接收 Embla 的 API。",
              }),
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
