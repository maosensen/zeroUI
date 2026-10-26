import {
  Martian_Mono,
  Montserrat,
  Noto_Sans_SC,
  Outfit,
} from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import { Providers } from "@/components/providers";
import { AccentScript } from "@/components/zero/accent-switch";
import { cn } from "@/lib/utils";

/*
 * What every root layout shares (the site's, under [lang], and the studio's): the faces, the
 * accent restored before paint, the provider stack. Two root layouts, because <html lang> follows
 * the page's language and the studio has none.
 */

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

// The Chinese pages' face: Montserrat and Outfit have no CJK glyphs, and the systems' own fall
// short of the black weight the display face is set in. Google serves it in unicode-range slices,
// so a page downloads only the slices holding its characters; it is put on <html> for Chinese only
// (globals.css appends it to --font-zero and --font-zero-text there).
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["500", "700", "900"],
  preload: false,
  display: "swap",
});

export function RootShell({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        montserrat.variable,
        outfit.variable,
        martianMono.variable,
        lang === "zh-CN" && notoSansSC.variable,
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
