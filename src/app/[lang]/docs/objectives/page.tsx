import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ObjectivesShift from "../_demos/objectives-shift";

export const generateMetadata = metadataFor("/docs/objectives");

export default async function ObjectivesPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/objectives")} />
      <DocHeader
        title="Objectives"
        lead={pick({
          en: "A quest and objective tracker for React: a leaning header over a dark band, a slanted mark per objective, and a strike drawn through what is done.",
          zh: "React 任务目标追踪组件：深色横条上方为斜体标题，每个目标前带一个斜切标记，已完成的目标以删除线标出。",
        })}
      />
      <DocSection id="install">
        <Install item="objectives" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="objectives-shift"
          title={pick({ en: "A shift's objectives", zh: "班次任务目标" })}
        >
          <ObjectivesShift />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Each objective has a slanted mark: an empty frame while it
                  waits, the accent frame while it is the one in hand, the
                  filled accent with a check when done, red with a cross when it
                  failed. A done or failed title is struck through, the line
                  drawn across from the start. The band behind fades out to the
                  right, so it can sit over a map or a scene.
                </p>
                <p>
                  The state is also said in words to screen readers ("Done:",
                  "Current:"). <code>ObjectiveCount</code> sits at the line's
                  end; <code>ObjectiveDescription</code> goes under the title.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个目标前有一个斜切标记：未开始时为空框，进行中为强调色边框，完成时填满强调色并带对勾，失败时为红色并带叉号。已完成或已失败的目标，标题会从左端开始画出一道删除线。背后的横条向右渐隐，因此可以叠放在地图或场景之上。
                </p>
                <p>
                  状态也会以文字告知读屏软件（「Done:」「Current:」）。
                  <code>ObjectiveCount</code> 位于该行末尾；
                  <code>ObjectiveDescription</code> 位于标题下方。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Objective"
          rows={[
            {
              name: "state",
              type: '"pending" | "active" | "done" | "failed"',
              default: '"pending"',
              description: pick({
                en: "Its mark, and how its title is drawn.",
                zh: "标记样式，以及标题的绘制方式。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Objectives, ObjectivesHeader, ObjectiveTitle, ObjectiveCount, ObjectiveDescription"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
