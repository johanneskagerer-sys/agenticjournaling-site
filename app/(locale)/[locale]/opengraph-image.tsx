// The image itself lives in lib/opengraph-image.tsx; this file only places it
// on every locale route (all four locales share the one image).
export { default, alt, size, contentType } from "@/lib/opengraph-image";

// Route segment config can't be re-exported — must be declared literally here.
export const dynamic = "force-static";
