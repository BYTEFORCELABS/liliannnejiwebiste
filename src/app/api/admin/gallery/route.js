import { NextResponse } from "next/server";
import { getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/db";

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

  const items = getGalleryItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, imageUrl, caption, date, featured } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const newItem = addGalleryItem({ title, category, imageUrl, caption, date, featured });
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
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
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const updated = updateGalleryItem(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  deleteGalleryItem(id);
  return NextResponse.json({ success: true, message: "Gallery item deleted" });
}
