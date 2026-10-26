import { Martian_Mono, Montserrat, Outfit } from "next/font/google";
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
