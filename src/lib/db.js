import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ATTENDEES_FILE = path.join(DATA_DIR, "reverb_attendees.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const LYRICS_FILE = path.join(DATA_DIR, "lyrics.json");

// Default initial gallery seed items
const DEFAULT_GALLERY = [
  {
    "id": "gal_live_praise_fire",
    "title": "Fire on the Altar",
    "category": "Live Concerts",
    "imageUrl": "/images/live_praise_fire.jpg",
    "caption": "Hands lifted mid-praise as the whole auditorium breaks into worship.",
    "featured": true,
    "span": "wide",
    "createdAt": "2026-09-01T12:00:00.000Z"
  },
  {
    "id": "gal_reverb_joy_denim",
    "title": "Pure Joy",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_joy_denim.jpg",
    "caption": "Caught mid-laugh during a praise break with the band in full flight.",
    "featured": true,
    "span": "normal",
    "createdAt": "2026-09-01T11:00:00.000Z"
  },
  {
    "id": "gal_live_crowd_bw",
    "title": "Every Hand Lifted",
    "category": "Live Concerts",
    "imageUrl": "/images/live_crowd_bw.jpg",
    "caption": "Turning the room over to the congregation, with not a single seat still.",
    "featured": true,
    "span": "tall",
    "createdAt": "2026-09-01T10:00:00.000Z"
  },
  {
    "id": "gal_live_worship_portrait",
    "title": "Lifted Voice",
    "category": "Live Concerts",
    "imageUrl": "/images/live_worship_portrait.jpg",
    "caption": "Deep in the song, hand open, leading the house into adoration.",
    "featured": true,
    "span": "normal",
    "createdAt": "2026-09-01T09:00:00.000Z"
  },
  {
    "id": "gal_reverb_praise_lean",
    "title": "All the Way Back",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_praise_lean.jpg",
    "caption": "The praise team leaning into the last chorus of the night.",
    "featured": true,
    "span": "wide",
    "createdAt": "2026-09-01T08:00:00.000Z"
  },
  {
    "id": "gal_live_congregation",
    "title": "Face to Face",
    "category": "Live Concerts",
    "imageUrl": "/images/live_congregation.jpg",
    "caption": "Stepping to the edge of the stage to sing straight into the crowd.",
    "featured": true,
    "span": "normal",
    "createdAt": "2026-09-01T07:00:00.000Z"
  },
  {
    "id": "gal_reverb_ministering",
    "title": "A Word Before the Song",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_ministering.jpg",
    "caption": "A moment of exhortation between ministrations.",
    "featured": true,
    "span": "normal",
    "createdAt": "2026-09-01T06:00:00.000Z"
  },
  {
    "id": "gal_about_award_portrait_v2",
    "title": "Minister Lilian Nneji",
    "category": "Portraits",
    "imageUrl": "/images/about_award_portrait_v2.jpg",
    "caption": "On stage, mid-ministration, in her signature white cap.",
    "featured": true,
    "span": "normal",
    "createdAt": "2026-09-01T05:00:00.000Z"
  },
  {
    "id": "gal_live_dancers_stage",
    "title": "Praise in Motion",
    "category": "Live Concerts",
    "imageUrl": "/images/live_dancers_stage.jpg",
    "caption": "The full company of dancers and singers moving as one.",
    "featured": false,
    "span": "wide",
    "createdAt": "2026-09-01T04:00:00.000Z"
  },
  {
    "id": "gal_reverb_banner_stage",
    "title": "Now Ministering",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_banner_stage.jpg",
    "caption": "Taking the stage as the house rises to its feet.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-09-01T03:00:00.000Z"
  },
  {
    "id": "gal_live_choir_wide",
    "title": "The Full Stage",
    "category": "Live Concerts",
    "imageUrl": "/images/live_choir_wide.jpg",
    "caption": "Backing vocalists and dancers in formation under the crest.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-09-01T02:00:00.000Z"
  },
  {
    "id": "gal_reverb_praise_team",
    "title": "The Praise Team",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_praise_team.jpg",
    "caption": "Voices in blue, carrying the harmony behind the lead.",
    "featured": false,
    "span": "wide",
    "createdAt": "2026-09-01T01:00:00.000Z"
  },
  {
    "id": "gal_about_yellow_studio_v2",
    "title": "In Full Voice",
    "category": "Portraits",
    "imageUrl": "/images/about_yellow_studio_v2.jpg",
    "caption": "Holding a long note with the band driving behind her.",
    "featured": false,
    "span": "tall",
    "createdAt": "2026-09-01T00:00:00.000Z"
  },
  {
    "id": "gal_live_duet_stage",
    "title": "Call and Response",
    "category": "Live Concerts",
    "imageUrl": "/images/live_duet_stage.jpg",
    "caption": "Trading lines with a backing vocalist mid-song.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T23:00:00.000Z"
  },
  {
    "id": "gal_band_drummers",
    "title": "Talking Drums",
    "category": "Praise Team & Band",
    "imageUrl": "/images/band_drummers.jpg",
    "caption": "The percussion section driving the tempo of the praise.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T22:00:00.000Z"
  },
  {
    "id": "gal_reverb_polaroid_3_v2",
    "title": "Two Voices, One Song",
    "category": "Live Concerts",
    "imageUrl": "/images/reverb_polaroid_3_v2.jpg",
    "caption": "Leading a call-and-response with one of the vocalists.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T21:00:00.000Z"
  },
  {
    "id": "gal_stay_in_touch_bw_v2",
    "title": "Between Sets",
    "category": "Portraits",
    "imageUrl": "/images/stay_in_touch_bw_v2.jpg",
    "caption": "A quiet moment off-stage before the next ministration.",
    "featured": false,
    "span": "wide",
    "createdAt": "2026-08-31T20:00:00.000Z"
  },
  {
    "id": "gal_band_talking_drum_bw",
    "title": "The Drummer",
    "category": "Praise Team & Band",
    "imageUrl": "/images/band_talking_drum_bw.jpg",
    "caption": "Talking drum in hand, holding the groove together.",
    "featured": false,
    "span": "tall",
    "createdAt": "2026-08-31T19:00:00.000Z"
  },
  {
    "id": "gal_reverb_wide_stage",
    "title": "Packed House",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_wide_stage.jpg",
    "caption": "A full room from the back of the hall.",
    "featured": false,
    "span": "wide",
    "createdAt": "2026-08-31T18:00:00.000Z"
  },
  {
    "id": "gal_band_keys_bass",
    "title": "Keys and Bass",
    "category": "Praise Team & Band",
    "imageUrl": "/images/band_keys_bass.jpg",
    "caption": "The rhythm section laying the foundation for the praise.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T17:00:00.000Z"
  },
  {
    "id": "gal_reverb_polaroid_2_v2",
    "title": "Bowed in Worship",
    "category": "Live Concerts",
    "imageUrl": "/images/reverb_polaroid_2_v2.jpg",
    "caption": "The dancers bowed low as the room shifts into worship.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T16:00:00.000Z"
  },
  {
    "id": "gal_reverb_polaroid_1_v2",
    "title": "Voices in Blue",
    "category": "The Reverb",
    "imageUrl": "/images/reverb_polaroid_1_v2.jpg",
    "caption": "The praise team mid-song under the stage lights.",
    "featured": false,
    "span": "normal",
    "createdAt": "2026-08-31T15:00:00.000Z"
  },
  {
    "id": "gal_band_guitars_bw",
    "title": "Strings",
    "category": "Praise Team & Band",
    "imageUrl": "/images/band_guitars_bw.jpg",
    "caption": "Lead and bass guitar locked in behind the vocals.",
    "featured": false,
    "span": "tall",
    "createdAt": "2026-08-31T14:00:00.000Z"
  }
];

// Default initial lyrics seed items
const DEFAULT_LYRICS = [
  {
    "id": "lyr_eze_mu_o",
    "title": "Eze Mu O",
    "category": "Prophetic Worship",
    "album": "Single",
    "releaseYear": "2026",
    "youtubeUrl": "https://www.youtube.com/watch?v=DzjflH8peQY",
    "featured": true,
    "createdAt": "2026-09-01T12:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_jesus_nke_nazareth",
    "title": "Jesus Nke Nazareth",
    "category": "Prophetic Worship",
    "album": "Single",
    "releaseYear": "2026",
    "youtubeUrl": "https://www.youtube.com/watch?v=J_02EibFwd0",
    "featured": true,
    "createdAt": "2026-09-01T11:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_miracles_everywhere_live",
    "title": "Miracles Everywhere (Live)",
    "category": "High Praise",
    "album": "Single",
    "releaseYear": "2026",
    "youtubeUrl": "https://www.youtube.com/watch?v=LTGjfXEFjKQ",
    "featured": true,
    "createdAt": "2026-09-01T10:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_lng_praise_medley",
    "title": "LNG Praise Medley",
    "category": "High Praise",
    "album": "LNG Praise Medley (EP)",
    "releaseYear": "2026",
    "youtubeUrl": "https://www.youtube.com/watch?v=a9hKkxfWWdk",
    "featured": true,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_if_e_reach_your_turn",
    "title": "If E Reach Your Turn",
    "category": "Afro-Gospel",
    "album": "Single",
    "releaseYear": "2025",
    "youtubeUrl": "https://www.youtube.com/watch?v=Vd4W1wxs0hQ",
    "featured": false,
    "createdAt": "2026-09-01T08:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_elohim",
    "title": "Elohim",
    "category": "Prophetic Worship",
    "album": "Single",
    "releaseYear": "2025",
    "youtubeUrl": "https://www.youtube.com/watch?v=nLITWXwcUNQ",
    "featured": false,
    "createdAt": "2026-09-01T07:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_omeriwo_omeriwo_reprise",
    "title": "Omeriwo Omeriwo (Reprise)",
    "category": "Prophetic Worship",
    "album": "Single (Live)",
    "releaseYear": "2025",
    "youtubeUrl": "https://www.youtube.com/watch?v=A68T0Az-LUA",
    "featured": false,
    "createdAt": "2026-09-01T06:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_daalu",
    "title": "Daalu",
    "category": "Thanksgiving",
    "album": "Single",
    "releaseYear": "2024",
    "youtubeUrl": "https://www.youtube.com/watch?v=GUkdF3GIbVc",
    "featured": false,
    "createdAt": "2026-09-01T05:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_grateful",
    "title": "Grateful",
    "category": "Thanksgiving",
    "album": "Single",
    "releaseYear": "2024",
    "youtubeUrl": "https://www.youtube.com/watch?v=twamtRz-gDQ",
    "featured": false,
    "createdAt": "2026-09-01T04:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_this_kind_god_praise_vibes",
    "title": "This Kind God (Praise Vibes)",
    "category": "High Praise",
    "album": "Single, feat. Anointed Praise Band",
    "releaseYear": "2024",
    "youtubeUrl": "https://www.youtube.com/watch?v=lwSU9-EzuLo",
    "featured": false,
    "createdAt": "2026-09-01T03:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_praise_overload_live",
    "title": "Praise Overload (Live)",
    "category": "High Praise",
    "album": "Single (Live)",
    "releaseYear": "2023",
    "youtubeUrl": "https://www.youtube.com/watch?v=gfz0-Sb8Zi4",
    "featured": false,
    "createdAt": "2026-09-01T02:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_onwere_ihe_omere_m",
    "title": "Onwere Ihe Omere Mù",
    "category": "Thanksgiving",
    "album": "Single (Live)",
    "releaseYear": "2023",
    "youtubeUrl": "https://www.youtube.com/watch?v=xycVqgocXTI",
    "featured": false,
    "createdAt": "2026-09-01T01:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_e_get_why",
    "title": "E Get Why",
    "category": "Afro-Gospel",
    "album": "Single",
    "releaseYear": "2022",
    "youtubeUrl": "https://www.youtube.com/watch?v=r7_1GGfz0L8",
    "featured": false,
    "createdAt": "2026-09-01T00:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_ntughari_turn_around",
    "title": "Ntughari (Turn Around)",
    "category": "Afro-Gospel",
    "album": "Single",
    "releaseYear": "2021",
    "youtubeUrl": "",
    "featured": false,
    "createdAt": "2026-08-31T23:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_mercy",
    "title": "Mercy",
    "category": "Thanksgiving",
    "album": "Single",
    "releaseYear": "2020",
    "youtubeUrl": "https://www.youtube.com/watch?v=XM6WId4nVAc",
    "featured": false,
    "createdAt": "2026-08-31T22:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_ko_joo_never",
    "title": "Ko Joo (Never)",
    "category": "Afro-Gospel",
    "album": "Single",
    "releaseYear": "2019",
    "youtubeUrl": "https://www.youtube.com/watch?v=o6YwOAx2bJc",
    "featured": false,
    "createdAt": "2026-08-31T21:00:00.000Z",
    "lyrics": ""
  },
  {
    "id": "lyr_odogwu_n_agha",
    "title": "Odogwu N'agha",
    "category": "High Praise",
    "album": "Single",
    "releaseYear": "2018",
    "youtubeUrl": "https://www.youtube.com/watch?v=u9a4yCTN-wA",
    "featured": false,
    "createdAt": "2026-08-31T20:00:00.000Z",
    "lyrics": ""
  }
];

// Ensure data folder and storage files exist
function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ATTENDEES_FILE)) {
    fs.writeFileSync(ATTENDEES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(GALLERY_FILE)) {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(DEFAULT_GALLERY, null, 2), "utf-8");
  }
  if (!fs.existsSync(LYRICS_FILE)) {
    fs.writeFileSync(LYRICS_FILE, JSON.stringify(DEFAULT_LYRICS, null, 2), "utf-8");
  }
}

