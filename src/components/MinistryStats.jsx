import { Globe, Music, Flame, Users } from "lucide-react";

export default function MinistryStats() {
  const stats = [
    {
      icon: Flame,
      value: "15+ Years",
      label: "Kingdom Ministry",
      description: "Leading joyful praise and worship across Nigeria & the nations",
    },
    {
      icon: Music,
      value: "50M+",
      label: "Streams & Views",
      description: "Viral gospel hits touching hearts across all digital channels",
    },
    {
      icon: Globe,
      value: "500+",
      label: "Live Concerts",
      description: "RCCG conventions, international tours, and city-wide rallies",
    },
    {
      icon: Users,
      value: "Millions",
      label: "Lives Blessed",
      description: "Experiencing the supernatural breakthrough power of praise",
    },
  ];

  return (
    <section className="relative py-12 border-y border-[rgba(229,184,66,0.18)] bg-gradient-to-b from-[#09090d] via-[#0b0b10] to-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-panel-gold rounded-2xl p-6 text-center space-y-3 relative group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#e5b842]/10 border border-[#e5b842]/30 flex items-center justify-center text-[#ffd56b] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-black text-gold-gradient tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-300 mt-1">
                    {stat.label}
                  </p>
                </div>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed hidden sm:block">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
