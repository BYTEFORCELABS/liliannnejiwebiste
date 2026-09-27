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

// Applies the saved theme before first paint so the page never flashes the
// wrong palette. Dark is the brand default; light is opt-in.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-black text-ink min-h-screen flex flex-col font-sans selection:bg-[#F88E14] selection:text-on-gold antialiased">
        {children}
      </body>
    </html>
  );
}
