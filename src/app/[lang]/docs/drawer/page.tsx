import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import DrawerRoute from "../_demos/drawer-route";

export const generateMetadata = metadataFor("/docs/drawer");

export default async function DrawerPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/drawer")} />
      <DocHeader
        title="Drawer"
        lead={pick({
          en: "A panel that comes up from the bottom of the screen and can be dragged back down: the phone's sheet, with a slanted grip at its top.",
          zh: "从屏幕底部升起、可向下拖动关闭的面板（即手机上常见的底部面板），顶端带一道斜切的拖动条。",
        })}
      />
      <DocSection id="install">
        <Install item="drawer" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="drawer-route"
          title={pick({
            en: "From the bottom, and from the right",
            zh: "从底部与右侧滑入",
          })}
        >
          <DrawerRoute />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <p>
                It follows the finger while it is swiped, the page behind
                lightening as it goes, and closes once dragged far or fast
                enough. <code>side</code> brings it in from another edge; Sheet
                does that without the swipe. Under reduced motion it only fades.
              </p>
            ),
            zh: (
              <p>
                滑动时面板跟随手指移动，背后的页面随之逐渐变亮；拖动距离足够远或速度足够快时即关闭。
                <code>side</code> 可让它从其他边缘滑入；Sheet
                同样可以从各边滑入，但不支持滑动手势。系统开启「减少动态效果」时仅保留淡入淡出。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Drawer"
          rows={[
            {
              name: "side",
              type: '"bottom" | "top" | "left" | "right"',
              default: '"bottom"',
              description: pick({
                en: "The edge it comes from, and the way it is swiped away.",
                zh: "从哪一侧滑入，同时决定滑动关闭的方向。",
              }),
            },
          ]}
        />
        <PropsTable
          part="DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose"
          base={{
            name: "Drawer.Popup",
            href: "https://base-ui.com/react/components/drawer",
          }}
          rows={[]}
        />
      </DocSection>
    </>
  );
}
