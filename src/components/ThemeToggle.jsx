"use client";

import { Sun, Moon } from "lucide-react";

// Which icon shows is driven by CSS off <html data-theme>, not React state.
// That keeps the button correct on first paint with no hydration mismatch.
export default function ThemeToggle({ className = "" }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing: the choice just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className={`theme-toggle relative w-9 h-9 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:text-gold hover:border-[#F88E14]/50 transition-colors cursor-pointer flex-shrink-0 ${className}`}
    >
      <Sun className="theme-icon-sun w-4 h-4 absolute" />
      <Moon className="theme-icon-moon w-4 h-4 absolute" />
    </button>
  );
}
