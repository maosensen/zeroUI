import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ItemDrivers from "../_demos/item-drivers";

export const generateMetadata = metadataFor("/docs/item");

export default async function ItemPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/item")} />
      <DocHeader
        title="Item"
        lead={pick({
          en: "One thing in a list: a mark, a leaning title with a line beneath it, and actions at the end.",
          zh: "列表中的一项：标识、斜体标题及其下方的一行说明，末端是操作按钮。",
        })}
      />
      <DocSection id="install">
        <Install item="item" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="item-drivers"
          title={pick({
            en: "A driver, and two links",
            zh: "一名司机，以及两个链接",
          })}
        >
          <ItemDrivers />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Plain, outlined in the quiet line, or on the raised grey. As a
                  link (<code>render</code>) it lights to the raised grey when
                  pointed at and takes the focus frame. ItemMedia holds an icon
                  in a small slanted well, or a picture in an ink frame.
                </p>
                <p>ItemGroup stacks items and ItemSeparator divides them.</p>
              </>
            ),
            zh: (
              <>
                <p>
                  有三种样式：无装饰、淡色细线描边、浮起色底。作为链接使用（
                  <code>render</code>
                  ）时，悬停变为浮起色，聚焦时显示焦点框。ItemMedia
                  可放置小号斜切凹槽中的图标，或带墨黑边框的图片。
                </p>
                <p>ItemGroup 将多个项纵向堆叠，ItemSeparator 用于分隔各项。</p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Item"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: pick({
                en: "Colours it by tier (see Rarity).",
                zh: "按稀有度档位着色（见 Rarity）。",
              }),
            },
            {
              name: "variant",
              type: '"default" | "outline" | "muted"',
              default: '"default"',
              description: pick({
                en: "Plain, outlined, or on the raised grey.",
                zh: "无装饰、描边，或浮起色底。",
              }),
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: pick({
                en: "How much room around it.",
                zh: "内边距大小。",
              }),
            },
            {
              name: "render",
              type: "ReactElement | function",
              description: pick({
                en: "The element to render as, such as a link.",
                zh: "渲染为指定元素，例如链接。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ItemMedia"
          rows={[
            {
              name: "variant",
              type: '"default" | "icon" | "image"',
              default: '"default"',
              description: pick({
                en: "A bare icon, an icon in a slanted well, or a framed picture.",
                zh: "单独的图标、斜切凹槽中的图标，或带边框的图片。",
              }),
            },
          ]}
        />
        <PropsTable
          part="ItemGroup, ItemSeparator, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
