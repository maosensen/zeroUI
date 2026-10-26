import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import EmptyBoard from "../_demos/empty-board";

export const generateMetadata = metadataFor("/docs/empty");

export default async function EmptyPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/empty")} />
      <DocHeader
        title="Empty"
        lead={pick({
          en: "What a place shows when it has nothing in it yet: a mark in a slanted black well, a leaning title, a line of explanation, and the action that fills it.",
          zh: "区域尚无内容时显示的空状态：黑色斜切凹槽中的标识、斜体标题、一行说明，以及用于添加内容的操作。",
        })}
      />
      <DocSection id="install">
        <Install item="empty" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="empty-board"
          title={pick({ en: "A district with no jobs", zh: "没有委托的区域" })}
        >
          <EmptyBoard />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It centres itself in the room it is given. Give it a dashed
                outline with <code>className</code> when it stands for a drop
                zone or a slot.
              </p>
            ),
            zh: (
              <p>
                在给定的空间内居中显示。用作拖放区域或空槽位时，可通过{" "}
                <code>className</code> 添加虚线描边。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
