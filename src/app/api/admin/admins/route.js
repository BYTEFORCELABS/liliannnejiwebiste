import { NextResponse } from "next/server";
import { getAdminEmail, normalizeEmail } from "@/lib/adminAuth";
import { getAdminUsers, addAdminUser, removeAdminUser } from "@/lib/db";

// Who can sign in to the dashboard. Any signed-in admin can manage the list.

export async function GET(request) {
  const me = await getAdminEmail(request);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ success: true, me, admins: await getAdminUsers() });
}

export async function POST(request) {
  const me = await getAdminEmail(request);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = normalizeEmail(body?.email);
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const result = await addAdminUser(email, me);
  if (result.existing) {
    return NextResponse.json({ error: `${email} is already an admin.` }, { status: 409 });
  }
  return NextResponse.json({ success: true, admin: result.admin });
}

export async function DELETE(request) {
  const me = await getAdminEmail(request);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = normalizeEmail(new URL(request.url).searchParams.get("email"));
  if (!email) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  // Stops anyone locking themselves out, and so the list can never be emptied
  if (email === me) {
    return NextResponse.json(
      { error: "You can't remove yourself. Ask another admin to do it." },
      { status: 400 }
    );
  }

  await removeAdminUser(email);
  return NextResponse.json({ success: true });
}
