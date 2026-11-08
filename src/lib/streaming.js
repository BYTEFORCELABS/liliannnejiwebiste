// Where a song can be streamed outside the site. A song's `streamingLinks`
// is an object keyed by these platform keys; empty or missing keys are skipped.
export const STREAMING_PLATFORMS = [
  { key: "spotify", label: "Spotify", placeholder: "https://open.spotify.com/track/..." },
  { key: "boomplay", label: "Boomplay", placeholder: "https://www.boomplay.com/songs/..." },
  { key: "appleMusic", label: "Apple Music", placeholder: "https://music.apple.com/..." },
  { key: "audiomack", label: "Audiomack", placeholder: "https://audiomack.com/liliannneji/song/..." },
  { key: "youtubeMusic", label: "YouTube Music", placeholder: "https://music.youtube.com/watch?v=..." },
  { key: "deezer", label: "Deezer", placeholder: "https://www.deezer.com/track/..." },
  { key: "allPlatforms", label: "All Platforms", placeholder: "https://onerpm.link/..." },
];

export function streamingLinksOf(song) {
  const links = song?.streamingLinks || {};
  return STREAMING_PLATFORMS.filter((p) => links[p.key]?.trim()).map((p) => ({ ...p, url: links[p.key].trim() }));
}

// Trimmed copy without empty entries, for saving
export function cleanStreamingLinks(links) {
  return Object.fromEntries(
    STREAMING_PLATFORMS.map((p) => [p.key, links?.[p.key]?.trim()]).filter(([, url]) => url)
  );
}

// Spotify's embeddable player for a track or album link, or null
export function spotifyEmbedUrl(url) {
  const match = url?.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album)\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}?theme=0` : null;
}
