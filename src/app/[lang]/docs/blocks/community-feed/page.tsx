import { CommunityFeed } from "@/components/blocks/community-feed";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Block } from "../../_components/block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import { Install } from "../../_components/install";

export const generateMetadata = metadataFor("/docs/blocks/community-feed");

export default async function CommunityFeedPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/blocks/community-feed")} />
      <DocHeader
        title="Community feed"
        lead={pick({
          en: "A community board for React: posts of every height in columns, a filter by kind, and a post opening in a sheet with its replies and a way to take a commission.",
          zh: "React 社区留言板：高低不一的帖子分栏排列，可按类型筛选；帖子在侧滑面板中打开，显示回复，委托类帖子还可直接接受委托。",
        })}
      />
      <DocSection id="install">
        <Install item="community-feed" />
      </DocSection>
      <DocSection id="preview">
        <Block name="community-feed">
          <CommunityFeed />
        </Block>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The board is <a href={link("/docs/post-card")}>Post cards</a>{" "}
                  in <a href={link("/docs/masonry")}>Masonry</a>; a toggle group
                  filters it by kind. Opening a post (its title is the card's
                  one button) slides a <a href={link("/docs/sheet")}>Sheet</a>{" "}
                  in from the right with the cover, the post, its replies and,
                  for a commission, a button to take it. The sheet keeps its
                  content while it leaves.
                </p>
                <p>
                  The covers are posters made from a token colour, an item icon
                  and a leaning word: put your pictures in their place.
                </p>
                <p>
                  Built from <a href={link("/docs/post-card")}>Post card</a>,{" "}
                  <a href={link("/docs/masonry")}>Masonry</a>,{" "}
                  <a href={link("/docs/sheet")}>Sheet</a>,{" "}
                  <a href={link("/docs/toggle-group")}>Toggle group</a>,{" "}
                  <a href={link("/docs/avatar")}>Avatar</a>,{" "}
                  <a href={link("/docs/button")}>Button</a>. It installs those
                  with it.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  留言板以 <a href={link("/docs/masonry")}>Masonry</a> 排列{" "}
                  <a href={link("/docs/post-card")}>Post card</a>
                  ，并可通过一组切换按钮按类型筛选。打开帖子时（标题是卡片上唯一的按钮），
                  <a href={link("/docs/sheet")}>Sheet</a>{" "}
                  从右侧滑入，显示封面、正文与回复；委托类帖子另附一个接受委托的按钮。Sheet
                  在退出过程中保留原有内容。
                </p>
                <p>
                  封面是由设计 token
                  中的颜色、一个物品图标和一个倾斜的单词组成的海报，可替换为自己的图片。
                </p>
                <p>
                  由 <a href={link("/docs/post-card")}>Post card</a>、
                  <a href={link("/docs/masonry")}>Masonry</a>、
                  <a href={link("/docs/sheet")}>Sheet</a>、
                  <a href={link("/docs/toggle-group")}>Toggle group</a>、
                  <a href={link("/docs/avatar")}>Avatar</a>、
                  <a href={link("/docs/button")}>Button</a>{" "}
                  组成，安装此代码块时会一并安装这些组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
