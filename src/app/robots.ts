import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

// Required for static export (output: "export" in next.config.ts) — Next.js
// needs this to pre-render robots.txt as a static file at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
