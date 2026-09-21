"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setFeedbackMsg(data.message || "Thank you for subscribing! Welcome to the praise tribe.");
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black py-16 sm:py-24 text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Black and White Portrait matching Screenshot 2 */}
          <Reveal variant="left" className="lg:col-span-6 flex justify-center">
            <div className="group relative w-full max-w-lg aspect-[4/3] rounded-sm overflow-hidden bg-zinc-950 shadow-2xl border border-zinc-800/80">
              <Image
                src="/images/stay_in_touch_bw_v2.jpg"
                alt="Minister Lilian Nneji in Worship Reflection"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              />
            </div>
          </Reveal>

          {/* Right Column: STAY IN TOUCH Form matching Screenshot 2 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <Reveal as="h3" variant="wipe" className="font-fjalla text-4xl sm:text-6xl text-[#F88E14] font-bold tracking-tight uppercase">
                STAY IN TOUCH
              </Reveal>
              <Reveal as="p" variant="up" delay={140} className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                Be the first to listen to our new sounds and find out where we're coming to next...
              </Reveal>
            </div>

            {subscribed ? (
              <div className="p-4 bg-zinc-900 border border-[#F88E14]/40 rounded-none max-w-lg flex items-center gap-3 text-[#F88E14] animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-[#F88E14]" />
                <span className="text-sm font-semibold text-white">
                  {feedbackMsg || "Thank you for subscribing! You'll be notified of new sounds & tour dates."}
                </span>
              </div>
            ) : (
              <Reveal variant="up" delay={240} className="space-y-2 max-w-lg">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-0">
                  <input
                    type="email"
                    required
                    disabled={loading}
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-3.5 bg-white text-black placeholder:text-zinc-500 text-sm font-normal focus:outline-none rounded-none shadow-md disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="border border-[#F88E14] bg-black hover:bg-[#F88E14] text-[#F88E14] hover:text-black font-semibold text-xs tracking-widest px-8 py-3.5 uppercase transition-colors rounded-none mt-2 sm:mt-0 flex-shrink-0 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
                  </button>
                </form>
                {errorMsg && (
                  <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
                )}
              </Reveal>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
