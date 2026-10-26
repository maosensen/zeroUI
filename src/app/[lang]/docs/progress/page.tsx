import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ProgressKinds from "../_demos/progress-kinds";

export const generateMetadata = metadataFor("/docs/progress");

export default async function ProgressPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/progress")} />
      <DocHeader
        title="Progress"
        lead={pick({
          en: "A thin slanted track filling with the accent, or with segments a row of cells that light up one by one, like a gauge of charges.",
          zh: "一条细长的倾斜轨道，以强调色填充；设置 segments 后变为一排逐格点亮的小格，形如充能槽。",
        })}
      />
      <DocSection id="install">
        <Install item="progress" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="progress-kinds"
          title={pick({
            en: "A bar, a gauge of charges, an unknown amount",
            zh: "进度条、充能槽与未知进度",
          })}
        >
          <ProgressKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Without a value (<code>value=&#123;null&#125;</code>) the
                  amount is unknown: a short block sweeps the track back and
                  forth. Under reduced motion it holds still as a dim fill of
                  the whole track.
                </p>
                <p>
                  The bar is a <code>progressbar</code> named by its label;
                  ProgressValue shows the formatted number and takes Base UI's{" "}
                  <code>format</code>.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  不传数值（<code>value=&#123;null&#125;</code>
                  ）时表示进度未知：一小段色块在轨道上来回扫动。系统开启「减少动态效果」时不再扫动，改为以暗色静态填满整条轨道。
                </p>
                <p>
                  进度条的 ARIA 角色为 <code>progressbar</code>
                  ，可访问名称取自其标签；ProgressValue
                  显示格式化后的数值，并接受 Base UI 的 <code>format</code>。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Progress"
          base={{
            name: "Progress.Root",
            href: "https://base-ui.com/react/components/progress",
          }}
          rows={[
            {
              name: "value",
              type: "number | null",
              description: pick({
                en: "How far it has got; null when unknown.",
                zh: "当前进度；未知时为 null。",
              }),
            },
            {
              name: "segments",
              type: "number",
              description: pick({
                en: "Splits the bar into this many cells, each lit once its share is reached.",
                zh: "将进度条等分为指定数量的小格，进度每覆盖一格即点亮该格。",
              }),
            },
            {
              name: "min / max",
              type: "number",
              default: "0 / 100",
              description: pick({ en: "The range.", zh: "取值范围。" }),
            },
          ]}
        />
        <PropsTable
          part="ProgressLabel, ProgressValue"
          base={{
            name: "Progress.Label",
            href: "https://base-ui.com/react/components/progress",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
