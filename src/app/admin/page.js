"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Mail,
  Download,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  MessageSquare,
  Lock,
  LogOut,
  RefreshCw,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState("attendees");
  const [attendees, setAttendees] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [metrics, setMetrics] = useState({
    totalAttendees: 0,
    maleCount: 0,
    femaleCount: 0,
    topCity: "Port Harcourt",
    totalSubscribers: 0,
    checkedInCount: 0,
  });
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  // Check existing session on load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const resAttendees = await fetch("/api/admin/attendees");
      if (resAttendees.ok) {
        const data = await resAttendees.json();
        setAttendees(data.attendees || []);
        setMetrics(data.metrics || {});
        setIsAuthenticated(true);
      } else if (resAttendees.status === 401) {
        setIsAuthenticated(false);
      }

      const resSubs = await fetch("/api/admin/subscribers");
      if (resSubs.ok) {
        const dataSubs = await resSubs.json();
        setSubscribers(dataSubs.subscribers || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchDashboardData();
      } else {
        setLoginError(data.error || "Incorrect password. Try again.");
      }
    } catch (err) {
      setLoginError("Connection failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttendee = async (id, name) => {
    if (!confirm(`Are you sure you want to remove attendee "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/attendees?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAttendees(attendees.filter((a) => a.id !== id));
        fetchDashboardData();
      }
    } catch (err) {
      alert("Failed to delete attendee.");
    }
  };

  const handleToggleCheckIn = async (id) => {
    try {
      const res = await fetch("/api/admin/attendees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const data = await res.json();
        setAttendees(
          attendees.map((a) => (a.id === id ? { ...a, checkedIn: data.attendee.checkedIn } : a))
        );
      }
    } catch (err) {
      console.error("Check-in error:", err);
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers(subscribers.filter((s) => s.id !== id));
      }
    } catch (err) {
      alert("Failed to delete subscriber.");
    }
  };

  // Export Attendees to CSV
  const exportAttendeesCSV = () => {
    if (attendees.length === 0) {
      alert("No attendees to export.");
      return;
    }

    const headers = ["Ticket Ref", "Full Name", "Gender", "Email", "Phone", "City", "Registration Date", "Checked In"];
    const rows = filteredAttendees.map((a) => [
      `"${a.ticketCode || ""}"`,
      `"${a.fullName || ""}"`,
      `"${a.gender || ""}"`,
      `"${a.email || ""}"`,
      `"${a.phone || ""}"`,
      `"${a.city || ""}"`,
      `"${new Date(a.createdAt).toLocaleString()}"`,
      a.checkedIn ? "YES" : "NO",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Reverb_5_0_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Subscribers to CSV
  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export.");
      return;
    }

    const headers = ["Email", "Subscribed Date"];
    const rows = subscribers.map((s) => [`"${s.email}"`, `"${new Date(s.subscribedAt).toLocaleString()}"`]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Lilian_Nneji_Subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Attendees list
  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone?.includes(searchQuery) ||
      a.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ticketCode?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender =
      genderFilter === "all" || a.gender?.toLowerCase() === genderFilter.toLowerCase();

    return matchesSearch && matchesGender;
  });

  // ============================================================
  // 1. PASSCODE LOGIN SCREEN
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="relative w-44 h-12 mx-auto flex items-center justify-center">
              <Image
                src="/images/logo_white_text.png"
                alt="Minister Lilian Nneji"
                width={190}
                height={50}
                priority
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F88E14]/10 border border-[#F88E14]/30 text-[#F88E14] text-xs uppercase font-bold tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Access</span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Enter your master passcode to manage registrations & subscribers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Master Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter master passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F88E14]"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#F88E14] hover:bg-[#F9650B] text-black font-bold uppercase tracking-wider text-xs transition-colors shadow-lg active:scale-95"
            >
              {loading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
              ← Return to public website
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ============================================================
  // 2. AUTHENTICATED DASHBOARD WORKSPACE
  // ============================================================
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-zinc-950 border-b border-zinc-800/80 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative w-36 sm:w-44 h-9 block">
            <Image
              src="/images/logo_white_text.png"
              alt="Minister Lilian Nneji"
              fill
              className="object-contain"
            />
          </Link>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded bg-[#F88E14]/10 border border-[#F88E14]/30 text-[#F88E14]">
            Portal Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            title="Refresh Data"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          
          <Link
            href="/reverb"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#F88E14] transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <span>View /reverb Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 hover:text-red-400 border border-zinc-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Title & Live Metrics Row */}
        <div className="space-y-5">
          <div>
            <h1 className="font-fjalla text-3xl sm:text-4xl uppercase text-white font-bold tracking-tight">
              Event Registrations & Ministry Manager
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Live registrations for <strong>THE REVERB 5.0</strong> (1st Nov 2026, EUI Centre PH) and subscriber records.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Attendees */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Attendees</span>
                <Users className="w-4 h-4 text-[#F88E14]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-fjalla font-bold text-white">
                  {metrics.totalAttendees || attendees.length}
                </span>
                <span className="text-xs text-emerald-400 font-medium">Reserved</span>
              </div>
            </div>

            {/* Card 2: Gender Split */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Gender Demographics</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-white space-x-3">
                <span className="text-blue-400">{metrics.maleCount || 0} Male</span>
                <span className="text-zinc-600">•</span>
                <span className="text-pink-400">{metrics.femaleCount || 0} Female</span>
              </div>
            </div>

            {/* Card 3: Top City */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Top Location</span>
                <MapPin className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 text-lg sm:text-xl font-fjalla font-bold text-white truncate">
                {metrics.topCity || "Port Harcourt"}
              </div>
            </div>

            {/* Card 4: Subscribers */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Stay In Touch</span>
                <Mail className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-fjalla font-bold text-white">
                  {subscribers.length}
                </span>
                <span className="text-xs text-zinc-400 font-medium">Subscribers</span>
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("attendees")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === "attendees"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Reverb 5.0 Attendees ({attendees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === "subscribers"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: REVERB ATTENDEES TABLE                                */}
        {/* ============================================================ */}
        {activeTab === "attendees" && (
          <div className="space-y-4">
            
            {/* Search & Export Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search attendee by name, email, phone, ticket ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F88E14]"
                />
              </div>

              {/* Filter by Gender */}
              <div className="flex items-center gap-2">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-zinc-300 focus:outline-none"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {/* Export CSV Button */}
                <button
                  onClick={exportAttendeesCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Attendees Table */}
            <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4">Ticket Ref</th>
                      <th className="py-3.5 px-4">Full Name</th>
                      <th className="py-3.5 px-4">Gender</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">WhatsApp / Phone</th>
                      <th className="py-3.5 px-4">City</th>
                      <th className="py-3.5 px-4">Registered</th>
                      <th className="py-3.5 px-4 text-center">Door Check-in</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300">
                    {filteredAttendees.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="py-12 text-center text-zinc-500">
                          No attendees found. Try a different search query or register on the Reverb page.
                        </td>
                      </tr>
                    ) : (
                      filteredAttendees.map((attendee) => {
                        // Clean phone number for WhatsApp URL
                        const cleanPhone = attendee.phone?.replace(/[^0-9]/g, "");
                        const whatsappUrl = cleanPhone
                          ? `https://wa.me/${cleanPhone.startsWith("0") ? `234${cleanPhone.slice(1)}` : cleanPhone}`
                          : null;

                        return (
                          <tr key={attendee.id} className="hover:bg-zinc-900/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#F88E14]">
                              {attendee.ticketCode}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-white">
                              {attendee.fullName}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  attendee.gender?.toLowerCase() === "female"
                                    ? "bg-pink-500/15 text-pink-400 border border-pink-500/30"
                                    : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                                }`}
                              >
                                {attendee.gender}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={`mailto:${attendee.email}`}
                                className="text-zinc-300 hover:text-white underline decoration-zinc-700"
                              >
                                {attendee.email}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              {attendee.phone ? (
                                <div className="flex items-center gap-2">
                                  <span>{attendee.phone}</span>
                                  {whatsappUrl && (
                                    <a
                                      href={whatsappUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Chat on WhatsApp"
                                      className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                                    >
                                      <MessageSquare className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              ) : (
                                <span className="text-zinc-600">—</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300">
                              {attendee.city || "Port Harcourt"}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-500 text-xs">
                              {new Date(attendee.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleCheckIn(attendee.id)}
                                title="Click to toggle check-in"
                                className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                                  attendee.checkedIn
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                                }`}
                              >
                                {attendee.checkedIn ? (
                                  <>
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Admitted</span>
                                  </>
                                ) : (
                                  <span>Pending</span>
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteAttendee(attendee.id, attendee.fullName)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                                title="Delete attendee"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: NEWSLETTER SUBSCRIBERS                                */}
        {/* ============================================================ */}
        {activeTab === "subscribers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                Audience signed up through the <strong>"STAY IN TOUCH"</strong> community form.
              </p>
              <button
                onClick={exportSubscribersCSV}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Subscribers CSV</span>
              </button>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden shadow-xl max-w-3xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Subscriber Email</th>
                    <th className="py-3.5 px-4">Subscription Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-zinc-500">
                        No subscribers registered yet.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub, index) => (
                      <tr key={sub.id} className="hover:bg-zinc-900/50">
                        <td className="py-3 px-4 text-zinc-600">{index + 1}</td>
                        <td className="py-3 px-4 font-medium text-white">{sub.email}</td>
                        <td className="py-3 px-4 text-zinc-500 text-xs">
                          {new Date(sub.subscribedAt).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
