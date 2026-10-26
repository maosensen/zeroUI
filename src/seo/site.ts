/**
 * zzzUI's own SEO / GEO config (yPulse docs/seo-geo.md §3: a site's own things live in `src/seo/`,
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
  alt: "zzzUI — a dark, game-UI component library for shadcn",
};

/** IndexNow key (public, not a secret): public/<key>.txt holds the same string. */
export const INDEXNOW_KEY = "aebc74d868d931e341ced9e93a67694f";

export type Page = {
  path: string;
  /** The page's own title; the docs layout adds " · zzzUI". */
  title: string;
  /** For the home page, a full title that replaces the template. */
  absoluteTitle?: string;
  description: string;
  /** Its name in the breadcrumb trail. */
  crumb: string;
  group:
    | "home"
    | "start"
    | "blocks"
    | "guides"
    | "examples"
    | "components"
    | "overlays"
    | "feedback"
    | "data"
    | "navigation"
    | "disclosure"
    | "commands"
    | "inputs"
    | "layout"
    | "chat"
    | "game"
    | "foundation";
};

export const PAGES = [
  {
    path: "/",
    title: "zzzUI",
    absoluteTitle: "zzzUI — a dark, game-UI component library for shadcn",
    description:
      "zzzUI is a dark-only React component library with a game-UI look: slabs cut on a slant, thick outlines and one fluorescent accent. Built on Base UI, installed from a shadcn registry.",
    crumb: "zzzUI",
    group: "home",
  },
  {
    path: "/docs",
    title: "Getting started",
    description:
      "Install zzzUI into a shadcn project: add the @zzzui registry namespace once, then any component, the theme and the icons.",
    crumb: "Getting started",
    group: "start",
  },
  {
    path: "/docs/blocks",
    title: "Blocks",
    description:
      "Game UI blocks for React and shadcn: a title screen, settings, a pause menu, a mission briefing, a character select, a loadout, a leaderboard, a HUD, a feed, level rewards and a schedule.",
    crumb: "Blocks",
    group: "blocks",
  },
  {
    path: "/docs/blocks/settings-menu",
    title: "Settings menu",
    description:
      "A game settings menu block for React: display, audio, controls and gameplay tabs, built from zzzUI's Select, Slider, Switch and Hold button.",
    crumb: "Settings menu",
    group: "blocks",
  },
  {
    path: "/docs/blocks/mission-briefing",
    title: "Mission briefing",
    description:
      "A game mission briefing block for React: a route map, objectives, a threat gauge, the reward, and hold-to-accept with a cut-in.",
    crumb: "Mission briefing",
    group: "blocks",
  },
  {
    path: "/docs/blocks/loadout",
    title: "Loadout",
    description:
      "A game loadout and inventory screen block for React: a slot grid, item details with gauges, a belt to equip, and hold-to-scrap that pays credits.",
    crumb: "Loadout",
    group: "blocks",
  },
  {
    path: "/docs/blocks/leaderboard",
    title: "Leaderboard",
    description:
      "A game leaderboard block for React: periods as tabs, the top three marked legendary, epic and rare, and the player's own row pinned.",
    crumb: "Leaderboard",
    group: "blocks",
  },
  {
    path: "/docs/blocks/hud",
    title: "HUD",
    description:
      "A game HUD block for React: health and shield gauges, a credit counter, objectives and a working hotbar with cooldowns, over a scene.",
    crumb: "HUD",
    group: "blocks",
  },
  {
    path: "/docs/blocks/title-screen",
    title: "Title screen",
    description:
      "A game title screen and main menu block for React: a glitching title, an arrow-key menu, a news panel and key hints.",
    crumb: "Title screen",
    group: "blocks",
  },
  {
    path: "/docs/blocks/pause-menu",
    title: "Pause menu",
    description:
      "A game pause menu block for React: the run's stats, resume, settings and map, and hold-to-abandon, toggled with Escape.",
    crumb: "Pause menu",
    group: "blocks",
  },
  {
    path: "/docs/blocks/character-select",
    title: "Character select",
    description:
      "A game character select block for React: a roster of cards, ratings as segmented gauges, a perk, locked characters, and hold-to-deploy.",
    crumb: "Character select",
    group: "blocks",
  },
  {
    path: "/docs/blocks/community-feed",
    title: "Community feed",
    description:
      "A game community feed block for React: a masonry board of post cards, a filter, and a post sheet with replies and actions.",
    crumb: "Community feed",
    group: "blocks",
  },
  {
    path: "/docs/blocks/level-rewards",
    title: "Level rewards",
    description:
      "A season pass block for React: a profile chip with experience, a reward track per level, claim and claim all.",
    crumb: "Level rewards",
    group: "blocks",
  },
  {
    path: "/docs/blocks/daily-schedule",
    title: "Daily schedule",
    description:
      "A game daily schedule block for React: shifts with errands as objectives, the current one framed and marked now.",
    crumb: "Daily schedule",
    group: "blocks",
  },
  {
    path: "/examples",
    title: "Examples",
    description:
      "Example apps built with zzzUI: whole game screens put together from its blocks and components, every part installable from the shadcn registry.",
    crumb: "Examples",
    group: "examples",
  },
  {
    path: "/examples/board",
    title: "Courier board",
    description:
      "A game community app built with zzzUI and shadcn: a post board, today's shifts and a rank page with rewards, under tabs paged with Q and E.",
    crumb: "Courier board",
    group: "examples",
  },
  {
    path: "/examples/signal-board",
    title: "Signal board",
    description:
      "A data-first news aggregator built with zzzUI and shadcn: a live ticker, readings, a heat-ranked board walked with the keyboard, a preview pane and topics.",
    crumb: "Signal board",
    group: "examples",
  },
  {
    path: "/examples/ops-console",
    title: "Ops console",
    description:
      "An on-call ops console built with zzzUI and shadcn: a live service status wall, an alert queue to acknowledge, and an incident war room with its runbook.",
    crumb: "Ops console",
    group: "examples",
  },
  {
    path: "/docs/guides",
    title: "Guides",
    description:
      "Guides to building game UI in React with zzzUI and shadcn: a settings menu, a health bar with a damage trail, and theming with tokens.",
    crumb: "Guides",
    group: "guides",
  },
  {
    path: "/docs/guides/game-settings-menu",
    title: "Build a game settings menu in React",
    description:
      "How to build a game settings menu in React with shadcn and zzzUI: tabs, one setting a row, apply what changed, hold to restore defaults.",
    crumb: "Settings menu",
    group: "guides",
  },
  {
    path: "/docs/guides/health-bar-damage-trail",
    title: "A health bar that shows the size of a hit",
    description:
      "How to build a React health bar with a damage trail: the old fill lingers as a pale band, then catches up. With zzzUI's Gauge or from scratch.",
    crumb: "Health bar trail",
    group: "guides",
  },
  {
    path: "/docs/guides/theme-tokens",
    title: "Theme zzzUI with its tokens",
    description:
      "How to theme zzzUI: override the slant, outline weights, accent colour and motion timings on :root, and every component follows.",
    crumb: "Theming",
    group: "guides",
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
    path: "/docs/alert-dialog",
    title: "Alert dialog",
    description:
      "An alert dialog for React on Base UI: asks before an action that cannot be undone, and waits for an answer.",
    crumb: "Alert dialog",
    group: "overlays",
  },
  {
    path: "/docs/drawer",
    title: "Drawer",
    description:
      "A swipeable drawer for React: a bottom sheet with a slanted grip that follows the finger and closes on a swipe.",
    crumb: "Drawer",
    group: "overlays",
  },
  {
    path: "/docs/cut-in",
    title: "Cut-in",
    description:
      "A game-style cut-in for React: a band that wipes across the screen on the slant, with a glitching title.",
    crumb: "Cut-in",
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
    path: "/docs/command",
    title: "Command",
    description:
      "A command palette for React on Base UI: type to filter actions, run with Enter, open with ⌘K.",
    crumb: "Command",
    group: "commands",
  },
  {
    path: "/docs/combobox",
    title: "Combobox",
    description:
      "A Base UI combobox for shadcn: a text field that suggests as you type, over a panel of slanted rows.",
    crumb: "Combobox",
    group: "commands",
  },
  {
    path: "/docs/context-menu",
    title: "Context menu",
    description:
      "A right-click context menu for React with submenus, shortcuts and checkbox rows, highlighted in the accent.",
    crumb: "Context menu",
    group: "commands",
  },
  {
    path: "/docs/menubar",
    title: "Menubar",
    description:
      "A menubar for shadcn on Base UI: a black bar of menus that open one after another.",
    crumb: "Menubar",
    group: "commands",
  },
  {
    path: "/docs/hover-card",
    title: "Hover card",
    description:
      "A hover card for React: a preview panel that opens while a link is pointed at or focused.",
    crumb: "Hover card",
    group: "commands",
  },
  {
    path: "/docs/input-otp",
    title: "Input OTP",
    description:
      "A one-time code input for React on Base UI: slanted cells, one character each, that fill as you type or paste.",
    crumb: "Input OTP",
    group: "inputs",
  },
  {
    path: "/docs/input-group",
    title: "Input group",
    description:
      "An input group for shadcn: a text field with units, icons, keys and small buttons at either end.",
    crumb: "Input group",
    group: "inputs",
  },
  {
    path: "/docs/button-group",
    title: "Button group",
    description:
      "A button group for React: slanted buttons set close so their edges nest.",
    crumb: "Button group",
    group: "inputs",
  },
  {
    path: "/docs/native-select",
    title: "Native select",
    description:
      "A styled native select for React: the browser's own picker in a dark slanted well.",
    crumb: "Native select",
    group: "inputs",
  },
  {
    path: "/docs/kbd",
    title: "Kbd",
    description:
      "A keyboard key component for React: small slanted key caps for shortcuts in text.",
    crumb: "Kbd",
    group: "inputs",
  },
  {
    path: "/docs/label",
    title: "Label",
    description:
      "A label component for React in leaning type, for checkboxes, switches and other controls.",
    crumb: "Label",
    group: "inputs",
  },
  {
    path: "/docs/navigation-menu",
    title: "Navigation menu",
    description:
      "A navigation menu for shadcn on Base UI: a row of menus sharing one panel that resizes and slides between them.",
    crumb: "Navigation menu",
    group: "navigation",
  },
  {
    path: "/docs/item",
    title: "Item",
    description:
      "An item component for React lists: a mark, a leaning title, a line of text and actions, plain or as a link.",
    crumb: "Item",
    group: "layout",
  },
  {
    path: "/docs/empty",
    title: "Empty",
    description:
      "An empty state component for React: a mark in a slanted well, a title, a line of explanation and the action.",
    crumb: "Empty",
    group: "layout",
  },
  {
    path: "/docs/scroll-area",
    title: "Scroll area",
    description:
      "A Base UI scroll area for shadcn: custom scrollbars with a slanted thumb that appear on hover and scroll.",
    crumb: "Scroll area",
    group: "layout",
  },
  {
    path: "/docs/aspect-ratio",
    title: "Aspect ratio",
    description:
      "An aspect ratio box for React that keeps pictures, video and maps from jumping while they load.",
    crumb: "Aspect ratio",
    group: "layout",
  },
  {
    path: "/docs/spinner",
    title: "Spinner",
    description:
      "A loading spinner for React that follows the text's size and colour and holds still under reduced motion.",
    crumb: "Spinner",
    group: "layout",
  },
  {
    path: "/docs/calendar",
    title: "Calendar",
    description:
      "A date picker calendar for React: slanted day cells, single days and ranges, built on react-day-picker.",
    crumb: "Calendar",
    group: "inputs",
  },
  {
    path: "/docs/carousel",
    title: "Carousel",
    description:
      "A carousel for React on Embla: slides to drag or swipe, slab arrows and slanted pips for each slide.",
    crumb: "Carousel",
    group: "data",
  },
  {
    path: "/docs/chart",
    title: "Chart",
    description:
      "Charts for shadcn with Recharts in a dark game-UI style: quiet axes, slanted swatches, a panel tooltip.",
    crumb: "Chart",
    group: "data",
  },
  {
    path: "/docs/sparkline",
    title: "Sparkline",
    description:
      "A sparkline component for React in a dark game-UI style: a small trend line sized to its text, with an accent for the one that matters.",
    crumb: "Sparkline",
    group: "data",
  },
  {
    path: "/docs/ticker",
    title: "Ticker",
    description:
      "A news ticker component for React: an endless scrolling band that pauses on hover and focus and stands still for reduced motion.",
    crumb: "Ticker",
    group: "data",
  },
  {
    path: "/docs/resizable",
    title: "Resizable",
    description:
      "Resizable panels for React: drag the shared edge, or move it from the keyboard, with a slanted grip.",
    crumb: "Resizable",
    group: "layout",
  },
  {
    path: "/docs/form",
    title: "Form",
    description:
      "A form for React on Base UI: validation on submit, server errors in each field, fieldsets, and react-hook-form with zod.",
    crumb: "Form",
    group: "inputs",
  },
  {
    path: "/docs/message",
    title: "Message",
    description:
      "A chat message component for React: the speaker in leaning type, the time, the turn, a line under it.",
    crumb: "Message",
    group: "chat",
  },
  {
    path: "/docs/bubble",
    title: "Bubble",
    description:
      "Chat bubbles for React: square boxes with one corner cut toward the speaker, in six kinds.",
    crumb: "Bubble",
    group: "chat",
  },
  {
    path: "/docs/marker",
    title: "Marker",
    description:
      "Chat markers for React: quiet leaning notes for dates, joins and events in a conversation.",
    crumb: "Marker",
    group: "chat",
  },
  {
    path: "/docs/attachment",
    title: "Attachment",
    description:
      "File attachments for a chat UI: icon or picture, name, size, and upload and error states.",
    crumb: "Attachment",
    group: "chat",
  },
  {
    path: "/docs/code-block",
    title: "Code block",
    description:
      "A code block for React with line numbers, a copy button and added, removed and highlighted lines.",
    crumb: "Code block",
    group: "chat",
  },
  {
    path: "/docs/trace",
    title: "Trace",
    description:
      "An agent trace for React: each step on a line, running, failed or pending, that can open to show more.",
    crumb: "Trace",
    group: "chat",
  },
  {
    path: "/docs/message-scroller",
    title: "Message scroller",
    description:
      "A chat scroll area for React that keeps to the newest message and offers a way back down.",
    crumb: "Message scroller",
    group: "chat",
  },
  {
    path: "/docs/questionnaire",
    title: "Questionnaire",
    description:
      "A conversational questionnaire for React: one question at a time, choices with keys, then next.",
    crumb: "Questionnaire",
    group: "chat",
  },
  {
    path: "/docs/accent-switch",
    title: "Accent switch",
    description:
      "Switch a React UI's accent colour at runtime with zzzUI: twelve presets set by a data attribute, chosen with swatches, remembered across visits.",
    crumb: "Accent switch",
    group: "foundation",
  },
  {
    path: "/docs/accent-picker",
    title: "Accent picker",
    description:
      "A theme colour picker for React with zzzUI: twelve accent presets in a popover, or a colour of your own kept legible, remembered across visits.",
    crumb: "Accent picker",
    group: "foundation",
  },

  {
    path: "/docs/rarity",
    title: "Rarity",
    description:
      "Rarity colours for a game UI in React: five tiers, common to legendary, for badges, card edges and item names.",
    crumb: "Rarity",
    group: "foundation",
  },
  {
    path: "/docs/direction",
    title: "Direction",
    description:
      "Right-to-left support for zzzUI: Base UI's direction provider, so keys and popups follow the text.",
    crumb: "Direction",
    group: "foundation",
  },
  {
    path: "/docs/gauge",
    title: "Gauge",
    description:
      "A game health bar for React: a reading on a slanted well that leaves a trail when it drops, in segments or tones.",
    crumb: "Gauge",
    group: "game",
  },
  {
    path: "/docs/inventory",
    title: "Inventory",
    description:
      "A game inventory grid for React: square slots with a rarity glow, counts, a cooldown sweep and arrow-key movement.",
    crumb: "Inventory",
    group: "game",
  },
  {
    path: "/docs/hold-button",
    title: "Hold button",
    description:
      "A hold-to-confirm button for React: a fill runs along the slant while held; let go early and it drains.",
    crumb: "Hold button",
    group: "game",
  },
  {
    path: "/docs/counter",
    title: "Counter",
    description:
      "An animated number counter for React that rolls to each new value and throws the change off it.",
    crumb: "Counter",
    group: "game",
  },
  {
    path: "/docs/objectives",
    title: "Objectives",
    description:
      "A game quest and objective tracker for React: slanted marks, a strike drawn through what is done.",
    crumb: "Objectives",
    group: "game",
  },
  {
    path: "/docs/dialogue",
    title: "Dialogue",
    description:
      "A game dialogue box for React with a typewriter line, a speaker slab and numbered replies picked by the number keys.",
    crumb: "Dialogue",
    group: "game",
  },
  {
    path: "/docs/compass",
    title: "Compass",
    description:
      "A game compass strip for React: a heading with the eight points, and markers for objectives at their bearings.",
    crumb: "Compass",
    group: "game",
  },
  {
    path: "/docs/floating-text",
    title: "Floating text",
    description:
      "Floating damage numbers for React: hits, crits and heals that pop, rise and fade over what was hit.",
    crumb: "Floating text",
    group: "game",
  },
  {
    path: "/docs/feed",
    title: "Feed",
    description:
      "A game event feed for React: kill-feed style bands that slide in at the screen edge and fold away.",
    crumb: "Feed",
    group: "game",
  },
  {
    path: "/docs/stats",
    title: "Stats",
    description:
      "Item stat comparison for React: values with the difference from what you have, better or worse at a glance.",
    crumb: "Stats",
    group: "game",
  },
  {
    path: "/docs/radial-menu",
    title: "Radial menu",
    description:
      "A radial weapon wheel menu for React, picked by pointer direction or arrow keys, accessible to screen readers.",
    crumb: "Radial menu",
    group: "game",
  },
  {
    path: "/docs/post-card",
    title: "Post card",
    description:
      "A post card for React community feeds: a cover with its view count, the author on the cover's edge, a leaning title.",
    crumb: "Post card",
    group: "game",
  },
  {
    path: "/docs/profile-chip",
    title: "Profile chip",
    description:
      "A player profile chip for React: avatar, name, an experience bar and the level on one slanted slab.",
    crumb: "Profile chip",
    group: "game",
  },
  {
    path: "/docs/reward-track",
    title: "Reward track",
    description:
      "A level reward track for React, like a season pass: rewards per level, claimed, ready or locked.",
    crumb: "Reward track",
    group: "game",
  },
  {
    path: "/docs/masonry",
    title: "Masonry",
    description:
      "A masonry layout for React with CSS columns: cards of different heights in as many columns as fit, no layout shift.",
    crumb: "Masonry",
    group: "layout",
  },
  {
    path: "/docs/icons",
    title: "Icons",
    description:
      "Thirty solid React SVG icons drawn on one grid, their strokes ending on the same slant as zzzUI's slabs.",
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
      siteName: "zzzUI",
      locale: "en",
      url: path,
      title: p.absoluteTitle ?? `${p.title} · zzzUI`,
      description: p.description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  };
}
