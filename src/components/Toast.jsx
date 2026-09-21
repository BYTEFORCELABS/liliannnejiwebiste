"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

export default function Toast({ open, message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-enter fixed bottom-6 left-6 z-[60] flex items-center gap-3 pl-4 pr-3 py-3.5 bg-[#0d0d12] border border-[#F88E14]/40 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] max-w-[calc(100vw-3rem)] sm:max-w-sm"
    >
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F88E14]/15 border border-[#F88E14]/40 flex items-center justify-center">
        <Check className="w-4 h-4 text-[#F88E14]" />
      </span>

      <p className="text-sm text-zinc-100 font-medium leading-snug">{message}</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="flex-shrink-0 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      <span
        className="absolute bottom-0 left-0 h-0.5 bg-[#F88E14]/70 slide-progress"
        style={{ "--slide-duration": `${duration}ms`, width: "100%" }}
      />
    </div>
  );
}
