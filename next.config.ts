import type { NextConfig } from "next";

// Hybrid, not a static export: pages stay statically prerendered, but the site
// also carries one serverless route — app/api/first-movers — which auto-sends
// the invitation from /step-in. A pure `output: "export"` cannot run route
// handlers, so it was removed (see docs/BRIEFING-FIRSTMOVERS-AUTOSEND.md, Amendment 1).
// The route path and its env names keep the historical "first-movers" name so
// nothing deployed has to be re-keyed; the public page is /step-in since
// 2026-11-08 (docs/BRIEFING-STEP-IN.md) and the old URL redirects there.
const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/first-movers", destination: "/step-in", permanent: true }];
  },
};

export default nextConfig;
