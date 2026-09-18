"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Maximize2,
  ExternalLink,
  Award
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Live Concerts",
  "The Reverb",
  "Studio & Portraits",
  "Award Moments"
];

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  // Filtered items based on selected category
  const filteredItems = items.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-[#F88E14] selection:text-black">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-20">
        
        {/* ============================================================ */}
        {/* HERO HEADER SECTION                                         */}
        {/* ============================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto text-center space-y-5 overflow-hidden">
          {/* Ambient Gold Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F88E14]/10 blur-[140px] pointer-events-none rounded-full" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F88E14]/10 border border-[#F88E14]/30 text-[#F88E14] text-xs uppercase font-bold tracking-widest">
            <Camera className="w-3.5 h-3.5 text-[#F88E14]" />
            <span>Visual Archive & Ministry Moments</span>
          </div>

          <h1 className="font-fjalla text-4xl sm:text-6xl lg:text-7xl uppercase text-white font-bold tracking-tight">
            MOMENTS OF <span className="text-gold-gradient">GLORY & PRAISE</span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Step into the visual journey of Minister Lilian Nneji. From electrifying praise concerts and intimate worship encounters to award celebrations and the annual Reverb gathering.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-none transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#F88E14] text-black shadow-lg scale-105 font-bold"
                      : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* GALLERY GRID SECTION                                         */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-zinc-900 rounded-lg" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-zinc-950 rounded-2xl border border-zinc-900 p-8 space-y-4">
              <Camera className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-xl font-bold font-fjalla uppercase text-zinc-300">
                No Photos Found in this Category
              </h3>
              <p className="text-sm text-zinc-500">
                Switch back to "All" or check back shortly for new uploads.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="gold-button px-6 py-2.5 rounded-none text-xs uppercase tracking-wider"
              >
                View All Photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative aspect-[4/3] sm:aspect-[16/11] rounded-none overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-[#F88E14]/60 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Photo */}
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Category Pill Tag (Top-left) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#FABA1E]">
                      {item.category}
                    </span>
                  </div>

                  {/* Expand Zoom Icon (Top-right) */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#F88E14]" />
                  </div>

                  {/* Caption & Title (Bottom) */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-fjalla text-lg sm:text-xl font-bold text-white uppercase tracking-wide line-clamp-1 group-hover:text-[#F88E14] transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-zinc-300 line-clamp-2 font-normal leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                    {item.date && (
                      <div className="flex items-center gap-1.5 pt-1 text-[11px] text-zinc-400">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* ============================================================ */}
      {/* FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ============================================================ */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar: Counter & Close */}
          <div
            className="flex items-center justify-between max-w-7xl w-full mx-auto pb-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-zinc-400 bg-zinc-900 px-3 py-1 rounded">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span className="px-2.5 py-1 bg-[#F88E14]/15 border border-[#F88E14]/30 text-[#F88E14] text-[11px] uppercase font-bold tracking-wider rounded">
                {currentItem.category}
              </span>
            </div>

            <button
              onClick={handleCloseLightbox}
              className="p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Middle Stage: Image & Previous / Next Controls */}
          <div
            className="relative flex-grow flex items-center justify-center max-w-6xl w-full mx-auto overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#F88E14] hover:text-black text-white backdrop-blur-md transition-all cursor-pointer shadow-2xl"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displayed Image */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] max-w-5xl">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#F88E14] hover:text-black text-white backdrop-blur-md transition-all cursor-pointer shadow-2xl"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title & Caption */}
          <div
            className="max-w-4xl w-full mx-auto text-center pt-4 z-20 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-fjalla text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              {currentItem.title}
            </h2>
            {currentItem.caption && (
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto font-normal">
                {currentItem.caption}
              </p>
            )}
            {currentItem.date && (
              <p className="text-[11px] text-zinc-500 pt-1">
                Captured on {new Date(currentItem.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
