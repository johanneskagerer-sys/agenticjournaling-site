/**
 * Minimal markdown parser for the essay content files in docs/content/.
 * Plain .mjs so the same code runs inside Next (build-time rendering) and in
 * node scripts (scripts/check-essay-verbatim.mjs) without a TS loader.
 *
 * Supported subset — exactly what the four author-approved essays use:
 *   # h1, ## h2, paragraphs (blank-line separated), soft line breaks,
 *   **strong**, *em*, [text](url) with em allowed inside the link text.
 * Anything outside this subset stays literal text; the verbatim check
 * script fails the build path if parsed text ever diverges from the source.
 *
 * @typedef {{ t: "text", v: string }
 *   | { t: "br" }
 *   | { t: "strong", children: InlineNode[] }
 *   | { t: "em", children: InlineNode[] }
 *   | { t: "link", href: string, children: InlineNode[] }} InlineNode
 * @typedef {{ type: "h1" | "h2" | "p", inlines: InlineNode[] }} EssayBlock
 */

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/;

/**
 * @param {string} text
 * @returns {InlineNode[]}
 */
export function parseInline(text) {
  const nodes = [];
  let rest = text;
  while (rest.length > 0) {
    const m = rest.match(INLINE);
    if (!m || m.index === undefined) {
      nodes.push({ t: "text", v: rest });
      break;
    }
    if (m.index > 0) nodes.push({ t: "text", v: rest.slice(0, m.index) });
    if (m[1] !== undefined) {
      nodes.push({ t: "link", href: m[2], children: parseInline(m[1]) });
    } else if (m[3] !== undefined) {
      nodes.push({ t: "strong", children: parseInline(m[3]) });
    } else {
      nodes.push({ t: "em", children: parseInline(m[4]) });
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return nodes;
}

/**
 * Soft line breaks inside a paragraph stay visible as <br/> — the essays end
 * on a two-line refrain whose line structure is part of the approved text.
 * @param {string} chunk
 * @returns {InlineNode[]}
 */
function parseParagraph(chunk) {
  const lines = chunk.split("\n");
  /** @type {InlineNode[]} */
  const nodes = [];
  lines.forEach((line, i) => {
    if (i > 0) nodes.push({ t: "br" });
    nodes.push(...parseInline(line));
  });
  return nodes;
}

/**
 * @param {string} md
 * @returns {EssayBlock[]}
 */
export function parseEssay(md) {
  /** @type {EssayBlock[]} */
  const blocks = [];
  for (const raw of md.split(/\n[ \t]*\n+/)) {
    const chunk = raw.trim();
    if (chunk === "") continue;
    if (chunk.startsWith("## ")) {
      blocks.push({ type: "h2", inlines: parseInline(chunk.slice(3)) });
    } else if (chunk.startsWith("# ")) {
      blocks.push({ type: "h1", inlines: parseInline(chunk.slice(2)) });
    } else {
      blocks.push({ type: "p", inlines: parseParagraph(chunk) });
    }
  }
  return blocks;
}

/**
 * Flatten a block's inline tree back to plain text (used by the verbatim
 * check and for the JSON-LD headline).
 * @param {InlineNode[]} nodes
 * @returns {string}
 */
export function inlineText(nodes) {
  return nodes
    .map((n) => {
      if (n.t === "text") return n.v;
      if (n.t === "br") return "\n";
      return inlineText(n.children);
    })
    .join("");
}
