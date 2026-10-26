import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TabsBasic from "../_demos/tabs-basic";
import TabsHotkeys from "../_demos/tabs-hotkeys";
import TabsIcons from "../_demos/tabs-icons";
import TabsSizes from "../_demos/tabs-sizes";

export const generateMetadata = metadataFor("/docs/tabs");

const tabs = { href: "https://base-ui.com/react/components/tabs" };

export default async function TabsPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/tabs")} />
      <DocHeader
        title="Tabs"
        lead={pick({
          en: "A track cut on the slant at both ends, and a slab of the accent that springs to the active tab. Every edge leans the same way, so at either end the slab sits parallel to the track.",
          zh: "两端斜切的轨道，以及一块弹向当前标签页的强调色斜切块。所有边缘倾斜方向一致，斜切块无论停在哪一端，都与轨道平行。",
        })}
      />
      <DocSection id="install">
        <Install item="tabs" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="tabs-basic"
          title={pick({ en: "With panels", zh: "带面板" })}
        >
          <TabsBasic />
        </Demo>
        <Demo file="tabs-sizes" title={pick({ en: "Sizes", zh: "尺寸" })}>
          <TabsSizes />
        </Demo>
        <Demo
          file="tabs-icons"
          title={pick({
            en: "Icons, long labels, a disabled tab",
            zh: "图标、长文字与禁用的标签页",
          })}
        >
          <TabsIcons />
        </Demo>
        <Demo
          file="tabs-hotkeys"
          title={pick({
            en: "Hotkeys, as a game's shoulder buttons",
            zh: "快捷键，如同游戏手柄的肩键",
          })}
        >
          <TabsHotkeys />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The slab springs to the new tab and settles in about a quarter
                  of a second; under reduced motion it lands without travelling.
                  While it slides, the part of each label over it turns dark and
                  the rest stays light, so no label is ever dark on the dark
                  track.
                </p>
                <p>
                  Arrow keys move focus along the tabs; Enter or Space activates
                  the focused one, which then fills itself straight away inside
                  the selection frame. Tabs are horizontal only. With{" "}
                  <code>hotkeys</code>, two keys step back and forth from
                  anywhere on the page, the way a game pages with its shoulder
                  buttons. The keys are shown at the track&apos;s ends, but not
                  on a touch screen, where there is no keyboard to press them
                  and they would only take room from the tabs.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  斜切块弹向新的标签页，约四分之一秒后落定；开启「减少动态效果」时直接落到目标位置，不经过滑动。滑动过程中，每个标签页的文字被斜切块覆盖的部分变为深色，其余部分保持浅色，因此深色轨道上不会出现深色文字。
                </p>
                <p>
                  按方向键可在标签页之间移动焦点；按 Enter
                  或空格键激活当前聚焦的标签页，该标签页立即在焦点框内显示为填充状态。Tabs
                  仅支持水平方向。设置 <code>hotkeys</code>{" "}
                  后，在页面任意位置按这两个键即可前后切换，如同游戏用肩键翻页。按键提示显示在轨道两端；触屏设备上没有键盘可按，提示只会挤占标签页的空间，因此不显示。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Tabs"
          base={{ name: "Tabs.Root", ...tabs }}
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: pick({
                en: "A tab is 32, 40 or 52 px tall; the track adds its outline and inset.",
                zh: "单个标签页高 32、40 或 52 px；轨道另加描边与内边距。",
              }),
            },
          ]}
        />
        <PropsTable
          part="TabsList"
          base={{ name: "Tabs.List", ...tabs }}
          rows={[
            {
              name: "hotkeys",
              type: "[string, string]",
              description: pick({
                en: "Two keys that step to the previous and next tab from anywhere outside a text field; shown at the track's ends.",
                zh: "切换到上一个、下一个标签页的两个按键，焦点不在文本框内时于页面任意位置生效；显示在轨道两端。",
              }),
            },
          ]}
        />
        <PropsTable
          part="TabsTab"
          base={{ name: "Tabs.Tab", ...tabs }}
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "Which panel this tab shows.",
                zh: "该标签页显示的面板。",
              }),
            },
          ]}
        />
        <PropsTable
          part="TabsPanel"
          base={{ name: "Tabs.Panel", ...tabs }}
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "The tab that shows this panel.",
                zh: "显示该面板的标签页。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
