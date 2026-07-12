// Verbatim guard for the four essay locales (docs/brief-essay-four-languages.md §0).
// Runs the SAME parser the pages render with (lib/essayMarkdown.mjs) and proves
// that its text output is character-identical to the markdown source with only
// the markup syntax removed — i.e. the renderer can neither drop nor alter a
// single character of the author-approved text. Also asserts the link targets.
//
// Usage: node scripts/check-essay-verbatim.mjs   (exit 0 = verbatim)

import fs from "node:fs";
import path from "node:path";
import { parseEssay, inlineText } from "../lib/essayMarkdown.mjs";

const LOCALES = ["en", "de", "zh", "th"];
const CONTENT_DIR = path.join(process.cwd(), "docs/content");

// Independent of the parser: strip markdown syntax with plain replacements.
function stripMarkup(md) {
  return md
    .replace(/^#{1,2} /gm, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");
}

const collapse = (s) => s.replace(/\s+/g, " ").trim();

let failed = false;

for (const locale of LOCALES) {
  const file = path.join(CONTENT_DIR, `essay-what-is-agentic-journaling.${locale}.md`);
  const src = fs.readFileSync(file, "utf8");

  const blocks = parseEssay(src);
  const rendered = collapse(blocks.map((b) => inlineText(b.inlines)).join(" "));
  const expected = collapse(stripMarkup(src));

  if (rendered !== expected) {
    failed = true;
    let i = 0;
    while (i < rendered.length && i < expected.length && rendered[i] === expected[i]) i++;
    console.error(`✗ ${locale}: rendered text diverges from source at char ${i}:`);
    console.error(`   expected …${expected.slice(Math.max(0, i - 40), i + 40)}…`);
    console.error(`   rendered …${rendered.slice(Math.max(0, i - 40), i + 40)}…`);
  }

  const sourceHrefs = [...src.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m) => m[1]);
  const parsedHrefs = [];
  const walk = (nodes) =>
    nodes.forEach((n) => {
      if (n.t === "link") parsedHrefs.push(n.href);
      if ("children" in n) walk(n.children);
    });
  blocks.forEach((b) => walk(b.inlines));
  if (JSON.stringify(sourceHrefs) !== JSON.stringify(parsedHrefs)) {
    failed = true;
    console.error(`✗ ${locale}: link hrefs diverge`, { sourceHrefs, parsedHrefs });
  }

  if (!failed) {
    const h1 = blocks.filter((b) => b.type === "h1").length;
    const h2 = blocks.filter((b) => b.type === "h2").length;
    const p = blocks.filter((b) => b.type === "p").length;
    console.log(
      `✓ ${locale}: verbatim (${h1} h1, ${h2} h2, ${p} paragraphs, ${parsedHrefs.length} links)`
    );
  }
}

process.exit(failed ? 1 : 0);
