import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ItemDrivers from "../_demos/item-drivers";

export const metadata = pageMetadata("/docs/item");

export default function ItemPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/item")} />
      <DocHeader
        title="Item"
        lead="One thing in a list: a mark, a leaning title with a line beneath it, and actions at the end."
      />
      <DocSection id="install" title="Install">
        <Install item="item" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="item-drivers" title="A driver, and two links">
          <ItemDrivers />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Plain, outlined in the quiet line, or on the raised grey. As a link
            (<code>render</code>) it lights to the raised grey when pointed at
            and takes the focus frame. ItemMedia holds an icon in a small
            slanted well, or a picture in an ink frame.
          </p>
          <p>ItemGroup stacks items and ItemSeparator divides them.</p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Item"
          rows={[
            {
              name: "rarity",
              type: '"common" | "uncommon" | "rare" | "epic" | "legendary"',
              description: "Colours it by tier (see Rarity).",
            },
            {
              name: "variant",
              type: '"default" | "outline" | "muted"',
              default: '"default"',
              description: "Plain, outlined, or on the raised grey.",
            },
            {
              name: "size",
              type: '"default" | "sm"',
              default: '"default"',
              description: "How much room around it.",
            },
            {
              name: "render",
              type: "ReactElement | function",
              description: "The element to render as, such as a link.",
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
              description:
                "A bare icon, an icon in a slanted well, or a framed picture.",
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
