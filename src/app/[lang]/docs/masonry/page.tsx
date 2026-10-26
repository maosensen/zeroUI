import { enter, type LangProps } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PostCardFeed from "../_demos/post-card-feed";

export const generateMetadata = metadataFor("/docs/masonry");

export default async function MasonryPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/masonry")} />
      <DocHeader
        title="Masonry"
        lead="A masonry layout for React: cards of different heights packed into as many columns as fit, with CSS columns, so the server sends the final layout."
      />
      <DocSection id="install">
        <Install item="masonry" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="post-card-feed" title="Posts of different heights">
          <PostCardFeed />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            As many columns of at least <code>columnWidth</code> as fit, each
            item kept whole and spaced evenly. It is CSS columns: nothing is
            measured in the browser, so the layout the server sends is the final
            one and nothing jumps once scripts run.
          </p>
          <p>
            Items read down the first column, then the next, in the order they
            are written, which is also the order Tab and screen readers follow.
            If the order across a row matters more than packing, use a grid
            instead.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Masonry"
          rows={[
            {
              name: "columnWidth",
              type: "string",
              default: '"17rem"',
              description: "The narrowest a column may be.",
            },
          ]}
        />
      </DocSection>
    </>
  );
}
