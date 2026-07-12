import { Fragment } from "react";
import Footer from "@/components/Footer";
import {
  loadEssay,
  essayJsonLd,
  type EssayLocale,
  type InlineNode,
  type EssayBlock,
} from "@/lib/essay";

// Renders one locale of the essay from its markdown source (verbatim — the
// parser handles exactly the subset the approved files use). All links in the
// content are absolute URLs and open in a new tab per the brief.

function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.t === "text") return <Fragment key={i}>{n.v}</Fragment>;
        if (n.t === "br") return <br key={i} />;
        if (n.t === "strong")
          return (
            <strong key={i}>
              <Inline nodes={n.children} />
            </strong>
          );
        if (n.t === "em")
          return (
            <em key={i}>
              <Inline nodes={n.children} />
            </em>
          );
        return (
          <a key={i} href={n.href} target="_blank" rel="noopener noreferrer">
            <Inline nodes={n.children} />
          </a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: EssayBlock }) {
  if (block.type === "h1")
    return (
      <h1>
        <Inline nodes={block.inlines} />
      </h1>
    );
  if (block.type === "h2")
    return (
      <h2>
        <Inline nodes={block.inlines} />
      </h2>
    );
  return (
    <p>
      <Inline nodes={block.inlines} />
    </p>
  );
}

export default function EssayPage({ locale }: { locale: EssayLocale }) {
  const { blocks, headline } = loadEssay(locale);
  return (
    <>
      <main lang={locale} className="section-essay">
        <article className="essay-container settle">
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: essayJsonLd(locale, headline) }}
      />
      <Footer />
    </>
  );
}
