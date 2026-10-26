import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TraceSteps from "../_demos/trace-steps";

export const generateMetadata = metadataFor("/docs/trace");

export default async function TracePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/trace")} />
      <DocHeader
        title="Trace"
        lead={pick({
          en: "The steps an agent took, one line each: an icon, what it did, and a quiet figure at the end.",
          zh: "Agent 执行过的步骤，每步一行：图标、执行的操作，以及行末一个淡色数值。",
        })}
      />
      <DocSection id="install">
        <Install item="trace" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="trace-steps"
          title={pick({ en: "An agent's four steps", zh: "Agent 的四个步骤" })}
        >
          <TraceSteps />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                A step still running is in the accent, one that failed in red,
                one not yet started dimmed. A step can open (TraceCollapsible)
                to show what it read or wrote, behind a quiet line, unfolding
                like Collapsible.
              </p>
            ),
            zh: (
              <p>
                运行中的步骤显示为强调色，失败的为红色，未开始的变暗。步骤可以展开（TraceCollapsible），显示其读取或写入的内容；内容左侧带一条淡色竖线，展开方式与
                Collapsible 相同。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="TraceLine"
          rows={[
            {
              name: "status",
              type: '"running" | "error" | "pending"',
              description: pick({
                en: "Its state; finished when left out.",
                zh: "步骤状态；不传时视为已完成。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Trace, TraceIcon, TraceTitle, TraceDescription, TraceCollapsible, TraceCollapsibleTrigger, TraceCollapsibleContent"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
