import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import GallerySlideshow from "@/components/GallerySlideshow";
// import EventsSection from "@/components/EventsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getGalleryItems } from "@/lib/db";

// The gallery is edited live from /admin, so this page must not be frozen
// into the build output.
export const dynamic = "force-dynamic";

export default function Home() {
  const featured = getGalleryItems().filter((item) => item.featured).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <MusicSection />
        <GallerySlideshow items={featured} />
        {/* <EventsSection /> */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
