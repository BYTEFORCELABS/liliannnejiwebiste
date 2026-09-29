// ============================================================
// SITE CONFIG — single source of truth for SEO
//
// Everything that needs the public URL (canonicals, sitemap,
// robots, Open Graph, JSON-LD) reads it from here. If the domain
// ever changes, change SITE_URL and nothing else.
// ============================================================

export const SITE_URL = "https://liliannneji.com";

export const SITE_NAME = "Minister Lilian Nneji";

export const SITE_TAGLINE =
  "Gospel Music Minister, Songwriter & Worship Leader";

export const SITE_DESCRIPTION =
  "Official website of Nigerian gospel music minister, songwriter and worship leader Minister Lilian Nneji — Africa Praise Artiste of the Year. Stream Omeriwo, Onwere Ihe Omere Mù, E Get Why, Mercy and Eze Mu O, read the lyrics, browse her awards, and book her for your church conference or gospel concert.";

// Used for Open Graph and Twitter cards across the site.
export const SITE_OG_IMAGE = "/images/live_praise_fire.jpg";

// Verified official accounts. These become `sameAs` in the JSON-LD,
// which is how search engines tie the site to the real person and
// show the knowledge panel.
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/liliannnejiofficial",
  "https://www.instagram.com/liliannneji/",
  "https://www.youtube.com/@LilianNneji",
  "https://www.tiktok.com/@liliannneji1",
  "https://x.com/liliannneji",
  "https://threads.net/@liliannneji",
  "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa",
  "https://music.apple.com/artist/lilian-nneji",
  "https://soundcloud.com/lilian-nneji",
];

export const CONTACT = {
  emails: ["Lilianamadi@yahoo.com", "Liliannneji@yahoo.com"],
  // Primary line first — this order is what the JSON-LD contactPoint,
  // the footer and the booking section all follow.
  phones: ["+234 802 313 1871", "+234 803 497 8751"],
  locality: "Port Harcourt",
  region: "Rivers State",
  country: "NG",
};

// Paste the token from Google Search Console -> HTML tag verification.
// Leaving it empty simply omits the tag.
export const GOOGLE_SITE_VERIFICATION = "eJAJJ1kbabAj_NcNl38uR_XKY5EXOQziXeF65APOj7s";

/**
 * Builds a page's metadata with the canonical URL, Open Graph and
 * Twitter card filled in consistently.
 */
export function pageMetadata({ title, description, path = "/", image = SITE_OG_IMAGE }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 2400, height: 1600, alt: title }],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
