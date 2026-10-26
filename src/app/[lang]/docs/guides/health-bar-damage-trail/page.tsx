import Link from "next/link";
import { enter, type LangProps, link } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { guideGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { CodeBlock } from "../../_components/code-block";
import { DocHeader, DocSection, Prose } from "../../_components/doc";
import GaugeHit from "../../_demos/gauge-hit";

export const generateMetadata = metadataFor(
  "/docs/guides/health-bar-damage-trail",
);

const gauge = `<Gauge value={hull} max={120} low={0.25}>
  <GaugeLabel>Hull</GaugeLabel>
  <GaugeValue />
</Gauge>`;

const scratch = `function HealthBar({ value, max }: { value: number; max: number }) {
  const share = value / max;
  // which way it last moved, kept with React's "previous render" pattern
  const [last, setLast] = useState(share);
  const [dropped, setDropped] = useState(true);
  if (share !== last) {
    setLast(share);
    setDropped(share < last);
  }
  const width = \`\${share * 100}%\`;
  return (
    <div className="bar" role="meter" aria-label="Health"
      aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className={dropped ? "trail" : "trail gain"}
        style={{ width, transitionDelay: dropped ? "480ms" : "0s" }} />
      <div className="fill"
        style={{ width, transitionDelay: dropped ? "0s" : "480ms" }} />
    </div>
  );
}`;

const css = `.bar { position: relative; height: 12px; overflow: hidden; background: #000; }
.trail, .fill {
  position: absolute;
  inset: 0 auto 0 0;
  transition: width 420ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.trail { background: #f5f5f0; }         /* the hit: pale, behind the fill */
.trail.gain { background: #cde31c66; }  /* a heal: a faint lead */
.fill { background: #cde31c; }

@media (prefers-reduced-motion: reduce) {
  .trail, .fill { transition-delay: 0s !important; }
}`;

export default async function HealthBarGuide({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd
        data={guideGraph("/docs/guides/health-bar-damage-trail", "2026-10-25")}
      />
      <DocHeader
        title="A health bar that shows the size of a hit"
        lead="When a health bar drops, leave the old fill behind as a pale trail for half a second before it catches up: the player reads the size of the hit from the trail. Here is how that works, with zzzUI's Gauge or with two divs and a transition delay."
      />

      <DocSection id="try" title="Try it">
        <div className="grid justify-items-center border-(length:--zero-stroke-thin) border-zero-line bg-zero-ground bg-(image:--zero-hatch) p-4 sm:p-8">
          <GaugeHit />
        </div>
        <Prose>
          <p>
            Take a hit: the fill falls at once, a pale band stays where it was,
            waits, then shrinks to meet it. Patch up and it runs the other way:
            a faint band leads and the fill climbs into it. Below a quarter the
            bar turns red and breathes.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="gauge" title="With the Gauge component">
        <Prose>
          <p>
            zzzUI's <Link href={link("/docs/gauge")}>Gauge</Link> does all of
            this. It is a Base UI Meter, so screen readers hear the value and
            its range, named by its label. <code>low</code> is the share under
            which it turns red; <code>segments</code> splits it into cells for
            shields or charges.
          </p>
        </Prose>
        <CodeBlock code={gauge} title="hull.tsx" />
      </DocSection>

      <DocSection id="trail" title="How the damage trail works">
        <Prose>
          <p>
            Two layers sit in the same well with the same width: the trail
            behind, the fill in front. Both animate their width on the same
            transition. The trick is that one of them starts late: on a drop the
            trail waits, so for a moment it still shows the old value behind the
            new fill; on a gain the fill waits, so the trail runs ahead and the
            fill climbs into it.
          </p>
          <p>
            So the only thing the component has to know is which way the value
            last moved. Keep the previous value in state and compare during
            render (React's pattern for information from previous renders): no
            effect, no extra paint.
          </p>
        </Prose>
        <CodeBlock code={scratch} title="health-bar.tsx" />
        <CodeBlock code={css} lang="css" title="health-bar.css" />
      </DocSection>

      <DocSection id="timing" title="Timing the wait">
        <Prose>
          <p>
            Around half a second reads well: long enough to see the size of the
            hit, short enough that the bar is honest again before the next one.
            zzzUI keeps it as a token, <code>--zero-dur-hold</code> (480 ms),
            and moves both layers on its slow timing (420 ms). Under reduced
            motion the wait drops to zero, and so does the breathing of a low
            bar: the number is still right, nothing lingers.
          </p>
        </Prose>
      </DocSection>

      <DocSection id="next" title="Where to go next">
        <Prose>
          <p>
            The <Link href={link("/docs/blocks/hud")}>HUD block</Link> puts
            gauges beside a hotbar and objectives, and the{" "}
            <Link href={link("/docs/blocks/loadout")}>Loadout</Link> uses them
            for durability and weight. For a reading that only goes one way, see{" "}
            <Link href={link("/docs/progress")}>Progress</Link>.
          </p>
        </Prose>
      </DocSection>
    </>
  );
}
