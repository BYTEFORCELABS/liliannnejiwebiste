import Image from "next/image";

// Both lockups are rendered and swapped by CSS off <html data-theme>, so the
// correct one is painted immediately with no hydration mismatch. The white
// wordmark disappears on a light page; the dark one disappears on a dark page.
export default function BrandLogo({ className = "w-44 h-12", sizes = "176px", priority = false }) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src="/images/logo_white_text.png"
        alt="Minister Lilian Nneji"
        fill
        sizes={sizes}
        preload={priority || undefined}
        className="logo-for-dark object-contain object-left drop-shadow-md"
      />
      <Image
        src="/images/logo_black_text.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="logo-for-light object-contain object-left"
      />
    </span>
  );
}
