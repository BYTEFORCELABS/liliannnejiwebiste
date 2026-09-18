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
    id: "gal_1",
    title: "Galaxy Music Awards Celebration",
    category: "Award Moments",
    imageUrl: "/images/about_award_portrait_v2.jpg",
    caption: "Honored with the Gospel Artist of the Year award at the prestigious Galaxy Music Awards.",
    date: "2026-08-15",
    featured: true,
    createdAt: "2026-08-15T12:00:00.000Z"
  },
  {
    id: "gal_2",
    title: "The Reverb 5.0 Official Banner",
    category: "The Reverb",
    imageUrl: "/images/reverb_poster_v3.jpg",
    caption: "Official concert visual for REVERB 5.0 live at EUI Event Center, Port Harcourt.",
    date: "2026-09-01",
    featured: true,
    createdAt: "2026-09-01T10:00:00.000Z"
  },
  {
    id: "gal_3",
    title: "Prophetic Worship in Studio",
    category: "Studio & Portraits",
    imageUrl: "/images/about_yellow_studio_v2.jpg",
    caption: "Studio session recording prophetic praise anthems in joy and power.",
    date: "2026-07-22",
    featured: true,
    createdAt: "2026-07-22T14:30:00.000Z"
  },
  {
    id: "gal_4",
    title: "Live Altar Ministration",
    category: "Live Concerts",
    imageUrl: "/images/hero_bg_live.jpg",
    caption: "Electrifying praise encounter lifting up the name of Jesus with thousands in worship.",
    date: "2026-06-18",
    featured: true,
    createdAt: "2026-06-18T20:00:00.000Z"
  },
  {
    id: "gal_5",
    title: "Joyful Worship Polaroid",
    category: "The Reverb",
    imageUrl: "/images/reverb_polaroid_1_v2.jpg",
    caption: "Unstoppable kingdom dance and laughter during the praise session.",
    date: "2025-11-02",
    featured: false,
    createdAt: "2025-11-02T19:30:00.000Z"
  },
  {
    id: "gal_6",
    title: "Heartfelt Adoration Polaroid",
    category: "The Reverb",
    imageUrl: "/images/reverb_polaroid_2_v2.jpg",
    caption: "Deep intimacy and adoration during the slow worship ministration.",
    date: "2025-11-02",
    featured: false,
    createdAt: "2025-11-02T20:15:00.000Z"
  },
  {
    id: "gal_7",
    title: "Atmosphere of Miracles Polaroid",
    category: "The Reverb",
    imageUrl: "/images/reverb_polaroid_3_v2.jpg",
    caption: "The glory of God filling the room at the annual Reverb gathering.",
    date: "2025-11-02",
    featured: false,
    createdAt: "2025-11-02T21:00:00.000Z"
  },
  {
    id: "gal_8",
    title: "Stage Worship Encounter",
    category: "Live Concerts",
    imageUrl: "/images/stage_worship.jpg",
    caption: "Leading thousands in adoration at the regional gospel crusade.",
    date: "2026-05-14",
    featured: true,
    createdAt: "2026-05-14T18:00:00.000Z"
  },
  {
    id: "gal_9",
    title: "Studio Reverence",
    category: "Studio & Portraits",
    imageUrl: "/images/stay_in_touch_bw_v2.jpg",
    caption: "Black and white studio portrait capturing serenity, faith, and devotion.",
    date: "2026-04-10",
    featured: false,
    createdAt: "2026-04-10T11:00:00.000Z"
  },
  {
    id: "gal_10",
    title: "COZA Praise Night Explosion",
    category: "Live Concerts",
    imageUrl: "/images/video_thumb_coza.jpg",
    caption: "High-octane praise explosion with the global choir and congregation.",
    date: "2026-03-28",
    featured: true,
    createdAt: "2026-03-28T19:00:00.000Z"
  },
  {
    id: "gal_11",
    title: "Atmosphere of Miracles",
    category: "Live Concerts",
    imageUrl: "/images/video_thumb_miracles.jpg",
    caption: "Prophetic songs of deliverance and joy overflowing in testimony.",
    date: "2026-02-14",
    featured: false,
    createdAt: "2026-02-14T17:30:00.000Z"
  },
  {
    id: "gal_12",
    title: "Official Portrait - Jesus Dance Queen",
    category: "Studio & Portraits",
    imageUrl: "/images/hero_portrait.jpg",
    caption: "Official portrait of Minister Lilian Nneji, celebrating the Joy of the Lord.",
    date: "2026-01-05",
    featured: true,
    createdAt: "2026-01-05T09:00:00.000Z"
  }
];

