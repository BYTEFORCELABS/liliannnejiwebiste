"use client";

import Image from "next/image";
import { Sparkles, Trophy, Award } from "lucide-react";

// Seamless gold/black organic camo pattern matching Screenshots 1, 2 & 3
function GoldCamoPattern({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" preserveAspectRatio="none" fill="none">
      <defs>
        <pattern id="gold-camo-tile" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Deep Dark Base */}
          <rect width="100" height="100" fill="#0a0a0c" />
          
          {/* Organic Gold Camo Blobs & Ripples */}
          <path d="M10 25 Q 35 15 45 30 Q 55 45 35 55 Q 20 60 10 40 Z" fill="#f3c242" opacity="0.95" />
          <path d="M60 70 Q 80 60 85 75 Q 90 85 75 90 Q 65 90 60 75 Z" fill="#eab308" opacity="0.85" />
          <path d="M70 15 Q 85 20 80 35 Q 70 40 65 25 Z" fill="#f59e0b" opacity="0.9" />
          <path d="M30 8 Q 45 3 50 12 Q 40 18 30 8 Z" fill="#fbbf24" opacity="0.9" />
          <circle cx="25" cy="80" r="6" fill="#fde047" opacity="0.8" />
          <circle cx="85" cy="50" r="5" fill="#f3c242" opacity="0.75" />
          <circle cx="50" cy="50" r="3.5" fill="#fef08a" opacity="0.9" />
          
          {/* Camo stroke bars */}
          <rect x="0" y="45" width="16" height="7" rx="3.5" fill="#f3c242" opacity="0.8" />
          <rect x="42" y="78" width="18" height="6" rx="3" fill="#eab308" opacity="0.85" />
          <rect x="68" y="0" width="14" height="6" rx="3" fill="#f59e0b" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gold-camo-tile)" />
    </svg>
  );
}

// GMA Award Logo matching Screenshot 1
function GMABadge() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#f3c242] flex items-center justify-center text-[#f3c242] bg-black/80 shadow-md">
        <Trophy className="w-4 h-4 text-[#f3c242]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-fjalla text-base text-[#f3c242] font-bold tracking-wider">
          GMA <sup className="text-[10px] text-[#f3c242] font-semibold">'6</sup>
        </span>
      </div>
    </div>
  );
}

