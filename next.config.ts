import type { NextConfig } from "next";

// Hybrid, not a static export: pages stay statically prerendered, but the site
// now also carries one serverless route — app/api/first-movers — which auto-sends
// the First Movers invitation. A pure `output: "export"` cannot run route handlers,
// so it was removed (see docs/BRIEFING-FIRSTMOVERS-AUTOSEND.md, Amendment 1).
const nextConfig: NextConfig = {};

export default nextConfig;
