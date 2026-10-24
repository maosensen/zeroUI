/**
 * `/llms.txt`(格式见 llmstxt.org;yPulse docs/seo-geo.md §7):站名一行、一句摘要、然后按节列出主要页面,
 * 每页一行链接加一句说明。成本低、收益未证实 —— 所以只从生成 sitemap 的同一份站点配置里拼,不单独维护内容。
 */

export interface LlmsLink {
  title: string;
  url: string;
  note?: string;
}

export interface LlmsSection {
  heading: string;
  links: readonly LlmsLink[];
}

/** 一行里不能有换行;说明里的换行压成空格。 */
const line = (text: string) => text.replace(/\s+/g, " ").trim();

export function llmsTxt({
  title,
  summary,
  details = [],
  sections,
}: {
  title: string;
  /** 一句话:这个站是什么。写成引用块。 */
  summary: string;
  /** 摘要之后的几段补充(纯文字)。 */
  details?: readonly string[];
  sections: readonly LlmsSection[];
}) {
  const out = [`# ${line(title)}`, "", `> ${line(summary)}`, ""];
  for (const d of details) out.push(line(d), "");
  for (const s of sections) {
    if (!s.links.length) continue;
    out.push(`## ${line(s.heading)}`, "");
    for (const l of s.links)
      out.push(
        `- [${line(l.title)}](${l.url})${l.note ? `: ${line(l.note)}` : ""}`,
      );
    out.push("");
  }
  return `${out.join("\n").trimEnd()}\n`;
}