// Default initial lyrics seed items
const DEFAULT_LYRICS = [
  {
    id: "lyr_1",
    title: "Eze Mu O (My King)",
    category: "Prophetic Worship",
    album: "Eze Mu O (Single)",
    releaseYear: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=DzjflH8peQY",
    featured: true,
    createdAt: "2024-01-10T00:00:00.000Z",
    lyrics: `[Verse 1]
You are the breath inside my lungs
The King of kings upon the throne
No other name can heal and save
No other power broke the grave
Eze ndi eze, Onyekeruwa
I lift my hands to honor You alone

[Chorus]
Eze mu o, Eze mu o!
Onye nmeri, Nara ekele
Eze mu o, Eze mu o!
Chi di nso, Your name is great
There is no one else like You
Ancient of Days, my Lord and King

[Verse 2]
When valleys deep stood in my way
You parted waters, paved the way
My strength, my song, my hiding place
Surrounded by Your love and grace
From generation unto generation
Your kingdom reigns forevermore

[Chorus]
Eze mu o, Eze mu o!
Onye nmeri, Nara ekele
Eze mu o, Eze mu o!
Chi di nso, Your name is great
There is no one else like You
Ancient of Days, my Lord and King

[Bridge]
Agu n'eche mba!
Odogwu akataka!
Who can battle with the Lord?
No one, no one!
Who can question Your great power?
No one, no one!

[Outro]
Eze mu o, You are worthy
Eze mu o, You are exalted
Forever and ever, Amen.`
  },
  {
    id: "lyr_2",
    title: "Jesus Dance",
    category: "High Praise",
    album: "Kingdom Groove Vol. 1",
    releaseYear: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=nLITWXwcUNQ",
    featured: true,
    createdAt: "2024-03-15T00:00:00.000Z",
    lyrics: `[Intro]
Are you ready to give Jesus a high praise?
Put on your dancing shoes!
Let the redeemed of the Lord say so!
Get ready, let's go!

[Verse 1]
Look at what the Lord has done for me
He took away my shame and set me free
Gave me a new song in my mouth
Turned my mourning into joy and shout!
Every burden rolled away
Today na my thanksgiving day!

[Chorus]
Oya do the Jesus dance! (Dance, dance!)
Celebrate Your victory!
Do the Jesus dance! (Dance, dance!)
Shout Hallelujah to the King!
Left to the right, forward and back
When Jesus enters, sorrow pack!

[Verse 2]
Dem think say my story don finish
Jehovah show up, my blessing replenish
Double portion, favor overflow
Everywhere I go, His glory dey show
If you know say God has been faithful
Jump up and make His praise joyful!

[Chorus]
Oya do the Jesus dance! (Dance, dance!)
Celebrate Your victory!
Do the Jesus dance! (Dance, dance!)
Shout Hallelujah to the King!
Left to the right, forward and back
When Jesus enters, sorrow pack!

[Vamp]
Dance for Jesus!
Praise the Lord!
Leap for joy!
Give Him praise!
Hallelujah! Amen!`
  },
  {
    id: "lyr_3",
    title: "Praise Vibes",
    category: "High Praise",
    album: "Praise Vibes EP",
    releaseYear: "2023",
    youtubeUrl: "https://www.youtube.com/watch?v=J_02EibFwd0",
    featured: true,
    createdAt: "2023-08-20T00:00:00.000Z",
    lyrics: `[Verse 1]
Early in the morning will I rise and praise
Throughout the evening will I give Him glory
His mercies are new every single day
He watches over my coming and my going
Come let us magnify the Lord together
His praise shall continually be in my mouth

[Chorus]
This is my praise vibe, holy vibe!
Joy in the Holy Ghost, deep inside!
Lift your hands and praise the Lord
Magnify His holy name
From the rising of the sun to the going down
The Lord is worthy to be praised!

[Verse 2]
He turned my water into wine
Gave me peace of mind divine
No weapon formed shall prosper
Jesus is my shield and master
Let everything that has breath
Praise the Lord of hosts!

[Chorus]
This is my praise vibe, holy vibe!
Joy in the Holy Ghost, deep inside!
Lift your hands and praise the Lord
Magnify His holy name
From the rising of the sun to the going down
The Lord is worthy to be praised!

[Outro]
Glory, honor, power and majesty
Belong unto our God forever!
Praise Vibes!`
  },
  {
    id: "lyr_4",
    title: "My Helper",
    category: "Prophetic Worship",
    album: "Divine Encounter",
    releaseYear: "2023",
    youtubeUrl: "https://www.youtube.com/watch?v=XM6WId4nVAc",
    featured: true,
    createdAt: "2023-11-05T00:00:00.000Z",
    lyrics: `[Verse 1]
I will lift up my eyes unto the hills
From whence cometh my help?
My help comes from the Lord
The Maker of heaven and earth
He will not let my foot be moved
He who keeps Israel never slumbers nor sleeps

[Chorus]
You are my Helper, my Present Help
In the time of trouble You never fail
Ebube Dike, my Solid Rock
On You I stand, I shall not fall
My Helper, my Shield, my All in all

[Verse 2]
Though a thousand fall at my side
And ten thousand at my right hand
It shall not come near my dwelling
Under the shadow of Your wings I abide
Because I have set my love upon You
You deliver me and set me on high

[Chorus]
You are my Helper, my Present Help
In the time of trouble You never fail
Ebube Dike, my Solid Rock
On You I stand, I shall not fall
My Helper, my Shield, my All in all

[Outro]
Thank You Jesus, my faithful Helper
Yesterday, today and forever
Amen.`
  },
  {
    id: "lyr_5",
    title: "Joy Overflow (Thanksgiving Medley)",
    category: "Thanksgiving",
    album: "Live in Concert",
    releaseYear: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=otD1sbxmPy0",
    featured: false,
    createdAt: "2024-05-12T00:00:00.000Z",
    lyrics: `[Verse 1]
What shall I render unto the Lord
For all His benefits toward me?
I will take the cup of salvation
And call upon the name of the Lord
He has done great things for me
Whereof I am glad!

[Chorus]
Joy overflow in my heart today!
Blessings overflow everywhere I go!
Thank You Jesus, Nara ekele
Thank You Father, imela o!

[Medley Section]
Onye di nso, onye di nso
Chi bu ike m, Chi bu olileanya m
We give You all the glory
We give You all the praise!

[Outro]
Hallelujah, joy overflow!
Amen and Amen!`
  },
  {
    id: "lyr_6",
    title: "Onye Nmeri (The Conqueror)",
    category: "Afro-Gospel",
    album: "Victorious Praise",
    releaseYear: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=t8e-A6wr9c8",
    featured: false,
    createdAt: "2025-01-18T00:00:00.000Z",
    lyrics: `[Verse 1]
He has conquered principalities and powers
Made an open show of them in triumph
No sickness can withstand Your name
No mountain can stand before our God
Onye nmeri bu aha Ya!

[Chorus]
Onye nmeri, The Conqueror!
Mighty Man in battle, Lion of Judah!
You have won the victory for me
I am more than a conqueror in Christ!

[Verse 2]
Now we walk in liberty
Now we reign in royalty
By the blood of the Lamb
And the word of our testimony!

[Chorus]
Onye nmeri, The Conqueror!
Mighty Man in battle, Lion of Judah!
You have won the victory for me
I am more than a conqueror in Christ!`
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
