import { DailySchedule } from "@/components/blocks/daily-schedule";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/daily-schedule");

export default async function DailySchedulePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/daily-schedule")} />
      <DocHeader
        title="Daily schedule"
        lead={pick({
          en: "A day planner the way a game shows it: four shifts side by side, the one under way framed and marked NOW, past ones dimmed, each with its errands as objectives.",
          zh: "以游戏界面呈现的每日日程：四个时段并排，进行中的时段加框并标出 NOW，已过去的时段变暗，各时段的待办事项以任务目标的形式列出。",
        })}
      />
      <DocSection id="install">
        <Install item="daily-schedule" />
      </DocSection>
      <DocSection id="preview">
        <Block name="daily-schedule">
          <DailySchedule />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Each shift is a box with its name, hours and errands as{" "}
                  <a href={link("/docs/objectives")}>Objectives</a>: done ones
                  struck through, the current one in the accent with its count.
                  The shift under way is framed and marked NOW (and is the
                  list's current item for screen readers); those gone by are
                  dimmed.
                </p>
                <p>
                  The shifts sit four across, two across, or stacked, by the
                  block's own width (a container query).
                </p>
                <p>
                  Built from <a href={link("/docs/objectives")}>Objectives</a>,{" "}
                  <a href={link("/docs/badge")}>Badge</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个时段是一个方框，包含名称、起止时间，以及以{" "}
                  <a href={link("/docs/objectives")}>Objectives</a>{" "}
                  列出的待办事项：已完成的加删除线，当前事项以强调色显示并附带计数。进行中的时段加框并标出
                  NOW（对读屏软件而言，它是列表的当前项）；已过去的时段变暗。
                </p>
                <p>
                  根据代码块自身的宽度（容器查询），各时段排成四列、两列，或上下堆叠。
                </p>
                <p>
                  由 <a href={link("/docs/objectives")}>Objectives</a>、
                  <a href={link("/docs/badge")}>Badge</a>、
                  <a href={link("/docs/button")}>Button</a>{" "}
                  组成，安装此代码块时会一并安装这些组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
