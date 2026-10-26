"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import AwardsStrip from "@/components/AwardsStrip";

const HIT_SINGLES = [
  // Omeriwo leads: it is the viral hit, so it opens the marquee.
  "Omeriwo",
  "Onwere Ihe Omere Mu",
  "E Get Why",
  "Mercy",
  "Odogwu N'agha",
  "Ko Joo",
  "Ntughari",
];

const Name = ({ children }) => <strong className="text-ink font-semibold">{children}</strong>;

const BIOGRAPHY = [
  <>
    Anointed and award-winning music minister <Name>Lilian Nneka Nneji</Name>, popularly known as{" "}
    <Name>Lilian Nneji</Name>, is a Nigerian female gospel singer, songwriter, worship leader and recording
    artiste. She is popularly known for her gospel hit singles like If E Reach Your Turn, Onwere Ihe Omere Mù,
    E Get Why, Mercy, Odogwu N&rsquo;agha, Ko Joo, Ntughari and more.
  </>,
  <>
    Lilian Nneji, an ordained assistant pastor, is an energetic praise leader. Born on the 18th of July, she is
    the 5th child in a family of six children from <Name>Imo State, Nigeria</Name>.
  </>,
  <>
    She graduated from the University of Ado-Ekiti, where she studied B.Sc. Accounting, and worked
    professionally for 10 years even while doing the work of ministry, until the Lord called her into full-time
    ministry. Since then she has travelled around the world preaching through her music, singing and dancing
    energetically to God.
  </>,
  <>
    In October 2026, Lilian Nneji was awarded <Name>Africa Gospel Artiste of the Year</Name> by the prestigious
    Clima Africa Awards.
  </>,
  <>
    She was awarded <Name>Africa Praise Artiste of the Year 2024</Name> by the prestigious Clima Africa Awards.
    She was also awarded <Name>Praise Minstrel of the Year 2024</Name> at the Global Merit Awards, and was
    presented with the <Name>Outstanding Gospel Minister Award 2024</Name> by the Abundant Life Meritorious
    Gospel Award.
  </>,
  <>
    In July 2025, Lilian Nneji became an <Name>honorary citizen of the State of Georgia, USA</Name>, and was
    presented with a certificate during her Lilian Nneji Live in Concert, a huge and successful concert in Lagos.
  </>,
  <>
    In October 2025, she was presented with an <Name>honorary Doctorate of Music</Name> by the Global University
    of Science and Technology, Delaware, USA.
  </>,
  <>
    Lilian Nneji was also awarded <Name>Africa Most Outstanding Gospel Music Minister (Stage Category) of the
    Year 2025</Name> by the prestigious Clima Awards Africa.
  </>,
  <>
    She has written several songs that have brought joy to many, telling of the importance of serving God
    consistently and diligently, and of being steadfast in the place of faith.
  </>,
  <>
    She released her first praise medley, titled <Name>Anointed Praise (Praise Medley)</Name>, in 2011, and
    since then she has consistently released several singles that are available on online stores.
  </>,
  <>
    Lilian Nneji is popularly known for her energetic dance on stage and her Igbo song renditions at the RCCG
    monthly programmes. She&rsquo;s fondly called &ldquo;Energy&rdquo;, &ldquo;Odogwu&rdquo; and &ldquo;Praise
    Machine&rdquo;, and is one of the lead singers in The Redeemed Christian Church of God National Mass Choir.
  </>,
  <>
    She has graced the stage with several gospel greats, both locally and internationally. Lilian Nneji has
    ministered in several RCCG churches and several other denominations, and was one of the music ministers at
    the Reinhard Bonnke Farewell Crusade.
  </>,
  <>
    She is an advocate of &lsquo;God&rsquo;s Timing&rsquo; and a teacher of the word of God. She serves as the
    Music Director/Worship Leader at RCCG Lagos Province 2 and coordinates a music band called{" "}
    <Name>&lsquo;Anointed Praise Team&rsquo;</Name>, which performs at all gospel events.
  </>,
  <>
    Lilian Nneji is also the CEO of <Name>Lilian Nneji Global Ltd</Name>, a registered entertainment and event
    company in Nigeria.
  </>,
  <>
    She is happily married to her heartthrob, <Name>Pastor Joshua Nneji</Name>, an Area Pastor in the RCCG, and
    they are blessed with 3 amazing children.
  </>,
  <>
    Minister Lilian Nneji is mostly inspired by the ministry of the Word by her pastor, the General Overseer of
    the Redeemed Christian Church of God, <Name>Pastor Enoch Adeboye</Name>.
  </>,
  <>
    Lilian Nneji is greatly motivated by the desire to see her songs, writings, dance and concerts inspire the
    church and the whole world to worship God, while they are lifted and healed. She hopes that her listeners
    will be filled with the glory of God through her music.
  </>,
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-32 border-t border-hairline overflow-clip text-ink">

      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--color-zinc-900)_0%,var(--color-black)_60%)] pointer-events-none" />
      <div className="animate-breathe absolute -top-24 left-1/4 w-[460px] h-[460px] rounded-full bg-[#F88E14]/[0.07] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32">

        {/* ============================================================ */}
        {/* HEADING                                                      */}
        {/* ============================================================ */}
        <div className="space-y-4 max-w-3xl">
          <Reveal as="h2" variant="wipe" className="font-fjalla text-5xl sm:text-7xl lg:text-8xl text-gold font-bold uppercase tracking-tight leading-[0.95]">
            I Am Lilian
          </Reveal>

          <Reveal as="p" variant="up" delay={140} className="text-zinc-400 text-base sm:text-lg font-medium">
            Anointed and award-winning music minister, songwriter and worship leader.
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* ROW 1: PORTRAIT + BIOGRAPHY                                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">

          {/* Portrait: stays in view beside the long biography on desktop */}
          <Reveal variant="left" className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Offset gold frame */}
              <div className="absolute -inset-x-4 -inset-y-4 border border-[#F88E14]/30 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-700 ease-out pointer-events-none" />

              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 shadow-2xl">
                <Image
                  src="/images/live_worship_portrait.jpg"
                  alt="Minister Lilian Nneji leading worship"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-[52%_22%] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* Biography */}
          <div className="lg:col-span-7 space-y-8">

            <div className="space-y-5 text-zinc-300 text-[15px] sm:text-[17px] leading-[1.75] font-normal">
              {BIOGRAPHY.map((paragraph, idx) => (
                <Reveal key={idx} as="p" variant="up" delay={Math.min(idx, 3) * 100}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* KNOWN FOR: scrolling song marquee                            */}
        {/* ============================================================ */}
        <Reveal variant="up">
          <div className="marquee-host relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track gap-5" style={{ "--marquee-duration": "34s" }}>
              {[...HIT_SINGLES, ...HIT_SINGLES].map((song, idx) => (
                <span
                  key={`${song}-${idx}`}
                  className="flex-shrink-0 flex items-center gap-4 font-fjalla text-2xl sm:text-4xl uppercase font-bold tracking-tight text-zinc-600 hover:text-gold transition-colors duration-300"
                >
                  {song}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F88E14]/50" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ============================================================ */}
        {/* ROW 2: QUEEN OF PRAISE                                       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">

          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <Reveal as="h3" variant="wipe" className="font-fjalla text-4xl sm:text-6xl text-gold font-bold tracking-tight uppercase leading-[0.95]">
              Queen of Praise
            </Reveal>

            <div className="space-y-5 text-zinc-300 text-[15px] sm:text-[17px] leading-[1.75]">
              <Reveal as="p" variant="up" delay={140}>
                From church auditoriums in Nigeria to praise nights across the continent and beyond, Minister Lilian
                Nneji has built a ministry on one thing: an unrelenting, danceable, joyful gratitude to God. Her
                sets are physical. She sings, she dances, she pulls a congregation to its feet.
              </Reveal>

              <Reveal as="p" variant="up" delay={300}>
                Ten years in professional accounting taught her discipline; the call taught her surrender. Today
                she gives both to the altar, leading praise with the same energy at a packed arena as at a midweek
                service.
              </Reveal>
            </div>

            <Reveal variant="up" delay={400} className="flex flex-wrap gap-2.5 pt-2">
              {["Praise Leader", "Songwriter", "Recording Artiste", "Worship Leader"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 border border-[#F88E14]/25 text-[11px] uppercase tracking-wider font-semibold text-zinc-300 hover:border-[#F88E14] hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative group max-w-lg mx-auto lg:ml-auto">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-zinc-950 shadow-2xl">
                <Image
                  src="/images/reverb_ministering.jpg"
                  alt="Minister Lilian Nneji ministering live at The Reverb"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[58%_28%] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-x-4 -inset-y-4 border border-[#F88E14]/25 -translate-x-3 translate-y-3 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-700 ease-out pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* ============================================================ */}
        {/* AWARDS STRIP                                                 */}
        {/* ============================================================ */}
        <AwardsStrip />

      </div>
    </section>
  );
}
