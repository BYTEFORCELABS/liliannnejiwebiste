import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import GallerySlideshow from "@/components/GallerySlideshow";
// import EventsSection from "@/components/EventsSection";
import BookingSection from "@/components/BookingSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getGalleryItems } from "@/lib/db";

// The gallery is edited from /admin, so the page must not be frozen into the
// build output forever — but force-dynamic meant a server render on every
// single visit, with no CDN caching, which costs TTFB and LCP. Core Web
// Vitals are a ranking signal, so this is served statically and refreshed
// in the background instead.
export const revalidate = 3600;

export default function Home() {
  const featured = getGalleryItems().filter((item) => item.featured).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-black text-ink">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <MusicSection />
        <GallerySlideshow items={featured} />
        {/* <EventsSection /> */}
        <BookingSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
