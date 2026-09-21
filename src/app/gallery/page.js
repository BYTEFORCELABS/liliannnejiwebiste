"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Live Concerts",
  "The Reverb",
  "Praise Team & Band",
  "Portraits",
];

const SPAN_RATIO = {
  wide: "aspect-[3/2]",
  tall: "aspect-[3/4]",
  normal: "aspect-[4/3]",
};

const LIGHTBOX_AUTOPLAY_MS = 4200;

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const thumbRailRef = useRef(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setPlaying(false);
  }, []);

  const step = useCallback(
    (direction) => {
      setLightboxIndex((prev) => {
        if (prev === null || filteredItems.length === 0) return prev;
        return (prev + direction + filteredItems.length) % filteredItems.length;
      });
    },
    [filteredItems.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, closeLightbox, step]);

  // Lock body scroll while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxIndex]);

  // Slideshow autoplay
  useEffect(() => {
    if (!playing || lightboxIndex === null) return;
    const id = setInterval(() => step(1), LIGHTBOX_AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, lightboxIndex, step]);

  // Keep the active thumbnail in view
  useEffect(() => {
    if (lightboxIndex === null) return;
    const rail = thumbRailRef.current;
    const active = rail?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [lightboxIndex]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-[#F88E14] selection:text-black">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">

        {/* ============================================================ */}
        {/* HEADER                                                       */}
        {/* ============================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto text-center space-y-5 overflow-hidden">
          <div className="animate-breathe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F88E14]/10 blur-[140px] pointer-events-none rounded-full" />

          <Reveal as="h1" variant="up" className="font-fjalla text-4xl sm:text-6xl lg:text-7xl uppercase text-white font-bold tracking-tight">
            MOMENTS OF <span className="text-gold-gradient">GLORY &amp; PRAISE</span>
          </Reveal>

          <Reveal as="p" variant="up" delay={140} className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Step into the visual journey of Minister Lilian Nneji. Live praise nights, the annual Reverb
            gathering, the praise team and band, and the moments in between.
          </Reveal>

          <Reveal variant="up" delay={240} className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    closeLightbox();
                  }}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-none transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#F88E14] text-black shadow-lg scale-105 font-bold"
                      : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* MASONRY GRID                                                 */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {["aspect-[3/2]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/2]", "aspect-[3/4]"].map((ratio, i) => (
                <div key={i} className={`${ratio} bg-zinc-900 animate-pulse mb-6 break-inside-avoid`} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 border border-zinc-900 p-8 space-y-4">
              <Camera className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-xl font-bold font-fjalla uppercase text-zinc-300">
                No Photos Found in this Category
              </h3>
              <p className="text-sm text-zinc-500">
                Switch back to &ldquo;All&rdquo; or check back shortly for new uploads.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="gold-button px-6 py-2.5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
              >
                View All Photos
              </button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6">
              {filteredItems.map((item, idx) => (
                <Reveal
                  key={item.id || idx}
                  variant="up"
                  delay={(idx % 3) * 90}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative block w-full mb-5 sm:mb-6 break-inside-avoid overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-[#F88E14]/60 transition-colors duration-500 cursor-pointer shadow-xl"
                >
                  <div className={`relative w-full ${SPAN_RATIO[item.span] || SPAN_RATIO.normal}`}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.07] transition-transform duration-[1100ms] ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent opacity-85 group-hover:opacity-96 transition-opacity duration-500" />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#FABA1E]">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-4 h-4 text-[#F88E14]" />
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-fjalla text-lg sm:text-xl font-bold text-white uppercase tracking-wide line-clamp-1 group-hover:text-[#F88E14] transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ============================================================ */}
      {/* LIGHTBOX SLIDESHOW                                           */}
      {/* ============================================================ */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/96 backdrop-blur-2xl flex flex-col p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between max-w-7xl w-full mx-auto pb-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-zinc-400 bg-zinc-900 px-3 py-1">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
              </span>
              <span className="px-2.5 py-1 bg-[#F88E14]/15 border border-[#F88E14]/30 text-[#F88E14] text-[11px] uppercase font-bold tracking-wider">
                {currentItem.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-black hover:bg-[#F88E14] transition-colors cursor-pointer"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Autoplay progress */}
          {playing && (
            <div className="max-w-7xl w-full mx-auto h-0.5 bg-white/10 mb-3 overflow-hidden">
              <div
                key={lightboxIndex}
                className="slide-progress h-full bg-[#F88E14]"
                style={{ "--slide-duration": `${LIGHTBOX_AUTOPLAY_MS}ms` }}
              />
            </div>
          )}

          {/* Stage */}
          <div
            className="relative flex-grow flex items-center justify-center max-w-6xl w-full mx-auto min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => step(-1)}
              className="absolute left-0 sm:left-2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#F88E14] hover:text-black text-white backdrop-blur-md transition-colors cursor-pointer shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div key={currentItem.id} data-reveal="scale" data-revealed="true" className="relative w-full h-full">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title}
                fill
                sizes="90vw"
                quality={82}
                className="object-contain"
              />
            </div>

            <button
              onClick={() => step(1)}
              className="absolute right-0 sm:right-2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#F88E14] hover:text-black text-white backdrop-blur-md transition-colors cursor-pointer shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption */}
          <div
            className="max-w-4xl w-full mx-auto text-center pt-4 z-20 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-fjalla text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              {currentItem.title}
            </h2>
            {currentItem.caption && (
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto">{currentItem.caption}</p>
            )}
          </div>

          {/* Thumbnail rail */}
          <div
            ref={thumbRailRef}
            className="max-w-5xl w-full mx-auto mt-4 flex gap-2 overflow-x-auto pb-1 z-20 [scrollbar-width:thin]"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.map((item, idx) => {
              const isActive = idx === lightboxIndex;
              return (
                <button
                  key={item.id || idx}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Show ${item.title}`}
                  className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[4/3] overflow-hidden border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-[#F88E14] opacity-100"
                      : "border-transparent opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image src={item.imageUrl} alt={item.title} fill sizes="90px" className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
