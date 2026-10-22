"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import YouTubePlayer, { usePlayerTime, youTubeId } from "@/components/YouTubePlayer";
import { lyricLines, hasValidTimings, activeLineAt, sortCues } from "@/lib/lyricsSync";
import { Music, Search, Copy, Play, X, ExternalLink, Highlighter } from "lucide-react";

const CATEGORIES = [
  "All",
  "High Praise",
  "Prophetic Worship",
  "Afro-Gospel",
  "Thanksgiving"
];

const FOLLOW_ALONG_KEY = "lyrics_follow_along";

export default function LyricsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [toast, setToast] = useState(null);
  const [nowPlayingId, setNowPlayingId] = useState(null);
  // Remembers whether this visitor turned live highlighting off. The switch
  // only renders once songs load on the client, so this can't mismatch SSR.
  const [followAlong, setFollowAlong] = useState(() => {
    try {
      return localStorage.getItem(FOLLOW_ALONG_KEY) !== "off";
    } catch {
      return true;
    }
  });

  const playerRef = useRef(null);
  const lyricsPaneRef = useRef(null);
  const stickyPlayerRef = useRef(null);
  const lineRefs = useRef([]);
  const readerScrolling = useRef(false);
  const readerScrollTimer = useRef(null);

  const closeToast = useCallback(() => setToast(null), []);

  const selectSong = (id) => {
    setSelectedSongId(id);
    setNowPlayingId(null);
    lyricsPaneRef.current?.scrollTo({ top: 0 });
  };

  const toggleFollowAlong = () => {
    const next = !followAlong;
    setFollowAlong(next);
    try {
      localStorage.setItem(FOLLOW_ALONG_KEY, next ? "on" : "off");
    } catch {}
  };

  useEffect(() => {
    async function loadLyrics() {
      try {
        setLoading(true);
        const res = await fetch("/api/lyrics");
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          setSongs(data.items);
          if (data.items.length > 0 && !selectedSongId) {
            setSelectedSongId(data.items[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load lyrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLyrics();
  }, []);

  // Filter songs based on search and category
  const filteredSongs = songs.filter((song) => {
    const matchesCategory =
      activeCategory === "All" ||
      song.category?.toLowerCase() === activeCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      song.title?.toLowerCase().includes(q) ||
      song.album?.toLowerCase().includes(q) ||
      song.lyrics?.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const selectedSong = songs.find((s) => s.id === selectedSongId) || filteredSongs[0] || null;
  const videoId = youTubeId(selectedSong?.youtubeUrl);
  const isPlaying = Boolean(selectedSong) && nowPlayingId === selectedSong.id;
  const hasLyrics = Boolean(selectedSong?.lyrics?.trim());

  // Live highlighting: only for songs whose timings were synced in the admin
  const lines = lyricLines(selectedSong?.lyrics);
  const cues = hasValidTimings(selectedSong) ? sortCues(selectedSong.lyricTimings.cues) : null;
  const cuedLines = new Set(cues?.map((c) => c.line));
  const highlighting = Boolean(cues) && followAlong && isPlaying;
  const playbackTime = usePlayerTime(playerRef, highlighting);
  const activeLine = highlighting ? activeLineAt(cues, playbackTime) : -1;

  // Keep the line being sung in view, below the sticky player
  useEffect(() => {
    const line = lineRefs.current[activeLine];
    const pane = lyricsPaneRef.current;
    if (!line || !pane) return;
    if (readerScrolling.current) return;

    // On desktop the lyrics pane scrolls on its own; on mobile the page does
    const paneScrolls = getComputedStyle(pane).overflowY !== "visible" && pane.scrollHeight > pane.clientHeight;
    const paneRect = pane.getBoundingClientRect();
    const viewTop = stickyPlayerRef.current?.getBoundingClientRect().bottom ?? paneRect.top;
    const viewBottom = paneScrolls ? paneRect.bottom : window.innerHeight;
    const delta = line.getBoundingClientRect().top - (viewTop + (viewBottom - viewTop) * 0.3);
    (paneScrolls ? pane : window).scrollBy({ top: delta, behavior: "smooth" });
  }, [activeLine]);

  // Leave readers alone for a few seconds after they scroll themselves
  const markUserScroll = () => {
    readerScrolling.current = true;
    clearTimeout(readerScrollTimer.current);
    readerScrollTimer.current = setTimeout(() => (readerScrolling.current = false), 4000);
  };

  useEffect(() => () => clearTimeout(readerScrollTimer.current), []);

  // Seek to the timing of a line closest to where the song is now
  const jumpToLine = (index) => {
    const player = playerRef.current;
    if (!player?.isReady()) return;
    const now = player.getCurrentTime();
    const nearest = cues
      .filter((c) => c.line === index)
      .reduce((a, b) => (Math.abs(b.time - now) < Math.abs(a.time - now) ? b : a));
    clearTimeout(readerScrollTimer.current);
    readerScrolling.current = false;
    player.seekTo(nearest.time);
  };

  // Copy lyrics to clipboard
  const handleCopyLyrics = async () => {
    if (!selectedSong) return;
    const fullText = `${selectedSong.title} - Minister Lilian Nneji\nAlbum: ${selectedSong.album} (${selectedSong.releaseYear})\n\n${selectedSong.lyrics}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setToast({ message: `"${selectedSong.title}" lyrics copied to your clipboard.` });
    } catch (err) {
      console.error("Copy failed:", err);
      setToast({ message: "Couldn't copy the lyrics. Please select and copy manually." });
    }
  };

  return (
    <div className="min-h-screen bg-black text-ink flex flex-col selection:bg-[#F88E14] selection:text-on-gold">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20">
        
        {/* ============================================================ */}
        {/* HERO SECTION                                                */}
        {/* ============================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto text-center space-y-5 overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F88E14]/10 blur-[140px] pointer-events-none rounded-full" />

          <h1 className="font-fjalla text-4xl sm:text-6xl lg:text-7xl uppercase text-ink font-bold tracking-tight">
            WORSHIP & PRAISE <span className="text-gold-gradient">LYRICS</span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Browse Minister Lilian Nneji&rsquo;s official song catalogue. Play any release right here on the page, and sing along with the lyrics as they are published.
          </p>

          {/* Search & Category Filter Controls */}
          <div className="pt-6 max-w-3xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by song title, release, or words inside the lyrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-950/90 border border-zinc-800 rounded-none text-sm text-ink placeholder:text-zinc-500 focus:outline-none focus:border-[#F88E14] shadow-xl"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#F88E14] text-on-gold shadow-md scale-105 font-bold"
                        : "bg-zinc-900 text-zinc-400 hover:text-ink hover:bg-zinc-800 border border-zinc-800/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TWO-COLUMN LYRICS VIEWER                                     */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
              <div className="lg:col-span-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-900 rounded" />
                ))}
              </div>
              <div className="lg:col-span-8 h-96 bg-zinc-900 rounded" />
            </div>
          ) : filteredSongs.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 rounded-xl border border-zinc-900 p-8 space-y-3">
              <Music className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-xl font-bold font-fjalla uppercase text-zinc-300">
                No Song Found
              </h3>
              <p className="text-sm text-zinc-500">
                Try searching for another word or clearing your filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="gold-button px-6 py-2.5 rounded-none text-xs uppercase tracking-wider"
              >
                Reset Search
              </button>
            </div>
          ) : (
            // On desktop the viewer fills the screen and each column scrolls on its own
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] gap-8 items-start lg:items-stretch lg:h-[calc(100svh-7rem)] lg:min-h-[560px]">

              {/* Left Column: Song List (Desktop / Mobile) */}
              <div className="lg:col-span-4 flex flex-col gap-2.5 lg:min-h-0">
                <div className="flex items-center justify-between px-1 pb-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                    Songs Catalog ({filteredSongs.length})
                  </span>
                  <span className="text-[11px] text-zinc-500">Select to view</span>
                </div>

                <div className="space-y-2 max-h-[420px] lg:max-h-none lg:flex-1 lg:min-h-0 overflow-y-auto overscroll-contain pr-1">
                  {filteredSongs.map((song) => {
                    const isSelected = selectedSong?.id === song.id;
                    return (
                      <div
                        key={song.id}
                        onClick={() => selectSong(song.id)}
                        className={`p-4 rounded-none cursor-pointer transition-all duration-200 border text-left ${
                          isSelected
                            ? "bg-zinc-900 border-[#F88E14] shadow-lg translate-x-1"
                            : "bg-zinc-950/80 hover:bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <h4
                              className={`font-fjalla text-base sm:text-lg uppercase tracking-wide font-bold transition-colors ${
                                isSelected ? "text-gold" : "text-ink"
                              }`}
                            >
                              {song.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                              <span className="truncate">{song.album}</span>
                              <span>•</span>
                              <span>{song.releaseYear}</span>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                              isSelected
                                ? "bg-[#F88E14] text-on-gold"
                                : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            {song.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Lyrics Display */}
              <div
                ref={lyricsPaneRef}
                onWheel={markUserScroll}
                onTouchMove={markUserScroll}
                className="lg:col-span-8 bg-zinc-950 border border-zinc-800/90 rounded-none shadow-2xl relative lg:h-full lg:overflow-y-auto lg:overflow-x-hidden overscroll-contain"
              >
                {selectedSong ? (
                  <div className="space-y-8 relative z-10 p-6 sm:p-10">
                    
                    {/* Header Details */}
                    <div className="border-b border-zinc-800/80 pb-6 flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-[#F88E14]/15 border border-[#F88E14]/30 text-gold text-xs font-bold uppercase tracking-wider">
                            {selectedSong.category}
                          </span>
                          <span className="text-xs text-zinc-400 font-medium">
                            Released: {selectedSong.releaseYear}
                          </span>
                        </div>
                        <h2 className="font-fjalla text-3xl sm:text-5xl font-bold text-ink uppercase tracking-tight">
                          {selectedSong.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                          Written & Performed by <strong className="text-ink">Minister Lilian Nneji</strong> • Release: <strong className="text-zinc-300">{selectedSong.album}</strong>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                        {/* Live highlight switch, for songs that have been synced */}
                        {cues && (
                          <button
                            onClick={toggleFollowAlong}
                            aria-pressed={followAlong}
                            title={followAlong ? "Turn off live lyric highlighting" : "Highlight each line as it is sung"}
                            className={`flex items-center gap-2 px-4 py-2.5 border text-xs uppercase font-bold tracking-wider rounded-none transition-colors shadow cursor-pointer ${
                              followAlong
                                ? "bg-[#F88E14]/15 border-[#F88E14]/50 text-gold"
                                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-ink"
                            }`}
                          >
                            <Highlighter className="w-4 h-4" />
                            <span>Highlight {followAlong ? "On" : "Off"}</span>
                          </button>
                        )}

                        {/* Copy Lyrics Button */}
                        {hasLyrics && (
                          <button
                            onClick={handleCopyLyrics}
                            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs uppercase font-bold tracking-wider rounded-none text-zinc-200 transition-colors shadow cursor-pointer"
                          >
                            <Copy className="w-4 h-4 text-gold" />
                            <span>Copy Lyrics</span>
                          </button>
                        )}

                        {/* Play the song right here, alongside the lyrics */}
                        {videoId && (
                          <button
                            onClick={() => setNowPlayingId(isPlaying ? null : selectedSong.id)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#F88E14] hover:bg-[#F9650B] text-on-gold text-xs uppercase font-bold tracking-wider rounded-none transition-colors shadow cursor-pointer"
                          >
                            {isPlaying ? (
                              <>
                                <X className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Close Player</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-black" />
                                <span className="hidden sm:inline">Play Song</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline player: sticks to the top so the song keeps
                        playing while the lyrics are scrolled. */}
                    {isPlaying && videoId && (
                      <div
                        ref={stickyPlayerRef}
                        className="sticky top-24 lg:top-0 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 pt-3 pb-4 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80"
                      >
                        <div className="relative w-full lg:max-w-[62vh] lg:mx-auto aspect-video bg-black border border-zinc-800 shadow-2xl">
                          <YouTubePlayer
                            ref={playerRef}
                            videoId={videoId}
                            title={`${selectedSong.title} by Minister Lilian Nneji`}
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3 pt-2.5">
                          <p className="text-[11px] uppercase tracking-widest font-bold text-gold">
                            Now Playing
                            {highlighting && (
                              <span className="ml-2 normal-case tracking-normal font-medium text-zinc-500">
                                · Lyrics follow along. Tap a line to jump to it.
                              </span>
                            )}
                          </p>
                          <a
                            href={selectedSong.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-ink transition-colors"
                          >
                            Open on YouTube
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Formatted Lyrics Body */}
                    {hasLyrics ? (
                      <div className="font-normal leading-relaxed text-sm sm:text-base select-text">
                        {lines.map((line, i) => {
                          const canJump = highlighting && cuedLines.has(i);
                          return (
                            <p
                              key={i}
                              ref={(el) => (lineRefs.current[i] = el)}
                              onClick={canJump ? () => jumpToLine(i) : undefined}
                              className={`whitespace-pre-line -mx-3 px-3 py-0.5 transition-colors duration-300 ${
                                i === activeLine
                                  ? "bg-[#F88E14]/15 text-gold"
                                  : highlighting
                                    ? "text-zinc-500"
                                    : "text-zinc-200"
                              } ${canJump ? "cursor-pointer hover:text-ink" : ""}`}
                            >
                              {line || "\u00A0"}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 px-6 text-center space-y-4 border border-dashed border-zinc-800 bg-zinc-900/30">
                        <Music className="w-9 h-9 text-zinc-600 mx-auto" />
                        <div className="space-y-1.5">
                          <h3 className="font-fjalla text-lg uppercase tracking-wide text-zinc-300 font-bold">
                            Lyrics Coming Soon
                          </h3>
                          <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                            The written lyrics for this song have not been published yet. Play the official
                            recording below and worship along in the meantime.
                          </p>
                        </div>
                        {videoId && !isPlaying && (
                          <button
                            onClick={() => setNowPlayingId(selectedSong.id)}
                            className="gold-button inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            Play Song
                          </button>
                        )}
                      </div>
                    )}

                    {/* Ministry Copyright Banner */}
                    <div className="pt-8 border-t border-zinc-900 text-xs text-zinc-500 text-center">
                      &copy; {selectedSong.releaseYear} Minister Lilian Nneji Ministries. All rights reserved. For live performance licenses and sheet music enquiries, contact <a href="mailto:Lilianamadi@yahoo.com" className="text-gold hover:underline">Lilianamadi@yahoo.com</a>.
                    </div>

                  </div>
                ) : (
                  <div className="py-20 text-center text-zinc-500">
                    Select a song from the list to read its lyrics.
                  </div>
                )}
              </div>

            </div>
          )}
        </section>

      </main>

      <Toast open={Boolean(toast)} message={toast?.message} onClose={closeToast} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
