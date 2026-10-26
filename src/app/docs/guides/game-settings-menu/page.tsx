import Link from "next/link";
import { JsonLd } from "@/lib/seo/json-ld";
import { REGISTRY_URL } from "@/lib/site";
import { guideGraph } from "@/seo/graph";
import { pageMetadata } from "@/seo/site";
import { CodeBlock } from "../../_components/code-block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";

export const metadata = pageMetadata("/docs/guides/game-settings-menu");

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

export default function GameSettingsMenuGuide() {
  return (
    <>
      <JsonLd
        data={guideGraph("/docs/guides/game-settings-menu", "2026-10-25")}
      />
      <DocHeader
        title="Build a game settings menu in React"
        lead="A game settings menu is tabs of rows: a setting's name on the left, its control on the right, and a footer that applies the changes. This guide builds one with zzzUI on shadcn, or installs the finished block with one command."
      />

      <DocSection id="install" title="Start from the block">
        <Prose>
          <p>
            The quickest way is the{" "}
            <Link href="/docs/blocks/settings-menu">Settings menu block</Link>:
            one file in <code>components/blocks/</code> with every piece below
            already wired. Installing it brings the components it uses.
          </p>
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code={`pnpm dlx shadcn@latest registry add @zzzui=${REGISTRY_URL}
pnpm dlx shadcn@latest add @zzzui/settings-menu`}
        />
        <Prose>
          <p>
            The rest of this page explains how it is put together, so you can
            change it or build your own.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="rows" title="One setting, one row">
        <Prose>
          <p>
            Players scan a settings screen down the left edge, reading names,
            and reach for controls on the right. So each setting is a two-column
            row: the name with an optional line of explanation, then the
            control, pushed to the end. On a phone the columns stack.
          </p>
        </Prose>
        <CodeBlock code={row} title="row.tsx" />
        <Prose>
          <p>
            The explanation is where a setting earns its place: "Stops tearing;
            adds a little delay" tells a player what vertical sync costs, which
            the name alone does not.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="tabs" title="Tabs for each kind of setting">
        <Prose>
          <p>
            Group the rows by what they change (display, audio, controls,
            gameplay) and put each group in a{" "}
            <Link href="/docs/tabs">Tabs</Link> panel. Volumes are{" "}
            <Link href="/docs/slider">Sliders</Link>, on and off are{" "}
            <Link href="/docs/switch">Switches</Link>, a choice from a list is a{" "}
            <Link href="/docs/select">Select</Link>, and a choice of three is a{" "}
            <Link href="/docs/radio-group">Radio group</Link>. Give every
            control an <code>aria-label</code>: the row's name is not its label.
          </p>
        </Prose>
        <CodeBlock code={tabs} title="settings.tsx" />
        <Prose>
          <p>
            Key bindings read best as keys: a row per action, its keys drawn
            with <Link href="/docs/kbd">Kbd</Link>.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="apply" title="Apply only what changed">
        <Prose>
          <p>
            Keep two copies: what is on screen and what was last applied. The
            Apply button stays disabled until they differ, so a player can see
            at a glance whether anything is waiting.
          </p>
        </Prose>
        <CodeBlock code={apply} title="settings.tsx" />
      </DocSection>

      <DocSection id="reset" title="Make restoring the defaults deliberate">
        <Prose>
          <p>
            Restoring defaults wipes everything a player tuned, so it should not
            happen on a stray click. A{" "}
            <Link href="/docs/hold-button">Hold button</Link> has to be held
            while a fill runs across it. Released early, it drains back. It
            works with the pointer, with Enter or Space, or with a hotkey, and
            screen readers are told to press and hold.
          </p>
        </Prose>
        <CodeBlock code={hold} title="settings.tsx" />
      </DocSection>

      <DocSection id="next" title="Where to go next">
        <Prose>
          <p>
            For the rest of a game's screens, see the{" "}
            <Link href="/docs/blocks">blocks</Link>: a mission briefing, a
            loadout, a leaderboard and a HUD. To change the look of all of them
            at once, read{" "}
            <Link href="/docs/guides/theme-tokens">
              Theme zzzUI with its tokens
            </Link>
            .
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
