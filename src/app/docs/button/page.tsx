import type { Metadata } from "next";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import ButtonCuts from "../_demos/button-cuts";
import ButtonIcon from "../_demos/button-icon";
import ButtonSizes from "../_demos/button-sizes";
import ButtonVariants from "../_demos/button-variants";

export const metadata: Metadata = {
  title: "Button",
  description: "A slab with a label: four variants, three sizes, four cuts.",
};

export default function ButtonPage() {
  return (
    <>
      <DocHeader
        title="Button"
        lead="A slab with a label, cut on the slant and outlined in ink. It drops when pressed and springs back past its rest."
      />
      <DocSection id="install" title="Install">
        <Install item="button" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="button-variants" title="Variants">
          <ButtonVariants />
        </Demo>
        <Demo file="button-sizes" title="Sizes">
          <ButtonSizes />
        </Demo>
        <Demo file="button-cuts" title="Cuts">
          <ButtonCuts />
        </Demo>
        <Demo file="button-icon" title="With an icon, and disabled">
          <ButtonIcon />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            Pressing shrinks the slab in 70 ms and lets it spring back past its
            rest in 240 ms. Pointing at it sends a band of light across along
            the slant; there is no sheen on touch screens or when the system
            asks for reduced motion, and the press does not shrink then either.
          </p>
          <p>
            Keyboard focus swaps the outline for the selection frame: yellow,
            with a dark gap inside it so it reads against the lime fill too.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Button"
          base={{
            name: "Button",
            href: "https://base-ui.com/react/components/button",
          }}
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "danger" | "ghost"',
              default: '"primary"',
              description:
                "The fill: the accent, a quiet charcoal, a dark slab outlined in danger, or nothing until pointed at.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description:
                "32, 40 or 52 px tall. The label and an icon inside follow.",
            },
            {
              name: "cut",
              type: '"end" | "start" | "both" | "none"',
              default: '"end"',
              description:
                "Which edges are cut on the slant. Two slabs cut on facing edges nest into each other.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
