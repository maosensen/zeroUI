import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AccentSwitchPreview from "../_demos/accent-switch-preview";

export const generateMetadata = metadataFor("/docs/accent-switch");

export default async function AccentSwitchPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/accent-switch")} />
      <DocHeader
        title="Accent switch"
        lead={pick({
          en: "Switch zzzUI's accent colour at runtime: twelve presets that keep ink readable on them, chosen with a row of swatches and remembered across visits.",
          zh: "在运行时切换 zzzUI 的强调色。12 种预设上的墨黑文字均清晰可读，通过一排色块选取，再次访问时沿用上次的选择。",
        })}
      />
      <DocSection id="install">
        <Install item="accent-switch" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="accent-switch-preview"
          title={pick({
            en: "Five presets, recolouring one part of a page",
            zh: "五种预设，为页面局部换色",
          })}
        >
          <AccentSwitchPreview />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The presets are in the foundation: set{" "}
                  <code>data-zero-accent</code> to <code>lime</code> (the
                  default), <code>cyan</code>, <code>magenta</code>,{" "}
                  <code>amber</code>, <code>mint</code>, <code>sky</code>,{" "}
                  <code>violet</code>, <code>mono</code>, <code>yellow</code>,{" "}
                  <code>leaf</code>, <code>iris</code> or <code>orchid</code> on{" "}
                  <code>&lt;html&gt;</code> for the whole page, or on any
                  element for what is inside it. Each keeps ink text on it at 7
                  : 1 or more (magenta, the darkest, is 7 : 1). Red stays out,
                  since it means danger. Yellow sits near the focus frame&apos;s
                  yellow, as lime does; the frame keeps an ink gap inside it, so
                  it still shows on an accent fill. Several sit near a rarity
                  tier&apos;s hue: on a screen that shows rarity, prefer lime,
                  cyan, magenta, leaf or mono, so a tier is never mistaken for
                  the accent.
                </p>
                <p>
                  AccentSwitch writes that attribute (on{" "}
                  <code>&lt;html&gt;</code>, or on <code>target</code>) and
                  remembers the choice in localStorage under{" "}
                  <code>storageKey</code>; pass <code>null</code> to keep it to
                  this page view. It is a radio group: the arrow keys move
                  between the swatches, and each is named. <code>accents</code>{" "}
                  picks which presets the row offers. Put{" "}
                  <code>AccentScript</code> in <code>&lt;head&gt;</code> so a
                  remembered accent is on the page before it paints. For all
                  twelve in little room, or a colour of your own, use the{" "}
                  <a href={link("/docs/accent-picker")}>Accent picker</a>; the
                  two keep the accent the same way.
                </p>
                <p>
                  Corners are not switchable: zzzUI cuts, it does not round. The
                  nearest knob is the slant, <code>--zero-slant</code>; at{" "}
                  <code>0deg</code> every cut becomes a square corner (see{" "}
                  <a href={link("/docs/guides/theme-tokens")}>
                    Theme zzzUI with its tokens
                  </a>
                  ).
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  预设定义在地基中：在 <code>&lt;html&gt;</code> 上将{" "}
                  <code>data-zero-accent</code> 设为 <code>lime</code>（默认）、
                  <code>cyan</code>、<code>magenta</code>、<code>amber</code>、
                  <code>mint</code>、<code>sky</code>、<code>violet</code>、
                  <code>mono</code>、<code>yellow</code>、<code>leaf</code>、
                  <code>iris</code> 或 <code>orchid</code>
                  ，作用于整个页面；设在任意元素上，则只作用于该元素内部。每种预设上的墨黑文字对比度都不低于
                  7 : 1（最暗的 magenta 恰为 7 :
                  1）。红色不在其中，因为它表示危险。yellow 与 lime
                  都接近焦点框的黄色；焦点框内侧留有一道墨黑间隙，因此在强调色填充上依然可见。另有几种预设与某个稀有度档位的色相相近：在显示稀有度的界面上，宜选用
                  lime、cyan、magenta、leaf 或 mono，以免把档位误认为强调色。
                </p>
                <p>
                  AccentSwitch 负责写入这个属性（写在 <code>&lt;html&gt;</code>{" "}
                  上，或 <code>target</code> 指定的元素上），并以{" "}
                  <code>storageKey</code> 为键把选择保存在 localStorage 中；
                  <code>storageKey</code> 传入 <code>null</code>{" "}
                  时，选择仅在本次页面浏览中生效。它是一个单选组：可用方向键在色块之间切换，每个色块都有可访问名称。
                  <code>accents</code> 决定这一排提供哪些预设。将{" "}
                  <code>AccentScript</code> 置于 <code>&lt;head&gt;</code>{" "}
                  中，已保存的强调色即可在页面绘制之前生效。空间不足以容纳全部
                  12 种预设，或需要自定义颜色时，请改用{" "}
                  <a href={link("/docs/accent-picker")}>Accent picker</a>
                  ；两者保存强调色的方式相同。
                </p>
                <p>
                  圆角不可切换：zzzUI
                  只用斜切，不用圆角。最接近的调节项是斜切角度{" "}
                  <code>--zero-slant</code>；设为 <code>0deg</code>{" "}
                  时，所有切角都变为直角（参见
                  <a href={link("/docs/guides/theme-tokens")}>
                    用设计 token 为 zzzUI 定制主题
                  </a>
                  ）。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="AccentSwitch"
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: 'AccentPreset | "#rrggbb"',
              default: '"lime"',
              description: pick({
                en: "The accent, controlled or not: a preset's name, or a colour of your own (which checks no swatch).",
                zh: "强调色，受控或非受控均可：预设名称，或自定义颜色（此时不选中任何色块）。",
              }),
            },
            {
              name: "accents",
              type: "AccentPreset[]",
              default: pick({ en: "all twelve", zh: "全部 12 种" }),
              description: pick({
                en: "Which presets the row offers.",
                zh: "这一排提供哪些预设。",
              }),
            },
            {
              name: "target",
              type: "() => HTMLElement | null",
              default: "<html>",
              description: pick({
                en: "Where data-zero-accent is written.",
                zh: "写入 data-zero-accent 的元素。",
              }),
            },
            {
              name: "storageKey",
              type: "string | null",
              default: '"zero-accent"',
              description: pick({
                en: "Where the choice is remembered; null to forget it.",
                zh: "保存选择所用的键；设为 null 则不保存。",
              }),
            },
            {
              name: "aria-label",
              type: "string",
              default: '"Accent colour"',
              description: pick({
                en: "The group's name.",
                zh: "单选组的可访问名称。",
              }),
            },
            {
              name: "labels",
              type: "AccentLabelsInput",
              default: "accentLabels",
              description: pick({
                en: "The presets' names in another language (labels.names); what is left out stays English.",
                zh: "预设的名称换成其他语言（labels.names）；未提供的部分保持英文。",
              }),
            },
          ]}
        />
        <PropsTable
          part="AccentScript"
          rows={[
            {
              name: "storageKey",
              type: "string",
              default: '"zero-accent"',
              description: pick({
                en: "The same key as the switch.",
                zh: "与 AccentSwitch 使用同一个键。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
