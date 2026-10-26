import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import MarkerKinds from "../_demos/marker-kinds";

export const generateMetadata = metadataFor("/docs/marker");

export default async function MarkerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/marker")} />
      <DocHeader
        title="Marker"
        lead={pick({
          en: "A note in the run of a conversation that nobody said: someone joined, a date, a reconnection. Small, quiet and leaning.",
          zh: "对话流中不属于任何人发言的提示，例如有人加入、日期、重新连接。字号小、颜色淡、斜体。",
        })}
      />
      <DocSection id="install">
        <Install item="marker" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="marker-kinds"
          title={pick({
            en: "A date, an event, an archive line",
            zh: "日期、事件与归档提示",
          })}
        >
          <MarkerKinds />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                <code>separator</code> sets it between two quiet lines across
                the width; <code>border</code> puts a line under it. MarkerIcon
                puts an icon before it.
              </p>
            ),
            zh: (
              <p>
                <code>separator</code> 将其置于横贯全宽的两条淡色细线之间；
                <code>border</code> 在其下方添加一条线。MarkerIcon
                在其前方放置图标。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Marker"
          rows={[
            {
              name: "variant",
              type: '"default" | "separator" | "border"',
              default: '"default"',
              description: pick({
                en: "Plain, between lines, or over one.",
                zh: "无装饰、夹在两条线之间，或位于一条线之上。",
              }),
            },
            {
              name: "render",
              type: "ReactElement",
              description: pick({
                en: "The element to render as.",
                zh: "渲染为指定元素。",
              }),
            },
          ]}
        />
        <PropsTable part="MarkerIcon, MarkerContent" rows={[]} />
      </DocSection>
    </>
  );
}
