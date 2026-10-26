import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { RootShell } from "../_root/shell";

/** The studio's own root layout: local only, English, never indexed. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Studio", template: "%s · zzzUI studio" },
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return <RootShell lang="en">{children}</RootShell>;
}
