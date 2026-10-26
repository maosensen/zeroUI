import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InputGroupReward from "../_demos/input-group-reward";

export const generateMetadata = metadataFor("/docs/input-group");

export default async function InputGroupPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/input-group")} />
      <DocHeader
        title="Input group"
        lead={pick({
          en: "Input's well, taken apart: an input with addons at either end, text, icons, keys or small buttons, in any number.",
          zh: "将 Input 的输入槽拆分开来：输入框两端可放置任意数量的附加项，如文字、图标、按键或小按钮。",
        })}
      />
      <DocSection id="install">
        <Install item="input-group" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="input-group-reward"
          title={pick({
            en: "A unit and a button, an icon and a key",
            zh: "单位与按钮，图标与按键",
          })}
        >
          <InputGroupReward />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                The well behaves like Input's: the focus frame, the invalid
                outline, the disabled fill, which follows the input alone: a
                Send button disabled while nothing is written leaves the well as
                it is. An end that holds an addon takes the input's padding. For
                a single icon or action, Input's own <code>start</code> and{" "}
                <code>end</code> are shorter.
              </p>
            ),
            zh: (
              <p>
                输入槽的表现与 Input
                一致：焦点框、校验失败时的描边、禁用时的填充。禁用时的填充只取决于输入框本身：发送按钮在未输入内容时处于禁用状态，不会改变输入槽的外观。放置附加项的一端，该侧的内边距改由附加项提供。若只需一个图标或一个操作，使用
                Input 自带的 <code>start</code> 与 <code>end</code> 更简洁。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="InputGroup"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "Input's heights.",
                zh: "与 Input 相同的高度档位。",
              }),
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description: pick({
                en: "Which edges are cut on the slant.",
                zh: "斜切哪一侧。",
              }),
            },
          ]}
        />
        <PropsTable
          part="InputGroupAddon"
          rows={[
            {
              name: "align",
              type: '"start" | "end"',
              default: '"start"',
              description: pick({
                en: "Which end it sits at.",
                zh: "位于哪一端。",
              }),
            },
          ]}
        />
        <PropsTable
          part="InputGroupInput, InputGroupText, InputGroupButton"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
