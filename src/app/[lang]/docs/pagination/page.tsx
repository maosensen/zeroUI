import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PaginationBasic from "../_demos/pagination-basic";

export const generateMetadata = metadataFor("/docs/pagination");

export default async function PaginationPage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/pagination")} />
      <DocHeader
        title="Pagination"
        lead={pick({
          en: "A row of pages as small slabs cut on both sides, nesting like the tabs; the current page is filled with the accent.",
          zh: "页码显示为一排小斜切块，像 Tabs 一样彼此嵌合；当前页填充强调色。",
        })}
      />
      <DocSection id="install">
        <Install item="pagination" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="pagination-basic"
          title={pick({ en: "Twelve pages", zh: "十二页" })}
        >
          <PaginationBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  The other pages are ghosts that light when pointed at.
                  Previous and next carry a chevron and their word, which hides
                  on a phone. Which pages to show is yours to decide;
                  PaginationEllipsis stands in for the gaps.
                </p>
                <p>
                  The links are anchors; <code>render</code> takes a router's
                  link instead.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  其余页码不填充，指针悬停时变亮。「上一页」「下一页」带箭头和文字，在手机上隐藏文字。显示哪些页码由使用方决定，被跳过的页码用
                  PaginationEllipsis 代替。
                </p>
                <p>
                  链接默认渲染为 <code>a</code> 元素；可通过 <code>render</code>{" "}
                  换成路由库的链接组件。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="PaginationLink"
          rows={[
            {
              name: "isActive",
              type: "boolean",
              default: "false",
              description: pick({
                en: 'The page being shown: filled with the accent, aria-current="page".',
                zh: '当前页：填充强调色，并带有 aria-current="page"。',
              }),
            },
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
          part="PaginationPrevious, PaginationNext"
          rows={[
            {
              name: "children",
              type: "ReactNode",
              default: '"Previous" / "Next"',
              description: pick({
                en: "The word beside the chevron.",
                zh: "箭头旁的文字。",
              }),
            },
          ]}
        />
        <PropsTable
          part="Pagination, PaginationContent, PaginationItem, PaginationEllipsis"
          rows={[]}
        />
        <PropsTable
          part="PaginationEllipsis"
          rows={[
            {
              name: "label",
              type: "string",
              default: '"More pages"',
              description: pick({
                en: "What screen readers hear for the pages left out.",
                zh: "读屏软件为省略的页码读出的文字。",
              }),
            },
          ]}
        />
      </DocSection>
    </>
  );
}
