"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";

// Platform Icon Components matching Screenshot 2
function SpotifyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function YouTubeMusicIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm-2.064-10.44v6.672L15.6 12l-5.664-3.336z" />
    </svg>
  );
}

function DeezerIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.8 8.8h4.4v2.4H18.8zM18.8 12.8h4.4v2.4H18.8zM18.8 16.8h4.4v2.4H18.8zM12.6 12.8H17v2.4h-4.4zM12.6 16.8H17v2.4h-4.4zM6.3 16.8h4.4v2.4H6.3zM0 16.8h4.4v2.4H0z" />
    </svg>
  );
}

function AppleMusicIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-.91.04-2.02.61-2.67 1.38-.58.67-1.08 1.76-.95 2.81 1.02.08 2.06-.5 2.68-1.27z" />
    </svg>
  );
}

function SoundcloudIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.16 11.23c-.08 0-.16.08-.16.16v4.35c0 .08.08.16.16.16s.16-.08.16-.16v-4.35c0-.08-.08-.16-.16-.16zm1.16-1.31c-.08 0-.16.08-.16.16v6.97c0 .08.08.16.16.16s.16-.08.16-.16V10.08c0-.08-.08-.16-.16-.16zm1.16-1.16c-.08 0-.16.08-.16.16v9.29c0 .08.08.16.16.16s.16-.08.16-.16V8.92c0-.08-.08-.16-.16-.16zm1.16-.58c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.34c0-.08-.08-.16-.16-.16zm1.16-.15c-.08 0-.16.08-.16.16v10.74c0 .08.08.16.16.16s.16-.08.16-.16V8.35c0-.08-.08-.16-.16-.16zm1.16.15c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.5c0-.08-.08-.16-.16-.16zm1.16.43c-.08 0-.16.08-.16.16v9.58c0 .08.08.16.16.16s.16-.08.16-.16V9.09c0-.08-.08-.16-.16-.16zm1.16.58c-.08 0-.16.08-.16.16v8.42c0 .08.08.16.16.16s.16-.08.16-.16V9.83c0-.08-.08-.16-.16-.16zm1.16.87c-.08 0-.16.08-.16.16v6.68c0 .08.08.16.16.16s.16-.08.16-.16v-6.68c0-.08-.08-.16-.16-.16zm2.32-4.06c-.44 0-.85.14-1.2.37v9.84c.35.23.76.37 1.2.37 1.28 0 2.32-1.04 2.32-2.32 0-.25-.04-.49-.12-.72 1.4-.29 2.44-1.53 2.44-3.02 0-1.71-1.38-3.09-3.09-3.09-.43 0-.83.09-1.19.25-.09-.94-.88-1.68-1.84-1.68-.08 0-.16 0-.24.01z" />
    </svg>
  );
}

function BoomplayIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
    </svg>
  );
}

function AudiomackIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v18l7-9-7-9zm-2 4v10l-4-5 4-5zm-6 2v6l-2-3 2-3z" />
    </svg>
  );
}

// Iconic YouTube Red Play Button matching Screenshots 2 & 3
function YouTubePlayBadge() {
  return (
    <div className="w-14 h-9 sm:w-16 sm:h-11 rounded-xl bg-[#ff0000] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#cc0000] transition-transform duration-300">
      <div className="w-0 h-0 border-y-[6px] sm:border-y-[7px] border-y-transparent border-l-[11px] sm:border-l-[13px] border-l-white ml-0.5" />
    </div>
  );
}

