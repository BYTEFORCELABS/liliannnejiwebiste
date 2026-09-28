"use client";

import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/SocialIcons";

// Official WhatsApp brand green, and the darker shade they use for hover.
const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#1EBE5A";

const WHATSAPP_NUMBER = "2348023131871";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Minister Lilian Nneji Management, I would like to enquire about booking Minister Lilian for an upcoming ministration."
);

export default function FloatingWhatsApp() {
  // Held back until the visitor has scrolled past the hero, so it never
  // covers the opening frame or the hero's own call to action.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Minister Lilian Nneji's management on WhatsApp"
      title="Chat with management on WhatsApp"
      data-visible={visible ? "true" : "false"}
      // Sits under the mobile menu (z-70) and the awards lightbox (z-80),
      // so neither ends up with a green button floating over it.
      className="floating-whatsapp group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-0 hover:gap-3 rounded-full pl-0 pr-0 hover:pr-5 h-14 sm:h-[60px] shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_38px_rgba(37,211,102,0.65)] transition-all duration-400 ease-out"
      style={{ backgroundColor: WHATSAPP_GREEN }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = WHATSAPP_GREEN_DARK; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = WHATSAPP_GREEN; }}
    >
      {/* Pulse ring, drawn behind the button */}
      <span
        aria-hidden="true"
        className="whatsapp-pulse absolute inset-0 rounded-full"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      />

      <span className="relative flex items-center justify-center w-14 sm:w-[60px] h-full flex-shrink-0">
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </span>

      {/* Label unfurls on hover, desktop only */}
      <span className="relative hidden lg:block max-w-0 group-hover:max-w-[200px] overflow-hidden whitespace-nowrap text-white font-semibold text-sm transition-all duration-400 ease-out">
        Chat with management
      </span>
    </a>
  );
}
