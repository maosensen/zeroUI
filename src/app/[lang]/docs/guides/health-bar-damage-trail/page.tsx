import Link from "next/link";
import { enter, type LangProps, link, pick } from "@/lib/i18n/server";
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
        title={pick({
          en: "A health bar that shows the size of a hit",
          zh: "带残影的血条：显示每次受击的伤害量",
        })}
        lead={pick({
          en: "When a health bar drops, leave the old fill behind as a pale trail for half a second before it catches up: the player reads the size of the hit from the trail. Here is how that works, with zzzUI's Gauge or with two divs and a transition delay.",
          zh: "血条下降时，把原先的长度留作一道浅色残影，停留约半秒再收缩到新值，玩家从残影的长度就能读出这一击的伤害量。本文介绍这种伤害残影的原理，以及 React 血条动画的两种实现：使用 zzzUI 的 Gauge，或用两个 div 加上过渡延迟。",
        })}
      />

      <DocSection id="try" title={pick({ en: "Try it", zh: "效果演示" })}>
        <div className="grid justify-items-center border-(length:--zero-stroke-thin) border-zero-line bg-zero-ground bg-(image:--zero-hatch) p-4 sm:p-8">
          <GaugeHit />
        </div>
        <Prose>
          {pick({
            en: (
              <p>
                Take a hit: the fill falls at once, a pale band stays where it
                was, waits, then shrinks to meet it. Patch up and it runs the
                other way: a faint band leads and the fill climbs into it. Below
                a quarter the bar turns red and breathes.
              </p>
            ),
            zh: (
              <p>
                点击「Take a
                hit」：填充条立即缩短，原来的位置上留下一道浅色残影，停顿片刻后收缩到新值。点击「Patch
                up」则方向相反：淡色残影先延伸到新值，填充条随后增长到该位置。数值低于四分之一时，血条变红，并呈呼吸式明暗变化。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="gauge"
        title={pick({ en: "With the Gauge component", zh: "使用 Gauge 组件" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                zzzUI's <Link href={link("/docs/gauge")}>Gauge</Link> does all
                of this. It is a Base UI Meter, so screen readers hear the value
                and its range, named by its label. <code>low</code> is the share
                under which it turns red; <code>segments</code> splits it into
                cells for shields or charges.
              </p>
            ),
            zh: (
              <p>
                zzzUI 的 <Link href={link("/docs/gauge")}>Gauge</Link>{" "}
                已实现上述全部效果。它基于 Base UI 的 Meter，名称取自
                GaugeLabel，读屏软件会朗读当前值及其范围。
                <code>low</code> 是变红的比例阈值；<code>segments</code>{" "}
                把它分成若干格，适合表示护盾或充能次数。
              </p>
            ),
          })}
        </Prose>
        <CodeBlock code={gauge} title="hull.tsx" />
      </DocSection>

      <DocSection
        id="trail"
        title={pick({
          en: "How the damage trail works",
          zh: "伤害残影的原理",
        })}
      >
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  Two layers sit in the same well with the same width: the trail
                  behind, the fill in front. Both animate their width on the
                  same transition. The trick is that one of them starts late: on
                  a drop the trail waits, so for a moment it still shows the old
                  value behind the new fill; on a gain the fill waits, so the
                  trail runs ahead and the fill climbs into it.
                </p>
                <p>
                  So the only thing the component has to know is which way the
                  value last moved. Keep the previous value in state and compare
                  during render (React's pattern for information from previous
                  renders): no effect, no extra paint.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  同一个槽里叠着宽度相同的两层：残影在后，填充条在前。两层的宽度变化使用同一个过渡，关键在于其中一层延迟启动。数值下降时，残影延迟，因此在新的填充条后面仍会短暂显示旧值；数值上升时，填充条延迟，残影先到达新值，填充条随后增长到该位置。
                </p>
                <p>
                  因此组件只需知道数值上一次的变化方向。把前一个值保存在 state
                  中，在渲染过程中比较（React
                  保存前次渲染信息的标准写法），这样既不需要
                  effect，也不会多一次绘制。
                </p>
              </>
            ),
          })}
        </Prose>
        <CodeBlock code={scratch} title="health-bar.tsx" />
        <CodeBlock code={css} lang="css" title="health-bar.css" />
      </DocSection>

      <DocSection
        id="timing"
        title={pick({ en: "Timing the wait", zh: "停顿多久合适" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                Around half a second reads well: long enough to see the size of
                the hit, short enough that the bar is honest again before the
                next one. zzzUI keeps it as a token,{" "}
                <code>--zero-dur-hold</code> (480 ms), and moves both layers on
                its slow timing (420 ms). Under reduced motion the wait drops to
                zero, and so does the breathing of a low bar: the number is
                still right, nothing lingers.
              </p>
            ),
            zh: (
              <p>
                半秒左右最合适：既足以看清这一击的伤害量，又足够短，能在下一击到来之前让血条恢复准确。zzzUI
                把这个时长定义为设计令牌（token）<code>--zero-dur-hold</code>
                （480 ms），两层的移动则使用慢速时长（420
                ms）。开启「减少动态效果」时，停顿降为零，数值偏低时的呼吸式明暗变化也随之取消：数值依然准确，只是不再有残影停留。
              </p>
            ),
          })}
        </Prose>
      </DocSection>

      <DocSection
        id="next"
        title={pick({ en: "Where to go next", zh: "延伸阅读" })}
      >
        <Prose>
          {pick({
            en: (
              <p>
                The <Link href={link("/docs/blocks/hud")}>HUD block</Link> puts
                gauges beside a hotbar and objectives, and the{" "}
                <Link href={link("/docs/blocks/loadout")}>Loadout</Link> uses
                them for durability and weight. For a reading that only goes one
                way, see <Link href={link("/docs/progress")}>Progress</Link>.
              </p>
            ),
            zh: (
              <p>
                <Link href={link("/docs/blocks/hud")}>HUD 区块</Link>
                把数值条与快捷栏、任务目标放在一起；
                <Link href={link("/docs/blocks/loadout")}>Loadout</Link>{" "}
                区块用它显示耐久度和负重。若数值只朝一个方向变化，请参阅{" "}
                <Link href={link("/docs/progress")}>Progress</Link>。
              </p>
            ),
          })}
        </Prose>
      </DocSection>
    </>
  );
}
