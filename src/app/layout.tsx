import type { Metadata } from "next";
import { Martian_Mono, Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AccentScript } from "@/components/zero/accent-switch";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { OG_IMAGE } from "@/seo/site";

// zzzUI's one typeface (tokens.css: --font-zero). Variable weight, with a true italic.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// zzzUI's text face (tokens.css: --font-zero-text): running text and typed values, always upright.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// The docs' code face: wide and geometric, so code sits with Montserrat's width.
const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "zzzUI",
    locale: "en",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  title: { default: "zzzUI", template: "%s · zzzUI" },
  description:
    "A dark-only component library built on shadcn: its own tokens, motion and icons, installed through a shadcn registry.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        montserrat.variable,
        outfit.variable,
        martianMono.variable,
        "font-sans",
      )}
    >
      <head>
        <AccentScript />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
