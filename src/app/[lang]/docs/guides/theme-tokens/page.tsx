import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { guideGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "../../_components/code-block";
import {
  DocHeader,
  DocSection,
  PropsTable,
  Prose,
} from "../../_components/doc";

export const generateMetadata = metadataFor("/docs/guides/theme-tokens");

const slant = `:root {
  --zero-slant: 8deg; /* a gentler cut than the default 14deg */
}`;

const accent = `:root {
  --zero-accent: #2ee6d6;
  --zero-accent-hi: color-mix(in oklab, #2ee6d6, white 22%); /* hover */
  --zero-accent-lo: color-mix(in oklab, #2ee6d6, black 18%); /* pressed */
}`;

const preset = `<html lang="en" data-zero-accent="cyan" suppressHydrationWarning>
  <head>
    <AccentScript />  {/* applies a remembered choice before paint */}
  </head>
  …
</html>`;

const speed = `:root {
  /* everything a little quicker */
  --zero-dur-fast: 110ms;
  --zero-dur-base: 190ms;
  --zero-dur-slow: 330ms;
}`;

export default async function ThemeTokensGuide({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={guideGraph("/docs/guides/theme-tokens", "2026-10-25")} />
      <DocHeader
        title={pick({
          en: "Theme zzzUI with its tokens",
          zh: "用设计令牌定制 zzzUI 主题",
        })}
        lead={pick({
          en: "zzzUI's look comes from a handful of tokens: one slant angle, three outline weights, one accent and a set of timings. Override them on :root in your own stylesheet and every component follows, with nothing else to edit.",
          zh: "zzzUI 是基于 shadcn、仅暗色的组件库，外观由少数几个设计令牌（token）决定：一个斜切角度、三档描边粗细、一种强调色和一组动效时长。自定义主题时，只需在自己样式表的 :root 中覆盖这些值，所有组件都会随之改变，无需修改其他代码。",
        })}
      />

      <DocSection
        id="where"
        title={pick({ en: "Where the tokens live", zh: "设计令牌定义在哪里" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Installing any zzzUI component writes the foundation into your
                project's main stylesheet: each token is declared once on{" "}
                <code>:root</code> under a <code>--zero-</code> name, and
                Tailwind's theme points at it, so <code>bg-zero-accent</code>{" "}
                reads <code>--zero-accent</code>. To change one, set the same
                name again on <code>:root</code>, after the foundation. Override
                the <code>--zero-</code> name, not the{" "}
                <code>--color-zero-</code> one: the utilities read the first.
              </p>
            ),
            zh: (
              <p>
                安装任意一个 zzzUI
                组件时，地基会写入项目的主样式表：每个设计令牌以{" "}
                <code>--zero-</code> 开头命名，在 <code>:root</code>{" "}
                上声明一次，Tailwind 的主题再引用它，因此{" "}
                <code>bg-zero-accent</code> 读取的是 <code>--zero-accent</code>
                。要修改某个设计令牌，在地基之后再写一条 <code>:root</code>{" "}
                规则，重新设置同名变量即可。注意要覆盖 <code>--zero-</code>{" "}
                开头的变量，而不是 <code>--color-zero-</code>{" "}
                开头的：工具类读取的是前者。
              </p>
            ),
          })}
        </Prose>
        <PropsTable
          part={pick({ en: "The main tokens", zh: "主要设计令牌" })}
          rows={[
            {
              name: "--zero-slant",
              type: "angle",
              default: "14deg",
              description: pick({
                en: "Every slanted cut: slab edges, the lean of fills and marks.",
                zh: "所有斜切：斜切块的边缘，以及填充条与标记的倾斜。",
              }),
            },
            {
              name: "--zero-stroke-thin / --zero-stroke / --zero-stroke-thick",
              type: "length",
              default: "2px / 3px / 4px",
              description: pick({ en: "Outline weights.", zh: "描边粗细。" }),
            },
            {
              name: "--zero-accent (-hi, -lo)",
              type: "colour",
              default: "#cde31c",
              description: pick({
                en: "The one bright colour, with its hover and pressed shades.",
                zh: "唯一的亮色，以及它的悬停色与按下色。",
              }),
            },
            {
              name: "--zero-focus",
              type: "colour",
              default: "#f2e74b",
              description: pick({
                en: "The selection frame around whatever has focus.",
                zh: "围绕当前焦点元素的焦点框。",
              }),
            },
            {
              name: "--zero-dur-fast / -base / -slow",
              type: "time",
              default: "140ms / 240ms / 420ms",
              description: pick({
                en: "Hover, release and reveal timings.",
                zh: "悬停、松开与显现的时长。",
              }),
            },
            {
              name: "--zero-rarity-common … -legendary",
              type: "colour",
              default: "",
              description: pick({
                en: "The five tiers of worth (see Rarity).",
                zh: "五档稀有度的颜色（见 Rarity）。",
              }),
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="slant"
        title={pick({ en: "Change the slant", zh: "修改斜切角度" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Every cut is worked out from <code>--zero-slant</code> and the
                element's height, and every outline is the shape moved inward
                exactly, so a different angle re-cuts buttons, tabs, inputs and
                badges together and their outlines stay even. Lettering keeps
                its own italic, so stay near the default (between 8 and 18
                degrees) if you want the cuts to sit with the type.
              </p>
            ),
            zh: (
              <p>
                每一处切角都由 <code>--zero-slant</code>{" "}
                和元素高度计算得出，每一道描边都是形状精确向内收缩的结果。因此换一个角度，按钮、标签页、输入框和徽章会一起重新斜切，描边粗细依旧均匀。文字使用字体自带的斜体，不随该设计令牌变化；若希望切角与文字协调，角度应保持在默认值附近（8
                到 18 度之间）。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={slant} lang="css" title="globals.css" />
      </DocSection>

      <DocSection
        id="presets"
        title={pick({
          en: "Switch between the accent presets",
          zh: "切换强调色预设",
        })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                The quickest way to change the accent is a preset: set{" "}
                <code>data-zero-accent</code> to one of twelve (
                <code>lime</code>, <code>cyan</code>, <code>magenta</code>,{" "}
                <code>amber</code>, <code>mint</code>, <code>sky</code>,{" "}
                <code>violet</code>, <code>mono</code>, <code>yellow</code>,{" "}
                <code>leaf</code>, <code>iris</code>, <code>orchid</code>) on{" "}
                <code>&lt;html&gt;</code>, or on any element to recolour only
                what is inside it. The{" "}
                <Link href={link("/docs/accent-switch")}>Accent switch</Link>{" "}
                and the{" "}
                <Link href={link("/docs/accent-picker")}>Accent picker</Link>{" "}
                let visitors choose one and remember it; the picker also takes a
                colour of their own. Every preset keeps ink readable on it at 7
                : 1, and red stays out, since it means danger.
              </p>
            ),
            zh: (
              <p>
                更换强调色最快的方式是使用预设：在 <code>&lt;html&gt;</code>{" "}
                上把 <code>data-zero-accent</code> 设为十二个预设之一（
                <code>lime</code>、<code>cyan</code>、<code>magenta</code>、
                <code>amber</code>、<code>mint</code>、<code>sky</code>、
                <code>violet</code>、<code>mono</code>、<code>yellow</code>、
                <code>leaf</code>、<code>iris</code>、<code>orchid</code>
                ）；设在其他元素上，则只改变该元素内部的颜色。
                <Link href={link("/docs/accent-switch")}>Accent switch</Link> 和{" "}
                <Link href={link("/docs/accent-picker")}>Accent picker</Link>{" "}
                让访客自行选择，并保存所选结果，Accent picker
                还支持自定义颜色。每个预设上的墨黑文字对比度都达到 7 :
                1，清晰可读；红色不在预设之列，因为它表示危险。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={preset} lang="tsx" title="layout.tsx" />
      </DocSection>

      <DocSection
        id="accent"
        title={pick({ en: "Change the accent", zh: "自定义强调色" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                The accent is the fill of primary buttons and selected tabs,
                with ink-black text on it, so pick a bright colour that keeps
                that text readable (zzzUI's lime is 13.8 : 1 against ink). Keep
                it clear of the focus yellow, or a focused primary button loses
                its frame, and of the red that means danger. Mix the hover and
                pressed shades from it:
              </p>
            ),
            zh: (
              <p>
                强调色是主按钮和选中标签页的填充色，上面是墨黑文字，因此应选一种足够亮、能让文字保持清晰的颜色（zzzUI
                默认的 lime 与墨黑的对比度为 13.8 :
                1）。它要与焦点框的黄色明显区分，否则主按钮获得焦点时，焦点框会融进填充色而难以分辨；也要避开表示危险的红色。悬停色和按下色由它混合得出：
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={accent} lang="css" title="globals.css" />
      </DocSection>

      <DocSection
        id="motion"
        title={pick({
          en: "Speed up or slow down the motion",
          zh: "调整动效快慢",
        })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Durations are tokens too, so scaling them changes the feel of
                the whole set: presses, popups, tabs sliding, a gauge's trail.
                Under reduced motion zzzUI already drops the decorative ones
                (the sheen, the glitch, the waiting loops) to zero, whatever you
                set here.
              </p>
            ),
            zh: (
              <p>
                时长同样是设计令牌，整体缩放这些值，即可改变整套组件的手感：按下反馈、弹出层、标签页滑动、Gauge
                的残影。开启「减少动态效果」时，无论这里如何设置，zzzUI
                都会把装饰性动效（高光、故障效果、等待中的循环动画）的时长降为零。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={speed} lang="css" title="globals.css" />
      </DocSection>

      <DocSection
        id="next"
        title={pick({ en: "Where to go next", zh: "延伸阅读" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                <Link href={link("/docs/rarity")}>Rarity</Link> covers the tier
                colours and where they show;{" "}
                <Link href={link("/docs/icons")}>Icons</Link> explains how the
                icons follow the same angle. To see the tokens at work in a
                whole screen, try the{" "}
                <Link href={link("/docs/blocks")}>blocks</Link>.
              </p>
            ),
            zh: (
              <p>
                <Link href={link("/docs/rarity")}>Rarity</Link>{" "}
                介绍各档稀有度的颜色及其使用位置；
                <Link href={link("/docs/icons")}>Icons</Link>{" "}
                说明图标如何沿用同一个斜切角度。要查看设计令牌在完整界面中的效果，请浏览
                <Link href={link("/docs/blocks")}>区块</Link>。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
