import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ATTENDEES_FILE = path.join(DATA_DIR, "reverb_attendees.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

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

  // Generate unique ticket number (e.g. REV-50-8421)
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

// --- METRICS / STATS ---

export function getDashboardMetrics() {
  const attendees = getAttendees();
  const subscribers = getSubscribers();

  const totalAttendees = attendees.length;
  const maleCount = attendees.filter((a) => a.gender?.toLowerCase() === "male").length;
  const femaleCount = attendees.filter((a) => a.gender?.toLowerCase() === "female").length;

  // Find top city
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
  };
}
