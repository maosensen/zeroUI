import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { REGISTRY_URL } from "@/lib/site";
import { guideGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "../../_components/code-block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";

export const generateMetadata = metadataFor("/docs/guides/game-settings-menu");

const row = `function Row({ name, line, children }) {
  return (
    <div className="grid items-center gap-x-8 gap-y-3 py-4 sm:grid-cols-[1fr_minmax(0,16rem)]">
      <div className="grid gap-0.5">
        <span className="font-bold font-zero italic">{name}</span>
        {line ? <span className="text-zero-sm text-zero-text-3">{line}</span> : null}
      </div>
      <div className="flex items-center sm:justify-end">{children}</div>
    </div>
  );
}`;

const tabs = `<Tabs defaultValue="display">
  <TabsList>
    <TabsTab value="display">Display</TabsTab>
    <TabsTab value="audio">Audio</TabsTab>
    <TabsTab value="controls">Controls</TabsTab>
  </TabsList>
  <TabsPanel value="audio">
    <Row name="Music">
      <Slider value={music} onValueChange={(v) => setMusic(v as number)} aria-label="Music volume" />
    </Row>
    <Row name="Subtitles">
      <Switch checked={subtitles} onCheckedChange={setSubtitles} aria-label="Subtitles" />
    </Row>
  </TabsPanel>
</Tabs>`;

const apply = `const [settings, setSettings] = useState(defaults);
const [saved, setSaved] = useState(defaults);
const changed = JSON.stringify(settings) !== JSON.stringify(saved);

<Button disabled={!changed} onClick={() => setSaved(settings)}>
  {changed ? "Apply" : "Applied"}
</Button>`;

const hold = `<HoldButton size="sm" onConfirm={() => setSettings(defaults)}>
  Hold to restore defaults
</HoldButton>`;

export default async function GameSettingsMenuGuide({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd
        data={guideGraph("/docs/guides/game-settings-menu", "2026-10-25")}
      />
      <DocHeader
        title={pick({
          en: "Build a game settings menu in React",
          zh: "用 React 搭建游戏设置菜单",
        })}
        lead={pick({
          en: "A game settings menu is tabs of rows: a setting's name on the left, its control on the right, and a footer that applies the changes. This guide builds one with zzzUI on shadcn, or installs the finished block with one command.",
          zh: "游戏设置菜单通常由几个标签页组成，每页包含若干设置行：左侧为设置名称，右侧为对应的控件，底部是应用更改的操作栏。本文介绍如何用 React、shadcn 和 zzzUI 搭建这样一个设置菜单；如需直接使用，也可以用一条命令安装现成的代码块。",
        })}
      />

      <DocSection
        id="install"
        title={pick({ en: "Start from the block", zh: "直接安装现成代码块" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                The quickest way is the{" "}
                <Link href={link("/docs/blocks/settings-menu")}>
                  Settings menu block
                </Link>
                : one file in <code>components/blocks/</code> with every piece
                below already wired. Installing it brings the components it
                uses.
              </p>
            ),
            zh: (
              <p>
                最快的做法是安装{" "}
                <Link href={link("/docs/blocks/settings-menu")}>
                  Settings menu 代码块
                </Link>
                ：它只有一个文件，位于 <code>components/blocks/</code>
                ，下文介绍的各个部分都已组装完成。安装时会一并安装它用到的组件。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code={`pnpm dlx shadcn@latest registry add @zzzui=${REGISTRY_URL}
pnpm dlx shadcn@latest add @zzzui/settings-menu`}
        />
        <Prose>
          {pick({
            en: (
              <p>
                The rest of this page explains how it is put together, so you
                can change it or build your own.
              </p>
            ),
            zh: (
              <p>
                本页其余部分说明这个代码块是如何组装的，便于按需修改，或自行实现一个。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="rows"
        title={pick({ en: "One setting, one row", zh: "每项设置占一行" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Players scan a settings screen down the left edge, reading
                names, and reach for controls on the right. So each setting is a
                two-column row: the name with an optional line of explanation,
                then the control, pushed to the end. On a phone the columns
                stack.
              </p>
            ),
            zh: (
              <p>
                玩家浏览设置菜单时，会沿左侧向下扫读名称，再到右侧操作控件。因此每项设置占一行，分为两列：左列是名称，可附一行说明；右列是控件，靠右对齐。在手机上，两列改为上下排列。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={row} title="row.tsx" />
        <Prose>
          {pick({
            en: (
              <p>
                The explanation is where a setting earns its place: "Stops
                tearing; adds a little delay" tells a player what vertical sync
                costs, which the name alone does not.
              </p>
            ),
            zh: (
              <p>
                一项设置值不值得放进菜单，往往取决于这行说明：「消除画面撕裂；略微增加延迟」告诉玩家开启垂直同步的代价，这是仅凭名称看不出来的。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="tabs"
        title={pick({
          en: "Tabs for each kind of setting",
          zh: "按类别划分标签页",
        })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Group the rows by what they change (display, audio, controls,
                gameplay) and put each group in a{" "}
                <Link href={link("/docs/tabs")}>Tabs</Link> panel. Volumes are{" "}
                <Link href={link("/docs/slider")}>Sliders</Link>, on and off are{" "}
                <Link href={link("/docs/switch")}>Switches</Link>, a choice from
                a list is a <Link href={link("/docs/select")}>Select</Link>, and
                a choice of three is a{" "}
                <Link href={link("/docs/radio-group")}>Radio group</Link>. Give
                every control an <code>aria-label</code>: the row's name is not
                its label.
              </p>
            ),
            zh: (
              <p>
                按设置影响的方面分组（画面、音频、操控、玩法），每组置于一个{" "}
                <Link href={link("/docs/tabs")}>Tabs</Link> 面板。音量用{" "}
                <Link href={link("/docs/slider")}>Slider</Link>，开关项用{" "}
                <Link href={link("/docs/switch")}>Switch</Link>
                ，从列表中选一项用{" "}
                <Link href={link("/docs/select")}>Select</Link>，三选一用{" "}
                <Link href={link("/docs/radio-group")}>Radio group</Link>
                。每个控件都要设置 <code>aria-label</code>
                ：行里显示的名称并不会自动成为控件的无障碍标签。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={tabs} title="settings.tsx" />
        <Prose>
          {pick({
            en: (
              <p>
                Key bindings read best as keys: a row per action, its keys drawn
                with <Link href={link("/docs/kbd")}>Kbd</Link>.
              </p>
            ),
            zh: (
              <p>
                按键绑定最好直接显示按键本身：每个操作占一行，按键用{" "}
                <Link href={link("/docs/kbd")}>Kbd</Link> 呈现。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="apply"
        title={pick({ en: "Apply only what changed", zh: "有改动时才可应用" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Keep two copies: what is on screen and what was last applied.
                The Apply button stays disabled until they differ, so a player
                can see at a glance whether anything is waiting.
              </p>
            ),
            zh: (
              <p>
                保留两份状态：界面上当前的值，以及上次应用的值。两者一致时，Apply
                按钮保持禁用，玩家一眼就能看出有没有尚未应用的更改。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={apply} title="settings.tsx" />
      </DocSection>

      <DocSection
        id="reset"
        title={pick({
          en: "Make restoring the defaults deliberate",
          zh: "恢复默认需按住确认",
        })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Restoring defaults wipes everything a player tuned, so it should
                not happen on a stray click. A{" "}
                <Link href={link("/docs/hold-button")}>Hold button</Link> has to
                be held while a fill runs across it. Released early, it drains
                back. It works with the pointer, with Enter or Space, or with a
                hotkey, and screen readers are told to press and hold.
              </p>
            ),
            zh: (
              <p>
                恢复默认会清除玩家调整过的全部设置，不应因一次误点而触发。
                <Link href={link("/docs/hold-button")}>Hold button</Link>{" "}
                需要一直按住，直到填充条铺满整个按钮；提前松开，填充条会逐渐退回。鼠标或触控、Enter
                或空格键、快捷键均可操作，读屏软件会提示用户按住。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={hold} title="settings.tsx" />
      </DocSection>

      <DocSection
        id="next"
        title={pick({ en: "Where to go next", zh: "延伸阅读" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                For the rest of a game's screens, see the{" "}
                <Link href={link("/docs/blocks")}>blocks</Link>: a mission
                briefing, a loadout, a leaderboard and a HUD. To change the look
                of all of them at once, read{" "}
                <Link href={link("/docs/guides/theme-tokens")}>
                  Theme zzzUI with its tokens
                </Link>
                .
              </p>
            ),
            zh: (
              <p>
                游戏的其他界面可参考
                <Link href={link("/docs/blocks")}>代码块</Link>
                ：Mission briefing、Loadout、Leaderboard 与
                HUD。若要一次性改变它们的整体外观，请阅读《
                <Link href={link("/docs/guides/theme-tokens")}>
                  用设计 token 定制 zzzUI 主题
                </Link>
                》。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
