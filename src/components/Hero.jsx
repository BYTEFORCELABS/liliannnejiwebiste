"use client";

import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, YouTubeIcon, SpotifyIcon } from "@/components/SocialIcons";

function XTwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Hero() {
  const socials = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://www.facebook.com/liliannnejiofficial",
    },
    {
      name: "X-Twitter",
      icon: XTwitterIcon,
      url: "https://x.com/liliannneji",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://www.instagram.com/liliannneji/",
    },
    {
      name: "YouTube",
      icon: YouTubeIcon,
      url: "https://www.youtube.com/@LilianNneji",
    },
    {
      name: "Spotify",
      icon: SpotifyIcon,
      url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa",
    },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden">

      {/* Full-Bleed Background Image (Matches Prinx Emmanuel layout) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.jpg"
          alt="Minister Lilian Nneji Concert Stage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-center"
        />

        {/* Subtle Dark Vignette / Left Gradient Overlay for Crystal-Clear Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/75 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/40" />
      </div>

      {/* Hero Content aligned to the left */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-16">
        <div className="max-w-3xl space-y-6 sm:space-y-8">

          {/* Yellow Subtitle Label */}
          <div className="space-y-2">
            <h6 className="font-fjalla text-[#f3c242] uppercase tracking-wider text-base sm:text-xl font-bold">
              Recording Artist & Worship Minister
            </h6>

            {/* Giant Heading */}
            <h1 className="font-fjalla text-5xl sm:text-7xl lg:text-9xl font-bold uppercase text-white tracking-tight leading-[1.02]">
              Minister <br className="hidden sm:inline" />
              Lilian Nneji
            </h1>
          </div>

          {/* Yellow Boxed Outline Button */}
          <div className="pt-2">
            <Link
              href="#music"
              className="inline-block border-2 border-[#f3c242] text-[#f3c242] hover:bg-[#f3c242] hover:text-black font-fjalla uppercase px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm tracking-wider transition-all duration-200"
            >
              Eze Mu O (King of Praise) Album
            </Link>
          </div>

          {/* Row of Circular Yellow Social Buttons */}
          <div className="flex items-center gap-3 pt-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-[#f3c242] text-black flex items-center justify-center hover:scale-110 hover:bg-[#ffd56b] transition-transform shadow-md"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
