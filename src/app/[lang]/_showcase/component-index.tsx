import Link from "next/link";
import { ArrowRightIcon } from "@/components/zero/icons";
import { link, pick } from "@/lib/i18n/server";

const entries = [
  {
    href: "/docs/button",
    name: "Button",
    line: "A slab that drops when pressed and springs back.",
    zh: "按下收缩、松开回弹的斜切块。",
  },
  {
    href: "/docs/input",
    name: "Input",
    line: "An inset well, with room for an icon or an action.",
    zh: "内凹的输入框，可放图标或操作。",
  },
  {
    href: "/docs/field",
    name: "Field",
    line: "Label, help and an error that slides in.",
    zh: "标签、提示，以及滑入的错误信息。",
  },
  {
    href: "/docs/select",
    name: "Select",
    line: "A popup lifted by outline; the row lights up.",
    zh: "以描边托起的弹层，选中行高亮。",
  },
  {
    href: "/docs/textarea",
    name: "Textarea",
    line: "The same well, for several lines; it grows.",
    zh: "同样的输入框，用于多行，随内容增高。",
  },
  {
    href: "/docs/checkbox",
    name: "Checkbox",
    line: "A slanted well that fills with the accent.",
    zh: "斜切的方框，选中后填满强调色。",
  },
  {
    href: "/docs/radio-group",
    name: "Radio group",
    line: "The chosen one holds a slab.",
    zh: "选中的一项内嵌一块斜切块。",
  },
  {
    href: "/docs/switch",
    name: "Switch",
    line: "A slab that springs to the other end.",
    zh: "斜切块回弹到另一端。",
  },
  {
    href: "/docs/slider",
    name: "Slider",
    line: "Slab thumbs on a slanted track; one or two.",
    zh: "斜轨道上的斜切滑块，可放一个或两个。",
  },
  {
    href: "/docs/tabs",
    name: "Tabs",
    line: "A slab that springs along a slanted track.",
    zh: "斜切块沿斜轨道回弹滑动。",
  },
  {
    href: "/docs/dialog",
    name: "Dialog",
    line: "A panel over a dimmed page, a black title bar.",
    zh: "压暗页面上的面板，配黑色标题栏。",
  },
  {
    href: "/docs/sheet",
    name: "Sheet",
    line: "A dialog that slides in from an edge.",
    zh: "从边缘滑入的对话框。",
  },
  {
    href: "/docs/popover",
    name: "Popover",
    line: "A panel beside its trigger.",
    zh: "出现在触发元素旁的面板。",
  },
  {
    href: "/docs/tooltip",
    name: "Tooltip",
    line: "One line on a light slab.",
    zh: "浅色斜切块上的一行提示。",
  },
  {
    href: "/docs/dropdown-menu",
    name: "Dropdown menu",
    line: "Actions in rows that light up.",
    zh: "逐行高亮的操作列表。",
  },
  {
    href: "/docs/alert",
    name: "Alert",
    line: "Four tones, each with its badge.",
    zh: "四种语气，各配徽标。",
  },
  {
    href: "/docs/progress",
    name: "Progress",
    line: "A slanted bar, or a gauge of charges.",
    zh: "斜切进度条，或分格的充能条。",
  },
  {
    href: "/docs/skeleton",
    name: "Skeleton",
    line: "Placeholders with a moving glint.",
    zh: "带流光的占位块。",
  },
  {
    href: "/docs/toast",
    name: "Toast",
    line: "Messages that slide in and leave.",
    zh: "滑入后自动消失的消息。",
  },
  {
    href: "/docs/card",
    name: "Card",
    line: "A box with a black header bar.",
    zh: "带黑色标题栏的卡片。",
  },
  {
    href: "/docs/table",
    name: "Table",
    line: "Rows on a hatched surface.",
    zh: "斜线纹理面板上的数据行。",
  },
  {
    href: "/docs/badge",
    name: "Badge",
    line: "A small slanted label.",
    zh: "小号的斜切标签。",
  },
  {
    href: "/docs/avatar",
    name: "Avatar",
    line: "A face or initials in an ink ring.",
    zh: "墨黑描边圈中的头像或首字母。",
  },
  {
    href: "/docs/breadcrumb",
    name: "Breadcrumb",
    line: "The way here, between slanted bars.",
    zh: "以斜杠分隔的当前路径。",
  },
  {
    href: "/docs/pagination",
    name: "Pagination",
    line: "Pages as small slabs.",
    zh: "由小斜切块组成的分页。",
  },
  {
    href: "/docs/sidebar",
    name: "Sidebar",
    line: "A black strip that folds to icons.",
    zh: "可收起为图标栏的黑色侧栏。",
  },
  {
    href: "/docs/accordion",
    name: "Accordion",
    line: "Sections that open one at a time.",
    zh: "每次只展开一节的分区。",
  },
  {
    href: "/docs/collapsible",
    name: "Collapsible",
    line: "A panel that unfolds in place.",
    zh: "原地展开的面板。",
  },
  {
    href: "/docs/toggle",
    name: "Toggle",
    line: "A slab that stays down.",
    zh: "按下后保持按下的斜切块。",
  },
  {
    href: "/docs/toggle-group",
    name: "Toggle group",
    line: "Toggles nesting in a row.",
    zh: "并排嵌合的一组开关按钮。",
  },
  {
    href: "/docs/separator",
    name: "Separator",
    line: "A quiet line.",
    zh: "一条暗色分隔线。",
  },
  {
    href: "/docs/command",
    name: "Command",
    line: "Type to find an action.",
    zh: "输入即可查找操作。",
  },
  {
    href: "/docs/combobox",
    name: "Combobox",
    line: "A field that suggests as you type.",
    zh: "边输入边给出建议的输入框。",
  },
  {
    href: "/docs/context-menu",
    name: "Context menu",
    line: "The menu where you right-click.",
    zh: "右键弹出的菜单。",
  },
  {
    href: "/docs/menubar",
    name: "Menubar",
    line: "Menus on a black bar.",
    zh: "黑色横条上的菜单。",
  },
  {
    href: "/docs/hover-card",
    name: "Hover card",
    line: "A preview behind a link.",
    zh: "悬停链接时出现的预览卡片。",
  },
  {
    href: "/docs/input-otp",
    name: "Input OTP",
    line: "A code, a character to a cell.",
    zh: "验证码输入，一格一个字符。",
  },
  {
    href: "/docs/input-group",
    name: "Input group",
    line: "A well with addons at either end.",
    zh: "两端可附加内容的输入框。",
  },
  {
    href: "/docs/button-group",
    name: "Button group",
    line: "Buttons that nest.",
    zh: "彼此嵌合的一组按钮。",
  },
  {
    href: "/docs/native-select",
    name: "Native select",
    line: "The browser's picker in a well.",
    zh: "输入框中的浏览器原生选择器。",
  },
  {
    href: "/docs/kbd",
    name: "Kbd",
    line: "A key to press.",
    zh: "需要按下的按键。",
  },
  {
    href: "/docs/label",
    name: "Label",
    line: "A control's name.",
    zh: "控件的名称。",
  },
  {
    href: "/docs/alert-dialog",
    name: "Alert dialog",
    line: "Asks before what cannot be undone.",
    zh: "执行不可撤销的操作前先行确认。",
  },
  {
    href: "/docs/drawer",
    name: "Drawer",
    line: "A sheet you can swipe away.",
    zh: "可滑动关闭的抽屉面板。",
  },
  {
    href: "/docs/navigation-menu",
    name: "Navigation menu",
    line: "Menus sharing one sliding panel.",
    zh: "共用一块滑动面板的多个菜单。",
  },
  {
    href: "/docs/item",
    name: "Item",
    line: "One thing in a list.",
    zh: "列表中的一项。",
  },
  {
    href: "/docs/empty",
    name: "Empty",
    line: "What shows when there is nothing.",
    zh: "没有内容时显示的空状态。",
  },
  {
    href: "/docs/scroll-area",
    name: "Scroll area",
    line: "Scrollbars with a slanted thumb.",
    zh: "滑块斜切的滚动条。",
  },
  {
    href: "/docs/aspect-ratio",
    name: "Aspect ratio",
    line: "A box that keeps its shape.",
    zh: "保持宽高比的容器。",
  },
  {
    href: "/docs/spinner",
    name: "Spinner",
    line: "Something is loading.",
    zh: "表示正在加载。",
  },
  {
    href: "/docs/calendar",
    name: "Calendar",
    line: "Days as nesting slabs.",
    zh: "日期排成彼此嵌合的斜切块。",
  },
  {
    href: "/docs/carousel",
    name: "Carousel",
    line: "Slides to swipe through.",
    zh: "可滑动切换的轮播。",
  },
  {
    href: "/docs/chart",
    name: "Chart",
    line: "Recharts in zzzUI's colours.",
    zh: "套用 zzzUI 配色的 Recharts。",
  },
  {
    href: "/docs/sparkline",
    name: "Sparkline",
    line: "A trend the size of a word.",
    zh: "一个词大小的趋势线。",
  },
  {
    href: "/docs/ticker",
    name: "Ticker",
    line: "News that scrolls past without end.",
    zh: "不间断滚动的新闻条。",
  },
  {
    href: "/docs/resizable",
    name: "Resizable",
    line: "Panels with a draggable edge.",
    zh: "边缘可拖动的面板。",
  },
  {
    href: "/docs/form",
    name: "Form",
    line: "Fields, fieldsets and server errors.",
    zh: "字段、字段组与服务端错误。",
  },
  {
    href: "/docs/message",
    name: "Message",
    line: "A turn in a conversation.",
    zh: "对话中的一轮发言。",
  },
  {
    href: "/docs/bubble",
    name: "Bubble",
    line: "What was said, a corner cut.",
    zh: "切去一角的对话气泡。",
  },
  {
    href: "/docs/marker",
    name: "Marker",
    line: "A note nobody said.",
    zh: "对话流中不属于任何人的提示。",
  },
  {
    href: "/docs/attachment",
    name: "Attachment",
    line: "A file, sent or sending.",
    zh: "已发送或正在发送的文件。",
  },
  {
    href: "/docs/code-block",
    name: "Code block",
    line: "Code in a black well.",
    zh: "黑色底板中的代码。",
  },
  {
    href: "/docs/trace",
    name: "Trace",
    line: "An agent's steps.",
    zh: "智能体执行的步骤。",
  },
  {
    href: "/docs/message-scroller",
    name: "Message scroller",
    line: "Keeps to the newest turn.",
    zh: "始终停在最新一条消息。",
  },
  {
    href: "/docs/questionnaire",
    name: "Questionnaire",
    line: "One question at a time.",
    zh: "一次只问一个问题。",
  },
  {
    href: "/docs/cut-in",
    name: "Cut-in",
    line: "A band thrown across the screen.",
    zh: "横穿屏幕的过场条。",
  },
  {
    href: "/docs/gauge",
    name: "Gauge",
    line: "A bar that leaves a trail when it drops.",
    zh: "下降时留下残影的数值条。",
  },
  {
    href: "/docs/inventory",
    name: "Inventory",
    line: "Slots with a rarity glow and a cooldown.",
    zh: "带稀有度光效与冷却的物品格。",
  },
  {
    href: "/docs/hold-button",
    name: "Hold button",
    line: "Hold it until the fill runs across.",
    zh: "按住直到填满才生效。",
  },
  {
    href: "/docs/counter",
    name: "Counter",
    line: "A number that rolls and throws its change.",
    zh: "滚动变化并抛出差值的数字。",
  },
  {
    href: "/docs/objectives",
    name: "Objectives",
    line: "Marks and a strike through what is done.",
    zh: "已完成的目标打勾并加删除线。",
  },
  {
    href: "/docs/dialogue",
    name: "Dialogue",
    line: "A typed line, a speaker, numbered replies.",
    zh: "逐字显示的台词、说话人与带编号的回复。",
  },
  {
    href: "/docs/compass",
    name: "Compass",
    line: "A heading strip with markers.",
    zh: "带标记的方位条。",
  },
  {
    href: "/docs/floating-text",
    name: "Floating text",
    line: "Hits and heals that pop and rise.",
    zh: "弹出上浮的伤害与治疗数字。",
  },
  {
    href: "/docs/feed",
    name: "Feed",
    line: "What just happened, at the edge.",
    zh: "屏幕边缘的实时事件。",
  },
  {
    href: "/docs/stats",
    name: "Stats",
    line: "Better or worse than what you have.",
    zh: "与当前装备相比的增减。",
  },
  {
    href: "/docs/radial-menu",
    name: "Radial menu",
    line: "A wheel picked by direction.",
    zh: "按方向选择的轮盘菜单。",
  },
  {
    href: "/docs/post-card",
    name: "Post card",
    line: "A post with its cover and its author.",
    zh: "带封面与作者的帖子卡片。",
  },
  {
    href: "/docs/profile-chip",
    name: "Profile chip",
    line: "Avatar, name, experience, level.",
    zh: "头像、名字、经验与等级。",
  },
  {
    href: "/docs/reward-track",
    name: "Reward track",
    line: "Rewards per level, to claim.",
    zh: "按等级领取的奖励。",
  },
  {
    href: "/docs/masonry",
    name: "Masonry",
    line: "Cards of any height in columns.",
    zh: "高度不一的卡片排成多列。",
  },
  {
    href: "/docs/accent-switch",
    name: "Accent switch",
    line: "Twelve accents in a row, remembered.",
    zh: "一排十二种强调色，记住所选。",
  },
  {
    href: "/docs/accent-picker",
    name: "Accent picker",
    line: "The accent from a button, or your own.",
    zh: "从按钮中选择强调色，或自定义颜色。",
  },
  {
    href: "/docs/icons",
    name: "Icons",
    line: "Thirty solid glyphs on the same slant.",
    zh: "三十个同一倾角的实心图标。",
  },
];

/** Every component, as a slab that leads to its page. */
export function ComponentIndex() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ href, name, line, zh }) => (
        <li key={href}>
          <Link
            href={link(href)}
            className="group slab slab-cut-end flex items-center gap-4 outline-none [--slab-fill:var(--color-zero-raised)] [--slab-h:5.5rem] [--slab-px:1.25rem] hover:[--slab-fill:var(--color-zero-lifted)] focus-visible:[--slab-gap-fill:var(--color-zero-ink)] focus-visible:[--slab-gap:var(--zero-stroke-thin)] focus-visible:[--slab-line:var(--color-zero-focus)]"
          >
            <span className="grid min-w-0 flex-1 gap-1">
              <span className="font-black font-zero text-zero-lg italic">
                {name}
              </span>
              <span className="font-medium text-zero-sm text-zero-text-2">
                {pick({ en: line, zh })}
              </span>
            </span>
            <ArrowRightIcon className="text-zero-text-3 transition-[translate,color] duration-(--zero-dur-fast) ease-(--zero-ease-out) group-hover:translate-x-1 group-hover:text-zero-accent motion-reduce:group-hover:translate-x-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
