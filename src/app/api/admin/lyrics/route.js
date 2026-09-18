import { NextResponse } from "next/server";
import { getLyrics, addLyrics, updateLyrics, deleteLyrics } from "@/lib/db";

function isAuthorized(request) {
  const cookie = request.cookies.get("lilian_admin_auth");
  const authHeader = request.headers.get("authorization");
  const adminPass = process.env.ADMIN_PASSWORD || "lilian2026";

  if (cookie?.value === "authenticated_admin_session") return true;
  if (authHeader === `Bearer ${adminPass}`) return true;
  return false;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = getLyrics();
  return NextResponse.json({ success: true, items });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, album, releaseYear, youtubeUrl, lyrics, featured } = body;

    if (!title || !lyrics) {
      return NextResponse.json({ error: "Song Title and Lyrics are required" }, { status: 400 });
    }

    const newItem = addLyrics({ title, category, album, releaseYear, youtubeUrl, lyrics, featured });
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Error creating lyrics item:", error);
    return NextResponse.json({ error: "Failed to add song lyrics" }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Song ID is required" }, { status: 400 });
    }

    const updated = updateLyrics(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Error updating lyrics item:", error);
    return NextResponse.json({ error: "Failed to update song lyrics" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Song ID is required" }, { status: 400 });
  }

  deleteLyrics(id);
  return NextResponse.json({ success: true, message: "Song lyrics deleted" });
}
