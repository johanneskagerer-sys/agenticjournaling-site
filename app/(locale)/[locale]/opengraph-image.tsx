// See app/(marketing)/opengraph-image.tsx for why this file has to exist
// separately in both root-layout trees.
export { default, alt, size, contentType } from "@/lib/opengraph-image";

// Route segment config can't be re-exported — must be declared literally here.
export const dynamic = "force-static";
