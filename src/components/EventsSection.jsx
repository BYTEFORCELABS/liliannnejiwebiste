"use client";

import Link from "next/link";

export default function EventsSection() {
  return (
    <section id="events" className="bg-black py-20 text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Screenshot 1 */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] uppercase tracking-wide font-bold">
            UPCOMING EVENTS
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-normal tracking-wide">
            Never miss a beat. Connect with Minister Lilian Nneji live in concert and other events
          </p>
        </div>

        {/* Event Banner Strip matching Screenshot 1 */}
        <div className="w-full bg-[#0d0d12] border-y border-zinc-800/80 py-6 px-6 sm:px-10 my-6 shadow-xl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            
            {/* Left: Date */}
            <div className="flex-shrink-0">
              <span className="font-fjalla text-3xl sm:text-4xl text-[#F88E14] font-bold tracking-tight">
                1ST NOV.
              </span>
            </div>

            {/* Location Tag */}
            <div className="flex-shrink-0">
              <span className="font-fjalla text-xl sm:text-2xl text-white font-bold tracking-wider">
                PH, NG
              </span>
            </div>

            {/* Event Name & Venue */}
            <div className="flex-grow text-center md:text-left md:px-6">
              <span className="font-fjalla text-lg sm:text-xl text-white tracking-wide uppercase font-medium">
                REVERB | EUI EVENT CENTER | 4:00 PM
              </span>
            </div>

            {/* Outlined Yellow REGISTER Button */}
            <div className="flex-shrink-0">
              <Link
                href="/reverb"
                className="inline-block border border-[#F88E14] text-[#F88E14] hover:bg-[#F88E14] hover:text-black font-semibold text-xs tracking-widest px-8 py-2.5 rounded-none uppercase transition-all duration-200 active:scale-95 shadow-md"
              >
                REGISTER
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
