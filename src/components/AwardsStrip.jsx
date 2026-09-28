"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { AWARDS } from "@/lib/awards";
import { Trophy, ArrowRight } from "lucide-react";

// A visually varied slice for the home page: the three headline honours
// first, then the strongest-looking plaques. The full set lives on /awards.
const STRIP = AWARDS.slice(0, 8);

// Rendered inside AboutSection's max-w-7xl column, immediately above the
// Clima Africa callout, so it carries no background, border or vertical
// padding of its own — the parent's space-y handles the rhythm.
export default function AwardsStrip() {
  return (
    <div id="awards" className="space-y-8 sm:space-y-10">

      {/* Header */}
      <div className="text-center space-y-3">
        <Reveal variant="scale">
          <Trophy className="w-8 h-8 text-gold mx-auto" />
        </Reveal>

        <Reveal as="p" variant="up" delay={80} className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
          Honours &amp; Accolades
        </Reveal>

        <Reveal as="h2" variant="up" delay={140} className="font-fjalla text-4xl sm:text-6xl text-ink font-bold uppercase tracking-tight leading-[0.98]">
          Recognised <span className="text-gold-gradient">Across Africa</span>
        </Reveal>

        <Reveal as="p" variant="up" delay={220} className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto pt-1">
          {AWARDS.length} awards and counting, from continental titles to the plaques handed over
          after a night of praise.
        </Reveal>
      </div>

      {/* ============================================================ */}
      {/* MOVING STRIP                                                 */}
      {/* Reuses the site marquee: the track animates to -50%, so the  */}
      {/* list is rendered exactly twice to loop seamlessly. It pauses */}
      {/* on hover and is disabled under prefers-reduced-motion.       */}
      {/*                                                              */}
      {/* The host breaks out of the parent column to run edge to      */}
      {/* edge. AboutSection is overflow-hidden, so the full-viewport  */}
      {/* width cannot introduce a horizontal scrollbar.               */}
      {/* ============================================================ */}
      <Reveal variant="up" delay={280}>
        <div className="marquee-host relative left-1/2 -translate-x-1/2 w-screen overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track gap-5" style={{ "--marquee-duration": "52s" }}>
            {[...STRIP, ...STRIP].map((award, idx) => (
              <Link
                key={`${award.id}-${idx}`}
                href="/awards"
                aria-label={`${award.title}, ${award.presenter}`}
                data-theme="dark"
                className="group relative flex-shrink-0 w-[230px] sm:w-[270px] overflow-hidden border border-zinc-800/70 bg-zinc-950 hover:border-[#F88E14]/60 transition-colors duration-500"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src={award.images[0].src}
                    alt={award.images[0].alt}
                    fill
                    sizes="270px"
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute inset-0 bg-[#F88E14]/0 group-hover:bg-[#F88E14]/10 transition-colors duration-500" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold leading-snug line-clamp-1">
                    {award.presenter}{award.year ? ` · ${award.year}` : ""}
                  </p>
                  <h3 className="font-fjalla text-sm sm:text-base uppercase font-bold tracking-tight text-ink leading-tight line-clamp-2">
                    {award.title}
                  </h3>
                </div>

                {/* Gold underline sweep, matching the awards page cards */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F9650B] via-[#F88E14] to-[#FABA1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal variant="up" delay={120} className="text-center">
        <Link
          href="/awards"
          className="shimmer-sweep relative inline-flex items-center gap-2 overflow-hidden border-2 border-[#F88E14] text-gold hover:bg-[#F88E14] hover:text-on-gold font-fjalla uppercase px-7 py-3 text-xs sm:text-sm tracking-wider transition-colors duration-300 group"
        >
          See every award
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </Reveal>

    </div>
  );
}
