import { NextResponse } from "next/server";
import { getAdminEmail } from "@/lib/adminAuth";
import { getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/db";

export async function GET(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await getGalleryItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, imageUrl, caption, date, featured } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const newItem = await addGalleryItem({ title, category, imageUrl, caption, date, featured });
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const updated = await updateGalleryItem(id, updates);
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
  if (!(await getAdminEmail(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  await deleteGalleryItem(id);
  return NextResponse.json({ success: true, message: "Gallery item deleted" });
}
