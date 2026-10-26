import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CutInTones from "../_demos/cut-in-tones";
import GlitchHeading from "../_demos/glitch-heading";

export const generateMetadata = metadataFor("/docs/cut-in");

export default async function CutInPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/cut-in")} />
      <DocHeader
        title="Cut-in"
        lead={pick({
          en: "A band thrown across the screen for a moment that matters, the way a game announces one: it wipes in on the slant, holds, and wipes out.",
          zh: "在关键时刻横贯屏幕的一道横幅，仿照游戏中宣告此类时刻的过场效果：沿斜切方向划入，停留片刻，再划出。",
        })}
      />
      <DocSection id="install">
        <Install item="cut-in" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="cut-in-tones"
          title={pick({ en: "Three moments", zh: "三种场合" })}
        >
          <CutInTones />
        </Demo>
        <Demo
          file="glitch-heading"
          title={pick({
            en: "The glitch on its own",
            zh: "单独使用的故障效果",
          })}
        >
          <GlitchHeading />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A black band between two lines of the tone's colour (the
                  accent, danger, or the legendary tier), a leaning eyebrow, a
                  big tilted title that glitches as it lands, and a line under
                  it. It closes by itself after <code>duration</code>, on Escape
                  or on a click elsewhere; it does not take focus or block the
                  page, and it is announced politely.
                </p>
                <p>
                  The two motions are the foundation's: <code>cut-in</code>, a
                  wipe whose edge leans on the slant (on{" "}
                  <code>--zero-dur-cut</code>), and <code>glitch</code>, a few
                  stepped jumps that split a heading into a red and a blue ghost
                  (on <code>--zero-dur-glitch</code>). Use <code>glitch</code>{" "}
                  on any heading. Under reduced motion neither plays: the band
                  appears and goes.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  由四部分组成：上下两条色调线（强调色、危险色或「传说」稀有度的颜色）之间的黑色横幅，一行斜体眉题，一行倾斜大标题（落定时带故障效果），以及标题下方的一行说明。经过{" "}
                  <code>duration</code> 后自动关闭，按 Esc
                  或点击其他位置也会关闭；不抢占焦点，不阻挡页面操作，并以
                  polite 方式通知读屏软件。
                </p>
                <p>
                  两段动效都来自地基：<code>cut-in</code>{" "}
                  是边缘沿斜切角度倾斜的擦除过渡（时长取自{" "}
                  <code>--zero-dur-cut</code>）；<code>glitch</code>{" "}
                  是几次阶跃式跳动，把标题错开成一红一蓝两道残影（时长取自{" "}
                  <code>--zero-dur-glitch</code>）。<code>glitch</code>{" "}
                  可用于任意标题。系统开启「减少动态效果」时两者都不播放，横幅直接出现、直接消失。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="CutIn"
          rows={[
            {
              name: "open / defaultOpen / onOpenChange",
              type: "boolean / boolean / (open) => void",
              description: pick({
                en: "Open, controlled or not.",
                zh: "是否打开，受控与非受控均可。",
              }),
            },
            {
              name: "duration",
              type: "number",
              default: "2400",
              description: pick({
                en: "Milliseconds it holds; 0 keeps it until dismissed.",
                zh: "停留的毫秒数；设为 0 时一直显示，直到被关闭。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CutInContent"
          rows={[
            {
              name: "tone",
              type: '"accent" | "danger" | "legendary"',
              default: '"accent"',
              description: pick({
                en: "The colour of its lines and eyebrow.",
                zh: "色调线与眉题的颜色。",
              }),
            },
          ]}
        />
        <PropsTable
          part="CutInEyebrow, CutInTitle, CutInDescription, CutInTrigger"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
