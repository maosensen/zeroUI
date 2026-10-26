import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import AccentPickerPreview from "../_demos/accent-picker-preview";

export const generateMetadata = metadataFor("/docs/accent-picker");

export default async function AccentPickerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/accent-picker")} />
      <DocHeader
        title="Accent picker"
        lead={pick({
          en: "A theme colour picker for React in a small button: the accent in use as a swatch, opening on twelve presets and a colour of your own, kept legible and remembered across visits.",
          zh: "以小按钮呈现的 React 主题色（强调色）选择器。按钮以色块显示当前强调色，打开后可从 12 种预设中选择，也可以自定义颜色；所选颜色上的文字始终清晰可读，并在再次访问时保留。",
        })}
      />
      <DocSection id="install">
        <Install item="accent-picker" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="accent-picker-preview"
          title={pick({
            en: "Recolouring one part of a page",
            zh: "为页面局部换色",
          })}
        >
          <AccentPickerPreview />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The button shows the accent in use as a slanted swatch and
                  opens a popover: the presets as a grid of swatches (a radio
                  group, so the arrow keys move between them) and, under them, a
                  colour of your own, from the colour well or typed as hex. The
                  site&apos;s header has one.
                </p>
                <p>
                  A colour of your own is applied as you pick it, but only if
                  ink text reads on it at 7 : 1 or more, the floor every preset
                  meets: buttons, badges and the active tab all set ink on the
                  accent. A darker colour is refused, and the note under the
                  field says so with its ratio; the note is a polite live
                  region, so it is heard too. Hover and pressed shades are mixed
                  from the colour by the foundation. It is written as{" "}
                  <code>data-zero-accent=&quot;custom&quot;</code> with the
                  colour inline, and remembered like a preset.
                </p>
                <p>
                  It keeps and writes the accent exactly as the{" "}
                  <a href={link("/docs/accent-switch")}>Accent switch</a> does,
                  with the same <code>target</code>, <code>storageKey</code> and
                  controlled <code>value</code>, so the two can share a page,
                  and <code>AccentScript</code> in <code>&lt;head&gt;</code>{" "}
                  puts a remembered colour on the page before it paints. Use the
                  switch where there is room for a row of swatches and no need
                  for a colour of your own.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  按钮以倾斜的色块显示当前强调色，点击后打开弹出层：上方是排成网格的预设色块（构成单选组，可用方向键在其间移动），下方用于自定义颜色，可通过取色器选取，也可直接输入十六进制值。本站页头即使用了这个组件。
                </p>
                <p>
                  自定义颜色在选取时即时生效，前提是墨黑文字在其上的对比度不低于
                  7 :
                  1，即所有预设都满足的下限；这是因为按钮、徽章和当前标签页都在强调色上显示墨黑文字。更暗的颜色会被拒绝，输入框下方的提示会说明原因并给出实际对比度；该提示是{" "}
                  <code>aria-live=&quot;polite&quot;</code>{" "}
                  的实时区域，读屏软件同样会读出。悬停与按下时的色调，由地基在该颜色的基础上混合得出。写入的是{" "}
                  <code>data-zero-accent=&quot;custom&quot;</code>
                  ，颜色值以内联样式给出；保存方式与预设相同。
                </p>
                <p>
                  它保存和写入强调色的方式与{" "}
                  <a href={link("/docs/accent-switch")}>Accent switch</a>{" "}
                  完全相同，<code>target</code>、<code>storageKey</code>{" "}
                  和受控的 <code>value</code> 也一致，因此两者可以用在同一页面；
                  <code>&lt;head&gt;</code> 中的 <code>AccentScript</code>{" "}
                  会在页面绘制之前应用已保存的颜色。空间足以容纳一排色块、且无需自定义颜色时，请改用
                  Accent switch。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="AccentPicker"
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: 'AccentPreset | "#rrggbb"',
              default: '"lime"',
              description: pick({
                en: "The accent, controlled or not.",
                zh: "强调色，受控或非受控均可。",
              }),
            },
            {
              name: "accents",
              type: "AccentPreset[]",
              default: pick({ en: "all twelve", zh: "全部 12 种" }),
              description: pick({
                en: "Which presets to offer.",
                zh: "提供哪些预设。",
              }),
            },
            {
              name: "custom",
              type: "boolean",
              default: "true",
              description: pick({
                en: "Offer a colour of your own.",
                zh: "是否提供自定义颜色。",
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
              name: "side / align",
              type: "Popover's",
              default: '"bottom" / "end"',
              description: pick({
                en: "Where the popover opens.",
                zh: "弹出层的打开位置。",
              }),
            },
            {
              name: "aria-label",
              type: "string",
              default: '"Accent colour"',
              description: pick({
                en: "The button's name, followed by the accent in use.",
                zh: "按钮的可访问名称，其后附上当前强调色。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
