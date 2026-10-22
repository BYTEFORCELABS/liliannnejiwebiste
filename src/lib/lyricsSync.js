// Live lyric highlighting. A song's `lyricTimings` is
// { lineCount, cues: [{ line, time }] }: `line` indexes lyricLines(lyrics),
// `time` is seconds into the YouTube video. A line can have several cues
// (a chorus sung more than once). `lineCount` lets us ignore timings once
// lines have been added or removed from the lyrics since they were synced.

export function lyricLines(text) {
  return (text || "").split("\n");
}

export function hasValidTimings(song) {
  const timings = song?.lyricTimings;
  return (
    Array.isArray(timings?.cues) &&
    timings.cues.length > 0 &&
    timings.lineCount === lyricLines(song.lyrics).length
  );
}

// Cues must be sorted by time. Returns the line being sung at `time`, or -1.
export function activeLineAt(cues, time) {
  let lo = 0;
  let hi = cues.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (cues[mid].time <= time) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return found === -1 ? -1 : cues[found].line;
}

export function sortCues(cues) {
  return [...cues].sort((a, b) => a.time - b.time);
}

export function formatTime(seconds) {
  const s = Math.max(0, seconds || 0);
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toFixed(1).padStart(4, "0")}`;
}
