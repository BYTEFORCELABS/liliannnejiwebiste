import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://liliannneji.com"),
  title: "Minister Lilian Nneji | Official Website • Gospel Music Minister & Worship Leader",
  description:
    "Official website of Nigerian gospel music minister, songwriter, and worship leader Lilian Nneji (Jesus Dance Queen). Stream hit songs like Eze Mu O, Onwere Ihe Omere Mù, Praise Vibes, view ministration dates, and book for events.",
  keywords: [
    "Lilian Nneji",
    "Minister Lilian Nneji",
    "Nigerian Gospel Music",
    "Eze Mu O",
    "Onwere Ihe Omere Mu",
    "Praise Vibes",
    "Jesus Dance Queen",
    "Gospel Artist Bookings Nigeria",
    "RCCG Praise Minister",
  ],
  authors: [{ name: "Minister Lilian Nneji" }],
  openGraph: {
    title: "Minister Lilian Nneji | Official Website",
    description:
      "Experience high-energy kingdom praise & deep worship with Minister Lilian Nneji. Stream latest releases and book for your church conferences and gospel concerts.",
    url: "https://liliannneji.com",
    siteName: "Lilian Nneji Ministry",
    images: [
      {
        url: "/images/hero_portrait.jpg",
        width: 1200,
        height: 1600,
        alt: "Minister Lilian Nneji",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minister Lilian Nneji | Official Website",
    description:
      "Stream hit gospel releases, watch live ministrations, and book Minister Lilian Nneji for your events.",
    images: ["/images/hero_portrait.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-[#070709] text-white min-h-screen flex flex-col font-sans selection:bg-[#F88E14] selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
