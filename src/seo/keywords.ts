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
    "/docs/breadcrumb": {
      phrases: ["react breadcrumb component", "shadcn breadcrumb"],
      where: "description and lead",
    },
    "/docs/pagination": {
      phrases: ["react pagination component", "shadcn pagination"],
      where: "description and lead",
    },
    "/docs/sidebar": {
      phrases: ["collapsible sidebar react", "shadcn sidebar icon mode"],
      where: "description and behaviour",
    },
    "/docs/accordion": {
      phrases: ["base ui accordion", "react accordion component"],
      where: "description and lead",
    },
    "/docs/collapsible": {
      phrases: ["react collapsible panel", "shadcn collapsible"],
      where: "description and lead",
    },
    "/docs/toggle": {
      phrases: ["react toggle button", "pressed state button"],
      where: "description and lead",
    },
    "/docs/toggle-group": {
      phrases: ["toggle group react", "segmented control shadcn"],
      where: "description and lead",
    },
    "/docs/separator": {
      phrases: ["react separator component", "divider line component"],
      where: "description and lead",
    },
    "/docs/command": {
      phrases: ["react command palette", "cmd k menu base ui"],
      where: "description and lead",
    },
    "/docs/combobox": {
      phrases: ["base ui combobox", "react autocomplete input"],
      where: "description and lead",
    },
    "/docs/context-menu": {
      phrases: ["react context menu", "right click menu shadcn"],
      where: "description and lead",
    },
    "/docs/menubar": {
      phrases: ["react menubar component", "application menu bar"],
      where: "description and lead",
    },
    "/docs/hover-card": {
      phrases: ["react hover card", "link preview card"],
      where: "description and lead",
    },
    "/docs/input-otp": {
      phrases: ["otp input react", "one time code input base ui"],
      where: "description and lead",
    },
    "/docs/input-group": {
      phrases: ["input group shadcn", "input with addon react"],
      where: "description and lead",
    },
    "/docs/button-group": {
      phrases: ["button group react", "shadcn button group"],
      where: "description and lead",
    },
    "/docs/native-select": {
      phrases: ["styled native select", "react select element dark"],
      where: "description and lead",
    },
    "/docs/kbd": {
      phrases: ["kbd component react", "keyboard shortcut key"],
      where: "description and lead",
    },
    "/docs/label": {
      phrases: ["react label component", "shadcn label"],
      where: "description and lead",
    },
    "/docs/alert-dialog": {
      phrases: ["react alert dialog", "confirm dialog base ui"],
      where: "description and lead",
    },
    "/docs/drawer": {
      phrases: ["react drawer component", "swipeable bottom sheet"],
      where: "description and lead",
    },
    "/docs/navigation-menu": {
      phrases: ["react navigation menu", "mega menu base ui"],
      where: "description and lead",
    },
    "/docs/item": {
      phrases: ["react list item component", "shadcn item"],
      where: "description and lead",
    },
    "/docs/empty": {
      phrases: ["empty state component react", "shadcn empty"],
      where: "description and lead",
    },
    "/docs/scroll-area": {
      phrases: ["custom scrollbar react", "base ui scroll area"],
      where: "description and lead",
    },
    "/docs/aspect-ratio": {
      phrases: ["aspect ratio component react", "responsive image ratio"],
      where: "description and lead",
    },
    "/docs/spinner": {
      phrases: ["react loading spinner", "spinner component"],
      where: "description and lead",
    },
    "/docs/calendar": {
      phrases: ["react date picker calendar", "date range picker dark"],
      where: "description and lead",
    },
    "/docs/carousel": {
      phrases: ["react carousel component", "embla carousel shadcn"],
      where: "description and lead",
    },
    "/docs/chart": {
      phrases: ["shadcn chart dark", "recharts styled components"],
      where: "description and lead",
    },
    "/docs/resizable": {
      phrases: ["resizable panels react", "split pane component"],
      where: "description and lead",
    },
    "/docs/form": {
      phrases: ["react form validation base ui", "react hook form zod shadcn"],
      where: "description and behaviour",
    },
    "/docs/message": {
      phrases: ["chat message component react", "ai chat ui shadcn"],
      where: "description and lead",
    },
    "/docs/bubble": {
      phrases: ["chat bubble react", "message bubble component"],
      where: "description and lead",
    },
    "/docs/marker": {
      phrases: ["chat date separator", "chat system message"],
      where: "description and lead",
    },
    "/docs/attachment": {
      phrases: ["file attachment chat ui", "upload chip react"],
      where: "description and lead",
    },
    "/docs/code-block": {
      phrases: ["code block component react", "copy code button"],
      where: "description and lead",
    },
    "/docs/trace": {
      phrases: ["agent trace ui", "tool call steps react"],
      where: "description and lead",
    },
    "/docs/message-scroller": {
      phrases: ["chat scroll to bottom", "stick to bottom react"],
      where: "description and lead",
    },
    "/docs/questionnaire": {
      phrases: ["conversational form react", "multiple choice questions ui"],
      where: "description and lead",
    },
    "/docs/icons": {
      phrases: ["solid svg icons react", "game ui icons"],
      where: "description and lead",
    },
  };
