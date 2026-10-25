import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CodeBlockDiff from "../_demos/code-block-diff";

export const metadata = pageMetadata("/docs/code-block");

export default function CodeBlockPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/code-block")} />
      <DocHeader
        title="Code block"
        lead="Code in a black well with an ink border, in the host's monospace face, with a copy button and marked lines."
      />
      <DocSection id="install" title="Install">
        <Install item="code-block" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="code-block-diff" title="Numbered, and a change">
          <CodeBlockDiff />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            An optional header holds a title and actions; without one, the
            actions sit in the corner and show when the block is pointed at.
            CodeBlockCopyButton copies the code and shows a check for two
            seconds.
          </p>
          <p>
            CodeBlockContent numbers its lines with <code>lineNumbers</code> and
            wraps long lines with <code>wrap</code>; otherwise it scrolls
            sideways. CodeBlockLine marks a line added (the accent edge and a
            +), removed (red and a −) or highlighted. It does not colour the
            code itself: pass highlighted spans as children if you need that.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="CodeBlock"
          rows={[
            {
              name: "variant",
              type: '"default" | "danger"',
              default: '"default"',
              description: "An ink border, or red for an error.",
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: "Text size and padding.",
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
              description: "Number each line (string children).",
            },
            {
              name: "wrap",
              type: "boolean",
              default: "false",
              description: "Wrap long lines instead of scrolling.",
            },
            {
              name: "startLine",
              type: "number",
              default: "1",
              description: "The first line's number.",
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
              description: "How the line is marked.",
            },
          ]}
        />
        <PropsTable
          part="CodeBlockCopyButton"
          rows={[
            {
              name: "value",
              type: "string",
              description: "What it copies.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
