import { SITE_URL } from "@/lib/site";

// Next.js serves this at /sitemap.xml. Reverb is deliberately absent:
// the route returns notFound(), so listing it would feed Google a 404.
export default function sitemap() {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`,        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/lyrics`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/awards`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];
}
