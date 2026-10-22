"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, Undo2, RotateCcw, Play, Pause, Rewind, Check, Keyboard } from "lucide-react";
import YouTubePlayer, { usePlayerTime, youTubeId } from "@/components/YouTubePlayer";
import { lyricLines, hasValidTimings, activeLineAt, sortCues, formatTime } from "@/lib/lyricsSync";

// Next line with words on it, from `from` onward (-1 when none are left)
function nextLyricLine(lines, from) {
  for (let i = Math.max(0, from); i < lines.length; i++) {
    if (lines[i].trim()) return i;
  }
  return -1;
}

// Admin tool for timing each lyric line against the song's YouTube video,
// which drives the live highlighting on the public lyrics page.
export default function LyricsSyncModal({ song, onClose, onSaved }) {
  const lines = useMemo(() => lyricLines(song.lyrics), [song.lyrics]);
  const videoId = youTubeId(song.youtubeUrl);
  const hadStaleTimings = Boolean(song.lyricTimings?.cues?.length) && !hasValidTimings(song);

  // Marks are kept in the order they were made, so Undo removes the latest
  const [marks, setMarks] = useState(() => (hasValidTimings(song) ? sortCues(song.lyricTimings.cues) : []));
  const [cursor, setCursor] = useState(() => {
    const last = marks.at(-1);
    return nextLyricLine(lines, last ? last.line + 1 : 0);
  });
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const playerRef = useRef(null);
  const listRef = useRef(null);
  const lineRefs = useRef([]);

  const time = usePlayerTime(playerRef, ready, 100);
  const sorted = useMemo(() => sortCues(marks), [marks]);
  const activeLine = activeLineAt(sorted, time);
  const timedCount = useMemo(() => new Set(marks.map((m) => m.line)).size, [marks]);
  const lyricCount = useMemo(() => lines.filter((l) => l.trim()).length, [lines]);

  // The player's own state can change from inside the video, so poll it
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setPlaying(Boolean(playerRef.current?.isPlaying())), 250);
    return () => clearInterval(id);
  }, [ready]);

  const markLine = useCallback(
    (index) => {
      if (index < 0 || !playerRef.current?.isReady()) return;
      const at = Math.round(playerRef.current.getCurrentTime() * 10) / 10;
      setMarks((current) => [...current, { line: index, time: at }]);
      setCursor(nextLyricLine(lines, index + 1));
      setDirty(true);
    },
    [lines]
  );

  const undo = () => {
    const last = marks.at(-1);
    if (!last) return;
    setMarks(marks.slice(0, -1));
    setCursor(last.line);
    setDirty(true);
  };

  const clearAll = () => {
    if (marks.length && !confirm("Remove every timing for this song and start again?")) return;
    setMarks([]);
    setCursor(nextLyricLine(lines, 0));
    setDirty(true);
    playerRef.current?.seekTo(0);
  };

  const removeMark = (mark) => {
    setMarks(marks.filter((m) => m !== mark));
    setDirty(true);
  };

  const togglePlay = () => {
    if (playerRef.current?.isPlaying()) playerRef.current.pause();
    else playerRef.current?.play();
  };

  const rewind = () => {
    playerRef.current?.seekTo(Math.max(0, playerRef.current.getCurrentTime() - 5));
  };

  const close = () => {
    if (dirty && !confirm("You have unsaved timings. Close without saving?")) return;
    onClose();
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/lyrics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: song.id,
          lyricTimings: marks.length ? { lineCount: lines.length, cues: sorted } : null,
        }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const data = await res.json();
      setDirty(false);
      onSaved(data.item);
    } catch (err) {
      console.error("Failed to save lyric timings:", err);
      alert(
        "Couldn't save the timings. If this is the first sync, the database needs the lyricTimings column: run supabase/schema.sql in the Supabase SQL Editor, then try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Space marks the next line. Typing in a field is left alone.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code !== "Space" || e.target.closest?.("input, textarea, select")) return;
      e.preventDefault();
      markLine(cursor);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cursor, markLine]);

  // Keep the next line to mark in the middle of the list
  useEffect(() => {
    const list = listRef.current;
    const line = lineRefs.current[cursor];
    if (!list || !line) return;
    list.scrollTo({ top: line.offsetTop - list.clientHeight / 2, behavior: "smooth" });
  }, [cursor]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // Buttons must not take focus, or Space would press them instead of marking a line
        if (e.target.closest("button")) e.preventDefault();
      }}
    >
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-6 py-4 flex-shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold">Sync lyrics to video</span>
            <h3 className="text-lg font-medium text-zinc-100">{song.title}</h3>
          </div>
          <button onClick={close} className="text-zinc-500 hover:text-ink cursor-pointer" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Player and controls */}
          <div className="space-y-4 lg:overflow-y-auto">
            <div className="relative w-full aspect-video bg-black border border-zinc-800">
              {videoId ? (
                <YouTubePlayer
                  ref={playerRef}
                  videoId={videoId}
                  autoplay={false}
                  title={`${song.title} video`}
                  onReady={() => setReady(true)}
                />
              ) : (
                <p className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 p-6 text-center">
                  Add a YouTube link to this song first.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={togglePlay}
                disabled={!ready}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-ink rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                onClick={rewind}
                disabled={!ready}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-ink rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                <Rewind className="w-3.5 h-3.5" />
                5s
              </button>
              <span className="font-mono text-sm text-zinc-300 tabular-nums px-2">
                {ready ? formatTime(time) : "Loading player…"}
              </span>
              <div className="flex-1" />
              <button
                onClick={undo}
                disabled={!marks.length}
                className="flex items-center gap-1.5 px-3 py-2 text-zinc-400 hover:text-ink text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Undo
              </button>
              <button
                onClick={clearAll}
                disabled={!marks.length}
                className="flex items-center gap-1.5 px-3 py-2 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start over
              </button>
            </div>

            <button
              onClick={() => markLine(cursor)}
              disabled={!ready || cursor < 0}
              className="w-full text-left px-4 py-3.5 bg-[#F88E14] hover:bg-[#F9650B] text-on-gold rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <Keyboard className="w-4 h-4" />
                Mark line now (Space)
              </span>
              <span className="block mt-1 text-sm truncate">
                {cursor >= 0 ? lines[cursor] : "All lines marked. Click a line in the list to mark a repeat."}
              </span>
            </button>

            {hadStaleTimings && (
              <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-md px-3 py-2">
                Lines were added or removed since this song was last synced, so the old timings no longer line up and
                have been cleared. Sync it again and save.
              </p>
            )}

            <ol className="text-xs text-zinc-400 leading-relaxed list-decimal pl-4 space-y-1">
              <li>Press <strong className="text-zinc-200">Play</strong> above (use these buttons, not the ones inside the video, so Space keeps working).</li>
              <li>Each time a new line starts being sung, press <strong className="text-zinc-200">Space</strong> or the orange button.</li>
              <li>When a part is sung again (a repeated chorus), click that line in the list as it starts.</li>
              <li>Mistake? Use <strong className="text-zinc-200">Undo</strong>, <strong className="text-zinc-200">5s</strong> back, or the × on a time. Then <strong className="text-zinc-200">Save</strong>.</li>
            </ol>
          </div>

          {/* Lyric lines */}
          <div ref={listRef} className="relative lg:overflow-y-auto lg:min-h-0 border border-zinc-800 rounded-lg p-2">
            {lines.map((line, i) => {
              if (!line.trim()) return <div key={i} className="h-3" />;
              const lineMarks = marks.filter((m) => m.line === i);
              return (
                <div
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className={`group flex items-start gap-3 px-3 py-1.5 rounded-md border transition-colors ${
                    i === activeLine
                      ? "bg-[#F88E14]/15 border-[#F88E14]/40"
                      : i === cursor
                        ? "border-zinc-600 bg-zinc-900"
                        : "border-transparent hover:bg-zinc-900/60"
                  }`}
                >
                  <button
                    onClick={() => markLine(i)}
                    disabled={!ready}
                    title="Mark this line at the current time"
                    className={`flex-1 text-left text-sm cursor-pointer disabled:cursor-default ${
                      i === activeLine ? "text-gold" : lineMarks.length ? "text-zinc-200" : "text-zinc-500"
                    }`}
                  >
                    {i === cursor && <span className="mr-2 text-[10px] font-bold uppercase text-gold">Next</span>}
                    {line}
                  </button>
                  <div className="flex flex-wrap justify-end gap-1 flex-shrink-0 max-w-[45%]">
                    {lineMarks.map((m) => (
                      <span
                        key={`${m.time}-${marks.indexOf(m)}`}
                        className="inline-flex items-center gap-1 pl-1.5 pr-0.5 py-0.5 bg-zinc-800 text-zinc-300 rounded text-[10px] font-mono tabular-nums"
                      >
                        <button
                          onClick={() => playerRef.current?.seekTo(Math.max(0, m.time - 2))}
                          title="Play from just before this time"
                          className="hover:text-gold cursor-pointer"
                        >
                          {formatTime(m.time)}
                        </button>
                        <button
                          onClick={() => removeMark(m)}
                          title="Remove this time"
                          className="text-zinc-500 hover:text-red-400 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-zinc-800 px-6 py-4 flex-shrink-0">
          <span className="text-xs text-zinc-400">
            {timedCount} of {lyricCount} lines timed
            {marks.length > timedCount && ` · ${marks.length - timedCount} repeats`}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={close}
              className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-ink rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-on-gold rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              {saving ? "Saving…" : "Save timings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
