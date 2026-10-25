import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/zero/code-block";

const route = `const route = plan("rail-yards", "north-gate");
route.avoid("gate-4");
await route.go();`;

export default function CodeBlockDiff() {
  return (
    <div className="grid w-full max-w-lg gap-4">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>route.ts</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={route} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>{route}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock size="sm">
        <CodeBlockActions>
          <CodeBlockCopyButton value={'route.via("canal");'} />
        </CodeBlockActions>
        <CodeBlockContent>
          <CodeBlockLine variant="removed">
            route.avoid("gate-4");
          </CodeBlockLine>
          <CodeBlockLine variant="added">route.via("canal");</CodeBlockLine>
          <CodeBlockLine variant="highlighted">await route.go();</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
