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
  group:
    | "home"
    | "start"
    | "components"
    | "overlays"
    | "feedback"
    | "data"
    | "navigation"
    | "disclosure"
    | "foundation";
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
    path: "/docs/textarea",
    title: "Textarea",
    description:
      "A dark multi-line text area for shadcn that grows with what is typed, in the same sunken well as Input.",
    crumb: "Textarea",
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
    path: "/docs/checkbox",
    title: "Checkbox",
    description:
      "A slanted checkbox for shadcn on Base UI: a sunken well that fills with the accent, with an indeterminate state.",
    crumb: "Checkbox",
    group: "components",
  },
  {
    path: "/docs/radio-group",
    title: "Radio group",
    description:
      "A radio group for shadcn on Base UI: slanted wells, the chosen one holding a slab of the accent.",
    crumb: "Radio group",
    group: "components",
  },
  {
    path: "/docs/switch",
    title: "Switch",
    description:
      "A slanted toggle switch for React: an accent track and a slab that springs across to the other end.",
    crumb: "Switch",
    group: "components",
  },
  {
    path: "/docs/slider",
    title: "Slider",
    description:
      "A range slider for shadcn on Base UI: a slanted track, an accent fill, slab thumbs; one value or two.",
    crumb: "Slider",
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
    path: "/docs/dialog",
    title: "Dialog",
    description:
      "A modal dialog for shadcn on Base UI: a panel over a dimmed page, a black title bar, and the actions.",
    crumb: "Dialog",
    group: "overlays",
  },
  {
    path: "/docs/sheet",
    title: "Sheet",
    description:
      "A side sheet for React: a dialog that slides in from an edge of the screen and holds on to it.",
    crumb: "Sheet",
    group: "overlays",
  },
  {
    path: "/docs/popover",
    title: "Popover",
    description:
      "A Base UI popover for shadcn: a panel beside its trigger for a few lines of text or a small form.",
    crumb: "Popover",
    group: "overlays",
  },
  {
    path: "/docs/tooltip",
    title: "Tooltip",
    description:
      "A one-line tooltip for React on a light slanted slab, opening on hover and keyboard focus.",
    crumb: "Tooltip",
    group: "overlays",
  },
  {
    path: "/docs/dropdown-menu",
    title: "Dropdown menu",
    description:
      "A dropdown menu for shadcn on Base UI: actions, checkbox and radio rows, shortcuts, highlighted in the accent.",
    crumb: "Dropdown menu",
    group: "overlays",
  },
  {
    path: "/docs/alert",
    title: "Alert",
    description:
      "An alert component for React in four tones, info, success, warning and danger, each with its own slanted badge.",
    crumb: "Alert",
    group: "feedback",
  },
  {
    path: "/docs/progress",
    title: "Progress",
    description:
      "A Base UI progress bar for shadcn: a slanted track, a segmented gauge, and a sweep for an unknown amount.",
    crumb: "Progress",
    group: "feedback",
  },
  {
    path: "/docs/skeleton",
    title: "Skeleton",
    description:
      "Skeleton loading placeholders for React: blocks, slanted text lines and control-sized slabs with a moving glint.",
    crumb: "Skeleton",
    group: "feedback",
  },
  {
    path: "/docs/toast",
    title: "Toast",
    description:
      "Toast notifications for React on Base UI: they slide into the corner, stack, swipe away and leave on their own.",
    crumb: "Toast",
    group: "feedback",
  },
  {
    path: "/docs/card",
    title: "Card",
    description:
      "A card component for shadcn: a square-cornered box with a black header bar, content and a footer.",
    crumb: "Card",
    group: "data",
  },
  {
    path: "/docs/table",
    title: "Table",
    description:
      "A data table for React: column heads on a black bar, quiet row lines, a lit row and a selected one.",
    crumb: "Table",
    group: "data",
  },
  {
    path: "/docs/badge",
    title: "Badge",
    description:
      "A badge component for React: a small slanted slab in four variants, with an icon or as a link.",
    crumb: "Badge",
    group: "data",
  },
  {
    path: "/docs/avatar",
    title: "Avatar",
    description:
      "A Base UI avatar for shadcn: a round picture or initials, a status dot, and overlapping groups.",
    crumb: "Avatar",
    group: "data",
  },
  {
    path: "/docs/breadcrumb",
    title: "Breadcrumb",
    description:
      "A breadcrumb component for React: the pages above this one in leaning type, set apart by slanted bars.",
    crumb: "Breadcrumb",
    group: "navigation",
  },
  {
    path: "/docs/pagination",
    title: "Pagination",
    description:
      "A pagination component for shadcn: pages as small slanted slabs, the current one filled with the accent.",
    crumb: "Pagination",
    group: "navigation",
  },
  {
    path: "/docs/sidebar",
    title: "Sidebar",
    description:
      "A collapsible sidebar for React on Base UI: folds to an icon rail with tooltips, and opens as a sheet on phones.",
    crumb: "Sidebar",
    group: "navigation",
  },
  {
    path: "/docs/accordion",
    title: "Accordion",
    description:
      "A Base UI accordion for shadcn: sections that open one at a time, leaning headings, an accent mark when open.",
    crumb: "Accordion",
    group: "disclosure",
  },
  {
    path: "/docs/collapsible",
    title: "Collapsible",
    description:
      "A collapsible panel for React that unfolds to its own height and folds back faster.",
    crumb: "Collapsible",
    group: "disclosure",
  },
  {
    path: "/docs/toggle",
    title: "Toggle",
    description:
      "A toggle button for React: a slanted slab that stays down, filled with the accent while on.",
    crumb: "Toggle",
    group: "disclosure",
  },
  {
    path: "/docs/toggle-group",
    title: "Toggle group",
    description:
      "A toggle group for shadcn on Base UI: slanted slabs that nest in a row, one value or several.",
    crumb: "Toggle group",
    group: "disclosure",
  },
  {
    path: "/docs/separator",
    title: "Separator",
    description:
      "A separator component for React: a quiet line across or upright between two things.",
    crumb: "Separator",
    group: "disclosure",
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
