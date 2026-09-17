"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Reverb", href: "/reverb" },
    { name: "About", href: "/#about" },
    { name: "Music", href: "/#music" },
    { name: "Events", href: "/#events" },
    { name: "Booking", href: "/#booking" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname === "/reverb"
          ? "bg-black border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo on the left */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-40 sm:w-52 h-12 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Minister Lilian Nneji"
              width={210}
              height={55}
              priority
              className="object-contain filter brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </Link>

        {/* Navigation links sitting in their rightful position on the right */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive =
              (pathname === "/reverb" && link.name === "Reverb") ||
              (pathname === "/" && link.name === "Home");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] lg:text-[16px] font-medium tracking-normal transition-colors duration-200 ${
                  isActive
                    ? "text-[#f3c242] font-semibold"
                    : "text-zinc-200 hover:text-[#f3c242]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#f3c242] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070709]/98 backdrop-blur-2xl border-b border-[#f3c242]/20 px-6 py-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isReverb = link.name === "Reverb" && pathname === "/reverb";
              const isHome = link.name === "Home" && pathname === "/";
              const isActive = isReverb || isHome;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-white/5 transition-colors ${
                    isActive
                      ? "text-[#f3c242] font-bold"
                      : "text-zinc-200 hover:text-[#f3c242]"
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
