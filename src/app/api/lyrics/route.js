import { NextResponse } from "next/server";
import { getLyrics, getLyricsById } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const query = searchParams.get("q");
    const category = searchParams.get("category");

    if (id) {
      const song = getLyricsById(id);
      if (!song) {
        return NextResponse.json({ error: "Song not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, song });
    }

    let items = getLyrics();

    if (category && category.toLowerCase() !== "all") {
      items = items.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.album?.toLowerCase().includes(q) ||
          item.lyrics?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      items,
      total: items.length,
    });
  } catch (error) {
    console.error("Failed to fetch lyrics:", error);
    return NextResponse.json({ error: "Failed to load lyrics" }, { status: 500 });
  }
}
