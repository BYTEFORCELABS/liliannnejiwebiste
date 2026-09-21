import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://liliannneji.com"),
  title: "Minister Lilian Nneji | Official Website • Gospel Music Minister & Worship Leader",
  description:
    "Official website of Nigerian gospel music minister, songwriter, and worship leader Lilian Nneji — Africa Praise Artiste of the Year 2024. Stream hit songs like Onwere Ihe Omere Mu, E Get Why, Mercy and Eze Mu O, view ministration dates, and book for events.",
  keywords: [
    "Lilian Nneji",
    "Minister Lilian Nneji",
    "Nigerian Gospel Music",
    "Onwere Ihe Omere Mu",
    "E Get Why",
    "Odogwu N'agha",
    "Ntughari",
    "Eze Mu O",
    "Africa Praise Artiste of the Year",
    "Gospel Artist Bookings Nigeria",
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
        url: "/images/live_praise_fire.jpg",
        width: 2400,
        height: 1600,
        alt: "Minister Lilian Nneji leading high praise",
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
    images: ["/images/live_praise_fire.jpg"],
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
