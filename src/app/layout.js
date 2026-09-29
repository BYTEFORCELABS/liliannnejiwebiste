import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  GOOGLE_SITE_VERIFICATION,
} from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  // A template means every page gets its own title without repeating
  // the brand, and the home page uses the full default.
  title: {
    default:
      "Minister Lilian Nneji | Official Website \u2022 Gospel Music Minister & Worship Leader",
    template: "%s",
  },
  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Music",

  keywords: [
    "Lilian Nneji",
    "Minister Lilian Nneji",
    "Lilian Nneji songs",
    "Lilian Nneji lyrics",
    "Nigerian gospel music",
    "Igbo gospel songs",
    "Omeriwo Omeriwo",
    "Onwere Ihe Omere Mu",
    "E Get Why",
    "Eze Mu O",
    "Odogwu N'agha",
    "Ntughari",
    "Ko Joo",
    "Mercy Lilian Nneji",
    "Africa Praise Artiste of the Year",
    "gospel artist booking Nigeria",
    "worship leader Port Harcourt",
    "book Lilian Nneji",
  ],

  alternates: { canonical: SITE_URL },

  openGraph: {
    title: "Minister Lilian Nneji | Official Website",
    description:
      "Experience high-energy kingdom praise and deep worship with Minister Lilian Nneji. Stream her latest releases, read the lyrics, see her awards, and book her for your church conference or gospel concert.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 2400,
        height: 1600,
        alt: "Minister Lilian Nneji leading high praise",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Minister Lilian Nneji | Official Website",
    description:
      "Stream hit gospel releases, read the lyrics, watch live ministrations, and book Minister Lilian Nneji for your events.",
    images: [SITE_OG_IMAGE],
    creator: "@liliannneji",
  },

  // Explicitly invite full indexing and rich previews.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Applies the saved theme before first paint so the page never flashes the
// wrong palette. Dark is the brand default; light is opt-in.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ArtistSchema } from "@/components/StructuredData";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-black text-ink min-h-screen flex flex-col font-sans selection:bg-[#F88E14] selection:text-on-gold antialiased">
        <ArtistSchema />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
