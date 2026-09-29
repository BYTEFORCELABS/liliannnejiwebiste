import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  SOCIAL_PROFILES,
  CONTACT,
} from "@/lib/site";
import { AWARDS } from "@/lib/awards";

// ============================================================
// JSON-LD STRUCTURED DATA
//
// This is what lets Google show a knowledge panel, her awards,
// her songs and the sitelinks search box, rather than a plain
// blue link. `sameAs` is what ties this site to her verified
// social and streaming profiles.
// ============================================================

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built here from our own constants, never from
      // user input, so there is nothing to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Person + MusicGroup: the artist herself. Sitewide. */
export function ArtistSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "MusicGroup"],
        "@id": `${SITE_URL}/#artist`,
        name: SITE_NAME,
        alternateName: ["Lilian Nneji", "Lilian Amadi Nneji"],
        url: SITE_URL,
        image: `${SITE_URL}${SITE_OG_IMAGE}`,
        description: SITE_DESCRIPTION,
        jobTitle: "Gospel Music Minister, Songwriter and Worship Leader",
        genre: ["Gospel", "Afro-Gospel", "Praise and Worship", "Contemporary Christian Music"],
        nationality: { "@type": "Country", name: "Nigeria" },
        sameAs: SOCIAL_PROFILES,
        address: {
          "@type": "PostalAddress",
          addressLocality: CONTACT.locality,
          addressRegion: CONTACT.region,
          addressCountry: CONTACT.country,
        },
        // Every award she actually holds, transcribed from the plaques.
        award: AWARDS.map((a) =>
          a.year ? `${a.title} — ${a.presenter}, ${a.year}` : `${a.title} — ${a.presenter}`
        ),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Booking enquiries",
          telephone: CONTACT.phones[0],
          email: CONTACT.emails[0],
          areaServed: "Worldwide",
          availableLanguage: ["English", "Igbo"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Official Website`,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#artist` },
        inLanguage: "en",
      },
    ],
  };

  return <JsonLd data={data} />;
}

/** Breadcrumbs so inner pages show a trail instead of a bare URL. */
export function BreadcrumbSchema({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };

  return <JsonLd data={data} />;
}

/**
 * The song catalogue, so lyrics pages can surface for
 * "<song name> lyrics" searches.
 */
export function MusicCatalogueSchema({ songs }) {
  if (!songs?.length) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    "@id": `${SITE_URL}/lyrics#catalogue`,
    name: `${SITE_NAME} — Song Catalogue`,
    description: `Official lyrics and releases by ${SITE_NAME}.`,
    numTracks: songs.length,
    track: songs.map((song) => ({
      "@type": "MusicRecording",
      name: song.title,
      byArtist: { "@id": `${SITE_URL}/#artist` },
      inAlbum: song.album || undefined,
      datePublished: song.releaseYear || undefined,
      genre: song.category || undefined,
      url: `${SITE_URL}/lyrics`,
      ...(song.youtubeUrl ? { sameAs: song.youtubeUrl } : {}),
      ...(song.lyrics
        ? { lyrics: { "@type": "CreativeWork", text: song.lyrics.slice(0, 400) } }
        : {}),
    })),
  };

  return <JsonLd data={data} />;
}

/** The awards, as a list Google can read. */
export function AwardsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/awards#list`,
    name: `${SITE_NAME} — Awards and Honours`,
    numberOfItems: AWARDS.length,
    itemListElement: AWARDS.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "CreativeWork",
        name: a.title,
        description: a.citation,
        image: `${SITE_URL}${a.images[0].src}`,
        ...(a.year && /^\d{4}$/.test(a.year) ? { datePublished: a.year } : {}),
      },
    })),
  };

  return <JsonLd data={data} />;
}
