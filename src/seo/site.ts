/**
 * zzzUI's own SEO / GEO config (yPulse docs/seo-geo.md §3: a site's own things live in `src/seo/`,
 * the shared module in `src/lib/seo/`). The pages, their titles and descriptions, the share card:
 * each page's metadata, the sitemap, llms.txt and the JSON-LD all read this one list.
 */
import type { Metadata } from "next";
import {
  HTML_LANG,
  isLang,
  LANGS,
  type Lang,
  localize,
  OG_LOCALE,
} from "@/lib/i18n/locale";
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

/** The site's one-line description, the layout's fallback for a page without its own. */
export const SITE_DESCRIPTION: Record<Lang, string> = {
  en: "A dark-only component library built on shadcn: its own tokens, motion and icons, installed through a shadcn registry.",
  zh: "基于 shadcn 的暗色组件库，自带 token、动效和图标，通过 shadcn registry 安装。",
};

/** What a page says in a language: its title, description and breadcrumb name. */
type PageCopy = {
  title: string;
  absoluteTitle?: string;
  description: string;
  crumb: string;
};

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
  /** The same in Chinese (written, not translated: the i18n-copy skill; terms in docs/i18n-glossary.md). */
  zh: PageCopy;
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
    zh: {
      title: "zzzUI",
      absoluteTitle: "zzzUI：游戏 UI 风格的 shadcn 暗色组件库",
      description:
        "zzzUI 是一套仅暗色的 React 组件库，游戏 UI 风格鲜明：斜切块、粗描边与一种荧光强调色。基于 Base UI 构建，通过 shadcn registry 安装。",
      crumb: "zzzUI",
    },
  },
  {
    path: "/docs",
    title: "Getting started",
    description:
      "Install zzzUI into a shadcn project: add the @zzzui registry namespace once, then any component, the theme and the icons.",
    crumb: "Getting started",
    group: "start",
    zh: {
      title: "快速开始",
      description:
        "在 shadcn 项目中安装 zzzUI：先添加一次 @zzzui 命名空间，再按需安装组件、主题与图标。",
      crumb: "快速开始",
    },
  },
  {
    path: "/docs/blocks",
    title: "Blocks",
    description:
      "Game UI blocks for React and shadcn: a title screen, settings, a pause menu, a mission briefing, a character select, a loadout, a leaderboard, a HUD, a feed, level rewards and a schedule.",
    crumb: "Blocks",
    group: "blocks",
    zh: {
      title: "代码块",
      description:
        "React 与 shadcn 的游戏 UI 代码块：标题画面、设置菜单、暂停菜单、任务简报、角色选择、装备配置、排行榜、HUD、社区留言板、等级奖励与每日日程。",
      crumb: "代码块",
    },
  },
  {
    path: "/docs/blocks/settings-menu",
    title: "Settings menu",
    description:
      "A game settings menu block for React: display, audio, controls and gameplay tabs, built from zzzUI's Select, Slider, Switch and Hold button.",
    crumb: "Settings menu",
    group: "blocks",
    zh: {
      title: "Settings menu",
      description:
        "React 游戏设置菜单代码块：显示、音频、操作与玩法分页，由 zzzUI 的 Select、Slider、Switch 与 Hold button 组成。",
      crumb: "Settings menu",
    },
  },
  {
    path: "/docs/blocks/mission-briefing",
    title: "Mission briefing",
    description:
      "A game mission briefing block for React: a route map, objectives, a threat gauge, the reward, and hold-to-accept with a cut-in.",
    crumb: "Mission briefing",
    group: "blocks",
    zh: {
      title: "Mission briefing",
      description:
        "React 游戏任务简报代码块：路线图、任务目标、威胁等级数值条与报酬；按住接受委托，接受后以 Cut-in 宣告任务开始。",
      crumb: "Mission briefing",
    },
  },
  {
    path: "/docs/blocks/loadout",
    title: "Loadout",
    description:
      "A game loadout and inventory screen block for React: a slot grid, item details with gauges, a belt to equip, and hold-to-scrap that pays credits.",
    crumb: "Loadout",
    group: "blocks",
    zh: {
      title: "Loadout",
      description:
        "React 游戏装备配置与货舱物品栏代码块：物品网格、带数值条的物品详情、可装备的腰带栏，以及按住拆解、换取信用点。",
      crumb: "Loadout",
    },
  },
  {
    path: "/docs/blocks/leaderboard",
    title: "Leaderboard",
    description:
      "A game leaderboard block for React: periods as tabs, the top three marked legendary, epic and rare, and the player's own row pinned.",
    crumb: "Leaderboard",
    group: "blocks",
    zh: {
      title: "Leaderboard",
      description:
        "React 游戏排行榜代码块：按周期分页，前三名以传说、史诗、稀有三档标出，玩家本人所在行高亮并固定在底部。",
      crumb: "Leaderboard",
    },
  },
  {
    path: "/docs/blocks/hud",
    title: "HUD",
    description:
      "A game HUD block for React: health and shield gauges, a credit counter, objectives and a working hotbar with cooldowns, over a scene.",
    crumb: "HUD",
    group: "blocks",
    zh: {
      title: "HUD",
      description:
        "React 游戏 HUD 代码块：叠加在场景之上的船体（生命值）与护盾数值条、信用点计数、任务目标，以及可实际使用、带冷却时间的快捷栏。",
      crumb: "HUD",
    },
  },
  {
    path: "/docs/blocks/title-screen",
    title: "Title screen",
    description:
      "A game title screen and main menu block for React: a glitching title, an arrow-key menu, a news panel and key hints.",
    crumb: "Title screen",
    group: "blocks",
    zh: {
      title: "Title screen",
      description:
        "React 游戏标题画面与主菜单代码块：以故障效果浮现的标题、方向键操作的菜单、公告面板与按键提示。",
      crumb: "Title screen",
    },
  },
  {
    path: "/docs/blocks/pause-menu",
    title: "Pause menu",
    description:
      "A game pause menu block for React: the run's stats, resume, settings and map, and hold-to-abandon, toggled with Escape.",
    crumb: "Pause menu",
    group: "blocks",
    zh: {
      title: "Pause menu",
      description:
        "React 游戏暂停菜单代码块：本局战绩、继续、设置与地图，以及按住放弃本局；按 Esc 打开或关闭。",
      crumb: "Pause menu",
    },
  },
  {
    path: "/docs/blocks/character-select",
    title: "Character select",
    description:
      "A game character select block for React: a roster of cards, ratings as segmented gauges, a perk, locked characters, and hold-to-deploy.",
    crumb: "Character select",
    group: "blocks",
    zh: {
      title: "Character select",
      description:
        "React 游戏角色选择代码块：角色卡片名单、以分段数值条显示的评级、专长、未解锁角色，以及按住出发。",
      crumb: "Character select",
    },
  },
  {
    path: "/docs/blocks/community-feed",
    title: "Community feed",
    description:
      "A game community feed block for React: a masonry board of post cards, a filter, and a post sheet with replies and actions.",
    crumb: "Community feed",
    group: "blocks",
    zh: {
      title: "Community feed",
      description:
        "React 游戏社区留言板代码块：帖子卡片瀑布流、类型筛选，以及带回复与操作的帖子侧滑面板。",
      crumb: "Community feed",
    },
  },
  {
    path: "/docs/blocks/level-rewards",
    title: "Level rewards",
    description:
      "A season pass block for React: a profile chip with experience, a reward track per level, claim and claim all.",
    crumb: "Level rewards",
    group: "blocks",
    zh: {
      title: "Level rewards",
      description:
        "React 赛季通行证代码块：带经验值的个人信息条、按等级排列的奖励轨道，支持逐个领取与一键全部领取。",
      crumb: "Level rewards",
    },
  },
  {
    path: "/docs/blocks/daily-schedule",
    title: "Daily schedule",
    description:
      "A game daily schedule block for React: shifts with errands as objectives, the current one framed and marked now.",
    crumb: "Daily schedule",
    group: "blocks",
    zh: {
      title: "Daily schedule",
      description:
        "React 游戏每日日程代码块：各时段的待办事项以任务目标形式列出，当前时段加框并标出 NOW。",
      crumb: "Daily schedule",
    },
  },
  {
    path: "/examples",
    title: "Examples",
    description:
      "Example apps built with zzzUI: whole game screens put together from its blocks and components, every part installable from the shadcn registry.",
    crumb: "Examples",
    group: "examples",
    zh: {
      title: "示例应用",
      description:
        "用 zzzUI 构建的示例应用：以代码块与组件拼成完整的游戏界面，每个部分都能从 shadcn registry 安装。",
      crumb: "示例应用",
    },
  },
  {
    path: "/examples/board",
    title: "Courier board",
    description:
      "A game community app built with zzzUI and shadcn: a post board, today's shifts and a rank page with rewards, under tabs paged with Q and E.",
    crumb: "Courier board",
    group: "examples",
    zh: {
      title: "Courier board",
      description:
        "用 zzzUI 与 shadcn 构建的游戏社区应用：社区留言板、今日排班与带奖励的等级页，标签页用 Q、E 键切换。",
      crumb: "Courier board",
    },
  },
  {
    path: "/examples/signal-board",
    title: "Signal board",
    description:
      "A data-first news aggregator built with zzzUI and shadcn: a live ticker, readings, a heat-ranked board walked with the keyboard, a preview pane and topics.",
    crumb: "Signal board",
    group: "examples",
    zh: {
      title: "Signal board",
      description:
        "用 zzzUI 与 shadcn 构建的以数据为主的新闻聚合应用：实时快讯滚动条、数据读数、可用键盘浏览的热度榜、预览面板与话题。",
      crumb: "Signal board",
    },
  },
  {
    path: "/examples/ops-console",
    title: "Ops console",
    description:
      "An on-call ops console built with zzzUI and shadcn: a live service status wall, an alert queue to acknowledge, and an incident war room with its runbook.",
    crumb: "Ops console",
    group: "examples",
    zh: {
      title: "Ops console",
      description:
        "用 zzzUI 与 shadcn 构建的值班运维控制台：实时服务状态墙、待确认的告警队列，以及附带运维手册的事故作战室。",
      crumb: "Ops console",
    },
  },
  {
    path: "/docs/guides",
    title: "Guides",
    description:
      "Guides to building game UI in React with zzzUI and shadcn: a settings menu, a health bar with a damage trail, and theming with tokens.",
    crumb: "Guides",
    group: "guides",
    zh: {
      title: "指南",
      description:
        "用 React 搭建游戏 UI 的系列教程：基于 zzzUI 和 shadcn，逐步实现游戏设置菜单和带伤害残影的血条，并介绍如何用设计 token 定制主题。",
      crumb: "指南",
    },
  },
  {
    path: "/docs/guides/game-settings-menu",
    title: "Build a game settings menu in React",
    description:
      "How to build a game settings menu in React with shadcn and zzzUI: tabs, one setting a row, apply what changed, hold to restore defaults.",
    crumb: "Settings menu",
    group: "guides",
    zh: {
      title: "用 React 搭建游戏设置菜单",
      description:
        "用 React、shadcn 和 zzzUI 搭建游戏设置菜单：按类别划分标签页、每项设置占一行、有改动时才可应用、按住确认恢复默认。",
      crumb: "设置菜单",
    },
  },
  {
    path: "/docs/guides/health-bar-damage-trail",
    title: "A health bar that shows the size of a hit",
    description:
      "How to build a React health bar with a damage trail: the old fill lingers as a pale band, then catches up. With zzzUI's Gauge or from scratch.",
    crumb: "Health bar trail",
    group: "guides",
    zh: {
      title: "带残影的血条：显示每次受击的伤害量",
      description:
        "用 React 实现带伤害残影的血条：受击后原先的长度留作浅色残影，稍停再收缩到新值。可直接使用 zzzUI 的 Gauge，也可从零手写。",
      crumb: "血条残影",
    },
  },
  {
    path: "/docs/guides/theme-tokens",
    title: "Theme zzzUI with its tokens",
    description:
      "How to theme zzzUI: override the slant, outline weights, accent colour and motion timings on :root, and every component follows.",
    crumb: "Theming",
    group: "guides",
    zh: {
      title: "用设计 token 定制 zzzUI 主题",
      description:
        "介绍如何定制 zzzUI 主题：在 :root 上覆盖斜切角度、描边粗细、强调色和动效时长的设计 token，所有组件随之改变。",
      crumb: "主题",
    },
  },
  {
    path: "/docs/button",
    title: "Button",
    description:
      "A slanted game-UI button for shadcn: four variants, three sizes, four cuts, a springing press and a sheen on hover.",
    crumb: "Button",
    group: "components",
    zh: {
      title: "Button",
      description:
        "游戏 UI 风格的 React 按钮组件：斜切块造型、墨黑粗描边，按下收缩、松开回弹，基于 Base UI。",
      crumb: "Button",
    },
  },
  {
    path: "/docs/input",
    title: "Input",
    description:
      "A dark inset text input for shadcn, with room for an icon or an action (clear, show the password) at either end.",
    crumb: "Input",
    group: "components",
    zh: {
      title: "Input",
      description:
        "适用于 shadcn 的 React 暗色文本输入框组件，凹槽外观，两端可放置图标或操作按钮（清空、显示密码）。",
      crumb: "Input",
    },
  },
  {
    path: "/docs/field",
    title: "Field",
    description:
      "Label, description and error around a form control, with Base UI's validation and an error that slides in.",
    crumb: "Field",
    group: "components",
    zh: {
      title: "Field",
      description:
        "React 表单字段组件：为控件配上标签、说明文字与错误信息，沿用 Base UI 的校验，错误信息滑入显示。",
      crumb: "Field",
    },
  },
  {
    path: "/docs/textarea",
    title: "Textarea",
    description:
      "A dark multi-line text area for shadcn that grows with what is typed, in the same sunken well as Input.",
    crumb: "Textarea",
    group: "components",
    zh: {
      title: "Textarea",
      description:
        "适用于 shadcn 的暗色多行文本框组件，高度随输入内容增长，与 Input 同为凹槽外观。",
      crumb: "Textarea",
    },
  },
  {
    path: "/docs/select",
    title: "Select",
    description:
      "A Base UI select for shadcn: a dark inset trigger, a popup lifted by outline, and a highlighted row in the accent.",
    crumb: "Select",
    group: "components",
    zh: {
      title: "Select",
      description:
        "基于 Base UI 的 shadcn 下拉选择组件：暗色凹槽触发器、带双层描边的浮起弹出层，高亮项以强调色填充。",
      crumb: "Select",
    },
  },
  {
    path: "/docs/checkbox",
    title: "Checkbox",
    description:
      "A slanted checkbox for shadcn on Base UI: a sunken well that fills with the accent, with an indeterminate state.",
    crumb: "Checkbox",
    group: "components",
    zh: {
      title: "Checkbox",
      description:
        "基于 Base UI 的 shadcn 斜切复选框组件：未勾选时为凹槽，勾选后填充强调色，支持半选状态。",
      crumb: "Checkbox",
    },
  },
  {
    path: "/docs/radio-group",
    title: "Radio group",
    description:
      "A radio group for shadcn on Base UI: slanted wells, the chosen one holding a slab of the accent.",
    crumb: "Radio group",
    group: "components",
    zh: {
      title: "Radio group",
      description:
        "基于 Base UI 的 shadcn 单选组组件：每项为斜切凹槽，选中项内嵌一块强调色斜切块。",
      crumb: "Radio group",
    },
  },
  {
    path: "/docs/switch",
    title: "Switch",
    description:
      "A slanted toggle switch for React: an accent track and a slab that springs across to the other end.",
    crumb: "Switch",
    group: "components",
    zh: {
      title: "Switch",
      description:
        "React 斜切开关组件：开启时轨道填充强调色，斜切块弹到另一端。",
      crumb: "Switch",
    },
  },
  {
    path: "/docs/slider",
    title: "Slider",
    description:
      "A range slider for shadcn on Base UI: a slanted track, an accent fill, slab thumbs; one value or two.",
    crumb: "Slider",
    group: "components",
    zh: {
      title: "Slider",
      description:
        "基于 Base UI 的 shadcn 滑动条组件：斜切轨道、强调色填充，滑块为斜切块；支持单值与范围选择。",
      crumb: "Slider",
    },
  },
  {
    path: "/docs/tabs",
    title: "Tabs",
    description:
      "Animated tabs with a sliding indicator: an accent slab that springs along a slanted track to the active tab.",
    crumb: "Tabs",
    group: "components",
    zh: {
      title: "Tabs",
      description:
        "带滑动指示器的 React 动画标签页组件：强调色斜切块沿斜切轨道弹向当前标签页。",
      crumb: "Tabs",
    },
  },
  {
    path: "/docs/dialog",
    title: "Dialog",
    description:
      "A modal dialog for shadcn on Base UI: a panel over a dimmed page, a black title bar, and the actions.",
    crumb: "Dialog",
    group: "overlays",
    zh: {
      title: "Dialog",
      description:
        "基于 Base UI、适用于 shadcn 的模态对话框组件：浮在变暗页面之上的面板，带黑色标题栏与操作按钮。",
      crumb: "Dialog",
    },
  },
  {
    path: "/docs/sheet",
    title: "Sheet",
    description:
      "A side sheet for React: a dialog that slides in from an edge of the screen and holds on to it.",
    crumb: "Sheet",
    group: "overlays",
    zh: {
      title: "Sheet",
      description:
        "React 侧边面板（Sheet）组件：从屏幕边缘滑入并贴边停靠的对话框。",
      crumb: "Sheet",
    },
  },
  {
    path: "/docs/alert-dialog",
    title: "Alert dialog",
    description:
      "An alert dialog for React on Base UI: asks before an action that cannot be undone, and waits for an answer.",
    crumb: "Alert dialog",
    group: "overlays",
    zh: {
      title: "Alert dialog",
      description:
        "基于 Base UI 的 React 警示对话框组件：在无法撤销的操作之前先行询问，并等待答复。",
      crumb: "Alert dialog",
    },
  },
  {
    path: "/docs/drawer",
    title: "Drawer",
    description:
      "A swipeable drawer for React: a bottom sheet with a slanted grip that follows the finger and closes on a swipe.",
    crumb: "Drawer",
    group: "overlays",
    zh: {
      title: "Drawer",
      description:
        "React 抽屉组件：带斜切拖动条的底部面板，跟随手指移动，向下滑动即可关闭。",
      crumb: "Drawer",
    },
  },
  {
    path: "/docs/cut-in",
    title: "Cut-in",
    description:
      "A game-style cut-in for React: a band that wipes across the screen on the slant, with a glitching title.",
    crumb: "Cut-in",
    group: "overlays",
    zh: {
      title: "Cut-in",
      description:
        "游戏风格的 React 过场横幅（Cut-in）组件：沿斜切方向划过屏幕的一道横幅，标题带故障效果。",
      crumb: "Cut-in",
    },
  },
  {
    path: "/docs/popover",
    title: "Popover",
    description:
      "A Base UI popover for shadcn: a panel beside its trigger for a few lines of text or a small form.",
    crumb: "Popover",
    group: "overlays",
    zh: {
      title: "Popover",
      description:
        "基于 Base UI、适用于 shadcn 的弹出框（Popover）组件：在触发器旁打开的面板，可放几行文字或一个小表单。",
      crumb: "Popover",
    },
  },
  {
    path: "/docs/tooltip",
    title: "Tooltip",
    description:
      "A one-line tooltip for React on a light slanted slab, opening on hover and keyboard focus.",
    crumb: "Tooltip",
    group: "overlays",
    zh: {
      title: "Tooltip",
      description:
        "React 单行文字提示（Tooltip）组件：浅色斜切块，指针悬停或键盘聚焦时显示。",
      crumb: "Tooltip",
    },
  },
  {
    path: "/docs/dropdown-menu",
    title: "Dropdown menu",
    description:
      "A dropdown menu for shadcn on Base UI: actions, checkbox and radio rows, shortcuts, highlighted in the accent.",
    crumb: "Dropdown menu",
    group: "overlays",
    zh: {
      title: "Dropdown menu",
      description:
        "基于 Base UI、适用于 shadcn 的下拉菜单组件：支持操作项、复选与单选行、快捷键提示，高亮时填充强调色。",
      crumb: "Dropdown menu",
    },
  },
  {
    path: "/docs/alert",
    title: "Alert",
    description:
      "An alert component for React in four tones, info, success, warning and danger, each with its own slanted badge.",
    crumb: "Alert",
    group: "feedback",
    zh: {
      title: "Alert",
      description:
        "React 提示（Alert）组件，含信息、成功、警告、危险四种色调，各配一枚斜切徽标。",
      crumb: "Alert",
    },
  },
  {
    path: "/docs/progress",
    title: "Progress",
    description:
      "A Base UI progress bar for shadcn: a slanted track, a segmented gauge, and a sweep for an unknown amount.",
    crumb: "Progress",
    group: "feedback",
    zh: {
      title: "Progress",
      description:
        "基于 Base UI、适用于 shadcn 的进度条组件：倾斜的轨道、分格的充能槽，以及表示未知进度的来回扫动。",
      crumb: "Progress",
    },
  },
  {
    path: "/docs/skeleton",
    title: "Skeleton",
    description:
      "Skeleton loading placeholders for React: blocks, slanted text lines and control-sized slabs with a moving glint.",
    crumb: "Skeleton",
    group: "feedback",
    zh: {
      title: "Skeleton",
      description:
        "React 骨架屏加载占位组件：矩形块、倾斜的线条与控件大小的斜切块，附带移动的光带。",
      crumb: "Skeleton",
    },
  },
  {
    path: "/docs/toast",
    title: "Toast",
    description:
      "Toast notifications for React on Base UI: they slide into the corner, stack, swipe away and leave on their own.",
    crumb: "Toast",
    group: "feedback",
    zh: {
      title: "Toast",
      description:
        "基于 Base UI 的 React 消息通知（Toast）组件：滑入角落、层叠排列、可滑动关闭，并会自动消失。",
      crumb: "Toast",
    },
  },
  {
    path: "/docs/card",
    title: "Card",
    description:
      "A card component for shadcn: a square-cornered box with a black header bar, content and a footer.",
    crumb: "Card",
    group: "data",
    zh: {
      title: "Card",
      description:
        "适用于 shadcn 的卡片组件：直角方框，带黑色标题栏、正文与页脚。",
      crumb: "Card",
    },
  },
  {
    path: "/docs/table",
    title: "Table",
    description:
      "A data table for React: column heads on a black bar, quiet row lines, a lit row and a selected one.",
    crumb: "Table",
    group: "data",
    zh: {
      title: "Table",
      description:
        "React 数据表格组件：列标题位于黑色横条上，行间以暗色细线分隔，支持悬停高亮与选中行。",
      crumb: "Table",
    },
  },
  {
    path: "/docs/badge",
    title: "Badge",
    description:
      "A badge component for React: a small slanted slab in four variants, with an icon or as a link.",
    crumb: "Badge",
    group: "data",
    zh: {
      title: "Badge",
      description:
        "React 徽章组件：两端带切角的小号斜切块，提供四种变体，可带图标或作为链接使用。",
      crumb: "Badge",
    },
  },
  {
    path: "/docs/avatar",
    title: "Avatar",
    description:
      "A Base UI avatar for shadcn: a round picture or initials, a status dot, and overlapping groups.",
    crumb: "Avatar",
    group: "data",
    zh: {
      title: "Avatar",
      description:
        "基于 Base UI、适用于 shadcn 的头像组件：圆形图片或姓名首字母，支持状态圆点与重叠的头像组。",
      crumb: "Avatar",
    },
  },
  {
    path: "/docs/breadcrumb",
    title: "Breadcrumb",
    description:
      "A breadcrumb component for React: the pages above this one in leaning type, set apart by slanted bars.",
    crumb: "Breadcrumb",
    group: "navigation",
    zh: {
      title: "Breadcrumb",
      description:
        "React 面包屑导航组件：上级页面以斜体排列，彼此用短斜杠分隔。",
      crumb: "Breadcrumb",
    },
  },
  {
    path: "/docs/pagination",
    title: "Pagination",
    description:
      "A pagination component for shadcn: pages as small slanted slabs, the current one filled with the accent.",
    crumb: "Pagination",
    group: "navigation",
    zh: {
      title: "Pagination",
      description:
        "适用于 shadcn 的分页组件：页码显示为小斜切块，当前页填充强调色。",
      crumb: "Pagination",
    },
  },
  {
    path: "/docs/sidebar",
    title: "Sidebar",
    description:
      "A collapsible sidebar for React on Base UI: folds to an icon rail with tooltips, and opens as a sheet on phones.",
    crumb: "Sidebar",
    group: "navigation",
    zh: {
      title: "Sidebar",
      description:
        "基于 Base UI 的 React 可折叠侧边栏组件：可收起为带提示的图标栏，在手机上以侧边面板打开。",
      crumb: "Sidebar",
    },
  },
  {
    path: "/docs/accordion",
    title: "Accordion",
    description:
      "A Base UI accordion for shadcn: sections that open one at a time, leaning headings, an accent mark when open.",
    crumb: "Accordion",
    group: "disclosure",
    zh: {
      title: "Accordion",
      description:
        "基于 Base UI、适用于 shadcn 的手风琴组件：每次展开一项，标题倾斜，展开时亮起强调色标记。",
      crumb: "Accordion",
    },
  },
  {
    path: "/docs/collapsible",
    title: "Collapsible",
    description:
      "A collapsible panel for React that unfolds to its own height and folds back faster.",
    crumb: "Collapsible",
    group: "disclosure",
    zh: {
      title: "Collapsible",
      description:
        "React 折叠面板组件：在原位展开与收起的内容区，收起动画比展开更快。",
      crumb: "Collapsible",
    },
  },
  {
    path: "/docs/toggle",
    title: "Toggle",
    description:
      "A toggle button for React: a slanted slab that stays down, filled with the accent while on.",
    crumb: "Toggle",
    group: "disclosure",
    zh: {
      title: "Toggle",
      description:
        "React 切换按钮组件：按下后保持按下状态的斜切块，开启时填充强调色。",
      crumb: "Toggle",
    },
  },
  {
    path: "/docs/toggle-group",
    title: "Toggle group",
    description:
      "A toggle group for shadcn on Base UI: slanted slabs that nest in a row, one value or several.",
    crumb: "Toggle group",
    group: "disclosure",
    zh: {
      title: "Toggle group",
      description:
        "基于 Base UI、适用于 shadcn 的切换按钮组：一排彼此嵌合的斜切块，支持单选或多选。",
      crumb: "Toggle group",
    },
  },
  {
    path: "/docs/separator",
    title: "Separator",
    description:
      "A separator component for React: a quiet line across or upright between two things.",
    crumb: "Separator",
    group: "disclosure",
    zh: {
      title: "Separator",
      description:
        "React 分隔线组件：两部分内容之间的一道暗色细线，可横向或竖向放置。",
      crumb: "Separator",
    },
  },
  {
    path: "/docs/command",
    title: "Command",
    description:
      "A command palette for React on Base UI: type to filter actions, run with Enter, open with ⌘K.",
    crumb: "Command",
    group: "commands",
    zh: {
      title: "Command",
      description:
        "基于 Base UI 的 React 命令面板组件：输入文字筛选操作，按 Enter 执行，也可作为 ⌘K 命令面板弹出。",
      crumb: "Command",
    },
  },
  {
    path: "/docs/combobox",
    title: "Combobox",
    description:
      "A Base UI combobox for shadcn: a text field that suggests as you type, over a panel of slanted rows.",
    crumb: "Combobox",
    group: "commands",
    zh: {
      title: "Combobox",
      description:
        "基于 Base UI、适用于 shadcn 的组合框组件：输入时给出建议的文本框，下方弹出由斜切选项行组成的面板。",
      crumb: "Combobox",
    },
  },
  {
    path: "/docs/context-menu",
    title: "Context menu",
    description:
      "A right-click context menu for React with submenus, shortcuts and checkbox rows, highlighted in the accent.",
    crumb: "Context menu",
    group: "commands",
    zh: {
      title: "Context menu",
      description:
        "React 右键菜单组件：支持子菜单、快捷键与复选菜单项，高亮项填充强调色。",
      crumb: "Context menu",
    },
  },
  {
    path: "/docs/menubar",
    title: "Menubar",
    description:
      "A menubar for shadcn on Base UI: a black bar of menus that open one after another.",
    crumb: "Menubar",
    group: "commands",
    zh: {
      title: "Menubar",
      description:
        "基于 Base UI、适用于 shadcn 的菜单栏组件：黑色横条上的一排菜单，打开一个后，指针沿横条移动即可依次打开其他菜单。",
      crumb: "Menubar",
    },
  },
  {
    path: "/docs/hover-card",
    title: "Hover card",
    description:
      "A hover card for React: a preview panel that opens while a link is pointed at or focused.",
    crumb: "Hover card",
    group: "commands",
    zh: {
      title: "Hover card",
      description:
        "React 悬停卡片组件：指针悬停于链接或链接获得焦点时，弹出预览面板。",
      crumb: "Hover card",
    },
  },
  {
    path: "/docs/input-otp",
    title: "Input OTP",
    description:
      "A one-time code input for React on Base UI: slanted cells, one character each, that fill as you type or paste.",
    crumb: "Input OTP",
    group: "inputs",
    zh: {
      title: "Input OTP",
      description:
        "基于 Base UI 的 React 一次性验证码输入组件：每格一个字符的斜切输入格，支持逐格输入与整串粘贴。",
      crumb: "Input OTP",
    },
  },
  {
    path: "/docs/input-group",
    title: "Input group",
    description:
      "An input group for shadcn: a text field with units, icons, keys and small buttons at either end.",
    crumb: "Input group",
    group: "inputs",
    zh: {
      title: "Input group",
      description:
        "适用于 shadcn 的输入框组合组件：在文本框两端放置单位、图标、按键或小按钮。",
      crumb: "Input group",
    },
  },
  {
    path: "/docs/button-group",
    title: "Button group",
    description:
      "A button group for React: slanted buttons set close so their edges nest.",
    crumb: "Button group",
    group: "inputs",
    zh: {
      title: "Button group",
      description: "React 按钮组组件：斜切按钮紧密排列，斜边彼此嵌合。",
      crumb: "Button group",
    },
  },
  {
    path: "/docs/native-select",
    title: "Native select",
    description:
      "A styled native select for React: the browser's own picker in a dark slanted well.",
    crumb: "Native select",
    group: "inputs",
    zh: {
      title: "Native select",
      description:
        "带样式的 React 原生下拉选择组件：浏览器原生选择器，置于深色斜切输入槽中。",
      crumb: "Native select",
    },
  },
  {
    path: "/docs/kbd",
    title: "Kbd",
    description:
      "A keyboard key component for React: small slanted key caps for shortcuts in text.",
    crumb: "Kbd",
    group: "inputs",
    zh: {
      title: "Kbd",
      description: "React 键盘按键组件：以小号斜切键帽在正文中标示快捷键。",
      crumb: "Kbd",
    },
  },
  {
    path: "/docs/label",
    title: "Label",
    description:
      "A label component for React in leaning type, for checkboxes, switches and other controls.",
    crumb: "Label",
    group: "inputs",
    zh: {
      title: "Label",
      description: "React 标签组件，斜体字样式，用于复选框、开关等控件。",
      crumb: "Label",
    },
  },
  {
    path: "/docs/navigation-menu",
    title: "Navigation menu",
    description:
      "A navigation menu for shadcn on Base UI: a row of menus sharing one panel that resizes and slides between them.",
    crumb: "Navigation menu",
    group: "navigation",
    zh: {
      title: "Navigation menu",
      description:
        "基于 Base UI、适用于 shadcn 的导航菜单组件：一排菜单共用一个面板，切换时面板改变尺寸并滑动过渡。",
      crumb: "Navigation menu",
    },
  },
  {
    path: "/docs/item",
    title: "Item",
    description:
      "An item component for React lists: a mark, a leaning title, a line of text and actions, plain or as a link.",
    crumb: "Item",
    group: "layout",
    zh: {
      title: "Item",
      description:
        "React 列表项组件：标识、斜体标题、一行说明与操作按钮，可作为普通列表项或链接使用。",
      crumb: "Item",
    },
  },
  {
    path: "/docs/empty",
    title: "Empty",
    description:
      "An empty state component for React: a mark in a slanted well, a title, a line of explanation and the action.",
    crumb: "Empty",
    group: "layout",
    zh: {
      title: "Empty",
      description:
        "React 空状态组件：斜切凹槽中的标识、标题、一行说明与操作按钮。",
      crumb: "Empty",
    },
  },
  {
    path: "/docs/scroll-area",
    title: "Scroll area",
    description:
      "A Base UI scroll area for shadcn: custom scrollbars with a slanted thumb that appear on hover and scroll.",
    crumb: "Scroll area",
    group: "layout",
    zh: {
      title: "Scroll area",
      description:
        "适用于 shadcn 的 Base UI 滚动区域组件：自定义滚动条带斜切滑块，悬停或滚动时显示。",
      crumb: "Scroll area",
    },
  },
  {
    path: "/docs/aspect-ratio",
    title: "Aspect ratio",
    description:
      "An aspect ratio box for React that keeps pictures, video and maps from jumping while they load.",
    crumb: "Aspect ratio",
    group: "layout",
    zh: {
      title: "Aspect ratio",
      description:
        "React 宽高比容器组件，让图片、视频与地图在加载时不发生布局跳动。",
      crumb: "Aspect ratio",
    },
  },
  {
    path: "/docs/spinner",
    title: "Spinner",
    description:
      "A loading spinner for React that follows the text's size and colour and holds still under reduced motion.",
    crumb: "Spinner",
    group: "layout",
    zh: {
      title: "Spinner",
      description:
        "React 加载指示器组件：尺寸与颜色跟随文字，开启减少动态效果时保持静止。",
      crumb: "Spinner",
    },
  },
  {
    path: "/docs/calendar",
    title: "Calendar",
    description:
      "A date picker calendar for React: slanted day cells, single days and ranges, built on react-day-picker.",
    crumb: "Calendar",
    group: "inputs",
    zh: {
      title: "Calendar",
      description:
        "基于 react-day-picker 的 React 日历日期选择组件：斜切日期格，支持选择单日与日期范围。",
      crumb: "Calendar",
    },
  },
  {
    path: "/docs/carousel",
    title: "Carousel",
    description:
      "A carousel for React on Embla: slides to drag or swipe, slab arrows and slanted pips for each slide.",
    crumb: "Carousel",
    group: "data",
    zh: {
      title: "Carousel",
      description:
        "基于 Embla 的 React 轮播组件：可拖动、滑动切换幻灯片，配有斜切块箭头按钮与对应每张幻灯片的倾斜指示条。",
      crumb: "Carousel",
    },
  },
  {
    path: "/docs/chart",
    title: "Chart",
    description:
      "Charts for shadcn with Recharts in a dark game-UI style: quiet axes, slanted swatches, a panel tooltip.",
    crumb: "Chart",
    group: "data",
    zh: {
      title: "Chart",
      description:
        "基于 Recharts、适用于 shadcn 的暗色游戏 UI 风格图表：暗色坐标轴、斜切色块与面板式提示框。",
      crumb: "Chart",
    },
  },
  {
    path: "/docs/sparkline",
    title: "Sparkline",
    description:
      "A sparkline component for React in a dark game-UI style: a small trend line sized to its text, with an accent for the one that matters.",
    crumb: "Sparkline",
    group: "data",
    zh: {
      title: "Sparkline",
      description:
        "暗色游戏 UI 风格的 React 迷你走势图组件：随文字缩放的小型折线，需要突出的数据可用强调色标出。",
      crumb: "Sparkline",
    },
  },
  {
    path: "/docs/ticker",
    title: "Ticker",
    description:
      "A news ticker component for React: an endless scrolling band that pauses on hover and focus and stands still for reduced motion.",
    crumb: "Ticker",
    group: "data",
    zh: {
      title: "Ticker",
      description:
        "React 新闻滚动条组件：循环滚动的横带，指针悬停或获得焦点时暂停，开启「减少动态效果」时保持静止。",
      crumb: "Ticker",
    },
  },
  {
    path: "/docs/resizable",
    title: "Resizable",
    description:
      "Resizable panels for React: drag the shared edge, or move it from the keyboard, with a slanted grip.",
    crumb: "Resizable",
    group: "layout",
    zh: {
      title: "Resizable",
      description:
        "React 可调整大小的面板组件：拖动相邻边界或用键盘调整，可附带斜切手柄。",
      crumb: "Resizable",
    },
  },
  {
    path: "/docs/form",
    title: "Form",
    description:
      "A form for React on Base UI: validation on submit, server errors in each field, fieldsets, and react-hook-form with zod.",
    crumb: "Form",
    group: "inputs",
    zh: {
      title: "Form",
      description:
        "基于 Base UI 的 React 表单组件：提交时统一校验，服务器错误显示在对应字段下，支持字段分组，可搭配 react-hook-form 与 zod 使用。",
      crumb: "Form",
    },
  },
  {
    path: "/docs/message",
    title: "Message",
    description:
      "A chat message component for React: the speaker in leaning type, the time, the turn, a line under it.",
    crumb: "Message",
    group: "chat",
    zh: {
      title: "Message",
      description:
        "React 聊天消息组件：斜体显示发言人，附带时间、发言内容与下方附注。",
      crumb: "Message",
    },
  },
  {
    path: "/docs/bubble",
    title: "Bubble",
    description:
      "Chat bubbles for React: square boxes with one corner cut toward the speaker, in six kinds.",
    crumb: "Bubble",
    group: "chat",
    zh: {
      title: "Bubble",
      description:
        "React 聊天气泡组件：直角方框，靠近发言人的一角斜切，共六种样式。",
      crumb: "Bubble",
    },
  },
  {
    path: "/docs/marker",
    title: "Marker",
    description:
      "Chat markers for React: quiet leaning notes for dates, joins and events in a conversation.",
    crumb: "Marker",
    group: "chat",
    zh: {
      title: "Marker",
      description:
        "React 聊天提示组件：在对话中以淡色斜体标示日期、成员加入与各类事件。",
      crumb: "Marker",
    },
  },
  {
    path: "/docs/attachment",
    title: "Attachment",
    description:
      "File attachments for a chat UI: icon or picture, name, size, and upload and error states.",
    crumb: "Attachment",
    group: "chat",
    zh: {
      title: "Attachment",
      description:
        "聊天界面的文件附件组件：图标或图片、文件名、大小，以及上传中与失败等状态。",
      crumb: "Attachment",
    },
  },
  {
    path: "/docs/code-block",
    title: "Code block",
    description:
      "A code block for React with line numbers, a copy button and added, removed and highlighted lines.",
    crumb: "Code block",
    group: "chat",
    zh: {
      title: "Code block",
      description:
        "React 代码高亮展示组件 CodeBlock，支持行号、复制按钮，以及新增、删除与高亮行标记。",
      crumb: "Code block",
    },
  },
  {
    path: "/docs/trace",
    title: "Trace",
    description:
      "An agent trace for React: each step on a line, running, failed or pending, that can open to show more.",
    crumb: "Trace",
    group: "chat",
    zh: {
      title: "Trace",
      description:
        "React Agent 执行轨迹组件：每个步骤一行，标示运行中、失败或未开始状态，可展开查看详情。",
      crumb: "Trace",
    },
  },
  {
    path: "/docs/message-scroller",
    title: "Message scroller",
    description:
      "A chat scroll area for React that keeps to the newest message and offers a way back down.",
    crumb: "Message scroller",
    group: "chat",
    zh: {
      title: "Message scroller",
      description:
        "React 聊天滚动区域组件：自动跟随最新消息，并提供返回底部的按钮。",
      crumb: "Message scroller",
    },
  },
  {
    path: "/docs/questionnaire",
    title: "Questionnaire",
    description:
      "A conversational questionnaire for React: one question at a time, choices with keys, then next.",
    crumb: "Questionnaire",
    group: "chat",
    zh: {
      title: "Questionnaire",
      description:
        "React 对话式问卷组件：逐题提问，选项可用按键选择，并带上一题、跳过与下一题按钮。",
      crumb: "Questionnaire",
    },
  },
  {
    path: "/docs/accent-switch",
    title: "Accent switch",
    description:
      "Switch a React UI's accent colour at runtime with zzzUI: twelve presets set by a data attribute, chosen with swatches, remembered across visits.",
    crumb: "Accent switch",
    group: "foundation",
    zh: {
      title: "Accent switch",
      description:
        "用 zzzUI 在运行时切换 React 界面的强调色：12 种预设通过 data 属性设置，以色块选取，再次访问时保留所选。",
      crumb: "Accent switch",
    },
  },
  {
    path: "/docs/accent-picker",
    title: "Accent picker",
    description:
      "A theme colour picker for React with zzzUI: twelve accent presets in a popover, or a colour of your own kept legible, remembered across visits.",
    crumb: "Accent picker",
    group: "foundation",
    zh: {
      title: "Accent picker",
      description:
        "基于 zzzUI 的 React 主题色选择器：弹出层中提供 12 种强调色预设，也可自定义颜色，文字始终可读，所选颜色在再次访问时保留。",
      crumb: "Accent picker",
    },
  },

  {
    path: "/docs/rarity",
    title: "Rarity",
    description:
      "Rarity colours for a game UI in React: five tiers, common to legendary, for badges, card edges and item names.",
    crumb: "Rarity",
    group: "foundation",
    zh: {
      title: "Rarity",
      description:
        "React 游戏 UI 的稀有度配色：从普通到传说共五档，用于徽章、卡片顶边和物品名称。",
      crumb: "Rarity",
    },
  },
  {
    path: "/docs/direction",
    title: "Direction",
    description:
      "Right-to-left support for zzzUI: Base UI's direction provider, so keys and popups follow the text.",
    crumb: "Direction",
    group: "foundation",
    zh: {
      title: "Direction",
      description:
        "zzzUI 的从右到左（RTL）支持：基于 Base UI 的 DirectionProvider，让方向键与弹出层跟随文字方向。",
      crumb: "Direction",
    },
  },
  {
    path: "/docs/gauge",
    title: "Gauge",
    description:
      "A game health bar for React: a reading on a slanted well that leaves a trail when it drops, in segments or tones.",
    crumb: "Gauge",
    group: "game",
    zh: {
      title: "Gauge",
      description:
        "React 游戏血条组件：读数显示在斜切的槽中，数值下降时留下残影，支持分格与多种色调。",
      crumb: "Gauge",
    },
  },
  {
    path: "/docs/inventory",
    title: "Inventory",
    description:
      "A game inventory grid for React: square slots with a rarity glow, counts, a cooldown sweep and arrow-key movement.",
    crumb: "Inventory",
    group: "game",
    zh: {
      title: "Inventory",
      description:
        "React 游戏物品栏组件：方形格子带稀有度光晕、数量角标与冷却遮罩，支持方向键移动。",
      crumb: "Inventory",
    },
  },
  {
    path: "/docs/hold-button",
    title: "Hold button",
    description:
      "A hold-to-confirm button for React: a fill runs along the slant while held; let go early and it drains.",
    crumb: "Hold button",
    group: "game",
    zh: {
      title: "Hold button",
      description:
        "React 按住确认按钮组件：按住时斜边填充条横向推进，中途松开则退回。",
      crumb: "Hold button",
    },
  },
  {
    path: "/docs/counter",
    title: "Counter",
    description:
      "An animated number counter for React that rolls to each new value and throws the change off it.",
    crumb: "Counter",
    group: "game",
    zh: {
      title: "Counter",
      description:
        "React 数字滚动计数组件：每次变化时滚动到新值，并弹出本次增减量。",
      crumb: "Counter",
    },
  },
  {
    path: "/docs/objectives",
    title: "Objectives",
    description:
      "A game quest and objective tracker for React: slanted marks, a strike drawn through what is done.",
    crumb: "Objectives",
    group: "game",
    zh: {
      title: "Objectives",
      description:
        "React 游戏任务目标追踪组件：每个目标带斜切标记，已完成的目标以删除线标出。",
      crumb: "Objectives",
    },
  },
  {
    path: "/docs/dialogue",
    title: "Dialogue",
    description:
      "A game dialogue box for React with a typewriter line, a speaker slab and numbered replies picked by the number keys.",
    crumb: "Dialogue",
    group: "game",
    zh: {
      title: "Dialogue",
      description:
        "React 游戏对话框组件：台词逐字打出，说话人名字置于斜切块上，回复选项带编号，可用数字键选择。",
      crumb: "Dialogue",
    },
  },
  {
    path: "/docs/compass",
    title: "Compass",
    description:
      "A game compass strip for React: a heading with the eight points, and markers for objectives at their bearings.",
    crumb: "Compass",
    group: "game",
    zh: {
      title: "Compass",
      description:
        "React 游戏罗盘条组件：显示朝向与八个方位，任务目标的标记显示在各自的方位角上。",
      crumb: "Compass",
    },
  },
  {
    path: "/docs/floating-text",
    title: "Floating text",
    description:
      "Floating damage numbers for React: hits, crits and heals that pop, rise and fade over what was hit.",
    crumb: "Floating text",
    group: "game",
    zh: {
      title: "Floating text",
      description:
        "React 伤害飘字组件：命中、暴击与治疗数字从目标处弹出、上浮并淡出。",
      crumb: "Floating text",
    },
  },
  {
    path: "/docs/feed",
    title: "Feed",
    description:
      "A game event feed for React: kill-feed style bands that slide in at the screen edge and fold away.",
    crumb: "Feed",
    group: "game",
    zh: {
      title: "Feed",
      description:
        "React 游戏事件播报组件：类似击杀播报的横条从屏幕边缘滑入，随后收起。",
      crumb: "Feed",
    },
  },
  {
    path: "/docs/stats",
    title: "Stats",
    description:
      "Item stat comparison for React: values with the difference from what you have, better or worse at a glance.",
    crumb: "Stats",
    group: "game",
    zh: {
      title: "Stats",
      description:
        "React 物品属性对比组件：显示各项数值及其与当前装备的差值，优劣一目了然。",
      crumb: "Stats",
    },
  },
  {
    path: "/docs/radial-menu",
    title: "Radial menu",
    description:
      "A radial weapon wheel menu for React, picked by pointer direction or arrow keys, accessible to screen readers.",
    crumb: "Radial menu",
    group: "game",
    zh: {
      title: "Radial menu",
      description:
        "React 轮盘菜单组件，即游戏中的武器轮盘：按指针方向或方向键选择，支持读屏软件。",
      crumb: "Radial menu",
    },
  },
  {
    path: "/docs/post-card",
    title: "Post card",
    description:
      "A post card for React community feeds: a cover with its view count, the author on the cover's edge, a leaning title.",
    crumb: "Post card",
    group: "game",
    zh: {
      title: "Post card",
      description:
        "React 帖子卡片组件，用于社区动态：封面带浏览量，作者头像压在封面边缘，标题为斜体。",
      crumb: "Post card",
    },
  },
  {
    path: "/docs/profile-chip",
    title: "Profile chip",
    description:
      "A player profile chip for React: avatar, name, an experience bar and the level on one slanted slab.",
    crumb: "Profile chip",
    group: "game",
    zh: {
      title: "Profile chip",
      description:
        "React 玩家资料条组件：头像、名字、经验条与等级排在同一块斜切块上。",
      crumb: "Profile chip",
    },
  },
  {
    path: "/docs/reward-track",
    title: "Reward track",
    description:
      "A level reward track for React, like a season pass: rewards per level, claimed, ready or locked.",
    crumb: "Reward track",
    group: "game",
    zh: {
      title: "Reward track",
      description:
        "React 等级奖励列表组件，类似赛季通行证：按等级排列奖励，分为已领取、可领取与未解锁。",
      crumb: "Reward track",
    },
  },
  {
    path: "/docs/masonry",
    title: "Masonry",
    description:
      "A masonry layout for React with CSS columns: cards of different heights in as many columns as fit, no layout shift.",
    crumb: "Masonry",
    group: "layout",
    zh: {
      title: "Masonry",
      description:
        "基于 CSS columns 的 React 瀑布流布局组件：高度不一的卡片排入尽可能多的列，无布局跳动。",
      crumb: "Masonry",
    },
  },
  {
    path: "/docs/icons",
    title: "Icons",
    description:
      "Thirty solid React SVG icons drawn on one grid, their strokes ending on the same slant as zzzUI's slabs.",
    crumb: "Icons",
    group: "foundation",
    zh: {
      title: "图标",
      description:
        "30 个 React 实心 SVG 图标，绘制在同一套网格上，笔画末端的斜角与 zzzUI 斜切块相同。",
      crumb: "图标",
    },
  },
] as const satisfies readonly Page[];

