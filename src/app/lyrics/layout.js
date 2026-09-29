import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema, MusicCatalogueSchema } from "@/components/StructuredData";
import { getLyrics } from "@/lib/db";

export const metadata = pageMetadata({
  title: "Song Lyrics | Minister Lilian Nneji",
  description:
    "Official lyrics for Minister Lilian Nneji's gospel songs, including Omeriwo Omeriwo, Onwere Ihe Omere Mù, E Get Why, Eze Mu O, Mercy, Ntughari and Odogwu N'agha, with Igbo to English translations.",
  path: "/lyrics",
});

export default function LyricsLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Lyrics", path: "/lyrics" }]} />
      <MusicCatalogueSchema songs={getLyrics()} />
      {children}
    </>
  );
}
