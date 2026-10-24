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
    "/docs/textarea": {
      phrases: ["auto resize textarea react", "dark textarea shadcn"],
      where: "description and lead",
    },
    "/docs/checkbox": {
      phrases: ["indeterminate checkbox react", "base ui checkbox"],
      where: "description and behaviour",
    },
    "/docs/radio-group": {
      phrases: ["radio group react base ui", "custom radio button css"],
      where: "description and lead",
    },
    "/docs/switch": {
      phrases: ["toggle switch component react", "animated switch css"],
      where: "description and lead",
    },
    "/docs/slider": {
      phrases: ["range slider two thumbs react", "base ui slider"],
      where: "description and behaviour",
    },
    "/docs/dialog": {
      phrases: ["modal dialog react base ui", "shadcn dialog dark"],
      where: "description and lead",
    },
    "/docs/sheet": {
      phrases: ["side sheet react", "slide over panel shadcn"],
      where: "description and lead",
    },
    "/docs/popover": {
      phrases: ["base ui popover", "react popover component"],
      where: "description and lead",
    },
    "/docs/tooltip": {
      phrases: ["react tooltip component", "tooltip on hover and focus"],
      where: "description and behaviour",
    },
    "/docs/dropdown-menu": {
      phrases: ["dropdown menu react base ui", "context menu with shortcuts"],
      where: "description and behaviour",
    },
    "/docs/alert": {
      phrases: ["react alert component", "success warning danger alert"],
      where: "description and lead",
    },
    "/docs/progress": {
      phrases: ["base ui progress bar", "segmented progress bar react"],
      where: "description and lead",
    },
    "/docs/skeleton": {
      phrases: ["skeleton loading react", "skeleton placeholder shadcn"],
      where: "description and lead",
    },
    "/docs/toast": {
      phrases: ["react toast notifications", "base ui toast"],
      where: "description and behaviour",
    },
    "/docs/card": {
      phrases: ["shadcn card component", "react card with header"],
      where: "description and lead",
    },
    "/docs/table": {
      phrases: ["react data table", "shadcn table dark"],
      where: "description and lead",
    },
    "/docs/badge": {
      phrases: ["react badge component", "status badge shadcn"],
      where: "description and lead",
    },
    "/docs/avatar": {
      phrases: ["base ui avatar", "avatar group react"],
      where: "description and behaviour",
    },
    "/docs/icons": {
      phrases: ["solid svg icons react", "game ui icons"],
      where: "description and lead",
    },
  };
