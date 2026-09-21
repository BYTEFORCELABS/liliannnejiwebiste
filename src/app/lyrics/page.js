"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { Music, Search, Copy, Play, X, ExternalLink } from "lucide-react";

const CATEGORIES = [
  "All",
  "High Praise",
  "Prophetic Worship",
  "Afro-Gospel",
  "Thanksgiving"
];

function youTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function LyricsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [toast, setToast] = useState(null);
  const [nowPlayingId, setNowPlayingId] = useState(null);

  const closeToast = useCallback(() => setToast(null), []);

  const selectSong = (id) => {
    setSelectedSongId(id);
    setNowPlayingId(null);
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
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-[#F88E14] selection:text-black">
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

          <h1 className="font-fjalla text-4xl sm:text-6xl lg:text-7xl uppercase text-white font-bold tracking-tight">
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
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-950/90 border border-zinc-800 rounded-none text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F88E14] shadow-xl"
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
                        ? "bg-[#F88E14] text-black shadow-md scale-105 font-bold"
                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Song List (Desktop / Mobile) */}
              <div className="lg:col-span-4 space-y-2.5">
                <div className="flex items-center justify-between px-1 pb-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                    Songs Catalog ({filteredSongs.length})
                  </span>
                  <span className="text-[11px] text-zinc-500">Select to view</span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
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
                                isSelected ? "text-[#F88E14]" : "text-white"
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
                                ? "bg-[#F88E14] text-black"
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
              <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800/90 rounded-none p-6 sm:p-10 shadow-2xl relative">
                {selectedSong ? (
                  <div className="space-y-8 relative z-10">
                    
                    {/* Header Details */}
                    <div className="border-b border-zinc-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-[#F88E14]/15 border border-[#F88E14]/30 text-[#F88E14] text-xs font-bold uppercase tracking-wider">
                            {selectedSong.category}
                          </span>
                          <span className="text-xs text-zinc-400 font-medium">
                            Released: {selectedSong.releaseYear}
                          </span>
                        </div>
                        <h2 className="font-fjalla text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                          {selectedSong.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                          Written & Performed by <strong className="text-white">Minister Lilian Nneji</strong> • Release: <strong className="text-zinc-300">{selectedSong.album}</strong>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Copy Lyrics Button */}
                        {hasLyrics && (
                          <button
                            onClick={handleCopyLyrics}
                            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs uppercase font-bold tracking-wider rounded-none text-zinc-200 transition-colors shadow cursor-pointer"
                          >
                            <Copy className="w-4 h-4 text-[#F88E14]" />
                            <span>Copy Lyrics</span>
                          </button>
                        )}

                        {/* Play the song right here, alongside the lyrics */}
                        {videoId && (
                          <button
                            onClick={() => setNowPlayingId(isPlaying ? null : selectedSong.id)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#F88E14] hover:bg-[#F9650B] text-black text-xs uppercase font-bold tracking-wider rounded-none transition-colors shadow cursor-pointer"
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
                      <div className="sticky top-24 z-20 -mx-6 sm:-mx-10 px-6 sm:px-10 pb-4 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80">
                        <div className="relative w-full aspect-video bg-black border border-zinc-800 shadow-2xl">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={`${selectedSong.title} by Minister Lilian Nneji`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3 pt-2.5">
                          <p className="text-[11px] uppercase tracking-widest font-bold text-[#F88E14]">
                            Now Playing
                          </p>
                          <a
                            href={selectedSong.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors"
                          >
                            Open on YouTube
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Formatted Lyrics Body */}
                    {hasLyrics ? (
                      <div className="space-y-6 text-zinc-200 font-normal leading-relaxed text-sm sm:text-base whitespace-pre-line select-text">
                        {selectedSong.lyrics}
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
                      &copy; {selectedSong.releaseYear} Minister Lilian Nneji Ministries. All rights reserved. For live performance licenses and sheet music enquiries, contact <a href="mailto:bookings@liliannneji.com" className="text-[#F88E14] hover:underline">bookings@liliannneji.com</a>.
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
