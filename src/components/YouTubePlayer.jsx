"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";

export function youTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// The IFrame API is what lets us read the playback time for lyric sync.
let apiPromise;
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("YouTube player API failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

// `ref` exposes getCurrentTime(), seekTo(seconds), play(), pause(),
// isPlaying() and isReady(); `onReady` fires once those work. If the API
// is blocked (e.g. by an ad blocker) it falls back to a plain embed, which
// plays fine but cannot report its time.
export default function YouTubePlayer({ videoId, title, autoplay = true, onReady, ref, className = "" }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const onReadyRef = useRef(onReady);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useImperativeHandle(
    ref,
    () => ({
      getCurrentTime: () => playerRef.current?.getCurrentTime?.() ?? 0,
      seekTo: (seconds) => {
        playerRef.current?.seekTo?.(seconds, true);
        playerRef.current?.playVideo?.();
      },
      play: () => playerRef.current?.playVideo?.(),
      pause: () => playerRef.current?.pauseVideo?.(),
      isPlaying: () => playerRef.current?.getPlayerState?.() === window.YT?.PlayerState?.PLAYING,
      isReady: () => Boolean(playerRef.current),
    }),
    []
  );

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let player;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !host) return;
        // YT.Player replaces the element it is given, so give it one React doesn't own
        const target = document.createElement("div");
        host.appendChild(target);
        player = new YT.Player(target, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: { autoplay: autoplay ? 1 : 0, rel: 0, modestbranding: 1, playsinline: 1 },
          events: {
            onReady: () => {
              if (cancelled) return;
              playerRef.current = player;
              onReadyRef.current?.();
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      playerRef.current = null;
      player?.destroy?.();
      if (host) host.innerHTML = "";
    };
  }, [videoId, autoplay]);

  if (failed) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`absolute inset-0 w-full h-full ${className}`}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      title={title}
      className={`absolute inset-0 [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full ${className}`}
    />
  );
}

// Polls the player's current time while `active`.
export function usePlayerTime(playerRef, active, intervalMs = 200) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (playerRef.current?.isReady()) setTime(playerRef.current.getCurrentTime());
    }, intervalMs);
    return () => clearInterval(id);
  }, [playerRef, active, intervalMs]);

  return time;
}
