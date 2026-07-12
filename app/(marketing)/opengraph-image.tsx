// Splitting into two root layouts (marketing / locale) orphaned the single
// app/opengraph-image.tsx: with no shared app/layout.tsx, Next.js's file-based
// metadata convention has no common root to attach it to, so neither layout
// picked up an og:image tag even though the route itself kept building fine.
// Each root layout needs its own copy of the file convention, sharing the
// actual render logic from lib/opengraph-image.
export { default, alt, size, contentType } from "@/lib/opengraph-image";

// Route segment config can't be re-exported — must be declared literally here.
export const dynamic = "force-static";
