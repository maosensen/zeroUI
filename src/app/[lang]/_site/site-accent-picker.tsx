"use client";

import { AccentPicker } from "@/components/zero/accent-picker";
import type { AccentLabelsInput } from "@/components/zero/accent-switch";
import { usePick } from "@/lib/i18n/client";

/** The header's accent picker, speaking the page's language (its notes are functions, so the
 * labels are chosen here, on the client, rather than passed down from the server header). */
const zh: AccentLabelsInput = {
  names: {
    lime: "青柠",
    cyan: "青色",
    magenta: "品红",
    amber: "琥珀",
    mint: "薄荷",
    sky: "天蓝",
    violet: "紫罗兰",
    mono: "单色",
    yellow: "黄色",
    leaf: "叶绿",
    iris: "鸢尾蓝",
    orchid: "兰紫",
  },
  trigger: (label, name) => `${label}：${name}`,
  title: "强调色",
  own: "自定义",
  pick: "选取颜色",
  hint: (min) => `墨黑文字在其上的对比度须不低于 ${min} : 1。`,
  invalid: "请输入六位十六进制色值，如 #ff8a5c。",
  reads: (ratio) => `墨黑文字在其上的对比度为 ${ratio} : 1。`,
  tooDark: (ratio, min) =>
    `颜色过深：墨黑文字的对比度仅 ${ratio} : 1，至少需要 ${min} : 1。`,
};

export function SiteAccentPicker({ className }: { className?: string }) {
  const { lang, pick } = usePick();
  return (
    <AccentPicker
      className={className}
      labels={lang === "zh" ? zh : undefined}
      aria-label={pick({ en: "Accent colour", zh: "强调色" })}
    />
  );
}
