import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import HoldButtonScrap from "../_demos/hold-button-scrap";

export const generateMetadata = metadataFor("/docs/hold-button");

export default async function HoldButtonPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/hold-button")} />
      <DocHeader
        title="Hold button"
        lead={pick({
          en: "A hold-to-confirm button for React: a fill runs across it along the slant while it is held, for what should not happen by accident.",
          zh: "React 按住确认按钮：按住时，一段斜边填充横向推进，用于需要防止误触的操作。",
        })}
      />
      <DocSection id="install">
        <Install item="hold-button" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="hold-button-scrap"
          title={pick({ en: "Hold to scrap", zh: "按住分解" })}
        >
          <HoldButtonScrap />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Hold it with the pointer, Enter or Space, or its{" "}
                  <code>hotkey</code> from anywhere on the page (not while
                  typing in a field). Let go early and the fill drains back;
                  hold it to the end and <code>onConfirm</code> fires and the
                  button flashes the accent. The fill keeps its pace under
                  reduced motion: it tells you how long to hold.
                </p>
                <p>
                  It is a Button with every Button variant and size,{" "}
                  <code>secondary</code> by default. Screen readers are told to
                  press and hold. Put a Kbd inside to show the key.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  可以用指针、Enter 或空格键按住，也可以在页面任意位置按住它的{" "}
                  <code>hotkey</code>
                  （在输入框中输入时除外）。中途松开，填充条会退回；按满全程则触发{" "}
                  <code>onConfirm</code>
                  ，按钮以强调色闪烁一次。开启「减少动态效果」时，填充条的推进速度不变，因为填充进度本身表示需要按住多久。
                </p>
                <p>
                  它是一个 Button，支持 Button 的全部变体与尺寸，默认为{" "}
                  <code>secondary</code>。读屏软件会提示需要按住。在其中放入 Kbd
                  即可显示对应按键。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="HoldButton"
          rows={[
            {
              name: "onConfirm",
              type: "() => void",
              description: pick({
                en: "Fired once the hold is complete.",
                zh: "按满全程后触发一次。",
              }),
            },
            {
              name: "duration",
              type: "number",
              default: "1200",
              description: pick({
                en: "How long to hold, in ms.",
                zh: "需要按住的时长，单位 ms。",
              }),
            },
            {
              name: "hotkey",
              type: "string",
              description: pick({
                en: "A key (KeyboardEvent.key) that holds it from anywhere.",
                zh: "在页面任意位置按住即等同于按住此按钮的按键（KeyboardEvent.key）。",
              }),
            },
            {
              name: "variant / size / cut",
              type: "Button's",
              default: '"secondary"',
              description: pick({ en: "As Button.", zh: "同 Button。" }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
