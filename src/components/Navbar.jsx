"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  SpotifyIcon,
} from "@/components/SocialIcons";

// Must match the menuPanelOut duration in globals.css — the panel stays
// mounted this long after a close is requested so the exit can play out.
const MENU_EXIT_MS = 360;

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Music", href: "/#music" },
  { name: "Lyrics", href: "/lyrics" },
  { name: "Gallery", href: "/gallery" },
  // { name: "Events", href: "/#events" },
  { name: "Booking", href: "/#booking" },
  // Reverb is parked for now — see src/app/reverb/page.js
  // { name: "Reverb", href: "/reverb" },
];

const SOCIALS = [
  { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/liliannnejiofficial" },
  { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/liliannneji/" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@LilianNneji" },
  { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Presence is separate from intent: the panel outlives `menuOpen` by one
  // exit animation so closing is animated rather than an abrupt unmount.
  const [menuMounted, setMenuMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      return;
    }
    if (!menuMounted) return;
    const timer = setTimeout(() => setMenuMounted(false), MENU_EXIT_MS);
    return () => clearTimeout(timer);
  }, [menuOpen, menuMounted]);

  // Lock the page behind the menu, and restore whatever overflow was there.
  useEffect(() => {
    if (!menuMounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuMounted]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // The home page opens on a photographic hero that stays dark in both
  // themes, so while the bar is still over it we pin it to the dark palette.
  // Otherwise light mode paints a white band straight across the photo.
  const overHero = pathname === "/" && !isScrolled;
  const closing = menuMounted && !menuOpen;

  return (
    <>
      <header
        data-theme={overHero ? "dark" : undefined}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md py-4 border-b border-hairline shadow-2xl"
            : "bg-gradient-to-b from-black/70 via-black/25 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <BrandLogo
              className="w-44 h-12 group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 768px) 160px, 176px"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] lg:text-[16px] font-medium tracking-normal text-gold hover:text-ink transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            <ThemeToggle />
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle className="w-11 h-11" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl border border-hairline bg-hairline text-zinc-200 hover:text-gold hover:border-[#F88E14]/30 hover:bg-[#F88E14]/5 transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88E14]"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 relative pointer-events-none">
                <span className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-3.5 rounded-full bg-current" />
                <span className="absolute left-0 bottom-0 h-[2px] w-5 rounded-full bg-current" />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* FULL-SCREEN MOBILE MENU                                      */}
      {/* Sits above the header and owns the whole viewport, so it     */}
      {/* carries its own brand row, toggle and close button.          */}
      {/* ============================================================ */}
      {menuMounted && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-closing={closing ? "true" : "false"}
          className="mobile-menu-panel md:hidden fixed inset-0 z-[70] bg-black/98 backdrop-blur-2xl overflow-y-auto overscroll-contain"
        >
          {/* Gold wash so the panel reads as brand surface, not a grey sheet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_85%_0%,rgba(248,142,20,0.16),transparent_60%)]"
          />

          <div className="relative min-h-full flex flex-col">

            {/* Top row: brand + toggle + close */}
            <div className="flex items-center justify-between px-6 py-6">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <BrandLogo className="w-40 h-11" sizes="160px" />
              </Link>

              <div className="flex items-center gap-2">
                <ThemeToggle className="w-11 h-11" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="relative w-11 h-11 flex items-center justify-center rounded-xl border border-[#F88E14]/40 bg-[#F88E14]/10 text-gold shadow-[0_0_18px_rgba(248,142,20,0.25)] transition-transform duration-300 hover:rotate-90 active:scale-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88E14]"
                >
                  <span className="absolute h-[2px] w-5 rounded-full bg-current rotate-45" />
                  <span className="absolute h-[2px] w-5 rounded-full bg-current -rotate-45" />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex-grow flex flex-col justify-center px-6 pb-8">
              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.href === pathname ||
                  (link.href.startsWith("/#") && pathname === "/" && idx === 0);

                return (
                  <div
                    key={link.name}
                    className="mobile-menu-row"
                    style={{ animationDelay: `${140 + idx * 60}ms` }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`mobile-menu-link group flex items-baseline gap-4 py-4 focus:outline-none ${
                        isActive ? "text-gold" : "text-ink"
                      }`}
                    >
                      <span className="mobile-menu-index font-fjalla text-xs tabular-nums text-zinc-600 group-hover:text-gold group-focus-visible:text-gold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="mobile-menu-label font-fjalla text-4xl sm:text-5xl uppercase font-bold tracking-tight group-hover:text-gold group-focus-visible:text-gold">
                        {link.name}
                      </span>
                    </Link>
                    <div
                      className="mobile-menu-rule h-px bg-hairline"
                      style={{ animationDelay: `${200 + idx * 60}ms` }}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Footer: socials + book CTA */}
            <div
              className="mobile-menu-row px-6 pb-10 space-y-6"
              style={{ animationDelay: `${180 + NAV_LINKS.length * 60}ms` }}
            >
              <Link
                href="/#booking"
                onClick={() => setMenuOpen(false)}
                className="shimmer-sweep relative block overflow-hidden text-center border-2 border-[#F88E14] text-gold hover:bg-[#F88E14] hover:text-on-gold font-fjalla uppercase px-6 py-3.5 text-sm tracking-wider transition-colors duration-300"
              >
                Book Minister Lilian
              </Link>

              <div className="flex items-center justify-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-11 h-11 rounded-full border border-hairline text-zinc-400 flex items-center justify-center hover:text-on-gold hover:bg-[#F88E14] hover:border-[#F88E14] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              <p className="text-center text-[11px] uppercase tracking-widest text-zinc-600">
                Minister Lilian Nneji
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
