import * as icons from "@/components/zero/icons";
import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "../_components/code-block";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";

export const generateMetadata = metadataFor("/docs/icons");

// every export ending in Icon except the factory that makes them
const set = Object.entries(icons).filter(
  ([name]) => name.endsWith("Icon") && name !== "createIcon",
) as [string, typeof icons.CheckIcon][];

const kebab = (name: string) =>
  name
    .replace(/Icon$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

export default async function IconsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/icons")} />
      <DocHeader
        title={pick({ en: "Icons", zh: "图标" })}
        lead={pick({
          en: "Thirty solid icons drawn for zzzUI on a 24-unit grid, interface glyphs and a few things to carry. Strokes end on the same slant as the slabs, corners are cut, and only things round by nature are curved.",
          zh: "专为 zzzUI 绘制的 30 个实心图标，基于 24 单位网格，包括界面符号和几件道具。笔画末端的斜角与斜切块相同，转角一律斜切，仅本身为圆形的物体使用曲线。",
        })}
      />
      <DocSection id="install">
        <Prose>
          {pick({
            en: (
              <p>
                All of them, with an index to import from — or one at a time as{" "}
                <code>@zzzui/icon-search</code>, <code>@zzzui/icon-check</code>…
              </p>
            ),
            zh: (
              <p>
                一次安装全部图标，附带一个统一导出的 index
                文件；也可以逐个安装，如 <code>@zzzui/icon-search</code>、
                <code>@zzzui/icon-check</code>
                ……
              </p>
            ),
          })}
        </Prose>
        <Install item="icons" />
      </DocSection>
      <DocSection id="set" title={pick({ en: "The set", zh: "全部图标" })}>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-3">
          {set.map(([name, Icon]) => (
            <li
              key={name}
              className="grid justify-items-center gap-3 border-(length:--zero-stroke-thin) border-zero-line bg-zero-void px-3 pt-5 pb-3"
            >
              <Icon className="size-8 text-zero-text" />
              <span className="grid justify-items-center gap-0.5 text-center">
                <span className="font-bold font-zero text-zero-sm italic">
                  {name}
                </span>
                <span className="font-mono text-[0.7rem] text-zero-text-3">
                  icon-{kebab(name)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </DocSection>
      <DocSection id="usage" title={pick({ en: "Usage", zh: "用法" })}>
        <Prose>
          {pick({
            en: (
              <p>
                An icon is <code>1.25em</code> square and takes the text colour,
                so inside a button, a tab or an input it sizes and colours
                itself. Decorative by default; give it a <code>title</code> when
                it stands alone and means something.
              </p>
            ),
            zh: (
              <p>
                图标为 <code>1.25em</code>{" "}
                见方，颜色取自当前文字颜色，因此用在按钮、标签页或输入框中时，尺寸和颜色会自动适配。图标默认视为装饰；单独出现且承载含义时，应为其设置{" "}
                <code>title</code>。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock
          code={`import { Button } from "@/components/zero/button";
import { ArrowRightIcon, AlertIcon } from "@/components/zero/icons";

<Button variant="secondary">
  Next job
  <ArrowRightIcon />
</Button>

<AlertIcon title="Overdue" className="text-zero-danger" />`}
        />
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part={pick({ en: "Every icon", zh: "所有图标" })}
          rows={[
            {
              name: "title",
              type: "string",
              description: pick({
                en: 'Makes the icon meaningful on its own: role="img", named by the title.',
                zh: '让图标独立表意：图标获得 role="img"，并以 title 作为可访问名称。',
              }),
            },
            {
              name: "outline",
              type: "boolean",
              default: "false",
              description: pick({
                en: "An ink outline around the whole shape, for an icon on the accent or on an image.",
                zh: "沿整个形状添加墨黑描边，适用于置于强调色或图片之上的图标。",
              }),
            },
            {
              name: "className",
              type: "string",
              description: pick({
                en: "A size-* class overrides the 1.25em; a text-* class sets the colour.",
                zh: "size-* 类覆盖默认的 1.25em；text-* 类设置颜色。",
              }),
            },
          ]}
        />
        <PropsTable
          part="createIcon(name, shape)"
          rows={[
            {
              name: "shape.d",
              type: "string",
              description: pick({
                en: "The path, on the 24-unit grid.",
                zh: "路径数据，基于 24 单位网格。",
              }),
            },
            {
              name: "shape.fillRule",
              type: '"nonzero" | "evenodd"',
              default: '"nonzero"',
              description: pick({
                en: "evenodd turns overlapping paths into holes.",
                zh: "设为 evenodd 时，路径重叠处镂空。",
              }),
            },
            {
              name: "shape.cut",
              type: "string",
              description: pick({
                en: "A region taken out of d, for an opening a fill rule cannot make.",
                zh: "从 d 中挖去的区域，用于填充规则无法实现的开口。",
              }),
            },
            {
              name: "shape.over",
              type: "string",
              description: pick({
                en: "Drawn on top after the cut.",
                zh: "在挖去 cut 之后绘制，叠在最上层。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
