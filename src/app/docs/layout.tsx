import type { Metadata } from "next";
import { SiteHeader } from "../_site/site-header";
import { DocsNav } from "./_components/nav";

export const metadata: Metadata = {
  title: { default: "Docs", template: "%s · zzzUI" },
};

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="min-h-svh bg-zero-ground bg-(image:--zero-hatch)">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14 lg:py-12">
        <DocsNav />
        <main className="grid min-w-0 content-start gap-14">{children}</main>
      </div>
    </div>
  );
}
