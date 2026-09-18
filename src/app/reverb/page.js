"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  SpotifyIcon,
} from "@/components/SocialIcons";
import { CheckCircle2, MapPin, ExternalLink, Sparkles } from "lucide-react";

function XTwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ThreadsIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.004 0C5.373 0 0 5.373 0 12c0 6.626 5.373 12 12.004 12 6.627 0 11.996-5.374 11.996-12 0-6.627-5.369-12-11.996-12zm4.819 14.152c-.314 2.378-2.127 4.092-4.664 4.092-2.88 0-4.991-2.22-4.991-5.244 0-3.045 2.111-5.244 4.991-5.244 2.059 0 3.737 1.155 4.398 2.946l-1.748.74c-.426-1.154-1.488-1.89-2.65-1.89-1.849 0-3.14 1.487-3.14 3.448 0 1.982 1.291 3.448 3.14 3.448 1.488 0 2.65-.968 2.872-2.316h-2.872v-1.796h4.743c.03.267.045.545.045.834 0 .332-.025.674-.074 1.01z" />
    </svg>
  );
}

function AppleMusicIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-.91.04-2.02.61-2.67 1.38-.58.67-1.08 1.76-.95 2.81 1.02.08 2.06-.5 2.68-1.27z" />
    </svg>
  );
}

function SoundcloudIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.16 11.23c-.08 0-.16.08-.16.16v4.35c0 .08.08.16.16.16s.16-.08.16-.16v-4.35c0-.08-.08-.16-.16-.16zm1.16-1.31c-.08 0-.16.08-.16.16v6.97c0 .08.08.16.16.16s.16-.08.16-.16V10.08c0-.08-.08-.16-.16-.16zm1.16-1.16c-.08 0-.16.08-.16.16v9.29c0 .08.08.16.16.16s.16-.08.16-.16V8.92c0-.08-.08-.16-.16-.16zm1.16-.58c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.34c0-.08-.08-.16-.16-.16zm1.16-.15c-.08 0-.16.08-.16.16v10.74c0 .08.08.16.16.16s.16-.08.16-.16V8.35c0-.08-.08-.16-.16-.16zm1.16.15c-.08 0-.16.08-.16.16v10.45c0 .08.08.16.16.16s.16-.08.16-.16V8.5c0-.08-.08-.16-.16-.16zm1.16.43c-.08 0-.16.08-.16.16v9.58c0 .08.08.16.16.16s.16-.08.16-.16V9.09c0-.08-.08-.16-.16-.16zm1.16.58c-.08 0-.16.08-.16.16v8.42c0 .08.08.16.16.16s.16-.08.16-.16V9.83c0-.08-.08-.16-.16-.16zm1.16.87c-.08 0-.16.08-.16.16v6.68c0 .08.08.16.16.16s.16-.08.16-.16v-6.68c0-.08-.08-.16-.16-.16zm2.32-4.06c-.44 0-.85.14-1.2.37v9.84c.35.23.76.37 1.2.37 1.28 0 2.32-1.04 2.32-2.32 0-.25-.04-.49-.12-.72 1.4-.29 2.44-1.53 2.44-3.02 0-1.71-1.38-3.09-3.09-3.09-.43 0-.83.09-1.19.25-.09-.94-.88-1.68-1.84-1.68-.08 0-.16 0-.24.01z" />
    </svg>
  );
}

// Crisp SVGs matching Screenshot 3 & 4 sponsor banners
function FortuneGlobalLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Wave icon */}
      <svg className="w-9 h-9 text-[#0066b2]" viewBox="0 0 64 64" fill="none">
        <path
          d="M12 40 C 20 20, 36 20, 52 32 C 40 46, 26 46, 12 40 Z"
          fill="#0066b2"
        />
        <path
          d="M18 24 C 28 8, 44 8, 56 20 C 44 32, 30 32, 18 24 Z"
          fill="#008ce3"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-extrabold text-[#004a80] text-lg sm:text-xl tracking-tight">
          FortuneGlobal
        </span>
        <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase mt-0.5">
          TRUST TO DELIVER
        </span>
      </div>
    </div>
  );
}

function CMCLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* 3 Hexagons Icon */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <span className="absolute top-0 left-0 w-3.5 h-3.5 rounded-sm bg-[#e63946] rotate-45 transform" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-sm bg-[#f4a261] rotate-45 transform" />
        <span className="absolute bottom-0 left-2 w-3.5 h-3.5 rounded-sm bg-[#0077b6] rotate-45 transform" />
      </div>
      <span className="font-black text-xl sm:text-2xl tracking-widest text-[#003049]">
        CMC
      </span>
    </div>
  );
}

