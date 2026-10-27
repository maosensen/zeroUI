import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { REGISTRY_URL } from "@/lib/site";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "./_components/code-block";
import { DocHeader, DocSection, Prose } from "./_components/doc";

export const generateMetadata = metadataFor("/docs");

export default async function GettingStartedPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs")} />
      <DocHeader
        title={pick({ en: "Getting started", zh: "快速开始" })}
        lead={pick({
          en: "zzzUI is a dark-only component library with a strong game-UI look. It installs the shadcn way: the code lands in your project, yours to change.",
          zh: "zzzUI 是一套仅暗色、游戏 UI 风格鲜明的组件库。安装方式与 shadcn 相同：代码直接写入项目，可以随意修改。",
        })}
      />

      <DocSection
        id="requirements"
        title={pick({ en: "Before you start", zh: "开始之前" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                A project already set up for shadcn (
                <code>components.json</code>) on Tailwind CSS v4 and React 19.
                zzzUI is built on <strong>Base UI</strong>, not Radix; the
                components bring it with them. It is tested on Next.js.
              </p>
            ),
            zh: (
              <p>
                需要一个已配置好 shadcn 的项目（含 <code>components.json</code>
                ），使用 Tailwind CSS v4 与 React 19。zzzUI 基于{" "}
                <strong>Base UI</strong> 而非 Radix，安装组件时会一并带上。已在
                Next.js 上测试。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="namespace"
        title={pick({ en: "1. Add the namespace", zh: "1. 添加命名空间" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Once per project, tell shadcn where <code>@zzzui</code> items
                come from:
              </p>
            ),
            zh: (
              <p>
                每个项目只需一次：告诉 shadcn 从哪里获取 <code>@zzzui</code>{" "}
                的条目。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code={`pnpm dlx shadcn@latest registry add @zzzui=${REGISTRY_URL}`}
        />
      </DocSection>

      <DocSection
        id="components"
        title={pick({ en: "2. Add components", zh: "2. 添加组件" })}
      >
        <CodeBlock
          lang="bash"
          title="terminal"
          code="pnpm dlx shadcn@latest add @zzzui/button @zzzui/input @zzzui/select"
        />
        <Prose>
          {pick({
            en: (
              <p>
                The first component also brings the <strong>foundation</strong>:
                the tokens, the motion and the slab are written into your
                stylesheet, <code>cn</code> and the motion timings land in{" "}
                <code>lib/zero/</code>, and Montserrat (the display face) and
                Outfit (the text face) are loaded in your layout. Components
                land in <code>components/zero/</code>.
              </p>
            ),
            zh: (
              <p>
                安装第一个组件时会一并带上<strong>地基</strong>
                ：设计 token、动效与斜切块写入样式表，<code>cn</code>{" "}
                与动效时长写入 <code>lib/zero/</code>，Montserrat（展示字体）与
                Outfit（正文字体）在布局中加载。组件本身写入{" "}
                <code>components/zero/</code>。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="theme"
        title={pick({
          en: "3. Go dark (optional)",
          zh: "3. 统一为暗色（可选）",
        })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                zzzUI has no light theme. If the rest of your project uses
                shadcn's variables, this points them at zzzUI's colours, in
                light mode and dark alike, so the whole page matches:
              </p>
            ),
            zh: (
              <p>
                zzzUI 没有亮色主题。如果项目其余部分使用 shadcn
                的变量，下面这条命令会把它们指向 zzzUI
                的配色，亮色与暗色模式一律如此，整页风格因而统一：
              </p>
            ),
          })}
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code="pnpm dlx shadcn@latest add @zzzui/theme"
        />
      </DocSection>

      <DocSection
        id="italic"
        title={pick({ en: "4. The true italic", zh: "4. 加载真正的斜体" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                zzzUI's labels are heavy italics. shadcn loads Montserrat
                upright only, so the italic is drawn by the browser until you
                ask for the real one where your layout loads the font:
              </p>
            ),
            zh: (
              <p>
                zzzUI 的标签是粗斜体。shadcn 只加载 Montserrat
                的正体，斜体由浏览器模拟；在布局加载字体的地方加上真正的斜体即可：
              </p>
            ),
          })}
        </Prose>
        <CodeBlock
          title="app/layout.tsx"
          code={`const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  style: ["normal", "italic"],
});`}
        />
      </DocSection>

      <DocSection
        id="look"
        title={pick({ en: "The look, in short", zh: "风格概要" })}
      >
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Everything is drawn from a <strong>slab</strong>: a flat block
                  cut on one slant (14°) and wearing a thick ink outline.
                  Corners are cut, never rounded; things are lifted by outline,
                  never by shadow. One fluorescent lime marks what is active,
                  one yellow frame marks what has focus.
                </p>
                <p>
                  Motion is a small set of named timings shared by every
                  component: a fast press and a springing release, a slide for
                  the tab slab, a reveal and a quicker dismiss for popups. It
                  all stands still when the system asks for reduced motion.
                </p>
                <p>
                  Start with the <Link href={link("/docs/button")}>Button</Link>
                  .
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  一切都从<strong>斜切块</strong>
                  出发：一块按同一角度（14°）斜切、带墨黑粗描边的平面块。转角只切不圆；层次靠描边，不靠阴影。一种荧光强调色（默认为青柠色）标出当前激活的元素，黄色焦点框标出获得焦点的元素。
                </p>
                <p>
                  动效是一小组有名称的时长，所有组件共用：迅速的按下与回弹的松开、标签页滑块的滑动、弹出层的展开与更快的收起。系统开启「减少动态效果」时，一切静止。
                </p>
                <p>
                  从 <Link href={link("/docs/button")}>Button</Link> 开始。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
