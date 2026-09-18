import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let items = getGalleryItems();
    if (category && category.toLowerCase() !== "all") {
      items = items.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      items,
      total: items.length,
    });
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json({ error: "Failed to load gallery items" }, { status: 500 });
  }
}