// Read JSON file safely
function readJSON(filePath) {
  ensureFiles();
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Write JSON file atomically
function writeJSON(filePath, data) {
  ensureFiles();
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

// --- ATTENDEE FUNCTIONS ---

export function getAttendees() {
  const attendees = readJSON(ATTENDEES_FILE);
  return attendees.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addAttendee({ fullName, gender, email, phone, city }) {
  const attendees = readJSON(ATTENDEES_FILE);

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketCode = `REV-5.0-${randomSuffix}`;

  const newAttendee = {
    id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ticketCode,
    fullName: fullName.trim(),
    gender: gender || "Male",
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    city: city ? city.trim() : "",
    createdAt: new Date().toISOString(),
    checkedIn: false,
  };

  attendees.unshift(newAttendee);
  writeJSON(ATTENDEES_FILE, attendees);
  return newAttendee;
}

export function deleteAttendee(id) {
  const attendees = readJSON(ATTENDEES_FILE);
  const filtered = attendees.filter((a) => a.id !== id);
  writeJSON(ATTENDEES_FILE, filtered);
  return true;
}

export function toggleCheckIn(id) {
  const attendees = readJSON(ATTENDEES_FILE);
  const attendee = attendees.find((a) => a.id === id);
  if (attendee) {
    attendee.checkedIn = !attendee.checkedIn;
    writeJSON(ATTENDEES_FILE, attendees);
    return attendee;
  }
  return null;
}

// --- SUBSCRIBER FUNCTIONS ---

export function getSubscribers() {
  const subscribers = readJSON(SUBSCRIBERS_FILE);
  return subscribers.sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt));
}

export function addSubscriber(email) {
  const subscribers = readJSON(SUBSCRIBERS_FILE);
  const normalized = email.trim().toLowerCase();

  const existing = subscribers.find((s) => s.email === normalized);
  if (existing) {
    return { existing: true, subscriber: existing };
  }

  const newSubscriber = {
    id: `sub_${Date.now()}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
  };

  subscribers.unshift(newSubscriber);
  writeJSON(SUBSCRIBERS_FILE, subscribers);
  return { existing: false, subscriber: newSubscriber };
}

export function deleteSubscriber(idOrEmail) {
  const subscribers = readJSON(SUBSCRIBERS_FILE);
  const filtered = subscribers.filter((s) => s.id !== idOrEmail && s.email !== idOrEmail);
  writeJSON(SUBSCRIBERS_FILE, filtered);
  return true;
}

// --- GALLERY FUNCTIONS ---

export function getGalleryItems() {
  const items = readJSON(GALLERY_FILE);
  return items.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
}

export function addGalleryItem({ title, category, imageUrl, caption, date, featured }) {
  const items = readJSON(GALLERY_FILE);

  const newItem = {
    id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: title ? title.trim() : "Untitled Photo",
    category: category || "Live Concerts",
    imageUrl: imageUrl ? imageUrl.trim() : "/images/hero_bg_live.jpg",
    caption: caption ? caption.trim() : "",
    date: date || new Date().toISOString().split("T")[0],
    featured: Boolean(featured),
    createdAt: new Date().toISOString(),
  };

  items.unshift(newItem);
  writeJSON(GALLERY_FILE, items);
  return newItem;
}

export function updateGalleryItem(id, updates) {
  const items = readJSON(GALLERY_FILE);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeJSON(GALLERY_FILE, items);
  return items[index];
}

export function deleteGalleryItem(id) {
  const items = readJSON(GALLERY_FILE);
  const filtered = items.filter((i) => i.id !== id);
  writeJSON(GALLERY_FILE, filtered);
  return true;
}

// --- LYRICS FUNCTIONS ---

export function getLyrics() {
  const items = readJSON(LYRICS_FILE);
  return items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}

export function getLyricsById(id) {
  const items = readJSON(LYRICS_FILE);
  return items.find((i) => i.id === id) || null;
}

export function addLyrics({ title, category, album, releaseYear, youtubeUrl, lyrics, featured }) {
  const items = readJSON(LYRICS_FILE);

  const newItem = {
    id: `lyr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: title ? title.trim() : "Untitled Song",
    category: category || "Prophetic Worship",
    album: album ? album.trim() : "Single",
    releaseYear: releaseYear ? releaseYear.trim() : new Date().getFullYear().toString(),
    youtubeUrl: youtubeUrl ? youtubeUrl.trim() : "",
    lyrics: lyrics ? lyrics.trim() : "",
    featured: Boolean(featured),
    createdAt: new Date().toISOString(),
  };

  items.unshift(newItem);
  writeJSON(LYRICS_FILE, items);
  return newItem;
}

export function updateLyrics(id, updates) {
  const items = readJSON(LYRICS_FILE);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeJSON(LYRICS_FILE, items);
  return items[index];
}

export function deleteLyrics(id) {
  const items = readJSON(LYRICS_FILE);
  const filtered = items.filter((i) => i.id !== id);
  writeJSON(LYRICS_FILE, filtered);
  return true;
}

// --- METRICS / STATS ---

export function getDashboardMetrics() {
  const attendees = getAttendees();
  const subscribers = getSubscribers();
  const gallery = getGalleryItems();
  const lyrics = getLyrics();

  const totalAttendees = attendees.length;
  const maleCount = attendees.filter((a) => a.gender?.toLowerCase() === "male").length;
  const femaleCount = attendees.filter((a) => a.gender?.toLowerCase() === "female").length;

  const cityCounts = {};
  attendees.forEach((a) => {
    if (a.city) {
      const c = a.city.trim();
      cityCounts[c] = (cityCounts[c] || 0) + 1;
    }
  });

  let topCity = "None";
  let maxCount = 0;
  for (const [city, count] of Object.entries(cityCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topCity = city;
    }
  }

  return {
    totalAttendees,
    maleCount,
    femaleCount,
    topCity: topCity !== "None" ? `${topCity} (${maxCount})` : "Port Harcourt",
    totalSubscribers: subscribers.length,
    checkedInCount: attendees.filter((a) => a.checkedIn).length,
    totalPhotos: gallery.length,
    totalSongs: lyrics.length,
  };
}