export default function MusicSection() {
  const [activeVideoId, setActiveVideoId] = useState("DzjflH8peQY");
  const [activeVideoTitle, setActiveVideoTitle] = useState(
    "Minister Lilian Nneji - Eze Mu O (Official Video)"
  );

  // Streaming Platforms List matching Screenshot 2
  const streamingPlatforms = [
    {
      name: "Spotify",
      icon: SpotifyIcon,
      url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa",
    },
    {
      name: "YouTube Music",
      icon: YouTubeMusicIcon,
      url: "https://music.youtube.com/channel/UC-liliannneji",
    },
    {
      name: "Deezer",
      icon: DeezerIcon,
      url: "https://www.deezer.com/artist/liliannneji",
    },
    {
      name: "Apple Music",
      icon: AppleMusicIcon,
      url: "https://music.apple.com/artist/lilian-nneji",
    },
    {
      name: "Soundcloud",
      icon: SoundcloudIcon,
      url: "https://soundcloud.com/lilian-nneji",
    },
    {
      name: "Boomplay",
      icon: BoomplayIcon,
      url: "https://www.boomplay.com/artists/liliannneji",
    },
    {
      name: "Audiomack",
      icon: AudiomackIcon,
      url: "https://audiomack.com/lilian-nneji",
    },
  ];

  // Music Videos Grid (4 Cards) matching Screenshot 2
  const musicVideos = [
    {
      id: "DzjflH8peQY",
      title: "LILIAN || EZE MU O || Official Video",
      thumbnail: "/images/yt_DzjflH8peQY.jpg",
    },
    {
      id: "nLITWXwcUNQ",
      title: "Elohim - Lilian Nneji (Official Video)",
      thumbnail: "/images/yt_nLITWXwcUNQ.jpg",
    },
    {
      id: "J_02EibFwd0",
      title: "LILIAN NNEJI: Jesus nke Nazareth (OFFICIAL VIDEO)",
      thumbnail: "/images/yt_J_02EibFwd0.jpg",
    },
    {
      id: "XM6WId4nVAc",
      title: "Lilian Nneji - Mercy (Official Video)",
      thumbnail: "/images/yt_XM6WId4nVAc.jpg",
    },
  ];

  // Live Performances Grid (4 Cards) matching Screenshot 3
  const livePerformances = [
    {
      id: "otD1sbxmPy0",
      title: "Lilian Nneji - Praise Session at The New Church",
      thumbnail: "/images/yt_otD1sbxmPy0.jpg",
    },
    {
      id: "t8e-A6wr9c8",
      title: "Chioma Jesus X Lilian Nneji - Powerful Praise Collaboration",
      thumbnail: "/images/yt_t8e-A6wr9c8.jpg",
    },
    {
      id: "kDhzekV8JKA",
      title: "Lilian Nneji - Energetic Praise Session at Debbysax Live",
      thumbnail: "/images/yt_kDhzekV8JKA.jpg",
    },
    {
      id: "BOzft-lf2jM",
      title: "Lilian Nneji - Powerful Ministration at PSF RCCG Convention",
      thumbnail: "/images/yt_BOzft-lf2jM.jpg",
    },
  ];

  const handleSelectVideo = (video) => {
    setActiveVideoId(video.id);
    setActiveVideoTitle(video.title);
    // Smoothly scroll up to the player
    const playerEl = document.getElementById("latest-release-player");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="music" className="bg-black py-20 text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============================================================ */}
        {/* 1. LATEST RELEASE (Screenshot 1 & 2)                         */}
        {/* ============================================================ */}
        <div className="text-center space-y-2 mb-10">
          <h2 className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] uppercase tracking-wide font-bold">
            LATEST RELEASE
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-normal tracking-wide">
            Enjoy the latest groove from Minister Lilian Nneji
          </p>
        </div>

        {/* Big YouTube Video Player Container matching Screenshot 1 */}
        <div id="latest-release-player" className="max-w-5xl mx-auto mb-8">
          <div className="relative w-full aspect-video rounded-none sm:rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
              title={activeVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Streaming Platforms Bar matching Screenshot 2 */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center justify-center flex-wrap gap-x-7 sm:gap-x-9 gap-y-3.5 py-4 px-4 text-xs sm:text-sm text-zinc-200">
            {streamingPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#F88E14] transition-colors group"
                >
                  <Icon className="w-4 h-4 text-zinc-300 group-hover:text-[#F88E14] transition-colors flex-shrink-0" />
                  <span className="font-medium">{platform.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MUSIC VIDEOS (Screenshot 2 & 3)                           */}
        {/* ============================================================ */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center mb-10">
            <h3 className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] uppercase tracking-wide font-bold">
              MUSIC VIDEOS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {musicVideos.map((video, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectVideo(video)}
                className="group relative aspect-video rounded-sm overflow-hidden bg-zinc-900 cursor-pointer shadow-lg hover:shadow-2xl border border-zinc-800/80 hover:border-[#F88E14]/50 transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 group-hover:opacity-90 transition-opacity" />

                {/* Top Channel Header matching Screenshot 2 & 3 */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center gap-2 z-10">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/40 flex-shrink-0 bg-zinc-800">
                    <Image
                      src="/images/logo_white_text.png"
                      alt="Minister Lilian Nneji"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs text-white font-medium truncate drop-shadow">
                    {video.title}
                  </span>
                </div>

                {/* Red YouTube Play Button Centered */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <YouTubePlayBadge />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. LIVE PERFORMANCES (Screenshot 3)                          */}
        {/* ============================================================ */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] uppercase tracking-wide font-bold">
              LIVE PERFORMANCES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {livePerformances.map((video, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectVideo(video)}
                className="group relative aspect-video rounded-sm overflow-hidden bg-zinc-900 cursor-pointer shadow-lg hover:shadow-2xl border border-zinc-800/80 hover:border-[#F88E14]/50 transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 group-hover:opacity-90 transition-opacity" />

                {/* Top Channel Header matching Screenshot 3 */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center gap-2 z-10">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/40 flex-shrink-0 bg-zinc-800">
                    <Image
                      src="/images/logo_white_text.png"
                      alt="Minister Lilian Nneji"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs text-white font-medium truncate drop-shadow">
                    {video.title}
                  </span>
                </div>

                {/* Red YouTube Play Button Centered */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <YouTubePlayBadge />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