export type PagePath = (typeof PAGES)[number]["path"];

export function page(path: PagePath): Page {
  const found = PAGES.find((p) => p.path === path);
  if (!found) throw new Error(`No SEO entry for ${path}`);
  return found;
}

/** A page's copy in a language; English is the entry itself. */
export function pageCopy(p: Page, lang: Lang): PageCopy {
  return lang === "zh" ? p.zh : p;
}

/** The absolute address of a page in a language (the root keeps its slash, as the sitemap writes it). */
export const pageUrl = (path: string, lang: Lang = "en") => {
  const local = localize(lang, path);
  return local === "/" ? `${SITE_URL}/` : `${SITE_URL}${local}`;
};

/** Each language's address of a page, for hreflang: both languages, English as the default. */
export function pageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      LANGS.map((lang) => [HTML_LANG[lang], localize(lang, path)]),
    ),
    "x-default": path,
  };
}

/**
 * A page's metadata in a language: title, description, its own canonical, hreflang to both
 * languages, and the share card. A page that sets openGraph replaces the layout's whole
 * openGraph (Next merges shallowly), so the card is always carried here.
 */
export function pageMetadata(path: PagePath, lang: Lang = "en"): Metadata {
  const c = pageCopy(page(path), lang);
  const url = localize(lang, path);
  return {
    title: c.absoluteTitle ? { absolute: c.absoluteTitle } : c.title,
    description: c.description,
    alternates: { canonical: url, languages: pageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: "zzzUI",
      locale: OG_LOCALE[lang],
      url,
      title: c.absoluteTitle ?? `${c.title} · zzzUI`,
      description: c.description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  };
}

/** A page's generateMetadata: `export const generateMetadata = metadataFor("/docs/button")`. */
export const metadataFor =
  (path: PagePath) =>
  async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;
    return pageMetadata(path, isLang(lang) ? lang : "en");
  };
