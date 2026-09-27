import { NextResponse } from "next/server";

// ============================================================
// LIVE YOUTUBE SUBSCRIBER COUNT
// Reads the public subscriber count for Minister Lilian Nneji's
// channel straight from the YouTube Data API v3.
//
// Setup — add to .env.local, then restart the dev server:
//
//   YOUTUBE_API_KEY=AIza...
//   YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx
//     ...or, if you only know the @handle:
//   YOUTUBE_CHANNEL_HANDLE=@LilianNneji
//
// Get a key at console.cloud.google.com -> APIs & Services:
// create a project, enable "YouTube Data API v3", then
// Credentials -> Create credentials -> API key. It is a public
// read-only key; no OAuth and no channel login needed.
//
// Until the key is set this returns configured:false and the
// dashboard quietly falls back to the mailing-list count, so
// nothing breaks in the meantime.
// ============================================================

function isAuthorized(request) {
  const cookie = request.cookies.get("lilian_admin_auth");
  const authHeader = request.headers.get("authorization");
  const adminPass = process.env.ADMIN_PASSWORD || "lilian2026";

  if (cookie?.value === "authenticated_admin_session") return true;
  if (authHeader === `Bearer ${adminPass}`) return true;
  return false;
}

// YouTube rounds public counts anyway, so a 10-minute cache costs us
// no accuracy and keeps us far inside the daily API quota.
const CACHE_TTL_MS = 10 * 60 * 1000;
let cached = null; // { at, payload }

function buildUrl(key) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim();
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE?.trim();

  const base = "https://www.googleapis.com/youtube/v3/channels";
  const params = new URLSearchParams({ part: "statistics,snippet", key });

  if (channelId) {
    params.set("id", channelId);
  } else if (handle) {
    // forHandle wants the handle with the @ prefix.
    params.set("forHandle", handle.startsWith("@") ? handle : `@${handle}`);
  } else {
    return null;
  }

  return `${base}?${params.toString()}`;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.YOUTUBE_API_KEY?.trim();
  if (!key) {
    return NextResponse.json({
      success: true,
      configured: false,
      reason: "YOUTUBE_API_KEY is not set.",
    });
  }

  const url = buildUrl(key);
  if (!url) {
    return NextResponse.json({
      success: true,
      configured: false,
      reason: "Set YOUTUBE_CHANNEL_ID or YOUTUBE_CHANNEL_HANDLE.",
    });
  }

  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return NextResponse.json({ ...cached.payload, cached: true });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok) {
      // Surface Google's own message — it is usually precise about
      // whether the key, the quota or the channel is the problem.
      const reason = data?.error?.message || `YouTube API returned ${res.status}.`;
      return NextResponse.json({ success: true, configured: true, ok: false, reason });
    }

    const channel = data?.items?.[0];
    if (!channel) {
      return NextResponse.json({
        success: true,
        configured: true,
        ok: false,
        reason: "No channel matched that ID/handle.",
      });
    }

    const stats = channel.statistics || {};

    // A channel can hide its subscriber count; then the field is absent.
    if (stats.hiddenSubscriberCount || stats.subscriberCount == null) {
      return NextResponse.json({
        success: true,
        configured: true,
        ok: false,
        reason: "This channel hides its subscriber count.",
      });
    }

    const payload = {
      success: true,
      configured: true,
      ok: true,
      subscribers: Number(stats.subscriberCount),
      views: Number(stats.viewCount ?? 0),
      videos: Number(stats.videoCount ?? 0),
      channelTitle: channel.snippet?.title ?? null,
      fetchedAt: new Date().toISOString(),
    };

    cached = { at: Date.now(), payload };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("YouTube stats fetch failed:", err);
    return NextResponse.json({
      success: true,
      configured: true,
      ok: false,
      reason: "Could not reach the YouTube API.",
    });
  }
}
