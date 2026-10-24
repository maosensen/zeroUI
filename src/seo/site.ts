/**
 * zeroUI's own SEO / GEO config (yPulse docs/seo-geo.md §3: a site's own things live in `src/seo/`,
 * the shared module in `src/lib/seo/`). The pages, their titles and descriptions, the share card:
 * each page's metadata, the sitemap, llms.txt and the JSON-LD all read this one list.
 */
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export { SITE_URL };

/** One share card for the whole site (1200 × 630), made from the components; see /studio/og. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "zeroUI — a dark, game-UI component library for shadcn",
};

/** IndexNow key (public, not a secret): public/<key>.txt holds the same string. */
export const INDEXNOW_KEY = "aebc74d868d931e341ced9e93a67694f";

export type Page = {
  path: string;
  /** The page's own title; the docs layout adds " · zeroUI". */
  title: string;
  /** For the home page, a full title that replaces the template. */
  absoluteTitle?: string;
  description: string;
  /** Its name in the breadcrumb trail. */
  crumb: string;
  group: "home" | "start" | "components" | "foundation";
};

export const PAGES = [
  {
    path: "/",
    title: "zeroUI",
    absoluteTitle: "zeroUI — a dark, game-UI component library for shadcn",
    description:
      "zeroUI is a dark-only React component library with a game-UI look: slabs cut on a slant, thick outlines and one fluorescent accent. Built on Base UI, installed from a shadcn registry.",
    crumb: "zeroUI",
    group: "home",
  },
  {
    path: "/docs",
    title: "Getting started",
    description:
      "Install zeroUI into a shadcn project: add the @zeroui registry namespace once, then any component, the theme and the icons.",
    crumb: "Getting started",
    group: "start",
  },
  {
    path: "/docs/button",
    title: "Button",
    description:
      "A slanted game-UI button for shadcn: four variants, three sizes, four cuts, a springing press and a sheen on hover.",
    crumb: "Button",
    group: "components",
  },
  {
    path: "/docs/input",
    title: "Input",
    description:
      "A dark inset text input for shadcn, with room for an icon or an action (clear, show the password) at either end.",
    crumb: "Input",
    group: "components",
  },
  {
    path: "/docs/field",
    title: "Field",
    description:
      "Label, description and error around a form control, with Base UI's validation and an error that slides in.",
    crumb: "Field",
    group: "components",
  },
  {
    path: "/docs/select",
    title: "Select",
    description:
      "A Base UI select for shadcn: a dark inset trigger, a popup lifted by outline, and a highlighted row in the accent.",
    crumb: "Select",
    group: "components",
  },
  {
    path: "/docs/tabs",
    title: "Tabs",
    description:
      "Animated tabs with a sliding indicator: an accent slab that springs along a slanted track to the active tab.",
    crumb: "Tabs",
    group: "components",
  },
  {
    path: "/docs/icons",
    title: "Icons",
    description:
      "Nineteen solid React SVG icons drawn on one grid, their strokes ending on the same slant as zeroUI's slabs.",
    crumb: "Icons",
    group: "foundation",
  },
] as const satisfies readonly Page[];

export type PagePath = (typeof PAGES)[number]["path"];

export function page(path: PagePath): Page {
  const found = PAGES.find((p) => p.path === path);
  if (!found) throw new Error(`No SEO entry for ${path}`);
  return found;
}

/** The absolute address of a page (the root keeps its slash, as the sitemap writes it). */
export const pageUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

/**
 * A page's metadata: title, description, canonical, and the share card. A page that sets
 * openGraph replaces the layout's whole openGraph (Next merges shallowly), so the card is always
 * carried here rather than left to the layout.
 */
export function pageMetadata(path: PagePath): Metadata {
  const p: Page = page(path);
  return {
    title: p.absoluteTitle ? { absolute: p.absoluteTitle } : p.title,
    description: p.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "zeroUI",
      locale: "en",
      url: path,
      title: p.absoluteTitle ?? `${p.title} · zeroUI`,
      description: p.description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  };
}
