/**
 * The keyword map (yPulse docs/seo-geo.md §9): each page, two or three phrases people really
 * search, and where on the page they belong. One phrase per page; "zeroUI" is the brand word and
 * always travels with a describing word. Revise against Search Console's real queries.
 */
import type { PagePath } from "./site";

export const KEYWORDS: Record<PagePath, { phrases: string[]; where: string }> =
  {
    "/": {
      phrases: [
        "game UI component library",
        "dark shadcn components",
        "shadcn registry components",
      ],
      where:
        "title, the hero's eyebrow and lead, the first paragraph of llms.txt",
    },
    "/docs": {
      phrases: ["install shadcn registry", "shadcn namespace registry add"],
      where: "title and the first two steps",
    },
    "/docs/button": {
      phrases: ["slanted button component react", "game ui button shadcn"],
      where: "description and lead",
    },
    "/docs/input": {
      phrases: ["shadcn input with icon", "password input show hide react"],
      where: "description and the slots example",
    },
    "/docs/field": {
      phrases: ["base ui form field validation", "react form error message"],
      where: "description and lead",
    },
    "/docs/select": {
      phrases: ["base ui select component", "dark select dropdown react"],
      where: "description and lead",
    },
    "/docs/tabs": {
      phrases: ["animated tabs sliding indicator", "shadcn tabs base ui"],
      where: "description and lead",
    },
    "/docs/icons": {
      phrases: ["solid svg icons react", "game ui icons"],
      where: "description and lead",
    },
  };
