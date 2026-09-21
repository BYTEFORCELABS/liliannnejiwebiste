"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { FacebookIcon, InstagramIcon, YouTubeIcon, SpotifyIcon } from "@/components/SocialIcons";

const SLIDE_DURATION = 6500;

const SLIDES = [
  {
    src: "/images/live_praise_fire.jpg",
    alt: "Minister Lilian Nneji leading high praise under stage lights",
    caption: "High Praise Encounter",
    position: "object-[50%_32%]",
  },
  {
    src: "/images/hero_bg_live.jpg",
    alt: "Minister Lilian Nneji ministering to a standing congregation",
    caption: "Live Altar Ministration",
    position: "object-[78%_38%]",
  },
  {
    src: "/images/reverb_joy_denim.jpg",
    alt: "Minister Lilian Nneji in joyful praise with her band",
    caption: "The Reverb",
    position: "object-[52%_34%]",
  },
  {
    src: "/images/live_crowd_bw.jpg",
    alt: "Minister Lilian Nneji lifting a congregation in worship",
    caption: "Unstoppable Praise",
    position: "object-[70%_42%]",
  },
];

function XTwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timerRef.current);
  }, [active]);

  const socials = [
    { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/liliannnejiofficial" },
    { name: "X-Twitter", icon: XTwitterIcon, url: "https://x.com/liliannneji" },
    { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/liliannneji/" },
    { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@LilianNneji" },
    { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa" },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden">

      {/* Crossfading photo slideshow */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0"
            data-active={idx === active ? "true" : "false"}
            aria-hidden={idx !== active}
          >
            <div className="hero-slide-img absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                preload={idx === 0 || undefined}
                quality={82}
                className={`object-cover ${slide.position}`}
              />
            </div>
          </div>
        ))}

        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/85 to-transparent sm:w-3/4 md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/70" />
      </div>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-24 sm:pb-28">
        <div className="max-w-3xl space-y-6 sm:space-y-8">

          <div className="space-y-2">
            <Reveal as="h6" variant="right" delay={80} className="font-fjalla text-[#F88E14] uppercase tracking-wider text-base sm:text-xl font-bold">
              Recording Artist &amp; Worship Minister
            </Reveal>

            <Reveal as="h1" variant="up" delay={200} className="font-fjalla text-5xl sm:text-7xl lg:text-9xl font-bold uppercase text-white tracking-tight leading-[1.02]">
              Minister <br className="hidden sm:inline" />
              Lilian Nneji
            </Reveal>
          </div>

          <Reveal variant="up" delay={380} className="pt-2">
            <Link
              href="#music"
              className="shimmer-sweep relative inline-block overflow-hidden border-2 border-[#F88E14] text-[#F88E14] hover:bg-[#F88E14] hover:text-black font-fjalla uppercase px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm tracking-wider transition-colors duration-300"
            >
              Eze Mu O (King of Praise) Album
            </Link>
          </Reveal>

          <Reveal variant="up" delay={500} className="flex items-center gap-3 pt-4">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className="w-10 h-10 rounded-full bg-[#F88E14] text-black flex items-center justify-center hover:scale-125 hover:-translate-y-1 hover:bg-[#FABA1E] transition-all duration-300 shadow-md"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </Reveal>

        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-7 sm:bottom-9 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between gap-6">

          <div className="flex items-center gap-1">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Show ${slide.caption}`}
                  aria-current={isActive}
                  className="group p-2 cursor-pointer"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-2.5 h-2.5 bg-[#F88E14] shadow-[0_0_12px_rgba(248,142,20,0.8)]"
                        : "w-2 h-2 bg-white/30 group-hover:bg-white/70 group-hover:scale-125"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <Link
            href="#about"
            aria-label="Scroll to about section"
            className="animate-scroll-cue hidden sm:block text-zinc-400 hover:text-[#F88E14] transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </Link>

        </div>
      </div>
    </section>
  );
}
