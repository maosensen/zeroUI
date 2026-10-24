import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/zero/tabs";
import { REGISTRY_URL } from "@/lib/site";
import { CodeBlock } from "./code-block";

const runners = [
  { id: "pnpm", run: "pnpm dlx" },
  { id: "npm", run: "npx" },
  { id: "yarn", run: "yarn dlx" },
  { id: "bun", run: "bunx --bun" },
] as const;

/** The two commands: the namespace once per project, then the item. */
export function Install({ item }: { item: string }) {
  return (
    <Tabs size="sm" defaultValue="pnpm" className="gap-3">
      <TabsList>
        {runners.map(({ id }) => (
          <TabsTab key={id} value={id}>
            {id}
          </TabsTab>
        ))}
      </TabsList>
      {runners.map(({ id, run }) => (
        <TabsPanel key={id} value={id}>
          <CodeBlock
            lang="bash"
            title="terminal"
            code={`# once per project: where @zeroui items come from
${run} shadcn@latest registry add @zeroui=${REGISTRY_URL}

${run} shadcn@latest add @zeroui/${item}`}
          />
        </TabsPanel>
      ))}
    </Tabs>
  );
}
