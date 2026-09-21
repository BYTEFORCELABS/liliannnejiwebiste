"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Music", href: "/#music" },
    { name: "Lyrics", href: "/lyrics" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Events", href: "/#events" },
    { name: "Booking", href: "/#booking" },
    { name: "Reverb", href: "/reverb" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070709]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-44 h-12">
            <Image
              src="/images/logo_white_text.png"
              alt="Minister Lilian Nneji Logo"
              fill
              sizes="(max-width: 768px) 160px, 176px"
              priority
              className="object-contain object-left drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
          {navLinks.map((link) => {
            const isReverb = link.name === "Reverb";

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] lg:text-[16px] font-medium tracking-normal transition-colors duration-200 ${
                  isReverb
                    ? "text-white hover:text-[#F88E14]"
                    : "text-[#F88E14] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Animated Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 active:scale-75 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88E14] ${
            mobileMenuOpen
              ? "text-[#F88E14] bg-[#F88E14]/15 border-[#F88E14]/40 shadow-[0_0_18px_rgba(248,142,20,0.35)] rotate-90"
              : "text-zinc-200 hover:text-[#F88E14] bg-white/[0.04] border-white/10 hover:border-[#F88E14]/30 hover:bg-[#F88E14]/5 rotate-0"
          }`}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 h-5 relative flex items-center justify-center pointer-events-none">
            {/* Bar 1 (Top / Diagonal 1) */}
            <span
              className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen
                  ? "bg-[#F88E14] rotate-45 translate-y-0"
                  : "bg-current -translate-y-1.5"
              }`}
            />
            {/* Bar 2 (Middle) */}
            <span
              className={`absolute h-[2px] w-5 rounded-full transition-all duration-200 ease-in-out ${
                mobileMenuOpen
                  ? "opacity-0 scale-x-0 bg-[#F88E14]"
                  : "opacity-100 scale-x-100 bg-current"
              }`}
            />
            {/* Bar 3 (Bottom / Diagonal 2) */}
            <span
              className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen
                  ? "bg-[#F88E14] -rotate-45 translate-y-0"
                  : "bg-current translate-y-1.5"
              }`}
            />
          </div>
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070709]/98 backdrop-blur-2xl border-b border-[#F88E14]/20 px-6 py-6 space-y-3 animate-mobile-drawer shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, idx) => {
              const isReverb = link.name === "Reverb";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className={`text-base font-medium py-2.5 px-3 rounded-lg border-b border-white/5 transition-all duration-200 ${
                    isReverb
                      ? "text-white hover:text-[#F88E14] hover:bg-white/5"
                      : "text-[#F88E14] hover:text-white hover:bg-[#F88E14]/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
