import { enter, type LangProps } from "@/lib/i18n/server";
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
        lead="Where this page sits: the pages above it in leaning type, set apart by a short slanted bar, the slab's edge on its own."
      />
      <DocSection id="install">
        <Install item="breadcrumb" />
      </DocSection>
      <DocSection id="examples">
        <Demo file="breadcrumb-basic" title="A trail with pages left out">
          <BreadcrumbBasic />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          <p>
            The pages above are quiet and light up when pointed at; the current
            page is the brightest and heaviest, marked{" "}
            <code>aria-current="page"</code>. BreadcrumbEllipsis stands in for
            pages left out.
          </p>
          <p>
            BreadcrumbLink is an anchor; <code>render</code> takes a router's
            link instead.
          </p>
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="BreadcrumbLink"
          rows={[
            {
              name: "render",
              type: "ReactElement",
              description: "The element to render as, such as a router link.",
            },
          ]}
        />
        <PropsTable
          part="Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
