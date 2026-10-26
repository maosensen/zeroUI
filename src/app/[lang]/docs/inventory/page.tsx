import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import InventoryHold from "../_demos/inventory-hold";

export const generateMetadata = metadataFor("/docs/inventory");

export default async function InventoryPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/inventory")} />
      <DocHeader
        title="Inventory"
        lead={pick({
          en: "An inventory grid for React: square slots with a rarity glow, a count in the corner and a cooldown sweep, moved through with the arrow keys.",
          zh: "React 物品栏组件：方形格子带稀有度光晕，角落显示数量，冷却以扇形遮罩显示，可用方向键在格子间移动。",
        })}
      />
      <DocSection id="install">
        <Install item="inventory" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="inventory-hold"
          title={pick({ en: "A cargo hold", zh: "货舱" })}
        >
          <InventoryHold />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A slot is a black well with a quiet line. <code>rarity</code>{" "}
                  lights its bottom edge and a glow rising from it in the tier's
                  colour; <code>selected</code> frames it in the accent;{" "}
                  <code>cooldown</code> (what is left, 0–1) darkens that share
                  of a turn, like a clock; an empty slot shows the hatching. A
                  count over one sits in the corner.
                </p>
                <p>
                  The grid is one stop on Tab. The arrow keys move between slots
                  in two dimensions, Home and End to the ends of a row, with
                  Ctrl to the ends of the bag; Tab comes back to the slot last
                  visited. Each slot is a button: give it an{" "}
                  <code>aria-label</code> that says what it holds, and the bag
                  one that names it. The slot size is <code>--zero-slot</code>.
                </p>
                <p>
                  The item art in the demo is zzzUI's own item icons: crate,
                  cell, flare, key, chip and kit.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  每个格子是一道黑色底槽，带一条暗色细边。<code>rarity</code>{" "}
                  以对应稀有度的颜色点亮格子底边，并从底边向上泛起光晕；
                  <code>selected</code> 以强调色框住格子；<code>cooldown</code>
                  （剩余比例，0–1）像时钟一样，将一整圈中相应比例的扇区遮暗；空格子显示斜线纹理。数量大于
                  1 时显示在角落。
                </p>
                <p>
                  整个网格在 Tab
                  顺序中只占一个位置。按方向键可在格子之间上下左右移动，按
                  Home、End 可跳到一行的首尾，配合 Ctrl
                  则跳到整个物品栏的首尾；再次按 Tab
                  进入时，回到上次停留的格子。每个格子都是按钮：需为每个格子提供说明所装物品的{" "}
                  <code>aria-label</code>，并为物品栏本身提供名称。格子尺寸由{" "}
                  <code>--zero-slot</code> 决定。
                </p>
                <p>
                  示例中的物品图案均为 zzzUI
                  自带的物品图标：箱子、能量电池、信号弹、钥匙、芯片和维修包。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Inventory"
          rows={[
            {
              name: "columns",
              type: "number",
              default: "6",
              description: pick({
                en: "Slots in a row; the arrow keys move by it.",
                zh: "每行的格数；方向键上下移动时以此为步长。",
              }),
            },
          ]}
        />
        <PropsTable
          part="InventorySlot"
          base={{
            name: "Button",
            href: "https://base-ui.com/react/components/button",
          }}
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: pick({
                en: "Lights the bottom edge and a glow in the tier's colour.",
                zh: "以对应稀有度的颜色点亮底边与光晕。",
              }),
            },
            {
              name: "selected",
              type: "boolean",
              description: pick({
                en: "Frames it in the accent (aria-pressed).",
                zh: "以强调色框住格子（aria-pressed）。",
              }),
            },
            {
              name: "count",
              type: "number",
              description: pick({
                en: "Shown in the corner when more than one.",
                zh: "大于 1 时显示在角落。",
              }),
            },
            {
              name: "cooldown",
              type: "number",
              description: pick({
                en: "What is left of a cooldown, 0\u20131.",
                zh: "冷却的剩余比例，0–1。",
              }),
            },
            {
              name: "children",
              type: "ReactNode",
              description: pick({
                en: "What it holds; empty shows the hatching.",
                zh: "格中物品；为空时显示斜线纹理。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
