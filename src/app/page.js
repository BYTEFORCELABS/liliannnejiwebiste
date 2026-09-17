import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MusicSection from "@/components/MusicSection";
import EventsSection from "@/components/EventsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <MusicSection />
        <EventsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
