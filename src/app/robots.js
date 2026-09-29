import { SITE_URL } from "@/lib/site";

// Next.js serves this at /robots.txt.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The dashboard and its APIs have nothing to index and
        // should never appear in results.
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
