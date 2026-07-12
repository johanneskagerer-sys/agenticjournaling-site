import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { parseEssay, inlineText } from "@/lib/essayMarkdown.mjs";

// "What is Agentic Journaling?" — one essay, four locales. The markdown files
// in docs/content/ are the author-approved source of truth (render verbatim;
// see docs/brief-essay-four-languages.md §0). "Agentic Journaling" is never
// translated. en is the default locale and lives unprefixed.

export const ESSAY_LOCALES = ["en", "de", "zh", "th"] as const;
export type EssayLocale = (typeof ESSAY_LOCALES)[number];

// Mirrors the JSDoc typedefs in lib/essayMarkdown.mjs (kept there so the
// verbatim check script can run the same parser under plain node).
export type InlineNode =
  | { t: "text"; v: string }
  | { t: "br" }
  | { t: "strong"; children: InlineNode[] }
  | { t: "em"; children: InlineNode[] }
  | { t: "link"; href: string; children: InlineNode[] };
export type EssayBlock = { type: "h1" | "h2" | "p"; inlines: InlineNode[] };

const BASE = "https://agenticjournaling.com";
const SLUG = "what-is-agentic-journaling";

export function essayPath(locale: EssayLocale): string {
  return locale === "en" ? `/${SLUG}` : `/${locale}/${SLUG}`;
}

// Title/description pairs locked in docs/brief-essay-four-languages.md §1
// (the "| agenticjournaling" suffix comes from the root layout's template).
// DE uses the en dash "–" per the German typography standing rule.
const META: Record<EssayLocale, { title: string; description: string }> = {
  en: {
    title: "What is Agentic Journaling? — a definition",
    description:
      "Agentic journaling inverts the AI journal: the agency belongs to your inner parts, not the software. A definition from the practice's origin.",
  },
  de: {
    title: "Was ist Agentic Journaling? – eine Definition",
    description:
      "Agentic Journaling kehrt das KI-Journal um: Die Agency gehört deinen inneren Anteilen, nicht der Software. Eine Definition vom Ursprung der Praxis.",
  },
  zh: {
    title: "什么是 Agentic Journaling？——一个定义",
    description:
      "Agentic Journaling 反转了 AI 日记：能动性属于你的内在部分，而不是软件。来自这一练习源头的定义。",
  },
  th: {
    title: "Agentic Journaling คืออะไร — คำนิยาม",
    description:
      "Agentic Journaling พลิกมุมมองบันทึก AI: ความเป็นผู้กระทำเป็นของส่วนต่าง ๆ ภายในตัวคุณ ไม่ใช่ของซอฟต์แวร์",
  },
};

const HREFLANG_ALTERNATES = {
  en: `${BASE}${essayPath("en")}`,
  de: `${BASE}${essayPath("de")}`,
  zh: `${BASE}${essayPath("zh")}`,
  th: `${BASE}${essayPath("th")}`,
  "x-default": `${BASE}${essayPath("en")}`,
};

export function essayMetadata(locale: EssayLocale): Metadata {
  return {
    title: META[locale].title,
    description: META[locale].description,
    alternates: {
      canonical: `${BASE}${essayPath(locale)}`,
      languages: HREFLANG_ALTERNATES,
    },
  };
}

export function loadEssay(locale: EssayLocale) {
  const file = path.join(
    process.cwd(),
    "docs/content",
    `essay-what-is-agentic-journaling.${locale}.md`
  );
  const blocks = parseEssay(fs.readFileSync(file, "utf8")) as EssayBlock[];
  const h1 = blocks.find((b) => b.type === "h1");
  return { blocks, headline: h1 ? inlineText(h1.inlines) : META[locale].title };
}

export function essayJsonLd(locale: EssayLocale, headline: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Johannes Kagerer",
      url: "https://johanneskagerer.de",
    },
    datePublished: "2026-07-11",
    mainEntityOfPage: `${BASE}${essayPath(locale)}`,
  });
}
