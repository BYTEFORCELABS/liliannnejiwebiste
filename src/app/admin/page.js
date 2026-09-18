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
  Tag
} from "lucide-react";

const GALLERY_CATEGORIES = [
  "Live Concerts",
  "The Reverb",
  "Studio & Portraits",
  "Award Moments"
];

const LYRICS_CATEGORIES = [
  "High Praise",
  "Prophetic Worship",
  "Afro-Gospel",
  "Thanksgiving"
];

const PRESET_IMAGES = [
  { label: "Award Portrait", path: "/images/about_award_portrait_v2.jpg" },
  { label: "Studio Yellow", path: "/images/about_yellow_studio_v2.jpg" },
  { label: "Reverb Poster", path: "/images/reverb_poster_v3.jpg" },
  { label: "Live Concert 1", path: "/images/hero_bg_live.jpg" },
  { label: "Reverb Polaroid 1", path: "/images/reverb_polaroid_1_v2.jpg" },
  { label: "Reverb Polaroid 2", path: "/images/reverb_polaroid_2_v2.jpg" },
  { label: "Reverb Polaroid 3", path: "/images/reverb_polaroid_3_v2.jpg" },
  { label: "Stage Worship", path: "/images/stage_worship.jpg" },
  { label: "Studio B&W", path: "/images/stay_in_touch_bw_v2.jpg" },
  { label: "COZA Thumb", path: "/images/video_thumb_coza.jpg" },
  { label: "Miracles Thumb", path: "/images/video_thumb_miracles.jpg" },
  { label: "Hero Portrait", path: "/images/hero_portrait.jpg" },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState("attendees");
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
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#F88E14] selection:text-black">
      
      {/* Top Admin Header */}
      <header className="bg-zinc-950 border-b border-zinc-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
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
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          
          <Link
            href="/reverb"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#F88E14] transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <span>View /reverb</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/gallery"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#F88E14] transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <span>View /gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/lyrics"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#F88E14] transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <span>View /lyrics</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 hover:text-red-400 border border-zinc-800 cursor-pointer"
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
              Ministry Management & Content Portal
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Live registrations for <strong>THE REVERB 5.0</strong>, subscribers, photo gallery catalog, and song lyrics CMS.
            </p>
          </div>

          {/* 4 Metrics Grid */}
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
                <span className="text-xs text-emerald-400 font-medium">Reverb 5.0</span>
              </div>
            </div>

            {/* Card 2: Subscribers */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Subscribers</span>
                <Mail className="w-4 h-4 text-[#F88E14]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-fjalla font-bold text-white">
                  {metrics.totalSubscribers || subscribers.length}
                </span>
                <span className="text-xs text-blue-400 font-medium">Audience</span>
              </div>
            </div>

            {/* Card 3: Gallery Photos */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Photo Gallery</span>
                <Camera className="w-4 h-4 text-[#F88E14]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-fjalla font-bold text-white">
                  {gallery.length}
                </span>
                <span className="text-xs text-amber-400 font-medium">Photos</span>
              </div>
            </div>

            {/* Card 4: Song Lyrics */}
            <div className="bg-zinc-950 p-4 sm:p-5 rounded-xl border border-zinc-800/80 shadow-md">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Song Lyrics</span>
                <Music className="w-4 h-4 text-[#F88E14]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-fjalla font-bold text-white">
                  {lyrics.length}
                </span>
                <span className="text-xs text-purple-400 font-medium">Catalog</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 border-b border-zinc-800 pb-3 overflow-x-auto">
          {/* Tab 1: Attendees */}
          <button
            onClick={() => setActiveTab("attendees")}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === "attendees"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Reverb Attendees ({attendees.length})</span>
          </button>

          {/* Tab 2: Subscribers */}
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === "subscribers"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          {/* Tab 3: Gallery */}
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === "gallery"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Gallery Manager ({gallery.length})</span>
          </button>

          {/* Tab 4: Lyrics */}
          <button
            onClick={() => setActiveTab("lyrics")}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === "lyrics"
                ? "bg-[#F88E14] text-black shadow-md"
                : "text-zinc-400 hover:text-white bg-zinc-900"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Lyrics Manager ({lyrics.length})</span>
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
                  className="px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs sm:text-sm text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {/* Export CSV Button */}
                <button
                  onClick={exportAttendeesCSV}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md flex-shrink-0 cursor-pointer"
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
                                className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer ${
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
                Audience signed up through the <strong>"STAY IN TOUCH"</strong> community form.
              </p>
              <button
                onClick={exportSubscribersCSV}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md cursor-pointer"
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
                <h3 className="font-fjalla text-xl uppercase font-bold text-white tracking-wide">
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md cursor-pointer"
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
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#F88E14] border border-[#F88E14]/30">
                        {photo.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="font-fjalla text-base font-bold text-white uppercase tracking-wide line-clamp-1">
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
                      <Edit className="w-3.5 h-3.5 text-[#F88E14]" />
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
                <h3 className="font-fjalla text-xl uppercase font-bold text-white tracking-wide">
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md cursor-pointer"
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
                      <td className="py-3.5 px-4 font-fjalla text-base font-bold text-white uppercase tracking-wide">
                        {song.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F88E14]/15 text-[#F88E14] border border-[#F88E14]/30">
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
                            className="text-[#F88E14] hover:underline flex items-center gap-1"
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
                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                            <span>Preview</span>
                          </button>

                          <button
                            onClick={() => handleOpenEditLyrics(song)}
                            className="text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Edit lyrics"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#F88E14]" />
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

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT PHOTO                                      */}
      {/* ============================================================ */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-fjalla text-xl font-bold uppercase text-white tracking-wide">
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
                  className="px-5 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
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
              <h3 className="font-fjalla text-xl font-bold uppercase text-white tracking-wide">
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
                  className="px-5 py-2 bg-[#F88E14] hover:bg-[#F9650B] text-black rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
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
                <h3 className="font-fjalla text-2xl font-bold uppercase text-white tracking-wide">
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
