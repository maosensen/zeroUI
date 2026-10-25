import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PostCardFeed from "../_demos/post-card-feed";

export const metadata = pageMetadata("/docs/post-card");

export default function PostCardPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/post-card")} />
      <DocHeader
        title="Post card"
        lead="A post card for React community feeds: a cover with its view count, the author's avatar on the cover's edge, a leaning title with its kind, and one line of the post."
      />
      <DocSection id="install" title="Install">
        <Install item="post-card" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="post-card-feed" title="A board of posts">
          <PostCardFeed />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The picture runs edge to edge with how many have seen it in its
            corner; the author's avatar sits on its lower edge beside the name.
            The title leans, with the post's kind ("Question", "Commission") in
            a small slab before it, and one line of the post follows, cut off
            with an ellipsis.
          </p>
          <p>
            Put a link or a button in <code>PostCardTitle</code>: it stretches
            over the whole card, which lifts and frames in the accent when
            pointed at and in yellow when focused, so the card is one stop on
            Tab and is named by its title. Lay many out with{" "}
            <a href="/docs/masonry">Masonry</a>. Under reduced motion the card
            does not lift.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="PostCardCover"
          rows={[
            {
              name: "views",
              type: "number",
              description: "How many have seen it, in the corner.",
            },
          ]}
        />
        <PropsTable
          part="PostCardAuthor"
          rows={[
            {
              name: "avatar",
              type: "ReactNode",
              description: "An Avatar, sitting on the cover's lower edge.",
            },
          ]}
        />
        <PropsTable
          part="PostCardTitle"
          rows={[
            {
              name: "kind",
              type: "string",
              description: "The post's kind, in a small slab before the title.",
            },
          ]}
        />
        <PropsTable part="PostCard, PostCardExcerpt" rows={[]} />
      </DocSection>
    </>
  );
}
