import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "./_components/code-block";
import { DocHeader, DocSection, Prose } from "./_components/doc";
import { REGISTRY_URL } from "./_components/install";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install zeroUI into a shadcn project: the namespace once, then any component.",
};

export default function GettingStartedPage() {
  return (
    <>
      <DocHeader
        title="Getting started"
        lead="zeroUI is a dark-only component library with a strong game-UI look. It installs the shadcn way: the code lands in your project, yours to change."
      />

      <DocSection id="requirements" title="Before you start">
        <Prose>
          <p>
            A project already set up for shadcn (<code>components.json</code>)
            on Tailwind CSS v4 and React 19. zeroUI is built on{" "}
            <strong>Base UI</strong>, not Radix; the components bring it with
            them. It is tested on Next.js.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="namespace" title="1. Add the namespace">
        <Prose>
          <p>
            Once per project, tell shadcn where <code>@zeroui</code> items come
            from:
          </p>
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code={`pnpm dlx shadcn@latest registry add @zeroui=${REGISTRY_URL}`}
        />
      </DocSection>

      <DocSection id="components" title="2. Add components">
        <CodeBlock
          lang="bash"
          title="terminal"
          code="pnpm dlx shadcn@latest add @zeroui/button @zeroui/input @zeroui/select"
        />
        <Prose>
          <p>
            The first component also brings the <strong>foundation</strong>: the
            tokens, the motion and the slab are written into your stylesheet,{" "}
            <code>cn</code> and the motion timings land in{" "}
            <code>lib/zero/</code>, and Montserrat is loaded in your layout.
            Components land in <code>components/zero/</code>.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="theme" title="3. Go dark (optional)">
        <Prose>
          <p>
            zeroUI has no light theme. If the rest of your project uses shadcn's
            variables, this points them at zeroUI's colours, in light mode and
            dark alike, so the whole page matches:
          </p>
        </Prose>
        <CodeBlock
          lang="bash"
          title="terminal"
          code="pnpm dlx shadcn@latest add @zeroui/theme"
        />
      </DocSection>

      <DocSection id="italic" title="4. The true italic">
        <Prose>
          <p>
            zeroUI's labels are heavy italics. shadcn loads Montserrat upright
            only, so the italic is drawn by the browser until you ask for the
            real one where your layout loads the font:
          </p>
        </Prose>
        <CodeBlock
          title="app/layout.tsx"
          code={`const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  style: ["normal", "italic"],
});`}
        />
      </DocSection>

      <DocSection id="look" title="The look, in short">
        <Prose>
          <p>
            Everything is drawn from a <strong>slab</strong>: a flat block cut
            on one slant (14°) and wearing a thick ink outline. Corners are cut,
            never rounded; things are lifted by outline, never by shadow. One
            fluorescent lime marks what is active, one yellow frame marks what
            has focus.
          </p>
          <p>
            Motion is a small set of named timings shared by every component: a
            fast press and a springing release, a slide for the tab slab, a
            reveal and a quicker dismiss for popups. It all stands still when
            the system asks for reduced motion.
          </p>
          <p>
            Start with the <Link href="/docs/button">Button</Link>.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
