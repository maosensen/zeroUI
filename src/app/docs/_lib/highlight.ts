import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

/*
 * Code highlighting for the docs, on the server only. The colours are zeroUI's (tokens.css); shiki
 * needs literal values, so they are repeated here: keywords in the accent, strings in the focus
 * yellow, comments and punctuation in the quiet greys.
 */
const zero = {
  name: "zero",
  type: "dark" as const,
  colors: {
    "editor.background": "#000000",
    "editor.foreground": "#f5f5f0",
  },
  tokenColors: [
    { settings: { foreground: "#f5f5f0" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#8c8c8c", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "keyword.operator.new",
        "keyword.control",
      ],
      settings: { foreground: "#cde31c" },
    },
    {
      scope: ["string", "string.quoted", "punctuation.definition.string"],
      settings: { foreground: "#f2e74b" },
    },
    {
      scope: [
        "entity.name.tag",
        "support.class.component",
        "entity.name.type",
        "support.type",
      ],
      settings: { foreground: "#def44a" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#a6a6a6", fontStyle: "italic" },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#f5f5f0", fontStyle: "bold" },
    },
    {
      scope: ["constant", "constant.numeric", "constant.language"],
      settings: { foreground: "#ff6a4f" },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "punctuation.section.embedded",
      ],
      settings: { foreground: "#a6a6a6" },
    },
  ],
};

const languages = {
  tsx: () => import("shiki/langs/tsx.mjs"),
  bash: () => import("shiki/langs/shellscript.mjs"),
  css: () => import("shiki/langs/css.mjs"),
};

export type Language = keyof typeof languages;

export type Token = { content: string; color?: string; style?: number };

let highlighter: Promise<HighlighterCore> | undefined;

/** Lines of tokens, cached: the docs' code never changes between requests. */
export async function highlight(
  code: string,
  lang: Language,
): Promise<Token[][]> {
  "use cache";
  highlighter ??= createHighlighterCore({
    themes: [zero],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
  const shiki = await highlighter;
  if (!shiki.getLoadedLanguages().includes(lang)) {
    await shiki.loadLanguage(languages[lang]);
  }
  return shiki
    .codeToTokens(code.replace(/\n$/, ""), { lang, theme: "zero" })
    .tokens.map((line) =>
      line.map((token) => ({
        content: token.content,
        color: token.color,
        style: token.fontStyle,
      })),
    );
}
