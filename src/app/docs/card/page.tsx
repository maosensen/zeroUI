import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import CardJob from "../_demos/card-job";

export const metadata = pageMetadata("/docs/card");

export default function CardPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/card")} />
      <DocHeader
        title="Card"
        lead="A box of related things set into the page: a black header bar for the title and an action, the content, and a footer divided by a quiet line."
      />
      <DocSection id="install" title="Install">
        <Install item="card" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="card-job" title="A job with its reward">
          <CardJob />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            It is square-cornered, like everything whose height depends on what
            it holds. A picture as its first child runs edge to edge. A card
            with no header is a plain box.
          </p>
          <p>
            Pass <code>interactive</code> to a card that is a link or opens
            something: pointing at it lifts its outline to the accent, and a
            focused control inside lifts it to the focus yellow.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="Card"
          rows={[
            {
              name: "interactive",
              type: "boolean",
              default: "false",
              description:
                "Lights the outline on hover and when something inside has keyboard focus.",
            },
          ]}
        />
        <PropsTable
          part="CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