export default function ReverbPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    email: "",
    phone: "",
    city: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketCode, setTicketCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/register-reverb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTicketCode(data.attendee.ticketCode);
        setIsRegistered(true);
      } else {
        setErrorMessage(data.error || "Registration failed. Please check your inputs.");
      }
    } catch (err) {
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/liliannnejiofficial" },
    { name: "X", icon: XTwitterIcon, url: "https://x.com/liliannneji" },
    { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/liliannneji/" },
    { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@LilianNneji" },
    { name: "Threads", icon: ThreadsIcon, url: "https://threads.net/@liliannneji" },
    { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/artist/2Ay5bXW6SZOV8sOkqkfNpa" },
    { name: "Apple Music", icon: AppleMusicIcon, url: "https://music.apple.com/artist/lilian-nneji" },
    { name: "SoundCloud", icon: SoundcloudIcon, url: "https://soundcloud.com/lilian-nneji" },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-sans">
      <Navbar />

      {/* Hero Registration Section (Screenshot 1 & 2) */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#0a1128]">
        {/* Giant Watermark Text matching Screenshot 1 & 2 */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-4 sm:pr-12">
          <span className="font-fjalla text-[22vw] font-black text-blue-950/40 uppercase tracking-tighter leading-none">
            REVERB
          </span>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/15 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left: Concert Flyer Poster Card matching Screenshot 1 */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-blue-400/30 bg-blue-950/50 group">
                <Image
                  src="/images/reverb_poster.jpg"
                  alt="The Reverb 5.0 with Minister Lilian Nneji"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Bottom Sponsorship Strip matching Screenshot 1 & 2 */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-blue-950/95 to-transparent p-4 sm:p-5 pt-10 text-[11px] sm:text-xs text-zinc-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blue-400/20 pt-2.5">
                    <span className="font-bold text-white tracking-wider">
                      FOR SPONSORSHIP & ENQUIRIES:
                    </span>
                    <span className="text-blue-300 font-semibold">
                      +234 802 313 1871
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                    <span>bookings@liliannneji.com</span>
                    <span>www.liliannneji.com/reverb</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Registration Form matching Screenshot 1 & 2 */}
            <div className="lg:col-span-6">
              <div className="p-2 sm:p-6">

                {isRegistered ? (
                  <div className="p-8 sm:p-10 rounded-2xl bg-blue-950/80 border border-blue-400/40 text-center space-y-4 animate-in fade-in shadow-2xl">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-fjalla font-bold text-white uppercase tracking-wide">
                      Seat Reserved for Reverb 5.0!
                    </h3>

                    {/* Ticket Code Display Badge */}
                    {ticketCode && (
                      <div className="inline-block px-5 py-2.5 rounded-lg bg-blue-900/60 border border-blue-400/50 my-2">
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-300">
                          Official Ticket Pass Ref:
                        </span>
                        <span className="text-2xl font-mono font-black text-[#f3c242] tracking-wider">
                          {ticketCode}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
                      Hallelujah, <strong className="text-blue-300">{formData.fullName}</strong>! Your registration is confirmed for <strong>REVERB 5.0</strong> at EUI Event Center, Port Harcourt on <strong>1st Nov 2026</strong>. An admission pass with seating details has been sent to your email.
                    </p>
                    <button
                      onClick={() => {
                        setIsRegistered(false);
                        setTicketCode("");
                        setFormData({
                          fullName: "",
                          gender: "Male",
                          email: "",
                          phone: "",
                          city: "",
                        });
                      }}
                      className="mt-4 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30"
                    >
                      Register Another Attendee
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                      />
                    </div>

                    {/* Gender Radio matching Screenshot 1 */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white block">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 text-sm text-zinc-100 font-normal">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="accent-blue-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="accent-blue-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white">
                        Phone Number (WhatsApp Preferably)
                      </label>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                      />
                    </div>

                    {/* City of Residence */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-white">
                        City of Residence <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                      />
                    </div>

                    {/* Blue REGISTER Button matching Screenshot 1 & 2 */}
                    <div className="pt-2 flex justify-start">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#2f55d4] hover:bg-[#2546b8] text-white font-bold uppercase tracking-widest text-sm px-9 py-3 rounded-md transition-all shadow-xl hover:shadow-blue-600/40 active:scale-95"
                      >
                        {loading ? "REGISTERING..." : "REGISTER"}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: INCOMING... REVERB 5.0 + Polaroid Collage (Screenshot 2 & 3) */}
      <section className="bg-black py-20 sm:py-28 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Incoming Info matching Screenshot 2 & 3 */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[#ef4444] font-bold uppercase tracking-wider text-sm sm:text-base font-fjalla">
                  INCOMING...
                </span>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-fjalla font-bold text-white tracking-tight uppercase leading-none">
                  REVERB 5.0
                </h2>
              </div>

              <div>
                <button
                  onClick={() => window.scrollTo({ top: 120, behavior: "smooth" })}
                  className="bg-gradient-to-r from-zinc-700 via-blue-900 to-blue-600 text-white font-medium px-8 py-3 rounded-lg text-sm transition-all hover:scale-105 shadow-xl hover:shadow-blue-900/50"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Right Column: Overlapping Polaroid Collage matching Screenshot 3 */}
            <div className="lg:col-span-7 relative flex justify-center py-6 min-h-[420px] sm:min-h-[480px]">
              <div className="relative w-full max-w-lg h-full">

                {/* Polaroid 1: Large Concert Crowd (Back Left - tilted) */}
                <div className="absolute top-2 left-0 sm:left-4 w-60 sm:w-80 aspect-[4/3] bg-white p-3 pb-8 shadow-2xl rounded-sm -rotate-6 z-10 hover:z-30 hover:rotate-0 transition-transform duration-300">
                  <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                    <Image
                      src="/images/reverb_polaroid_1.jpg"
                      alt="Reverb live audience praise"
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Polaroid 2: High Praise Stage Ministration (Center/Right Top - tilted) */}
                <div className="absolute top-10 right-4 sm:right-16 w-52 sm:w-64 aspect-square bg-white p-3 pb-8 shadow-2xl rounded-sm rotate-6 z-20 hover:z-30 hover:rotate-0 transition-transform duration-300">
                  <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                    <Image
                      src="/images/reverb_polaroid_2.jpg"
                      alt="Minister Lilian Nneji ministering live on stage"
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Polaroid 3: Joyful Praise Moment (Bottom Right - tilted) */}
                <div className="absolute bottom-2 right-0 sm:right-6 w-56 sm:w-72 aspect-[4/3] bg-white p-3 pb-8 shadow-2xl rounded-sm -rotate-2 z-25 hover:z-30 hover:rotate-0 transition-transform duration-300">
                  <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                    <Image
                      src="/images/reverb_polaroid_3.jpg"
                      alt="Reverb concert joy"
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Sponsors & Partners Bar matching Screenshot 3 & 4 */}
      <section className="bg-[#e5e7eb] py-8 border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-8 sm:gap-12 opacity-90">
            <FortuneGlobalLogo />
            <CMCLogo />
            <FortuneGlobalLogo />
            <CMCLogo />
          </div>
        </div>
      </section>

      {/* Section 4: Venue & Google Map Embed matching Screenshot 4 & 5 */}
      <section className="relative w-full h-[450px] sm:h-[520px] bg-zinc-900 overflow-hidden border-b border-white/10">

        {/* Google Map Embed of EUI Centre, Port Harcourt */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.6983794348577!2d6.994326175024477!3d4.821816395153684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069ce00572e4003%3A0xe5a3c9b74070a7b5!2sEUI%20Centre!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="EUI Centre Port Harcourt Map"
          className="w-full h-full filter contrast-[1.02]"
        />

        {/* Floating Google Place Card matching Screenshot 4 */}
        <div className="absolute top-6 left-6 z-10 bg-white text-zinc-900 p-4 sm:p-5 rounded-lg shadow-2xl max-w-xs border border-zinc-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-base sm:text-lg text-black">
                EUI Centre
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-snug">
                Plot F11 Sani Abacha Road, GRA PHASE 3, Port Harcourt 500101, Rivers, Nigeria
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-zinc-700">
                <span className="text-zinc-900 font-bold">4.6</span>
                <span className="text-amber-500">★★★★☆</span>
                <span className="text-zinc-500">(720)</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=EUI+Centre+Plot+F11+Sani+Abacha+Road+GRA+PHASE+3+Port+Harcourt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 hover:bg-blue-100 transition-colors"
              title="Get Directions"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

      {/* Section 5: Footer matching Screenshot 5 */}
      <footer className="bg-black py-12 text-center space-y-7">
        {/* Yellow Social Icons Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-7 text-[#f3c242]">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hover:text-white transition-colors hover:scale-125 duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Thin Divider Line */}
        <div className="max-w-4xl mx-auto border-t border-zinc-800/80" />

        {/* Yellow Copyright Banner matching Screenshot 5 */}
        <div className="pt-1 flex justify-center">
          <div className="bg-[#f3c242] text-black font-bold text-xs sm:text-sm px-6 py-2 rounded-none shadow-md">
            Copyright © {new Date().getFullYear()} Minister Lilian Nneji | Designed by Engee Titus
          </div>
        </div>
      </footer>
    </div>
  );
}
