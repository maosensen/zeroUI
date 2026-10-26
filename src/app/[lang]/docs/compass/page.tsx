import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A game compass strip for React: ticks and the eight points sliding past a notch, with markers for objectives at their bearings.",
          zh: "React 游戏罗盘条组件：刻度与八个方位从中央缺口处滑过，任务目标的标记显示在各自的方位角上。",
        })}
      />
      <DocSection id="install">
        <Install item="compass" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="compass-heading"
          title={pick({ en: "Turn and watch the markers", zh: "转向与标记" })}
        >
          <CompassHeading />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A slab cut on both sides holding a tick every 15°, the eight
                  points lettered (north in the accent), a notch in the middle
                  for where you face, and the bearing under it. Markers ride the
                  strip at their bearing; one outside the view waits at the
                  nearer edge with a chevron pointing the way.
                </p>
                <p>
                  Feed <code>heading</code> from your game every frame: the
                  strip draws, it does not animate. Screen readers get the
                  heading and each marker's direction in words ("Drop zone: 50
                  degrees right").
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  罗盘条是一块斜切块，每 15°
                  一道刻度，八个方位以字母标注（北为强调色）；中央的缺口指示当前朝向，下方显示方位角。标记按各自的方位角显示在罗盘条上；超出视野的标记停靠在较近一侧的边缘，并以箭头指向其所在方向。
                </p>
                <p>
                  每一帧都从游戏中传入 <code>heading</code>
                  ：罗盘条只负责绘制，不做动画。读屏软件会以文字读出朝向与每个标记的方向（「Drop
                  zone: 50 degrees right」）。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Compass"
          rows={[
            {
              name: "heading",
              type: "number",
              description: pick({
                en: "Where you face, in degrees; 0 is north, 90 east.",
                zh: "朝向，单位为度；0 为北，90 为东。",
              }),
            },
            {
              name: "markers",
              type: '{ bearing: number; label: string; tone?: "accent" | "danger" | "rare" | "legendary" }[]',
              default: "[]",
              description: pick({
                en: "Things to point at.",
                zh: "要指示的目标。",
              }),
            },
            {
              name: "fov",
              type: "number",
              default: "180",
              description: pick({
                en: "How many degrees the strip spans.",
                zh: "罗盘条覆盖的角度。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
