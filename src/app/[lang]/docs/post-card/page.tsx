import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PostCardFeed from "../_demos/post-card-feed";

export const generateMetadata = metadataFor("/docs/post-card");

export default async function PostCardPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/post-card")} />
      <DocHeader
        title="Post card"
        lead={pick({
          en: "A post card for React community feeds: a cover with its view count, the author's avatar on the cover's edge, a leaning title with its kind, and one line of the post.",
          zh: "React 帖子卡片组件，用于社区动态：封面带浏览量，作者头像压在封面边缘，斜体标题前标有帖子类型，下附一行正文摘要。",
        })}
      />
      <DocSection id="install">
        <Install item="post-card" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="post-card-feed"
          title={pick({ en: "A board of posts", zh: "帖子墙" })}
        >
          <PostCardFeed />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The picture runs edge to edge with how many have seen it in
                  its corner; the author's avatar sits on its lower edge beside
                  the name. The title leans, with the post's kind ("Question",
                  "Commission") in a small slab before it, and one line of the
                  post follows, cut off with an ellipsis.
                </p>
                <p>
                  Put a link or a button in <code>PostCardTitle</code>: it
                  stretches over the whole card, which lifts and frames in the
                  accent when pointed at and in yellow when focused, so the card
                  is one stop on Tab and is named by its title. Lay many out
                  with <a href={link("/docs/masonry")}>Masonry</a>. Under
                  reduced motion the card does not lift.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  图片铺满卡片宽度，角落显示浏览量；作者头像压在图片下边缘，旁边是作者名。标题为斜体，前面的小斜切块标出帖子类型（「Question」「Commission」），其后是一行正文摘要，超出部分以省略号截断。
                </p>
                <p>
                  在 <code>PostCardTitle</code>{" "}
                  中放入链接或按钮：它的点击区域会覆盖整张卡片。悬停时卡片上浮并显示强调色边框，聚焦时显示黄色焦点框；整张卡片在
                  Tab 顺序中只占一个位置，并以标题作为可访问名称。多张卡片可用{" "}
                  <a href={link("/docs/masonry")}>Masonry</a>{" "}
                  排布。开启「减少动态效果」时，卡片不上浮。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="PostCardCover"
          rows={[
            {
              name: "views",
              type: "number",
              description: pick({
                en: "How many have seen it, in the corner.",
                zh: "浏览量，显示在角落。",
              }),
            },
            {
              name: "viewsLabel",
              type: "(views: string) => string",
              default: '"Seen {views} times"',
              description: pick({
                en: "What screen readers hear for the view count, given it written out.",
                zh: "读屏软件为浏览次数读出的文字，参数是已格式化的数字。",
              }),
            },
          ]}
        />
        <PropsTable
          part="PostCardAuthor"
          rows={[
            {
              name: "avatar",
              type: "ReactNode",
              description: pick({
                en: "An Avatar, sitting on the cover's lower edge.",
                zh: "一个 Avatar，压在封面下边缘。",
              }),
            },
          ]}
        />
        <PropsTable
          part="PostCardTitle"
          rows={[
            {
              name: "kind",
              type: "string",
              description: pick({
                en: "The post's kind, in a small slab before the title.",
                zh: "帖子类型，以小斜切块显示在标题前。",
              }),
            },
          ]}
        />
        <PropsTable part="PostCard, PostCardExcerpt" rows={[]} />
      </DocSection>
    </>
  );
}
