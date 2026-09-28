"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { AWARDS, AWARD_CATEGORIES } from "@/lib/awards";
import { Trophy, X, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function AwardsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // { awardId, imageIndex }

  const filtered =
    activeCategory === "All"
      ? AWARDS
      : AWARDS.filter((a) => a.category === activeCategory);

  const spotlight = AWARDS.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured || activeCategory !== "All");

  const openLightbox = (awardId, imageIndex = 0) => setLightbox({ awardId, imageIndex });
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const activeAward = lightbox ? AWARDS.find((a) => a.id === lightbox.awardId) : null;

  // Step through the photographs of the award that is open. Several trophies
  // were shot front and back, so a single award can hold more than one image.
  const step = useCallback(
    (dir) => {
      setLightbox((current) => {
        if (!current) return current;
        const award = AWARDS.find((a) => a.id === current.awardId);
        if (!award) return current;
        const next = (current.imageIndex + dir + award.images.length) % award.images.length;
        return { ...current, imageIndex: next };
      });
    },
    []
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, step]);

  useEffect(() => {
    if (!lightbox) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-black text-ink flex flex-col selection:bg-[#F88E14] selection:text-on-gold">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">

        {/* ============================================================ */}
        {/* HEADER                                                       */}
        {/* ============================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto text-center space-y-5 overflow-hidden">
          <div className="animate-breathe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#F88E14]/10 blur-[140px] pointer-events-none rounded-full" />

          <Reveal variant="scale" className="relative">
            <Trophy className="w-9 h-9 text-gold mx-auto" />
          </Reveal>

          <Reveal as="h1" variant="up" delay={80} className="font-fjalla text-4xl sm:text-6xl lg:text-7xl uppercase text-ink font-bold tracking-tight">
            HONOURS &amp; <span className="text-gold-gradient">ACCOLADES</span>
          </Reveal>

          <Reveal as="p" variant="up" delay={160} className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Continental awards, ministry recognitions and milestones gathered across a decade of
            lifting congregations in unashamed praise. Every plaque here sits on her shelf.
          </Reveal>

          {/* Count strip */}
          <Reveal variant="up" delay={240} className="pt-4 flex items-center justify-center gap-8 sm:gap-12">
            {[
              { value: AWARDS.length, label: "Awards" },
              { value: "100K+", label: "Subscribers" },
              { value: "2", label: "Continental Titles" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-fjalla text-3xl sm:text-4xl text-gold-gradient font-bold tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1.5">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* SPOTLIGHT — the headline honours                             */}
        {/* ============================================================ */}
        {activeCategory === "All" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-16">
            {/* The lead award spans two columns and both rows, so the two
                smaller honours stack beside it and the block stays flush. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5">
              {spotlight.map((award, idx) => (
                <Reveal
                  key={award.id}
                  variant="up"
                  delay={idx * 120}
                  className={idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(award.id)}
                    data-theme="dark"
                    className="group relative flex w-full h-full text-left overflow-hidden border border-[#F88E14]/25 bg-gradient-to-br from-zinc-900 to-black hover:border-[#F88E14]/60 transition-colors duration-500 cursor-pointer"
                  >
                    <div className={`relative w-full overflow-hidden ${idx === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "aspect-[16/10]"}`}>
                      <Image
                        src={award.images[0].src}
                        alt={award.images[0].alt}
                        fill
                        sizes={idx === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                        priority={idx === 0}
                        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-[#F88E14]/0 group-hover:bg-[#F88E14]/10 transition-colors duration-500" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 space-y-1.5">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                        {award.presenter}{award.year ? ` · ${award.year}` : ""}
                      </p>
                      <h2 className={`font-fjalla uppercase font-bold tracking-tight text-ink leading-[1.05] ${idx === 0 ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
                        {award.title}
                      </h2>
                    </div>

                    {/* Gold sweep on hover */}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F9650B] via-[#F88E14] to-[#FABA1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FILTERS                                                      */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="up" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-10">
            {AWARD_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#F88E14] text-on-gold shadow-lg scale-105 font-bold"
                      : "bg-zinc-900/90 text-zinc-400 hover:text-ink hover:bg-zinc-800 border border-zinc-800 hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* GRID                                                         */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((award, idx) => (
              <Reveal key={award.id} variant="up" delay={(idx % 3) * 90}>
                <button
                  type="button"
                  onClick={() => openLightbox(award.id)}
                  className="group flex flex-col w-full h-full text-left bg-zinc-950 border border-zinc-800/70 hover:border-[#F88E14]/50 transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div data-theme="dark" className="relative w-full aspect-[4/5] overflow-hidden bg-black">
                    <Image
                      src={award.images[0].src}
                      alt={award.images[0].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    {award.images.length > 1 && (
                      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold text-gold bg-black/70 border border-[#F88E14]/40 px-2 py-1">
                        {award.images.length} photos
                      </span>
                    )}

                    <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-semibold">
                      {award.category}
                    </span>
                  </div>

                  <div className="flex-grow p-5 space-y-2 border-t border-zinc-900">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold leading-snug">
                      {award.presenter}{award.year ? ` · ${award.year}` : ""}
                    </p>
                    <h3 className="font-fjalla text-lg sm:text-xl uppercase font-bold tracking-tight text-ink leading-tight group-hover:text-gold transition-colors duration-300">
                      {award.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                      {award.citation}
                    </p>
                  </div>

                  <span className="block h-0.5 w-full bg-gradient-to-r from-[#F9650B] via-[#F88E14] to-[#FABA1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                </button>
              </Reveal>
            ))}
          </div>

          {rest.length === 0 && (
            <p className="text-center text-zinc-500 py-16 text-sm">
              No awards in this category yet.
            </p>
          )}
        </section>

      </main>

      {/* ============================================================ */}
      {/* LIGHTBOX                                                     */}
      {/* ============================================================ */}
      {activeAward && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeAward.title}
          onClick={closeLightbox}
          className="award-lightbox fixed inset-0 z-[80] bg-black/96 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="fixed top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-300 hover:text-gold hover:border-[#F88E14]/60 hover:rotate-90 transition-all duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="award-lightbox-inner grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl w-full my-auto"
          >
            {/* Photograph */}
            <div className="relative aspect-[4/5] w-full max-h-[70vh] bg-zinc-950 border border-zinc-800">
              <Image
                key={activeAward.images[lightbox.imageIndex].src}
                src={activeAward.images[lightbox.imageIndex].src}
                alt={activeAward.images[lightbox.imageIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="award-lightbox-img object-contain"
              />

              {activeAward.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photograph"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-zinc-700 text-zinc-200 hover:text-gold hover:border-[#F88E14]/60 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photograph"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-zinc-700 text-zinc-200 hover:text-gold hover:border-[#F88E14]/60 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tabular-nums text-zinc-400 bg-black/70 px-2.5 py-1 rounded-full border border-zinc-800">
                    {lightbox.imageIndex + 1} / {activeAward.images.length}
                  </span>
                </>
              )}
            </div>

            {/* Citation */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                {activeAward.presenter}{activeAward.year ? ` · ${activeAward.year}` : ""}
              </p>
              <h2 className="font-fjalla text-3xl sm:text-4xl lg:text-5xl uppercase font-bold tracking-tight text-ink leading-[1.05]">
                {activeAward.title}
              </h2>
              <div className="h-0.5 w-20 bg-gradient-to-r from-[#F9650B] via-[#F88E14] to-[#FABA1E]" />
              <div className="flex gap-3 pt-1">
                <Quote className="w-5 h-5 text-gold/60 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {activeAward.citation}
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 pt-2">
                {activeAward.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
