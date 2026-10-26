import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CommandPalette from "../_demos/command-palette";

export const generateMetadata = metadataFor("/docs/command");

export default async function CommandPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/command")} />
      <DocHeader
        title="Command"
        lead={pick({
          en: "A search box over a list of actions, always open: type to narrow it, arrows to move, Enter to run. CommandDialog floats it over the dimmed page.",
          zh: "始终展开的操作列表，上方是搜索框：输入文字缩小范围，方向键切换选项，Enter 执行。CommandDialog 让它浮在变暗的页面之上。",
        })}
      />
      <DocSection id="install">
        <Install item="command" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="command-palette"
          title={pick({
            en: "Inline, and as a ⌘K palette",
            zh: "内嵌，以及 ⌘K 命令面板",
          })}
        >
          <CommandPalette />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The first match is always highlighted, so Enter runs it. The
                  search sits on a black bar; the rows are the Dropdown menu's,
                  filled with the accent while highlighted. Pass the items, or
                  groups of items, to Command and render them from CommandList's
                  function child; an item's <code>label</code> is what typing
                  matches.
                </p>
                <p>
                  It is built on Base UI's Autocomplete, so it needs no other
                  library. The ⌘K shortcut is yours to wire, as in the example.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  第一个匹配项始终处于高亮状态，按 Enter
                  即可执行。搜索框位于黑色横条上；列表行沿用 Dropdown menu
                  的样式，高亮时填充强调色。将条目或条目分组传给 Command，并在
                  CommandList 的函数子元素中渲染；输入的文字与条目的{" "}
                  <code>label</code> 匹配。
                </p>
                <p>
                  组件基于 Base UI 的 Autocomplete 构建，无需其他依赖库。⌘K
                  快捷键需自行绑定，做法见示例。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Command"
          base={{
            name: "Autocomplete.Root",
            href: "https://base-ui.com/react/components/autocomplete",
          }}
          rows={[
            {
              name: "items",
              type: "Item[] | Group[]",
              description: pick({
                en: "What to list; each item needs a label.",
                zh: "列出的条目，每项都需要 label。",
              }),
            },
            {
              name: "filter",
              type: "(item, query) => boolean",
              description: pick({
                en: "Replaces the built-in matching.",
                zh: "替换内置的匹配逻辑。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CommandDialog"
          rows={[
            {
              name: "open / onOpenChange",
              type: "boolean / (open) => void",
              description: pick({
                en: "Open, controlled.",
                zh: "是否打开，受控。",
              }),
            },
            {
              name: "title",
              type: "string",
              default: '"Command palette"',
              description: pick({
                en: "The dialog's accessible name.",
                zh: "对话框的可访问名称。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CommandInput, CommandList, CommandEmpty, CommandGroup, CommandGroupLabel, CommandCollection, CommandItem, CommandSeparator, CommandShortcut"
          base={{
            name: "Autocomplete.Input",
            href: "https://base-ui.com/react/components/autocomplete",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
