import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import BadgeVariants from "../_demos/badge-variants";

export const metadata = pageMetadata("/docs/badge");

export default function BadgePage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/badge")} />
      <DocHeader
        title="Badge"
        lead="A short label stuck on something: a small slab cut on both sides, in small leaning capitals."
      />
      <DocSection id="install" title="Install">
        <Install item="badge" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="badge-variants" title="Four variants and an icon">
          <BadgeVariants />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The accent for what matters, the raised grey for the ordinary, a
            black well with a quiet outline for the quiet, red for danger. An
            icon goes before the word.
          </p>
          <p>
            <code>render</code> turns it into a link or any other element; as a
            link it lightens on hover and takes the focus frame.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Badge"
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "danger"',
              default: '"default"',
              description: "Its fill.",
            },
            {
              name: "render",
              type: "ReactElement",
              description: "The element to render as, such as a link.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
