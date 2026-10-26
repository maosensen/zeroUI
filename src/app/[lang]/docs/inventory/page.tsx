import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="An inventory grid for React: square slots with a rarity glow, a count in the corner and a cooldown sweep, moved through with the arrow keys."
      />
      <DocSection id="install">
        <Install item="inventory" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="inventory-hold" title="A cargo hold">
          <InventoryHold />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            A slot is a black well with a quiet line. <code>rarity</code> lights
            its bottom edge and a glow rising from it in the tier's colour;{" "}
            <code>selected</code> frames it in the accent; <code>cooldown</code>{" "}
            (what is left, 0–1) darkens that share of a turn, like a clock; an
            empty slot shows the hatching. A count over one sits in the corner.
          </p>
          <p>
            The grid is one stop on Tab. The arrow keys move between slots in
            two dimensions, Home and End to the ends of a row, with Ctrl to the
            ends of the bag; Tab comes back to the slot last visited. Each slot
            is a button: give it an <code>aria-label</code> that says what it
            holds, and the bag one that names it. The slot size is{" "}
            <code>--zero-slot</code>.
          </p>
          <p>
            The item art in the demo is zzzUI's own item icons: crate, cell,
            flare, key, chip and kit.
          </p>
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
              description: "Slots in a row; the arrow keys move by it.",
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
              description:
                "Lights the bottom edge and a glow in the tier's colour.",
            },
            {
              name: "selected",
              type: "boolean",
              description: "Frames it in the accent (aria-pressed).",
            },
            {
              name: "count",
              type: "number",
              description: "Shown in the corner when more than one.",
            },
            {
              name: "cooldown",
              type: "number",
              description: "What is left of a cooldown, 0\u20131.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "What it holds; empty shows the hatching.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
