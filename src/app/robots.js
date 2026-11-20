import { SITE_URL } from "@/lib/site";

// Next.js serves this at /robots.txt.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The APIs have nothing to index. The dashboard lives on
        // admin.liliannneji.com, which serves its own robots.txt.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
