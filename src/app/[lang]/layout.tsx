import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HTML_LANG, isLang, LANGS, OG_LOCALE } from "@/lib/i18n/locale";
import { setLang } from "@/lib/i18n/server";
import { SITE_URL } from "@/lib/site";
import { OG_IMAGE, SITE_DESCRIPTION } from "@/seo/site";
import { RootShell } from "../_root/shell";

/** Both languages are built ahead; any other first segment is not a language (the layout's
 * notFound below: cacheComponents has no dynamicParams). */
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      siteName: "zzzUI",
      locale: OG_LOCALE[lang],
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
    title: { default: "zzzUI", template: "%s · zzzUI" },
    description: SITE_DESCRIPTION[lang],
  };
}

export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  setLang(lang);
  return <RootShell lang={HTML_LANG[lang]}>{children}</RootShell>;
}
