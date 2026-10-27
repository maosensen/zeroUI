# 术语表

zzzUI 站点中文版的用词。中文是重写，不是翻译（user 级 `i18n-copy` skill）；同一个概念全站只用一个叫法。
写在这里的是**正文里怎么说**；代码、类名、属性名、token 名一律保留原样。

| 概念 | zh | en | 说明 |
|---|---|---|---|
| component | 组件 | component | |
| block | 代码块 | block | 一整屏的组合，`registry:block`（作者 2026-10-27 定，原为「区块」）；Code block 组件在正文里写组件名 CodeBlock，不叫代码块 |
| example (app) | 示例应用 | example | 整页的示例，界面保持英文 |
| demo | 示例 | demo / example | 文档里的一个示例 |
| props | 属性 | props | 表头「属性」；属性名保留英文 |
| foundation | 地基 | foundation | token、动效、图标与 CSS 工具类的总称 |
| token | 设计 token | token | 作者 2026-10-27 定（原为「设计令牌」）；`--zero-*` 保留原样 |
| slab | 斜切块 | slab | 固定高度、两端斜切的块；工具类名 `slab` 保留 |
| slant | 斜切角度 | slant | `--zero-slant` |
| cut | 切角 / 斜切 | cut | 动词用「斜切」，名词用「切角」 |
| tilt | 倾斜 | tilt | 大号展示字的旋转，`tilt` 工具类 |
| outline | 描边 | outline | thick outline → 粗描边 |
| accent | 强调色 | accent | |
| preset | 预设 | preset | |
| ink | 墨黑 | ink | 强调色上的文字色、描边色 |
| ground | 底色 | ground | 炭灰底色 |
| surface / raised | 面板色 / 浮起色 | surface / raised | |
| hatch / hatching | 斜线纹理 | hatching | |
| focus frame | 焦点框 | focus frame | 黄色，内有一道墨黑间隙 |
| sheen | 高光 | sheen | 指向时斜扫过的一道光 |
| rarity | 稀有度 | rarity | 档位：普通、优秀、稀有、史诗、传说（common、uncommon、rare、epic、legendary） |
| reduced motion | 减少动态效果 | reduced motion | 系统设置名 |
| screen reader | 读屏软件 | screen reader | |
| live region | 实时区域 | live region | `aria-live` 保留 |
| keyboard | 键盘 | keyboard | 方向键、Tab、Enter、Esc、空格键 |
| hotkey | 快捷键 | hotkey | |
| hold (to confirm) | 按住 | hold | 「按住确认」 |
| registry | registry | registry | shadcn 的术语，不译 |
| namespace | 命名空间 | namespace | `@zzzui` |
| install | 安装 | install | |
| dark only | 仅暗色 | dark only | |
| game UI | 游戏 UI | game UI | |
| gauge | 数值条 | gauge | Gauge 页面定位为血条（health bar），正文与列表中叫数值条 |
| fill | 填充条 | fill | 数值条、按住按钮里随数值伸缩的那一段；它「缩短 / 增长」，不「追上 / 跟上」 |
| trail | 残影 | trail | 数值条下降时留在原处的那一段，不叫色带 |
| well | 凹槽 / 输入槽 | well | 输入框类的内凹底；内嵌的展示区叫内嵌面板 |
| popup | 弹出层 | popup | 「浮层」只用作导航分组 Overlays 的名字 |
| quiet | 暗色 / 较暗 / 暗灰色 / 中性灰 | quiet | 不写「低调」 |
| strikethrough | 删除线 | strikethrough | |
| accessible name | 可访问名称 | accessible name | |
| current page | 当前页 | current page | |
| job（示例数据） | 委托 | job | 示例里的送货委托；接受委托 |
| tone | 色调 | tone | Alert 的四种：信息、成功、警告、危险 |
| screen（游戏的） | 界面 | screen | 「画面」只指显示与画质（画面设置、画面撕裂） |

## 写法约定

- 两端斜切是斜切块本身的定义，不写「两侧斜切的斜切块」；需要强调时写「两端带切角的」。边用「端」，不用「侧」。
- 按键不作动词的主语：「按方向键可在……间切换焦点」，不写「方向键移动……」。
- 弹出层收起用「收起」，小元素离场用「消失」；Tooltip 用「显示 / 隐藏」；Drawer、Sheet 进入用「滑入」。
- 不用「节奏」指动效时长：写「带回弹」「在 240 ms 内」。
- 放置用「置于 / 放入 / 容纳」，不用「放进 / 放下」（「值不值得放进菜单」这类习惯说法除外）。
- 按钮上的英文文字用「」引用（「Take a hit」）；文章标题用《》。
- 对比度、宽高比的写法与英文分支相同（「7 : 1」「16 : 9」）。

## 保留英文的

组件名与代码块名（Button、Gauge、Settings menu……，导航和标题里也不译）、shadcn、registry、Base UI、React、
Tailwind、Next.js、CSS、SVG、ARIA、`aria-*` 属性、HTML 元素名、属性名与类型、token 名、类名、键名（Q、E、Enter）、
代码与命令、示例应用和示例里的界面文字。
