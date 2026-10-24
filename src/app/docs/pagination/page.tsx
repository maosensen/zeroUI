import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import PaginationBasic from "../_demos/pagination-basic";

export const metadata = pageMetadata("/docs/pagination");

export default function PaginationPage() {
  return (
    <>
      <JsonLd data={docGraph("/docs/pagination")} />
      <DocHeader
        title="Pagination"
        lead="A row of pages as small slabs cut on both sides, nesting like the tabs; the current page is filled with the accent."
      />
      <DocSection id="install" title="Install">
        <Install item="pagination" />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <Demo file="pagination-basic" title="Twelve pages">
          <PaginationBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour" title="Behaviour">
        <Prose>
          <p>
            The other pages are ghosts that light when pointed at. Previous and
            next carry a chevron and their word, which hides on a phone. Which
            pages to show is yours to decide; PaginationEllipsis stands in for
            the gaps.
          </p>
          <p>
            The links are anchors; <code>render</code> takes a router's link
            instead.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props" title="Props">
        <PropsTable
          part="PaginationLink"
          rows={[
            {
              name: "isActive",
              type: "boolean",
              default: "false",
              description:
                'The page being shown: filled with the accent, aria-current="page".',
            },
            {
              name: "render",
              type: "ReactElement",
              description: "The element to render as, such as a router link.",
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
              description: "The word beside the chevron.",
            },
          ]}
        />
        <PropsTable
          part="Pagination, PaginationContent, PaginationItem, PaginationEllipsis"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
