import BreadcrumbBasic from "@/app/docs/_demos/breadcrumb-basic";
import PaginationBasic from "@/app/docs/_demos/pagination-basic";
import SidebarApp from "@/app/docs/_demos/sidebar-app";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-6 border-zero-line border-t-2 py-5">
      <span className="font-bold font-zero text-zero-sm text-zero-text-2 italic">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

/** The navigation family: breadcrumb, pagination, sidebar (the docs' demos). */
export function NavigationSection() {
  return (
    <section className="grid gap-2">
      <h2 className="font-black text-zero-xl italic">Navigation</h2>
      <div>
        <Row label="breadcrumb">
          <BreadcrumbBasic />
        </Row>
        <Row label="pagination">
          <PaginationBasic />
        </Row>
        <Row label="sidebar">
          <SidebarApp />
        </Row>
      </div>
    </section>
  );
}
