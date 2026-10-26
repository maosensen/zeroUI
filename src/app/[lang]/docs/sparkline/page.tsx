import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import SparklineRelays from "../_demos/sparkline-relays";

export const generateMetadata = metadataFor("/docs/sparkline");

export default async function SparklinePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/sparkline")} />
      <DocHeader
        title="Sparkline"
        lead={pick({
          en: "A sparkline for React in a word's space: a line through a run of numbers with its last point marked, quiet by default and in the accent for the one that matters.",
          zh: "只占一个词宽度的 React 迷你走势图：一条折线连起一组数值，并标出最后一个点；默认为灰色，需要突出的那一条用强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="sparkline" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="sparkline-relays"
          title={pick({
            en: "One rising line among steady ones",
            zh: "平稳走势中的一条上升线",
          })}
        >
          <SparklineRelays />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  It is sized in em, four wide to one tall, so it follows the
                  text it sits beside; set a width and height to change that.
                  The line is scaled to the run&apos;s own peak, so read it for
                  its shape, not against another sparkline&apos;s height. For
                  axes and values, use a <a href={link("/docs/chart")}>Chart</a>
                  .
                </p>
                <p>
                  <code>hot</code> draws it in the accent and lights its last
                  point. Keep that to the few lines that should be seen first; a
                  page of hot lines is no different from a page of quiet ones.
                </p>
                <p>
                  It is an image to screen readers. Without a <code>label</code>{" "}
                  it says the run in words: how many points, where it started,
                  where it ends and its peak.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  尺寸以 em 为单位，宽为高的 4
                  倍，因此随相邻文字一同缩放；设置宽度和高度可改变尺寸。折线按这组数据自身的峰值缩放，只反映走势的形状，不宜与其他迷你走势图比较高低。需要坐标轴与数值时，请使用{" "}
                  <a href={link("/docs/chart")}>Chart</a>。
                </p>
                <p>
                  <code>hot</code>{" "}
                  以强调色绘制折线，并点亮最后一个点。仅用于少数需要最先引起注意的折线；满页都用
                  hot，与满页都不用并无区别。
                </p>
                <p>
                  对读屏软件而言，它是一张图片。未提供 <code>label</code>{" "}
                  时，以文字描述这组数据：点的数量、起始值、结束值与峰值。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Sparkline"
          rows={[
            {
              name: "values",
              type: "number[]",
              description: pick({
                en: "The run, oldest first.",
                zh: "数值序列，按从旧到新排列。",
              }),
            },
            {
              name: "hot",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Draw it in the accent, its last point glowing.",
                zh: "以强调色绘制，最后一个点发光。",
              }),
            },
            {
              name: "label",
              type: "string",
              description: pick({
                en: "What screen readers hear instead of the run.",
                zh: "读屏软件朗读的文字，取代对数值的描述。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
