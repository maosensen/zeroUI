"use client";

import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/zero/cn";

/*
 * A wheel of choices, the way a game offers a quick pick: up to eight items around a ring, the
 * first at the top, going clockwise. Pointing anywhere picks the item in that direction (you do
 * not have to reach it), so a flick of the mouse is enough; the centre names the one picked, and
 * a click or Enter chooses it. The arrow keys go round the ring; focus stays on the wheel and the
 * picked item is the active descendant, so screen readers hear each as it is reached. It is the
 * wheel only: show it where and when you need it (on a held key, in an overlay).
 *
 *   <RadialMenu aria-label="Quick use" onSelect={use}>
 *     <RadialMenuItem value="kit" label="Repair kit"><KitIcon /></RadialMenuItem>
 *     …
 *   </RadialMenu>
 */

const RadialContext = createContext<{
  active: number;
  count: number;
  id: string;
  setActive: (index: number) => void;
  choose: (value: string) => void;
}>({ active: -1, count: 0, id: "", setActive: () => {}, choose: () => {} });

const IndexContext = createContext(0);

function RadialMenu({
  className,
  children,
  onSelect,
  defaultValue,
  id: idProp,
  ...props
}: Omit<ComponentProps<"div">, "onSelect" | "children"> & {
  children: ReactNode;
  onSelect?: (value: string) => void;
  /** The item picked when it opens. */
  defaultValue?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement) as {
    props: { value: string; label: string; disabled?: boolean };
  }[];
  const count = items.length;
  const auto = useId();
  const id = idProp ?? auto;
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      items.findIndex((item) => item.props.value === defaultValue),
    ),
  );
  const wheel = useRef<HTMLDivElement>(null);
  const current = items[active]?.props;

  // the direction of the pointer from the centre picks: 0° is up, clockwise
  const point = (event: PointerEvent<HTMLDivElement>) => {
    const box = wheel.current?.getBoundingClientRect();
    if (!box) return;
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    if (Math.hypot(dx, dy) < box.width * 0.12) return;
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    setActive(Math.round((((angle + 360) % 360) / 360) * count) % count);
  };

  const choose = (value: string) => onSelect?.(value);

  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      event.key
    ];
    if (step) {
      event.preventDefault();
      setActive((a) => (a + step + count) % count);
    } else if ((event.key === "Enter" || event.key === " ") && current) {
      event.preventDefault();
      if (!current.disabled) choose(current.value);
    }
  };

  return (
    <RadialContext.Provider value={{ active, count, id, setActive, choose }}>
      <div
        ref={wheel}
        role="menu"
        tabIndex={0}
        aria-activedescendant={`${id}-${active}`}
        data-slot="radial-menu"
        onPointerMove={point}
        onKeyDown={keys}
        className={cn(
          "relative isolate grid aspect-square w-72 max-w-full place-items-center rounded-zero-round outline-none",
          "bg-[radial-gradient(circle,transparent_31%,rgb(0_0_0/0.78)_32%,rgb(0_0_0/0.78)_70%,transparent_71%)]",
          "focus-visible:outline-solid focus-visible:outline-(length:--zero-stroke-thin) focus-visible:outline-zero-focus focus-visible:outline-offset-2",
          className,
        )}
        {...props}
      >
        {/* the wedge of the picked item, a bright arc on the ring */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-zero-round transition-[rotate] duration-(--zero-dur-base) ease-(--zero-ease-out)"
          style={{
            rotate: `${(active / count) * 360 - 180 / count}deg`,
            background: `conic-gradient(color-mix(in srgb, var(--color-zero-accent) 26%, transparent) 0 ${360 / count}deg, transparent 0)`,
            mask: "radial-gradient(circle, transparent 32%, black 32.5%, black 70%, transparent 70.5%)",
          }}
        />
        <span
          aria-hidden
          className="grid max-w-[32%] justify-items-center text-center font-black font-zero text-zero-sm italic leading-tight"
        >
          {current?.label}
        </span>
        {Children.toArray(children)
          .filter(isValidElement)
          .map((child, index) => (
            <IndexContext.Provider key={child.key ?? index} value={index}>
              {child}
            </IndexContext.Provider>
          ))}
      </div>
    </RadialContext.Provider>
  );
}

function RadialMenuItem({
  className,
  value,
  label,
  disabled,
  children,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  value: string;
  /** Its name: said by screen readers and shown in the centre. */
  label: string;
  disabled?: boolean;
  children?: ReactNode;
}) {
  const { active, count, id, setActive, choose } = useContext(RadialContext);
  const i = useContext(IndexContext);
  const angle = (i / count) * 2 * Math.PI;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the wheel takes the keys and chooses the active item
    <div
      id={`${id}-${i}`}
      role="menuitem"
      tabIndex={-1}
      aria-label={label}
      aria-disabled={disabled || undefined}
      data-slot="radial-menu-item"
      data-active={i === active ? "" : undefined}
      onPointerEnter={() => setActive(i)}
      onClick={() => !disabled && choose(value)}
      className={cn(
        "absolute grid size-14 -translate-x-1/2 -translate-y-1/2 -skew-x-(--zero-slant) place-items-center bg-zero-raised text-zero-text-2",
        "shadow-[inset_0_0_0_var(--zero-stroke-thin)_var(--color-zero-line)]",
        "transition-[background-color,color,scale] duration-(--zero-dur-fast) ease-(--zero-ease-out)",
        "data-active:scale-110 data-active:bg-zero-accent data-active:text-zero-ink data-active:shadow-none",
        "aria-disabled:opacity-40",
        "[&>*]:skew-x-(--zero-slant) [&_svg]:size-7",
        className,
      )}
      style={{
        left: `${50 + 51 * Math.sin(angle) * 0.82}%`,
        top: `${50 - 51 * Math.cos(angle) * 0.82}%`,
      }}
      {...props}
    >
      <span className="grid place-items-center">{children}</span>
    </div>
  );
}

export { RadialMenu, RadialMenuItem };
