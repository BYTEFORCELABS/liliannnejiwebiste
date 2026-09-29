import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata = pageMetadata({
  title: "Photo Gallery | Minister Lilian Nneji",
  description:
    "Photographs of Minister Lilian Nneji in ministration — live praise nights, altar ministrations, the praise team and band, and moments from across her gospel music ministry.",
  path: "/gallery",
  image: "/images/live_crowd_bw.jpg",
});

export default function GalleryLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Gallery", path: "/gallery" }]} />
      {children}
    </>
  );
}
