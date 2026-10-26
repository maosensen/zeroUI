import { enter, type LangProps, pick } from "@/lib/i18n/server";
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
        lead={pick({
          en: "A masonry layout for React: cards of different heights packed into as many columns as fit, with CSS columns, so the server sends the final layout.",
          zh: "React 瀑布流布局：用 CSS columns 将高度不一的卡片排入尽可能多的列，服务端输出的即是最终布局。",
        })}
      />
      <DocSection id="install">
        <Install item="masonry" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="post-card-feed"
          title={pick({
            en: "Posts of different heights",
            zh: "高度不一的帖子",
          })}
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
                  As many columns of at least <code>columnWidth</code> as fit,
                  each item kept whole and spaced evenly. It is CSS columns:
                  nothing is measured in the browser, so the layout the server
                  sends is the final one and nothing jumps once scripts run.
                </p>
                <p>
                  Items read down the first column, then the next, in the order
                  they are written, which is also the order Tab and screen
                  readers follow. If the order across a row matters more than
                  packing, use a grid instead.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  在宽度允许的范围内排出尽可能多的列，每列不窄于{" "}
                  <code>columnWidth</code>；每一项保持完整，间距均匀。布局基于
                  CSS
                  columns，浏览器端不做任何测量，服务端输出的就是最终布局，脚本运行后也不会发生跳动。
                </p>
                <p>
                  各项按书写顺序先排满第一列，再排下一列；按 Tab
                  键切换与读屏软件朗读也遵循这一顺序。如果横向的阅读顺序比排布紧凑更重要，请改用网格布局。
                </p>
              </>
            ),
          })}
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
              description: pick({
                en: "The narrowest a column may be.",
                zh: "列的最小宽度。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