// Metallic Insignia Pin matching Screenshot 2
function MetallicPin() {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700 p-0.5 shadow-xl flex items-center justify-center border border-white/60">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-zinc-100">
        <Award className="w-4 h-4 text-amber-300 drop-shadow" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black py-24 border-t border-white/5 overflow-hidden text-white">
      
      {/* Background Subtle Watermark Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#14141a_0%,#000000_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32">
        
        {/* ============================================================ */}
        {/* TOP ACCREDITATION & TROPHY (Screenshot 1)                    */}
        {/* ============================================================ */}
        <div className="text-center space-y-5">
          <div className="space-y-1.5">
            <h2 className="font-fjalla text-3xl sm:text-5xl lg:text-6xl text-[#f3c242] uppercase tracking-wide font-bold">
              GALAXY MUSIC AWARDS
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-medium tracking-wide">
              Gospel Artist of the Year
            </p>
          </div>

          {/* Golden Trophy Graphic */}
          <div className="flex justify-center pt-2">
            <div className="relative w-28 sm:w-36 aspect-square hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_35px_rgba(243,194,66,0.35)]">
              <Image
                src="/images/award_trophy.jpg"
                alt="Galaxy Music Award Trophy - Gospel Artist of the Year"
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ROW 1: WINNER CARD (Left) & "I AM LILIAN" (Right) (Screenshots 1 & 2) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Winner Poster Card with Camo Border (Screenshots 1 & 2) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden p-5 sm:p-6 shadow-2xl border border-[#f3c242]/20">
              
              {/* Camo Background Border Fill */}
              <div className="absolute inset-0 z-0">
                <GoldCamoPattern />
              </div>

              {/* Inner Card Container */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Header: GMA Logo & WINNER */}
                <div className="flex items-center justify-between pb-3">
                  <GMABadge />
                  <span className="font-fjalla text-2xl sm:text-3xl text-white font-bold tracking-widest uppercase">
                    WINNER
                  </span>
                </div>

                {/* Framed Center Portrait */}
                <div className="relative flex-1 w-full rounded-lg overflow-hidden bg-zinc-900 border border-black shadow-inner my-2">
                  <Image
                    src="/images/about_award_portrait_v2.jpg"
                    alt="Minister Lilian Nneji - Winner Gospel Artist of the Year"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-[center_top]"
                  />

                  {/* Black Banner at bottom of Photo */}
                  <div className="absolute bottom-0 inset-x-0 bg-black/95 px-4 py-3 border-t border-white/10">
                    <h4 className="font-fjalla text-lg sm:text-xl font-bold text-white tracking-wide uppercase leading-tight">
                      Minister Lilian Nneji
                    </h4>
                    <p className="text-xs text-zinc-300 font-medium">
                      Gospel Artist of the year
                    </p>
                  </div>
                </div>

                {/* Bottom Row with Metallic Insignia Pin */}
                <div className="pt-2 flex items-center justify-between">
                  <MetallicPin />
                  <span className="text-[10px] text-[#f3c242] uppercase font-bold tracking-widest">
                    HONOR & EXCELLENCE
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: "I AM LILIAN" Bio (Screenshot 2) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-fjalla text-4xl sm:text-6xl text-[#f3c242] font-bold tracking-tight uppercase">
              I AM LILIAN
            </h3>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Hailing from Lagos, Nigeria, Minister Lilian Nneji discovered her calling and passion for music and prophetic worship at a young age, honing her anointed craft in the church choir and regional gospel gatherings before rising to national and international prominence.
              </p>
              <p>
                With powerhouse hit songs like <strong className="text-white">“Eze Mu O,”</strong> <strong className="text-white">“Praise Vibes,”</strong> <strong className="text-white">“My Helper,”</strong> and the infectious praise anthem <strong className="text-white">“Jesus Dance,”</strong> she has captivated audiences with her dynamic sound, uplifting lyrics, and unwavering message of faith and joy. Her ability to blend deep spiritual devotion with vibrant, high-tempo African praise makes her a standout voice in the modern gospel music space.
              </p>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* ROW 2: "QUEEN OF PRAISE" (Left) & STUDIO PHOTO (Right) (Screenshot 3) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: "QUEEN OF PRAISE" (Screenshot 3) */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            
            {/* Top Camo Ribbon matching Screenshot 3 */}
            <div className="w-full max-w-xs h-7 rounded-sm overflow-hidden border border-[#f3c242]/30 shadow-md">
              <GoldCamoPattern />
            </div>

            <h3 className="font-fjalla text-4xl sm:text-6xl text-[#f3c242] font-bold tracking-tight uppercase">
              QUEEN OF PRAISE
            </h3>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Minister Lilian Nneji has graced major stages and mega-altars across Africa, North America, and Europe, including renowned international praise conventions, church stadium arenas, and national worship nights—and has received multiple accolades, including Gospel Artiste of the Year.
              </p>
              <p>
                Beyond music, she is a spiritual powerhouse known for her infectious joy, heartfelt storytelling, and extraordinary ability to connect deeply with her audience. Whether through her uplifting anthems or electrifying stage ministrations, Minister Lilian Nneji is on a divine mission to spread faith, joy, and the unstoppable fire of praise to the world through music!
              </p>
            </div>
          </div>

          {/* Right Column: Stage Ministration Photo (Screenshot 3) */}
          <div className="lg:col-span-6 relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#f3c242]/30 group bg-zinc-950">
              <Image
                src="/images/about_yellow_studio_v2.jpg"
                alt="Minister Lilian Nneji Live Praise Ministration"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
