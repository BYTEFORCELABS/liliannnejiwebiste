import Image from "next/image";

export default function AwardBanner() {
  return (
    <section className="bg-black py-20 border-t border-white/5 text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Block 1: Award-Winning Tagline & Description Quote */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="font-fjalla text-2xl sm:text-4xl lg:text-5xl text-[#f3c242] uppercase tracking-wide font-bold">
            Award-Winning Gospel Praise Artist
          </h2>
          <p className="text-white text-base sm:text-lg lg:text-xl font-normal leading-relaxed italic text-zinc-200">
            &ldquo;<strong>Minister Lilian Nneji</strong> is a multi-talented Nigerian gospel singer, songwriter, and anointed worship leader celebrated across nations for her unique fusion of high-energy African praise, deep spiritual worship, and joyful kingdom dance vibes.&rdquo;
          </p>
        </div>

        {/* Block 2: Awards / Accolades Showcase */}
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <h3 className="font-fjalla text-2xl sm:text-4xl lg:text-5xl text-[#f3c242] uppercase tracking-wide font-bold">
              Global Music Awards & Honors
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base uppercase tracking-wider font-medium">
              Gospel Praise Artist of the Year • The Jesus Dance Queen
            </p>
          </div>

          {/* Golden Trophy Graphic */}
          <div className="flex justify-center pt-2">
            <div className="relative w-44 sm:w-56 aspect-square hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_30px_rgba(243,194,66,0.25)]">
              <Image
                src="/images/award_trophy.jpg"
                alt="Gospel Music Award Trophy"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
