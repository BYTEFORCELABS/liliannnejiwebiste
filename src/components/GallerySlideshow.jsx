"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const AUTOPLAY_MS = 5200;

export default function GallerySlideshow({ items = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = items.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setActive(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  const current = items[active];

  return (
    <section id="gallery" className="relative bg-black py-24 sm:py-28 border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-[#F88E14]/[0.06] blur-[130px] pointer-events-none animate-breathe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div className="space-y-3">
            <Reveal as="h2" variant="wipe" className="font-fjalla text-4xl sm:text-6xl lg:text-7xl text-[#F88E14] font-bold uppercase tracking-tight leading-[0.95]">
              Moments of Glory
            </Reveal>
          </div>

          <Reveal variant="up" delay={140}>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#F88E14] transition-colors link-underline"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>

        {/* Stage + thumbnail rail */}
        <Reveal variant="up" delay={120}>
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* Main stage */}
            <div
              className="lg:col-span-9 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-zinc-950 border border-zinc-800/80 group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="hero-slide absolute inset-0"
                  data-active={idx === active ? "true" : "false"}
                  aria-hidden={idx !== active}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    quality={82}
                    className="object-cover"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Caption */}
              <div key={active} className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-10">
                <div data-reveal="up" data-revealed="true" className="space-y-2 max-w-2xl">
                  <span className="inline-block px-2.5 py-1 bg-[#F88E14] text-black text-[10px] font-bold uppercase tracking-widest">
                    {current.category}
                  </span>
                  <h3 className="font-fjalla text-2xl sm:text-4xl font-bold text-white uppercase tracking-wide">
                    {current.title}
                  </h3>
                  {current.caption && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{current.caption}</p>
                  )}
                </div>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/50 hover:bg-[#F88E14] text-white hover:text-black backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 -translate-x-2 group-hover:translate-x-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/50 hover:bg-[#F88E14] text-white hover:text-black backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 translate-x-2 group-hover:translate-x-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md text-[11px] font-mono font-bold text-zinc-200">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnail rail — absolutely filled on desktop so it never
                grows the grid row past the main stage */}
            <div className="lg:col-span-3 relative">
              <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:absolute lg:inset-0 lg:overflow-y-auto lg:pb-0 lg:pr-1 [scrollbar-width:thin]">
              {items.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive}
                    className={`relative flex-shrink-0 w-28 lg:w-full aspect-[4/3] overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#F88E14] opacity-100 scale-[1.02]"
                        : "border-zinc-800 opacity-45 hover:opacity-90 hover:border-zinc-600"
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                    {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#F88E14]" />}
                  </button>
                );
              })}
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
