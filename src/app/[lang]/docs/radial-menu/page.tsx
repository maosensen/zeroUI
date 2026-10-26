import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import RadialMenuQuick from "../_demos/radial-menu-quick";

export const generateMetadata = metadataFor("/docs/radial-menu");

export default async function RadialMenuPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/radial-menu")} />
      <DocHeader
        title="Radial menu"
        lead={pick({
          en: "A radial menu for React, the game weapon wheel: choices around a ring, picked by the pointer's direction or the arrow keys.",
          zh: "React 轮盘菜单组件，即游戏中的武器轮盘：选项环绕排列，按指针方向或方向键选择。",
        })}
      />
      <DocSection id="install">
        <Install item="radial-menu" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="radial-menu-quick"
          title={pick({ en: "A quick-use wheel", zh: "快捷轮盘" })}
        >
          <RadialMenuQuick />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Up to eight items around a ring, the first at the top, going
                  clockwise. Pointing anywhere picks the item in that direction,
                  so a flick of the mouse is enough; a bright wedge swings to it
                  and the centre names it. A click or Enter chooses it.
                </p>
                <p>
                  The arrow keys go round the ring. Focus stays on the wheel and
                  the picked item is its active descendant, so screen readers
                  hear each as it is reached. It is the wheel only: show it
                  where and when you need it, on a held key or in an overlay.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  最多八个选项环绕成一圈，第一个在正上方，按顺时针排列。指针指向任意位置，都会选中该方向上的选项，因此只需轻甩鼠标；一块高亮扇区随之转到该选项，中央显示其名称。单击或按
                  Enter 确认选择。
                </p>
                <p>
                  按方向键可沿圆环切换选项。焦点始终留在轮盘上，当前选项通过{" "}
                  <code>aria-activedescendant</code>{" "}
                  关联到轮盘，切换到每个选项时读屏软件都会读出它。组件只包含轮盘本身：显示的位置与时机由外部决定，例如按住某个键时显示，或置于弹出层中。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="RadialMenu"
          rows={[
            {
              name: "onSelect",
              type: "(value: string) => void",
              description: pick({
                en: "When an item is chosen.",
                zh: "确认选择某个选项时调用。",
              }),
            },
            {
              name: "defaultValue",
              type: "string",
              description: pick({
                en: "The item picked when it opens.",
                zh: "打开时选中的选项。",
              }),
            },
          ]}
        />
        <PropsTable
          part="RadialMenuItem"
          rows={[
            {
              name: "value",
              type: "string",
              description: pick({
                en: "What onSelect gets.",
                zh: "传给 onSelect 的值。",
              }),
            },
            {
              name: "label",
              type: "string",
              description: pick({
                en: "Its name: said by screen readers and shown in the centre.",
                zh: "名称：由读屏软件读出，并显示在中央。",
              }),
            },
            {
              name: "disabled",
              type: "boolean",
              description: pick({
                en: "Shown dim; cannot be chosen.",
                zh: "变暗显示，不可选择。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
