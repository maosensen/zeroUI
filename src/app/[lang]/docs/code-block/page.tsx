import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CodeBlockDiff from "../_demos/code-block-diff";

export const generateMetadata = metadataFor("/docs/code-block");

export default async function CodeBlockPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/code-block")} />
      <DocHeader
        title="Code block"
        lead={pick({
          en: "Code in a black well with an ink border, in the host's monospace face, with a copy button and marked lines.",
          zh: "以黑色凹槽展示代码：墨黑边框，使用宿主项目的等宽字体，并带复制按钮与行标记。",
        })}
      />
      <DocSection id="install">
        <Install item="code-block" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="code-block-diff"
          title={pick({
            en: "Numbered, and a change",
            zh: "带行号，以及代码变更",
          })}
        >
          <CodeBlockDiff />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  An optional header holds a title and actions; without one, the
                  actions sit in the corner and show when the block is pointed
                  at. CodeBlockCopyButton copies the code and shows a check for
                  two seconds.
                </p>
                <p>
                  CodeBlockContent numbers its lines with{" "}
                  <code>lineNumbers</code> and wraps long lines with{" "}
                  <code>wrap</code>; otherwise it scrolls sideways.
                  CodeBlockLine marks a line added (the accent edge and a +),
                  removed (red and a −) or highlighted. It does not colour the
                  code itself: pass highlighted spans as children if you need
                  that.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  头部可选，用于放置标题与操作按钮；没有头部时，操作按钮位于角落，指针悬停在
                  CodeBlock 上时才显示。CodeBlockCopyButton
                  复制代码后显示一个对勾，持续两秒。
                </p>
                <p>
                  CodeBlockContent 通过 <code>lineNumbers</code> 显示行号，通过{" "}
                  <code>wrap</code> 让长行自动折行，否则横向滚动。CodeBlockLine
                  可将一行标记为新增（强调色边线与 +）、删除（红色与
                  −）或高亮。组件本身不做语法着色；如有需要，可将已高亮的 span
                  作为子元素传入。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="CodeBlock"
          rows={[
            {
              name: "variant",
              type: '"default" | "danger"',
              default: '"default"',
              description: pick({
                en: "An ink border, or red for an error.",
                zh: "墨黑边框，或表示错误的红色。",
              }),
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: pick({
                en: "Text size and padding.",
                zh: "文字大小与内边距。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CodeBlockContent"
          rows={[
            {
              name: "lineNumbers",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Number each line (string children).",
                zh: "为每行编号（子元素为字符串时）。",
              }),
            },
            {
              name: "wrap",
              type: "boolean",
              default: "false",
              description: pick({
                en: "Wrap long lines instead of scrolling.",
                zh: "长行自动折行，而非横向滚动。",
              }),
            },
            {
              name: "startLine",
              type: "number",
              default: "1",
              description: pick({
                en: "The first line's number.",
                zh: "首行的行号。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CodeBlockLine"
          rows={[
            {
              name: "variant",
              type: '"default" | "added" | "removed" | "highlighted"',
              default: '"default"',
              description: pick({
                en: "How the line is marked.",
                zh: "该行的标记方式。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CodeBlockCopyButton"
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "What it copies.",
                zh: "要复制的内容。",
              }),
            },
            {
              name: "labels",
              type: "{ copy?: string; copied?: string }",
              default: '"Copy" / "Copied"',
              description: pick({
                en: "The button's name before and after copying.",
                zh: "复制前后按钮的可访问名称。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
