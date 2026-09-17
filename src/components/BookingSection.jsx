"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Calendar, Sparkles, Clock } from "lucide-react";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    hostName: "",
    organization: "",
    email: "",
    phone: "",
    eventType: "Church Conference / Convention",
    eventDate: "",
    location: "",
    attendance: "500 - 2,000 People",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate clean dispatch
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Minister Lilian Nneji Management, I would like to inquire about booking Minister Lilian for an upcoming gospel ministration/event."
  );

  return (
    <section id="booking" className="relative py-24 bg-[#070709] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#e5b842]/12 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold">
            <Calendar className="w-3.5 h-3.5 text-[#ffd56b]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#ffd56b]">
              Official Ministration Bookings
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black uppercase text-white tracking-tight">
            Invite Minister <span className="text-gold-gradient">Lilian Nneji</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            For church conferences, praise nights, conventions, crusades, and global concerts. Complete the booking request below or contact our management team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Management Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="glass-panel-gold rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-[#ffd56b]">
                  Management & Coordination Office
                </span>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  Direct Contact Desk
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  For urgent scheduling, ministration confirmations, and logistics coordination.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                
                {/* Official Phone Number */}
                <a
                  href="tel:+2348023131871"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:border-[#e5b842] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e5b842]/20 border border-[#e5b842]/40 flex items-center justify-center text-[#ffd56b] group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Official Line / Call</span>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffd56b] transition-colors">
                      0802 313 1871 / +234 802 313 1871
                    </h4>
                  </div>
                </a>

                {/* WhatsApp Instant Booking */}
                <a
                  href={`https://wa.me/2348023131871?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Instant Chat</span>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Chat on WhatsApp Management
                    </h4>
                  </div>
                </a>

                {/* Email Address */}
                <a
                  href="mailto:bookings@liliannneji.com"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:border-[#e5b842] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e5b842]/20 border border-[#e5b842]/40 flex items-center justify-center text-[#ffd56b] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Official Bookings Email</span>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffd56b] transition-colors">
                      bookings@liliannneji.com
                    </h4>
                  </div>
                </a>

                {/* Base Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ffd56b]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Headquarters</span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Lagos, Nigeria (Available Globally)
                    </h4>
                  </div>
                </div>

              </div>

              {/* Protocol Note */}
              <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-400 leading-relaxed">
                <strong className="text-zinc-300">Official Notice:</strong> Please submit invitations at least 3–4 weeks in advance to allow for itinerary scheduling and spiritual preparation.
              </div>
            </div>

          </div>

          {/* Right Column: Formal Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-gold rounded-3xl p-8 sm:p-10 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-5 animate-in fade-in duration-500">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#e5b842]/20 border border-[#e5b842] flex items-center justify-center text-[#ffd56b]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-cinzel font-bold text-white">
                    Inquiry Received in Glory!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#ffd56b]">{formData.hostName || "Dear Minister"}</strong>. Your booking inquiry has been forwarded directly to Minister Lilian Nneji&apos;s management desk. We will contact you within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        hostName: "",
                        organization: "",
                        email: "",
                        phone: "",
                        eventType: "Church Conference / Convention",
                        eventDate: "",
                        location: "",
                        attendance: "500 - 2,000 People",
                        notes: "",
                      });
                    }}
                    className="gold-button px-7 py-3 rounded-full text-xs uppercase tracking-wider font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white uppercase tracking-wide">
                      Booking Inquiry Form
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Fill out the details below to request Minister Lilian Nneji for your event.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Host Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pastor David Adeleke"
                        value={formData.hostName}
                        onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>

                    {/* Church / Organization */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Church / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. RCCG Living Faith Parish"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@church.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Event Category
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      >
                        <option value="Church Conference / Convention">Church Conference / Convention</option>
                        <option value="Annual Praise & Worship Night">Annual Praise & Worship Night</option>
                        <option value="Sunday Celebration Service">Sunday Celebration Service</option>
                        <option value="Revival Crusade / Rally">Revival Crusade / Rally</option>
                        <option value="Wedding / Thanksgiving Ceremony">Wedding / Thanksgiving Ceremony</option>
                        <option value="International Tour Ministration">International Tour Ministration</option>
                        <option value="Other Kingdom Gathering">Other Kingdom Gathering</option>
                      </select>
                    </div>

                    {/* Proposed Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Proposed Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City & Country */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Event City & Country *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ikeja, Lagos, Nigeria"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      />
                    </div>

                    {/* Estimated Attendance */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Expected Attendance
                      </label>
                      <select
                        value={formData.attendance}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-[#e5b842] text-sm transition-colors"
                      >
                        <option value="Under 500 Attendees">Under 500 Attendees</option>
                        <option value="500 - 2,000 People">500 - 2,000 People</option>
                        <option value="2,000 - 10,000 People">2,000 - 10,000 People</option>
                        <option value="10,000+ Stadium / Arena">10,000+ Stadium / Arena</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes / Theme */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Event Theme & Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share the theme of the program, expectations, or schedule details..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#e5b842] text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="gold-button w-full py-4 rounded-xl text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-xl"
                  >
                    {loading ? (
                      <span>Transmitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Send Ministration Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-zinc-500">
                    🔒 All booking inquiries are strictly confidential and handled by the executive ministry management.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
