import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import BreadcrumbBasic from "../_demos/breadcrumb-basic";

export const generateMetadata = metadataFor("/docs/breadcrumb");

export default async function BreadcrumbPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/breadcrumb")} />
      <DocHeader
        title="Breadcrumb"
        lead={pick({
          en: "Where this page sits: the pages above it in leaning type, set apart by a short slanted bar, the slab's edge on its own.",
          zh: "标明当前页所处的位置：各级上级页面以斜体排列，彼此之间用一道短斜杠分隔，斜杠取自斜切块的斜边。",
        })}
      />
      <DocSection id="install">
        <Install item="breadcrumb" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="breadcrumb-basic"
          title={pick({
            en: "A trail with pages left out",
            zh: "省略了中间层级的路径",
          })}
        >
          <BreadcrumbBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The pages above are quiet and light up when pointed at; the
                  current page is the brightest and heaviest, marked{" "}
                  <code>aria-current="page"</code>. BreadcrumbEllipsis stands in
                  for pages left out.
                </p>
                <p>
                  BreadcrumbLink is an anchor; <code>render</code> takes a
                  router's link instead.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  上级页面颜色较暗，指针悬停时变亮；当前页最亮、字重最大，并标注{" "}
                  <code>aria-current="page"</code>。BreadcrumbEllipsis
                  代替被省略的页面。
                </p>
                <p>
                  BreadcrumbLink 默认渲染为 <code>a</code> 元素；可通过{" "}
                  <code>render</code> 换成路由库的链接组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="BreadcrumbLink"
          rows={[
            {
              name: "render",
              type: "ReactElement",
              description: pick({
                en: "The element to render as, such as a router link.",
                zh: "改为渲染的元素，例如路由库的链接组件。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis"
          rows={[]}
        />
        <PropsTable
          part="BreadcrumbEllipsis"
          rows={[
            {
              name: "label",
              type: "string",
              default: '"More"',
              description: pick({
                en: "What screen readers hear for the folded crumbs.",
                zh: "读屏软件为折叠起来的层级读出的文字。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
