import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-side only: the service role key bypasses RLS, so it must never
// reach the browser. Tables are created by supabase/schema.sql.
let client;
function supabase() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.");
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

// Unwrap a Supabase response, throwing on error
function unwrap({ data, error }) {
  if (error) throw new Error(`Supabase: ${error.message}`);
  return data;
}

const UNIQUE_VIOLATION = "23505";

// Keep only the editable columns from an admin update payload
function pick(updates, allowed) {
  return Object.fromEntries(Object.entries(updates).filter(([k]) => allowed.includes(k)));
}

// --- ATTENDEE FUNCTIONS ---

export async function getAttendees() {
  return unwrap(await supabase().from("reverb_attendees").select("*").order("createdAt", { ascending: false }));
}

export async function addAttendee({ fullName, gender, email, phone, city }) {
  const base = {
    fullName: fullName.trim(),
    gender: gender || "Male",
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    city: city ? city.trim() : "",
    createdAt: new Date().toISOString(),
    checkedIn: false,
  };

  // Ticket codes are short and random, so retry on the rare collision
  for (let attempt = 0; attempt < 5; attempt++) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const row = {
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ticketCode: `REV-5.0-${randomSuffix}`,
      ...base,
    };

    const { data, error } = await supabase().from("reverb_attendees").insert(row).select().single();
    if (!error) return data;
    if (error.code !== UNIQUE_VIOLATION) throw new Error(`Supabase: ${error.message}`);
  }
  throw new Error("Could not generate a unique ticket code.");
}

export async function deleteAttendee(id) {
  unwrap(await supabase().from("reverb_attendees").delete().eq("id", id));
  return true;
}

export async function toggleCheckIn(id) {
  const attendee = unwrap(await supabase().from("reverb_attendees").select("checkedIn").eq("id", id).maybeSingle());
  if (!attendee) return null;

  return unwrap(
    await supabase()
      .from("reverb_attendees")
      .update({ checkedIn: !attendee.checkedIn })
      .eq("id", id)
      .select()
      .single()
  );
}

// --- SUBSCRIBER FUNCTIONS ---

export async function getSubscribers() {
  return unwrap(await supabase().from("subscribers").select("*").order("subscribedAt", { ascending: false }));
}

export async function addSubscriber(email) {
  const normalized = email.trim().toLowerCase();

  const existing = unwrap(await supabase().from("subscribers").select("*").eq("email", normalized).maybeSingle());
  if (existing) {
    return { existing: true, subscriber: existing };
  }

  const newSubscriber = {
    id: `sub_${Date.now()}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase().from("subscribers").insert(newSubscriber).select().single();
  if (error?.code === UNIQUE_VIOLATION) {
    // Subscribed concurrently between the lookup and the insert
    return { existing: true, subscriber: newSubscriber };
  }
  if (error) throw new Error(`Supabase: ${error.message}`);
  return { existing: false, subscriber: data };
}

export async function deleteSubscriber(idOrEmail) {
  unwrap(await supabase().from("subscribers").delete().eq("id", idOrEmail));
  unwrap(await supabase().from("subscribers").delete().eq("email", idOrEmail));
  return true;
}

// --- GALLERY FUNCTIONS ---

const GALLERY_FIELDS = ["title", "category", "imageUrl", "caption", "date", "featured", "span"];

export async function getGalleryItems() {
  const items = unwrap(await supabase().from("gallery").select("*"));
  return items.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
}

export async function addGalleryItem({ title, category, imageUrl, caption, date, featured }) {
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

  return unwrap(await supabase().from("gallery").insert(newItem).select().single());
}

export async function updateGalleryItem(id, updates) {
  return unwrap(
    await supabase()
      .from("gallery")
      .update({ ...pick(updates, GALLERY_FIELDS), updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle()
  );
}

export async function deleteGalleryItem(id) {
  unwrap(await supabase().from("gallery").delete().eq("id", id));
  return true;
}

// --- LYRICS FUNCTIONS ---

const LYRICS_FIELDS = ["title", "category", "album", "releaseYear", "youtubeUrl", "lyrics", "featured"];

export async function getLyrics() {
  return unwrap(
    await supabase()
      .from("lyrics")
      .select("*")
      .order("featured", { ascending: false })
      .order("createdAt", { ascending: false })
  );
}

export async function getLyricsById(id) {
  return unwrap(await supabase().from("lyrics").select("*").eq("id", id).maybeSingle());
}

export async function addLyrics({ title, category, album, releaseYear, youtubeUrl, lyrics, featured }) {
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

  return unwrap(await supabase().from("lyrics").insert(newItem).select().single());
}

export async function updateLyrics(id, updates) {
  return unwrap(
    await supabase()
      .from("lyrics")
      .update({ ...pick(updates, LYRICS_FIELDS), updatedAt: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle()
  );
}

export async function deleteLyrics(id) {
  unwrap(await supabase().from("lyrics").delete().eq("id", id));
  return true;
}

// --- METRICS / STATS ---

export async function getDashboardMetrics() {
  const [attendees, subscribers, gallery, lyrics] = await Promise.all([
    getAttendees(),
    getSubscribers(),
    getGalleryItems(),
    getLyrics(),
  ]);

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
