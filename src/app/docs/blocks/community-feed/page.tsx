import { CommunityFeed } from "@/components/blocks/community-feed";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const metadata = pageMetadata("/docs/blocks/community-feed");

export default function CommunityFeedPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/community-feed")} />
      <DocHeader
        title="Community feed"
        lead="A community board for React: posts of every height in columns, a filter by kind, and a post opening in a sheet with its replies and a way to take a commission."
      />
      <DocSection id="install" title="Install">
        <Install item="community-feed" />
      </DocSection>
      <DocSection id="preview" title="Preview">
        <Block name="community-feed">
          <CommunityFeed />
        </Block>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The board is <a href="/docs/post-card">Post cards</a> in{" "}
            <a href="/docs/masonry">Masonry</a>; a toggle group filters it by
            kind. Opening a post (its title is the card's one button) slides a{" "}
            <a href="/docs/sheet">Sheet</a> in from the right with the cover,
            the post, its replies and, for a commission, a button to take it.
            The sheet keeps its content while it leaves.
          </p>
          <p>
            The covers are posters made from a token colour, an item icon and a
            leaning word: put your pictures in their place.
          </p>
          <p>
            Built from <a href="/docs/post-card">Post card</a>,{" "}
            <a href="/docs/masonry">Masonry</a>, <a href="/docs/sheet">Sheet</a>
            , <a href="/docs/toggle-group">Toggle group</a>,{" "}
            <a href="/docs/avatar">Avatar</a>, <a href="/docs/button">Button</a>
            . It installs those with it.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
