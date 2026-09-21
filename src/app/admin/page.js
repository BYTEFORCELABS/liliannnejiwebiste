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
  Camera,
  Music,
  Plus,
  Edit,
  Eye,
  X,
  FileText,
  Check,
  Tag,
  LayoutDashboard,
  Menu,
  ArrowUpRight,
  PanelLeftClose
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "attendees", label: "Reverb Attendees", icon: Users },
  { id: "subscribers", label: "Subscribers", icon: Mail },
  { id: "gallery", label: "Gallery Manager", icon: Camera },
  { id: "lyrics", label: "Lyrics Manager", icon: Music },
];

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/lyrics", label: "Lyrics" },
  { href: "/reverb", label: "Reverb" },
];

const GALLERY_CATEGORIES = [
  "Live Concerts",
  "The Reverb",
  "Praise Team & Band",
  "Portraits"
];

const LYRICS_CATEGORIES = [
  "High Praise",
  "Prophetic Worship",
  "Afro-Gospel",
  "Thanksgiving"
];

const PRESET_IMAGES = [
  { label: "Fire on the Altar", path: "/images/live_praise_fire.jpg" },
  { label: "Lifted Voice", path: "/images/live_worship_portrait.jpg" },
  { label: "Every Hand Lifted", path: "/images/live_crowd_bw.jpg" },
  { label: "Face to Face", path: "/images/live_congregation.jpg" },
  { label: "Praise in Motion", path: "/images/live_dancers_stage.jpg" },
  { label: "The Full Stage", path: "/images/live_choir_wide.jpg" },
  { label: "Call and Response", path: "/images/live_duet_stage.jpg" },
  { label: "Live Altar", path: "/images/hero_bg_live.jpg" },
  { label: "Pure Joy", path: "/images/reverb_joy_denim.jpg" },
  { label: "A Word Before", path: "/images/reverb_ministering.jpg" },
  { label: "All the Way Back", path: "/images/reverb_praise_lean.jpg" },
  { label: "Now Ministering", path: "/images/reverb_banner_stage.jpg" },
  { label: "The Praise Team", path: "/images/reverb_praise_team.jpg" },
  { label: "Packed House", path: "/images/reverb_wide_stage.jpg" },
  { label: "Voices in Blue", path: "/images/reverb_polaroid_1_v2.jpg" },
  { label: "Bowed in Worship", path: "/images/reverb_polaroid_2_v2.jpg" },
  { label: "Two Voices", path: "/images/reverb_polaroid_3_v2.jpg" },
  { label: "Talking Drums", path: "/images/band_drummers.jpg" },
  { label: "The Drummer", path: "/images/band_talking_drum_bw.jpg" },
  { label: "Keys and Bass", path: "/images/band_keys_bass.jpg" },
  { label: "Strings", path: "/images/band_guitars_bw.jpg" },
  { label: "Stage Portrait", path: "/images/about_award_portrait_v2.jpg" },
  { label: "In Full Voice", path: "/images/about_yellow_studio_v2.jpg" },
  { label: "Between Sets", path: "/images/stay_in_touch_bw_v2.jpg" },
  { label: "Reverb Poster", path: "/images/reverb_poster_v3.jpg" },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rail, setRail] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [lyrics, setLyrics] = useState([]);

  const [metrics, setMetrics] = useState({
    totalAttendees: 0,
    maleCount: 0,
    femaleCount: 0,
    topCity: "Port Harcourt",
    totalSubscribers: 0,
    checkedInCount: 0,
    totalPhotos: 0,
    totalSongs: 0,
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lyricsFilter, setLyricsFilter] = useState("All");

  // Gallery Modal State
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    title: "",
    category: "Live Concerts",
    imageUrl: "/images/hero_bg_live.jpg",
    caption: "",
    date: new Date().toISOString().split("T")[0],
    featured: false,
  });

  // Lyrics Modal State
  const [lyricsModalOpen, setLyricsModalOpen] = useState(false);
  const [editingLyrics, setEditingLyrics] = useState(null);
  const [lyricsForm, setLyricsForm] = useState({
    title: "",
    category: "Prophetic Worship",
    album: "Single",
    releaseYear: new Date().getFullYear().toString(),
    youtubeUrl: "",
    lyrics: "",
    featured: false,
  });

  // Lyrics Preview Modal State
  const [previewingLyrics, setPreviewingLyrics] = useState(null);

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

      const resGallery = await fetch("/api/admin/gallery");
      if (resGallery.ok) {
        const dataGal = await resGallery.json();
        setGallery(dataGal.items || []);
      }

      const resLyrics = await fetch("/api/admin/lyrics");
      if (resLyrics.ok) {
        const dataLyr = await resLyrics.json();
        setLyrics(dataLyr.items || []);
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

  // --- ATTENDEE HANDLERS ---

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

  // --- GALLERY HANDLERS ---

  const handleOpenAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: "",
      category: "Live Concerts",
      imageUrl: "/images/hero_bg_live.jpg",
      caption: "",
      date: new Date().toISOString().split("T")[0],
      featured: false,
    });
    setPhotoModalOpen(true);
  };

  const handleOpenEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title || "",
      category: photo.category || "Live Concerts",
      imageUrl: photo.imageUrl || "",
      caption: photo.caption || "",
      date: photo.date || "",
      featured: Boolean(photo.featured),
    });
    setPhotoModalOpen(true);
  };

  const handleSavePhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.imageUrl) {
      alert("Please provide a title and image URL.");
      return;
    }

    try {
      if (editingPhoto) {
        const res = await fetch("/api/admin/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPhoto.id, ...photoForm }),
        });
        if (res.ok) {
          const data = await res.json();
          setGallery(gallery.map((g) => (g.id === editingPhoto.id ? data.item : g)));
          setPhotoModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(photoForm),
        });
        if (res.ok) {
          const data = await res.json();
          setGallery([data.item, ...gallery]);
          setPhotoModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save photo:", err);
      alert("Error saving photo.");
    }
  };

  const handleDeletePhoto = async (id, title) => {
    if (!confirm(`Are you sure you want to delete photo "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery(gallery.filter((g) => g.id !== id));
      }
    } catch (err) {
      alert("Failed to delete gallery photo.");
    }
  };

  // --- LYRICS HANDLERS ---

  const handleOpenAddLyrics = () => {
    setEditingLyrics(null);
    setLyricsForm({
      title: "",
      category: "Prophetic Worship",
      album: "Single",
      releaseYear: new Date().getFullYear().toString(),
      youtubeUrl: "",
      lyrics: "",
      featured: false,
    });
    setLyricsModalOpen(true);
  };

  const handleOpenEditLyrics = (song) => {
    setEditingLyrics(song);
    setLyricsForm({
      title: song.title || "",
      category: song.category || "Prophetic Worship",
      album: song.album || "",
      releaseYear: song.releaseYear || "",
      youtubeUrl: song.youtubeUrl || "",
      lyrics: song.lyrics || "",
      featured: Boolean(song.featured),
    });
    setLyricsModalOpen(true);
  };

  const handleSaveLyrics = async (e) => {
    e.preventDefault();
    if (!lyricsForm.title || !lyricsForm.lyrics) {
      alert("Please provide a song title and lyrics text.");
      return;
    }

    try {
      if (editingLyrics) {
        const res = await fetch("/api/admin/lyrics", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingLyrics.id, ...lyricsForm }),
        });
        if (res.ok) {
          const data = await res.json();
          setLyrics(lyrics.map((l) => (l.id === editingLyrics.id ? data.item : l)));
          setLyricsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/lyrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lyricsForm),
        });
        if (res.ok) {
          const data = await res.json();
          setLyrics([data.item, ...lyrics]);
          setLyricsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save lyrics:", err);
      alert("Error saving lyrics.");
    }
  };

  const handleDeleteLyrics = async (id, title) => {
    if (!confirm(`Are you sure you want to delete lyrics for "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/lyrics?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLyrics(lyrics.filter((l) => l.id !== id));
      }
    } catch (err) {
      alert("Failed to delete song lyrics.");
    }
  };

  // --- CSV EXPORTERS ---

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
      searchQuery === "" ||
      a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone?.includes(searchQuery) ||
      a.ticketCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.city?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = genderFilter === "all" || a.gender?.toLowerCase() === genderFilter.toLowerCase();
    return matchesSearch && matchesGender;
  });

  // Filtered Gallery list
  const filteredGallery = gallery.filter((item) => {
    if (galleryFilter === "All") return true;
    return item.category?.toLowerCase() === galleryFilter.toLowerCase();
  });

  // Filtered Lyrics list
  const filteredLyrics = lyrics.filter((item) => {
    if (lyricsFilter === "All") return true;
    return item.category?.toLowerCase() === lyricsFilter.toLowerCase();
  });

  // ============================================================
  // UN-AUTHENTICATED: LOGIN VIEW
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-[#F88E14] selection:text-black">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-2xl">
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
              Enter your master passcode to manage registrations, subscribers, gallery, & lyrics.
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
              className="w-full py-3 rounded-lg bg-[#F88E14] hover:bg-[#F9650B] text-black font-bold uppercase tracking-wider text-xs transition-colors shadow-lg active:scale-95 cursor-pointer"
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
  // AUTHENTICATED DASHBOARD VIEW
  // ============================================================
  const counts = {
    overview: null,
    attendees: metrics.totalAttendees || attendees.length,
    subscribers: metrics.totalSubscribers || subscribers.length,
    gallery: gallery.length,
    lyrics: lyrics.length,
  };

  const STAT_CARDS = [
    { tab: "attendees", label: "Attendees", value: counts.attendees, icon: Users },
    { tab: "subscribers", label: "Subscribers", value: counts.subscribers, icon: Mail },
    { tab: "gallery", label: "Photos", value: counts.gallery, icon: Camera },
    { tab: "lyrics", label: "Songs", value: counts.lyrics, icon: Music },
  ];

  const activeNav = NAV_ITEMS.find((item) => item.id === activeTab) || NAV_ITEMS[0];

  const goToTab = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#F88E14] selection:text-black">

      {/* Mobile drawer backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ============================================================ */}
      {/* SIDEBAR NAVIGATION                                           */}
      {/* ============================================================ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-zinc-950 border-r border-zinc-800/60 flex flex-col transition-all duration-200 ease-out lg:translate-x-0 ${
          rail ? "lg:w-16" : "lg:w-60"
        } w-60 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className={`h-16 flex items-center border-b border-zinc-800/60 ${rail ? "lg:justify-center lg:px-0" : ""} px-4 justify-between gap-2`}>
          <Link href="/" className={`relative h-8 block ${rail ? "lg:w-8" : "w-32"} w-32`}>
            <Image
              src={rail ? "/icon.png" : "/images/logo_white_text.png"}
              alt="Minister Lilian Nneji"
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="lg:hidden p-1.5 text-zinc-500 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sections */}
        <nav className="flex-grow overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const count = counts[item.id];
            return (
              <button
                key={item.id}
                onClick={() => goToTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={rail ? item.label : undefined}
                className={`relative w-full flex items-center gap-3 rounded-md py-2 text-sm transition-colors cursor-pointer text-left ${
                  rail ? "lg:justify-center lg:px-0 px-3" : "px-3"
                } ${
                  isActive
                    ? "bg-zinc-900 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#F88E14]" />
                )}
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#F88E14]" : ""}`} />
                <span className={`flex-grow truncate ${rail ? "lg:hidden" : ""}`}>{item.label}</span>
                {count !== null && (
                  <span className={`text-xs tabular-nums text-zinc-500 ${rail ? "lg:hidden" : ""}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-2 border-t border-zinc-800/60 space-y-0.5">
          <button
            onClick={() => setRail((v) => !v)}
            title={rail ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:flex w-full items-center gap-3 rounded-md py-2 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors cursor-pointer ${
              rail ? "justify-center px-0" : "px-3"
            }`}
          >
            <PanelLeftClose className={`w-4 h-4 flex-shrink-0 transition-transform ${rail ? "rotate-180" : ""}`} />
            <span className={rail ? "hidden" : "flex-grow text-left"}>Collapse</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            title={rail ? "Lock dashboard" : undefined}
            className={`w-full flex items-center gap-3 rounded-md py-2 text-sm text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors cursor-pointer ${
              rail ? "lg:justify-center lg:px-0 px-3" : "px-3"
            }`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={rail ? "lg:hidden" : ""}>Lock</span>
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* CONTENT COLUMN                                               */}
      {/* ============================================================ */}
      <div className={`flex flex-col min-h-screen transition-all duration-200 ${rail ? "lg:pl-16" : "lg:pl-60"}`}>

        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -ml-2 rounded-md text-zinc-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-medium text-zinc-100 truncate">{activeNav.label}</h1>
          </div>

          <button
            onClick={fetchDashboardData}
            title="Refresh data"
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 transition-colors cursor-pointer flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </header>

        {/* Main Container */}
        <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ============================================================ */}
        {/* OVERVIEW                                                     */}
        {/* ============================================================ */}
        {activeTab === "overview" && (
          <div className="space-y-10">

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STAT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.tab}
                    onClick={() => goToTab(card.tab)}
                    className="group text-left bg-zinc-950 p-4 rounded-lg border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs">{card.label}</span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-3xl font-medium text-zinc-100 tabular-nums leading-none">
                        {card.value}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-[#F88E14] transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick actions */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500">Quick actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { setActiveTab("gallery"); handleOpenAddPhoto(); }}
                  className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800/60 bg-zinc-950 hover:bg-zinc-900/40 hover:border-zinc-700 transition-colors cursor-pointer text-left"
                >
                  <Plus className="w-4 h-4 text-[#F88E14] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-200">Add a gallery photo</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Publish to the public gallery</p>
                  </div>
                </button>

                <button
                  onClick={() => { setActiveTab("lyrics"); handleOpenAddLyrics(); }}
                  className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800/60 bg-zinc-950 hover:bg-zinc-900/40 hover:border-zinc-700 transition-colors cursor-pointer text-left"
                >
                  <Plus className="w-4 h-4 text-[#F88E14] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-200">Add a song</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Add lyrics or a new release</p>
                  </div>
                </button>
              </div>
            </section>

            {/* Live site links */}
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500">View live site</h2>
              <div className="rounded-lg border border-zinc-800/60 bg-zinc-950 divide-y divide-zinc-800/60">
                {PUBLIC_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className="flex items-center justify-between px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900/40 hover:text-white transition-colors group first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="flex items-center gap-3">
                      <span>{link.label}</span>
                      <span className="text-xs text-zinc-600">{link.href}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#F88E14] transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

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
                  className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {/* Export CSV Button */}
                <button
                  onClick={exportAttendeesCSV}
                  className="flex items-center gap-2 px-3 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 text-sm rounded-md transition-colors flex-shrink-0 cursor-pointer"
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
                                    ? "text-zinc-400"
                                    : "text-zinc-400"
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
                                      className="p-1 rounded text-emerald-500/80 hover:text-emerald-400 transition-colors"
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
                                className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                                  attendee.checkedIn
                                    ? "text-emerald-400/90"
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
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
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
                Audience signed up through the <strong>Stay in Touch</strong> form.
              </p>
              <button
                onClick={exportSubscribersCSV}
                className="flex items-center gap-2 px-3 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-900 text-sm rounded-md transition-colors cursor-pointer"
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
                            className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
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

        {/* ============================================================ */}
        {/* TAB 3: PHOTO GALLERY MANAGER                                 */}
        {/* ============================================================ */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-100">
                  Photo Gallery Catalog ({gallery.length})
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage photos displayed on the public <Link href="/gallery" target="_blank" className="text-[#F88E14] hover:underline">/gallery</Link> showcase.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Category Filter */}
                <select
                  value={galleryFilter}
                  onChange={(e) => setGalleryFilter(e.target.value)}
                  className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Add Photo Button */}
                <button
                  onClick={handleOpenAddPhoto}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black text-sm font-medium rounded-md transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGallery.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs bg-black/75 text-zinc-300 backdrop-blur-sm">
                        {photo.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="text-sm font-medium text-zinc-100 line-clamp-1">
                        {photo.title}
                      </h4>
                      {photo.caption && (
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                      )}
                      {photo.date && (
                        <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.date}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleOpenEditPhoto(photo)}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeletePhoto(photo.id, photo.title)}
                      className="text-zinc-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SONG LYRICS MANAGER                                   */}
        {/* ============================================================ */}
        {activeTab === "lyrics" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-100">
                  Song Lyrics Catalog ({lyrics.length})
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage song lyrics and catalog published on the public <Link href="/lyrics" target="_blank" className="text-[#F88E14] hover:underline">/lyrics</Link> repository.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Category Filter */}
                <select
                  value={lyricsFilter}
                  onChange={(e) => setLyricsFilter(e.target.value)}
                  className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {LYRICS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Add Song Button */}
                <button
                  onClick={handleOpenAddLyrics}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black text-sm font-medium rounded-md transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Song Lyrics</span>
                </button>
              </div>
            </div>

            {/* Lyrics Table */}
            <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="py-3.5 px-4">Song Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Album</th>
                    <th className="py-3.5 px-4">Year</th>
                    <th className="py-3.5 px-4">Video Link</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {filteredLyrics.map((song) => (
                    <tr key={song.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3.5 px-4 text-sm font-medium text-zinc-100">
                        {song.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-xs text-zinc-400 bg-zinc-800/70">
                          {song.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400">
                        {song.album || "Single"}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500">
                        {song.releaseYear}
                      </td>
                      <td className="py-3.5 px-4">
                        {song.youtubeUrl ? (
                          <a
                            href={song.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            <span>Watch</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => setPreviewingLyrics(song)}
                            className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Preview lyrics"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={() => handleOpenEditLyrics(song)}
                            className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Edit lyrics"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLyrics(song.id, song.title)}
                            className="text-zinc-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                            title="Delete song"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        </main>
      </div>

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT PHOTO                                      */}
      {/* ============================================================ */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-medium text-zinc-100">
                {editingPhoto ? "Edit Photo Details" : "Add New Gallery Photo"}
              </h3>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atmosphere of Miracles Praise Night"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Category *
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14] cursor-pointer"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Date
                  </label>
                  <input
                    type="date"
                    value={photoForm.date}
                    onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/photo.jpg or https://..."
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                />
                
                {/* Quick Presets Picker */}
                <div className="pt-1">
                  <span className="text-[11px] text-zinc-500 block mb-1">Or choose from existing image presets:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.path}
                        onClick={() => setPhotoForm({ ...photoForm, imageUrl: preset.path })}
                        className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          photoForm.imageUrl === preset.path
                            ? "bg-[#F88E14] text-black font-bold"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional brief description of this ministry moment..."
                  value={photoForm.caption}
                  onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black rounded-md text-sm font-medium cursor-pointer"
                >
                  {editingPhoto ? "Save Changes" : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT SONG LYRICS                                */}
      {/* ============================================================ */}
      {lyricsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-medium text-zinc-100">
                {editingLyrics ? "Edit Song Lyrics" : "Add New Song Lyrics"}
              </h3>
              <button
                onClick={() => setLyricsModalOpen(false)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLyrics} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eze Mu O"
                    value={lyricsForm.title}
                    onChange={(e) => setLyricsForm({ ...lyricsForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Category / Genre *
                  </label>
                  <select
                    value={lyricsForm.category}
                    onChange={(e) => setLyricsForm({ ...lyricsForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14] cursor-pointer"
                  >
                    {LYRICS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Album / Release
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Praise Vibes EP"
                    value={lyricsForm.album}
                    onChange={(e) => setLyricsForm({ ...lyricsForm, album: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                    Release Year
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={lyricsForm.releaseYear}
                    onChange={(e) => setLyricsForm({ ...lyricsForm, releaseYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={lyricsForm.youtubeUrl}
                  onChange={(e) => setLyricsForm({ ...lyricsForm, youtubeUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-[#F88E14]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-zinc-300">
                  Complete Lyrics Text *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="[Verse 1]&#10;Words of verse 1...&#10;&#10;[Chorus]&#10;Words of chorus..."
                  value={lyricsForm.lyrics}
                  onChange={(e) => setLyricsForm({ ...lyricsForm, lyrics: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#F88E14] leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setLyricsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black rounded-md text-sm font-medium cursor-pointer"
                >
                  {editingLyrics ? "Save Changes" : "Publish Song Lyrics"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PREVIEW LYRICS                                        */}
      {/* ============================================================ */}
      {previewingLyrics && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in fade-in my-8 max-h-[85vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-shrink-0">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F88E14]">
                  {previewingLyrics.category} • {previewingLyrics.releaseYear}
                </span>
                <h3 className="text-lg font-medium text-zinc-100">
                  {previewingLyrics.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewingLyrics(null)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow pr-2 text-sm text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
              {previewingLyrics.lyrics}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end flex-shrink-0">
              <button
                onClick={() => setPreviewingLyrics(null)}
                className="px-5 py-2 bg-zinc-900 text-zinc-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
