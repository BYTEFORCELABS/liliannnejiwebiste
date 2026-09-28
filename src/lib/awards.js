// ============================================================
// AWARDS
// Transcribed from photographs of the physical plaques and
// trophies supplied by the client, in public/images/awards.
//
// `category` drives the filter chips on /awards.
// `featured` promotes an award into the spotlight row at the top.
// `images` lists every photograph of the same award — several
// trophies were shot front and back, and the engraved base and
// the matching certificate both name the award.
// ============================================================

export const AWARD_CATEGORIES = ["All", "Industry Honour", "Ministry Recognition", "Milestone"];

export const AWARDS = [
  {
    id: "clima-africa-2025",
    title: "Africa Outstanding Music Minister of the Year",
    presenter: "Clima Africa Awards",
    year: "2025",
    category: "Industry Honour",
    featured: true,
    citation:
      "Winner, Africa Outstanding Music Minister of the Year. A continental honour recognising a body of work and a ministry that reaches well beyond Nigeria.",
    images: [
      { src: "/images/awards/clima-2025-trophy.jpg", alt: "Clima Africa 2025 gold crown trophy awarded to Minister Lilian Nneji" },
      { src: "/images/awards/clima-2025-plate.jpg", alt: "Engraved base reading Africa Outstanding Music Minister of the Year, Winner, Lilian Nneji, Nigeria" },
    ],
  },
  {
    id: "youtube-silver",
    title: "Silver Creator Award",
    presenter: "YouTube",
    year: "100,000 subscribers",
    category: "Milestone",
    featured: true,
    citation:
      "The Silver Play Button, presented by YouTube for passing one hundred thousand subscribers. A milestone earned song by song, from a congregation to a global audience.",
    images: [
      { src: "/images/awards/youtube-silver-play-button.jpg", alt: "YouTube Silver Play Button presented to Lilian Nneji for passing 100,000 subscribers" },
    ],
  },
  {
    id: "clima-africa-2024",
    title: "Africa Praise Artiste of the Year",
    presenter: "Clima Africa Awards",
    year: "2024",
    category: "Industry Honour",
    featured: true,
    citation:
      "Winner, Africa Praise Artiste of the Year. Awarded for a body of work and a decade of ministry spent lifting congregations across Africa in energetic, unashamed praise.",
    images: [
      { src: "/images/awards/clima-2024-trophy.jpg", alt: "Clima Africa 2024 gold crown trophy awarded to Minister Lilian Nneji" },
      { src: "/images/awards/clima-2024-plate.jpg", alt: "Engraved base reading Africa Praise Artiste of the Year, Winner, Lilian Nneji, Nigeria" },
    ],
  },
  {
    id: "alm-gospel-2024",
    title: "Outstanding Gospel Musician",
    presenter: "ALM Gospel Award",
    year: "2024",
    category: "Industry Honour",
    citation:
      "Abundant Life Meritorious Gospel Award, Media, Creative and Evangelism category, presented on 24 November 2024, with the matching certificate.",
    images: [
      { src: "/images/awards/alm-gospel-trophy.jpg", alt: "ALM Abundant Life Meritorious Gospel Award trophy for Outstanding Gospel Musician 2024" },
      { src: "/images/awards/alm-gospel-certificate.jpg", alt: "Framed ALM Gospel Award 2024 certificate given to Min. Lilian Nneji" },
    ],
  },
  {
    id: "rccg-throne-room",
    title: "A Global Praise Ambassador",
    presenter: "RCCG Throne Room Castle, Abuja",
    category: "Ministry Recognition",
    citation:
      "“A consecrated voice to the nations, carrying the sound of glory beyond borders and raising altars of worship across the earth.”",
    images: [
      { src: "/images/awards/rccg-throne-room-castle.jpg", alt: "RCCG Throne Room Castle Abuja award naming Pastor Lilian Nneji A Global Praise Ambassador" },
    ],
  },
  {
    id: "trinity-house-pop24",
    title: "Appreciation Award",
    presenter: "Trinity House Church, pop24",
    year: "2025",
    category: "Ministry Recognition",
    citation:
      "In gratitude for ministry and service at pop24, the 24 Hours Power of Praise, celebrating ten years of worship and glory. 1 to 2 November 2025.",
    images: [
      { src: "/images/awards/trinity-house-pop24.jpg", alt: "Trinity House Church pop24 Appreciation Award presented to Lilian Nneji" },
    ],
  },
  {
    id: "pfn-lagos",
    title: "Appreciation Award",
    presenter: "Pentecostal Fellowship of Nigeria, Lagos State Chapter",
    category: "Ministry Recognition",
    citation:
      "“In honour of your tireless efforts and dedication to the Body of Christ in Nigeria.”",
    images: [
      { src: "/images/awards/pfn-appreciation.jpg", alt: "Pentecostal Fellowship of Nigeria Lagos State Chapter Appreciation Award for Lilian Nneji" },
    ],
  },
  {
    id: "legacy-african-praise",
    title: "Legacy Award",
    presenter: "For her contribution towards African Praise",
    category: "Industry Honour",
    citation:
      "A sculpted figure reaching for a star, presented to Min. Lilian Nneji for her contribution towards African Praise.",
    images: [
      { src: "/images/awards/legacy-african-praise.jpg", alt: "Gold Legacy Award sculpture presented to Min. Lilian Nneji for her contribution towards African Praise" },
    ],
  },
  {
    id: "rch-role-model",
    title: "Role Model Award",
    presenter: "RCH",
    year: "2026",
    category: "Ministry Recognition",
    citation:
      "“For your inspiring influence and Role Model impact on the Youths and next generation. Your voice and example continue to shape lives.” 15 February 2026.",
    images: [
      { src: "/images/awards/rch-role-model.jpg", alt: "RCH Role Model Award presented to Lilian Nneji in February 2026" },
    ],
  },
  {
    id: "chosen-generation-lead-city",
    title: "Award of Special Recognition",
    presenter: "The Chosen Generation Choir, Lead City University Ibadan",
    year: "2025",
    category: "Ministry Recognition",
    citation:
      "From the Chapel of Peace and Joy, for steadfast and consistent support to YAGAL over the years. 24 April 2025.",
    images: [
      { src: "/images/awards/chosen-generation-lead-city.jpg", alt: "Framed Award of Special Recognition from The Chosen Generation Choir, Lead City University Ibadan" },
    ],
  },
  {
    id: "akinswhite-recognition",
    title: "Award of Recognition",
    presenter: "Akins White Entertainment",
    year: "2024",
    category: "Industry Honour",
    citation:
      "“As a great mother mentor with unique dimension of impacts.” Presented 8 December 2024.",
    images: [
      { src: "/images/awards/akinswhite-recognition.jpg", alt: "Akins White Entertainment Award of Recognition presented to Lilian Nneji" },
    ],
  },
  {
    id: "faith-blue-musicals",
    title: "Plaque of Appreciation",
    presenter: "Faith Blue Musicals",
    year: "2024",
    category: "Ministry Recognition",
    citation:
      "“For your outstanding ministration at Faith Blue Musicals, With Grateful Hearts.” Given 8 December 2024.",
    images: [
      { src: "/images/awards/faith-blue-musicals.jpg", alt: "Faith Blue Musicals Plaque of Appreciation presented to Minister Lilian Nneji" },
    ],
  },
  {
    id: "figm-merit",
    title: "Merit Award",
    presenter: "Focus International Gospel Music",
    category: "Industry Honour",
    citation:
      "Presented to Evang. Lillian Nneji as a Music Encyclopedia and a Virtuous Woman.",
    images: [
      { src: "/images/awards/figm-merit.jpg", alt: "Focus International Gospel Music merit award trophy presented to Evang. Lillian Nneji" },
    ],
  },
];
