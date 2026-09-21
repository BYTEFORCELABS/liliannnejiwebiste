"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Award } from "lucide-react";

const HIT_SINGLES = [
  "Onwere Ihe Omere Mu",
  "E Get Why",
  "Mercy",
  "Odogwu N'agha",
  "Ko Joo",
  "Ntughari",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-32 border-t border-white/5 overflow-hidden text-white">

      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#16130d_0%,#000000_60%)] pointer-events-none" />
      <div className="animate-breathe absolute -top-24 left-1/4 w-[460px] h-[460px] rounded-full bg-[#F88E14]/[0.07] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32">

        {/* ============================================================ */}
        {/* HEADING                                                      */}
        {/* ============================================================ */}
        <div className="space-y-4 max-w-3xl">
          <Reveal as="h2" variant="wipe" className="font-fjalla text-5xl sm:text-7xl lg:text-8xl text-[#F88E14] font-bold uppercase tracking-tight leading-[0.95]">
            I Am Lilian
          </Reveal>

          <Reveal as="p" variant="up" delay={140} className="text-zinc-400 text-base sm:text-lg font-medium">
            Anointed and award-winning music minister, songwriter and worship leader.
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* ROW 1: PORTRAIT + BIOGRAPHY                                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">

          {/* Portrait */}
          <Reveal variant="left" className="lg:col-span-5">
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Offset gold frame */}
              <div className="absolute -inset-x-4 -inset-y-4 border border-[#F88E14]/30 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-700 ease-out pointer-events-none" />

              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 shadow-2xl">
                <Image
                  src="/images/live_worship_portrait.jpg"
                  alt="Minister Lilian Nneji leading worship"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-[52%_22%] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Floating award badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#0c0c10] border border-[#F88E14]/40 px-5 py-4 shadow-2xl max-w-[230px] animate-float">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-[#F88E14] flex-shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <p className="font-fjalla text-sm font-bold text-white uppercase tracking-wide">
                      Africa Praise Artiste
                    </p>
                    <p className="text-[11px] text-[#F88E14] font-semibold uppercase tracking-wider">
                      Of the Year &middot; 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Biography */}
          <div className="lg:col-span-7 space-y-8">

            <div className="space-y-5 text-zinc-300 text-[15px] sm:text-[17px] leading-[1.75] font-normal">
              <Reveal as="p" variant="up">
                Minister <strong className="text-white font-semibold">Lilian Nneka Nneji</strong>, known
                to the world simply as <strong className="text-white font-semibold">Lilian Nneji</strong>, is
                a Nigerian gospel singer, songwriter, worship leader and recording artiste. An ordained assistant
                pastor and one of Africa&rsquo;s most energetic praise leaders, she carries a sound that moves a
                room from celebration straight into the presence of God.
              </Reveal>

              <Reveal as="p" variant="up" delay={100}>
                Born on the 18th of July, she is the fifth child in a family of six from{" "}
                <strong className="text-white font-semibold">Imo State, Nigeria</strong>. She graduated from the
                University of Ado-Ekiti with a B.Sc in Accounting and worked professionally for ten years,
                carrying the work of ministry alongside her career, until the Lord called her into full-time
                ministry.
              </Reveal>

              <Reveal as="p" variant="up" delay={200}>
                Since that call she has travelled around the world preaching through her music, singing and dancing
                energetically to God. In 2024 she was named{" "}
                <strong className="text-white font-semibold">Africa Praise Artiste of the Year</strong> at the
                prestigious Clima Africa Awards, and she continues to write songs that carry congregations from
                praise into deep worship.
              </Reveal>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* KNOWN FOR: scrolling song marquee                            */}
        {/* ============================================================ */}
        <Reveal variant="up">
          <div className="marquee-host relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track gap-5" style={{ "--marquee-duration": "34s" }}>
              {[...HIT_SINGLES, ...HIT_SINGLES].map((song, idx) => (
                <span
                  key={`${song}-${idx}`}
                  className="flex-shrink-0 flex items-center gap-4 font-fjalla text-2xl sm:text-4xl uppercase font-bold tracking-tight text-zinc-600 hover:text-[#F88E14] transition-colors duration-300"
                >
                  {song}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F88E14]/50" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ============================================================ */}
        {/* ROW 2: QUEEN OF PRAISE                                       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">

          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <Reveal as="h3" variant="wipe" className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] font-bold tracking-tight uppercase leading-[0.95]">
              Queen of Praise
            </Reveal>

            <div className="space-y-5 text-zinc-300 text-[15px] sm:text-[17px] leading-[1.75]">
              <Reveal as="p" variant="up" delay={140}>
                From church auditoriums in Nigeria to praise nights across the continent and beyond, Minister Lilian
                Nneji has built a ministry on one thing: an unrelenting, danceable, joyful gratitude to God. Her
                sets are physical. She sings, she dances, she pulls a congregation to its feet.
              </Reveal>

              <Reveal as="p" variant="up" delay={300}>
                Ten years in professional accounting taught her discipline; the call taught her surrender. Today
                she gives both to the altar, leading praise with the same energy at a packed arena as at a midweek
                service.
              </Reveal>
            </div>

            <Reveal variant="up" delay={400} className="flex flex-wrap gap-2.5 pt-2">
              {["Praise Leader", "Songwriter", "Recording Artiste", "Worship Leader"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 border border-[#F88E14]/25 text-[11px] uppercase tracking-wider font-semibold text-zinc-300 hover:border-[#F88E14] hover:text-[#F88E14] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative group max-w-lg mx-auto lg:ml-auto">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-zinc-950 shadow-2xl">
                <Image
                  src="/images/reverb_ministering.jpg"
                  alt="Minister Lilian Nneji ministering live at The Reverb"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[58%_28%] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-x-4 -inset-y-4 border border-[#F88E14]/25 -translate-x-3 translate-y-3 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-700 ease-out pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* AWARD CALLOUT                                                */}
        {/* ============================================================ */}
        <Reveal variant="scale">
          <div className="relative border border-[#F88E14]/25 bg-gradient-to-br from-[#12100a] to-[#08080a] px-6 sm:px-12 py-12 sm:py-14 text-center overflow-hidden group">
            <div className="animate-breathe absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-[#F88E14]/10 blur-[110px] pointer-events-none" />

            <div className="relative space-y-4">
              <Award className="w-10 h-10 text-[#F88E14] mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />

              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                Clima Africa Awards &middot; 2024
              </p>

              <h3 className="font-fjalla text-3xl sm:text-5xl lg:text-6xl text-white font-bold uppercase tracking-tight">
                Africa Praise Artiste
                <span className="block text-gold-gradient">Of the Year</span>
              </h3>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto pt-1">
                Awarded for a body of work and a decade of ministry spent lifting congregations across Africa
                in energetic, unashamed praise.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
