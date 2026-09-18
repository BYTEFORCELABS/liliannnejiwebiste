"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Sparkles, X } from "lucide-react";
import { YouTubeIcon } from "@/components/SocialIcons";

export default function VideoSection() {
  const [activeVideoId, setActiveVideoId] = useState("DzjflH8peQY");
  const [modalOpen, setModalOpen] = useState(false);

  const videos = [
    {
      id: "DzjflH8peQY",
      title: "Eze Mu O (Official Music Video)",
      category: "Official Video",
      duration: "5:24",
      views: "1.2M+ Views",
      thumbnail: "/images/album_eze_mu_o.jpg",
      description: "The grand official visual for Eze Mu O, exalting the King of Kings with regal African praise and thanksgiving.",
    },
    {
      id: "DzjflH8peQY", // fallback/highlight
      title: "Onwere Ihe Omere Mù (Live Praise Explosion)",
      category: "Live Ministration",
      duration: "12:45",
      views: "3.5M+ Views",
      thumbnail: "/images/stage_worship.jpg",
      description: "An electrifying praise atmosphere recorded live with thousands lifting their voices and dancing for Jesus.",
    },
    {
      id: "DzjflH8peQY",
      title: "Praise Vibes Medley (Live in Concert)",
      category: "Praise Medley",
      duration: "18:20",
      views: "2.1M+ Views",
      thumbnail: "/images/album_praise_vibes.jpg",
      description: "High-octane praise medley showcasing traditional African percussion, victory shouts, and prophetic declarations.",
    },
    {
      id: "DzjflH8peQY",
      title: "Deep Prophetic Worship Session (RCCG Convention)",
      category: "Worship Encounter",
      duration: "25:10",
      views: "1.8M+ Views",
      thumbnail: "/images/hero_portrait.jpg",
      description: "Intimate worship and intercessory prayer atmosphere ushered in by Minister Lilian Nneji before thousands.",
    },
  ];

  const handleOpenVideo = (id) => {
    setActiveVideoId(id);
    setModalOpen(true);
  };

  return (
    <section id="videos" className="relative py-24 bg-[#070709] overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#F88E14]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-gold">
              <YouTubeIcon className="w-3.5 h-3.5 text-[#ff4b4b]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#FABA1E]">
                Visual Ministrations
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-black uppercase text-white tracking-tight">
              Watch & <span className="text-gold-gradient">Experience</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Witness live concert moments, spirit-filled worship encounters, and official video releases from Minister Lilian Nneji.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@LilianNneji?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-button px-6 py-3 rounded-full text-xs uppercase tracking-wider font-extrabold flex items-center gap-2.5 self-start md:self-auto"
          >
            <YouTubeIcon className="w-4 h-4 text-black" />
            <span>Subscribe on YouTube</span>
          </a>
        </div>

        {/* Featured Video Player (Main Spotlight) */}
        <div className="glass-panel-gold rounded-3xl p-4 sm:p-6 mb-12 shadow-2xl">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
              title="Minister Lilian Nneji Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
            <div>
              <span className="text-xs font-bold uppercase text-[#FABA1E] tracking-wider">Featured Ministration</span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">Eze Mu O (Official Video) - Minister Lilian Nneji</h3>
            </div>
            <a
              href="https://www.youtube.com/watch?v=DzjflH8peQY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-300 hover:text-[#FABA1E] transition-colors flex items-center gap-1.5"
            >
              <span>Watch on YouTube App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenVideo(vid.id)}
              className="glass-panel rounded-2xl p-4 space-y-3 cursor-pointer group hover:border-[rgba(248,142,20,0.45)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#F88E14]/90 backdrop-blur-md flex items-center justify-center text-black group-hover:scale-110 shadow-lg transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white">
                  {vid.duration}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400">
                  <span className="uppercase text-[#FABA1E]">{vid.category}</span>
                  <span>{vid.views}</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#FABA1E] transition-colors tracking-wide">
                  {vid.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                  {vid.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-[#F88E14]/40 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-[#FABA1E] transition-colors"
              aria-label="Close video modal"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
