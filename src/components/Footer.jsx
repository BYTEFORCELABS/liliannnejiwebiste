"use client";

import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  SpotifyIcon,
} from "@/components/SocialIcons";
import { Phone, Mail } from "lucide-react";

function XTwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ThreadsIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.004 0C5.373 0 0 5.373 0 12c0 6.626 5.373 12 12.004 12 6.627 0 11.996-5.374 11.996-12 0-6.627-5.369-12-11.996-12zm4.819 14.152c-.314 2.378-2.127 4.092-4.664 4.092-2.88 0-4.991-2.22-4.991-5.244 0-3.045 2.111-5.244 4.991-5.244 2.059 0 3.737 1.155 4.398 2.946l-1.748.74c-.426-1.154-1.488-1.89-2.65-1.89-1.849 0-3.14 1.487-3.14 3.448 0 1.982 1.291 3.448 3.14 3.448 1.488 0 2.65-.968 2.872-2.316h-2.872v-1.796h4.743c.03.267.045.545.045.834 0 .332-.025.674-.074 1.01z" />
    </svg>
  );
}

function AppleMusicIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-.91.04-2.02.61-2.67 1.38-.58.67-1.08 1.76-.95 2.81 1.02.08 2.06-.5 2.68-1.27z" />
    </svg>
  );
}

function SoundcloudIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.16 11.23c-.08 0-.16.08-.16.16v4.35c0 .08.08.16.16.16s.16-.08.16-.16v-4.35c0-.08-.08-.16-.16-.16zm1.16-1.31c-.08 0-.16.08-.16.16v6.97c0 .08.08.16.16.16s.16-.08.16-.16V10.08c0-.08-.08-.16-.16-.16zm1.16-1.16c-.08 0-.16.08-.16.16v9.29c0 .08.08.16.16.16s.16-.08.16-.16V8.92c0-.08-.08-.16-.16-.16zm1.16-.58c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.34c0-.08-.08-.16-.16-.16zm1.16-.15c-.08 0-.16.08-.16.16v10.74c0 .08.08.16.16.16s.16-.08.16-.16V8.35c0-.08-.08-.16-.16-.16zm1.16.15c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.5c0-.08-.08-.16-.16-.16zm1.16.43c-.08 0-.16.08-.16.16v9.58c0 .08.08.16.16.16s.16-.08.16-.16V9.09c0-.08-.08-.16-.16-.16zm1.16.58c-.08 0-.16.08-.16.16v8.42c0 .08.08.16.16.16s.16-.08.16-.16V9.83c0-.08-.08-.16-.16-.16zm1.16.87c-.08 0-.16.08-.16.16v6.68c0 .08.08.16.16.16s.16-.08.16-.16v-6.68c0-.08-.08-.16-.16-.16zm2.32-4.06c-.44 0-.85.14-1.2.37v9.84c.35.23.76.37 1.2.37 1.28 0 2.32-1.04 2.32-2.32 0-.25-.04-.49-.12-.72 1.4-.29 2.44-1.53 2.44-3.02 0-1.71-1.38-3.09-3.09-3.09-.43 0-.83.09-1.19.25-.09-.94-.88-1.68-1.84-1.68-.08 0-.16 0-.24.01z" />
    </svg>
  );
}

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/liliannnejiofficial" },
    { name: "X", icon: XTwitterIcon, url: "https://x.com/liliannneji" },
    { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/liliannneji/" },
    { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@LilianNneji" },
    { name: "Threads", icon: ThreadsIcon, url: "https://threads.net/@liliannneji" },
    { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa" },
    { name: "Apple Music", icon: AppleMusicIcon, url: "https://music.apple.com/artist/lilian-nneji" },
    { name: "SoundCloud", icon: SoundcloudIcon, url: "https://soundcloud.com/lilian-nneji" },
  ];

  return (
    <footer id="booking" className="bg-black text-white pt-14 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">

        {/* For Bookings Row matching Screenshot 3 */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-300">
          <span className="font-semibold text-white tracking-wide">
            For Bookings |
          </span>

          {/* Phone */}
          <a
            href="tel:+2348023131871"
            className="flex items-center gap-2 hover:text-[#F88E14] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-300" />
            <span>08023131871</span>
          </a>

          {/* Email 1 */}
          <a
            href="mailto:bookings@liliannneji.com"
            className="flex items-center gap-2 hover:text-[#F88E14] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-300" />
            <span>bookings@liliannneji.com</span>
          </a>

          {/* Email 2 */}
          <a
            href="mailto:liliannnejiministries@gmail.com"
            className="flex items-center gap-2 hover:text-[#F88E14] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-300" />
            <span>liliannnejiministries@gmail.com</span>
          </a>
        </div>

        {/* Yellow Social Icons Row matching Screenshot 3 */}
        <div className="flex items-center justify-center gap-6 sm:gap-7 text-[#F88E14] pt-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hover:text-white transition-colors hover:scale-125 duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Quick Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest font-semibold text-zinc-400 pt-1">
          <Link href="/" className="hover:text-[#F88E14] transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-[#F88E14] transition-colors">About</Link>
          <Link href="/#music" className="hover:text-[#F88E14] transition-colors">Music</Link>
          <Link href="/lyrics" className="hover:text-[#F88E14] transition-colors">Lyrics</Link>
          <Link href="/gallery" className="hover:text-[#F88E14] transition-colors">Gallery</Link>
          <Link href="/#events" className="hover:text-[#F88E14] transition-colors">Events</Link>
          <Link href="/reverb" className="hover:text-[#F88E14] transition-colors text-white font-bold">The Reverb</Link>
        </div>

        {/* Thin Divider Line matching Screenshot 3 */}
        <div className="max-w-5xl mx-auto border-t border-zinc-800/80 pt-6" />

        {/* Copyright Line matching Screenshot 3 */}
        <div className="text-xs sm:text-sm text-zinc-400 font-normal">
          Copyright © {new Date().getFullYear()} Minister Lilian Nneji | Designed by Engee Titus
        </div>

      </div>
    </footer>
  );
}
