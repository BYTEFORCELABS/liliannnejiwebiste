import { NextResponse } from "next/server";

// ===================================================================
// ADMIN LIVES ON ITS OWN SUBDOMAIN
// ===================================================================
// admin.liliannneji.com/          -> the dashboard (served from /admin)
// admin.liliannneji.com/api/admin -> its APIs
// liliannneji.com/admin and liliannneji.com/api/admin/* -> 404, as if
// they did not exist. The session cookie is set without a domain, so it
// only ever belongs to the admin subdomain.
//
// For local development, http://admin.localhost:3000 behaves like the
// admin subdomain, and plain localhost keeps /admin working.

const ADMIN_HOSTS = new Set(["admin.liliannneji.com", "admin.localhost"]);
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
const PUBLIC_SITE = "https://liliannneji.com";

const isAdminPath = (path) =>
  path === "/admin" ||
  path.startsWith("/admin/") ||
  path === "/api/admin" ||
  path.startsWith("/api/admin/");

function notFound(request, path) {
  if (path.startsWith("/api/")) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  // Any path with no page renders the site's normal 404
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export function proxy(request) {
  // The Host header is the name the visitor typed; nextUrl can reflect
  // the internal address the server was reached on instead.
  const host = (request.headers.get("host") || request.nextUrl.hostname)
    .toLowerCase()
    .replace(/:\d+$/, "");
  const path = request.nextUrl.pathname;

  if (ADMIN_HOSTS.has(host)) {
    let response;
    if (path === "/robots.txt") {
      response = new NextResponse("User-agent: *\nDisallow: /\n", {
        headers: { "Content-Type": "text/plain" },
      });
    } else if (path === "/") {
      response = NextResponse.rewrite(new URL("/admin", request.url));
    } else if (path === "/admin") {
      // Keep the address bar clean: admin.liliannneji.com/
      response = NextResponse.redirect(
        `${request.nextUrl.protocol}//${request.headers.get("host")}/`
      );
    } else if (path.startsWith("/api/admin/") || /\.[a-z0-9]+$/i.test(path)) {
      // Dashboard APIs, and files from public/ (logo, icons)
      response = NextResponse.next();
    } else {
      // Public pages belong on the main site
      response = NextResponse.redirect(new URL(path + request.nextUrl.search, PUBLIC_SITE));
    }
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (isAdminPath(path) && !LOCAL_HOSTS.has(host)) {
    return notFound(request, path);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's own build files and image optimiser
  matcher: ["/((?!_next/static|_next/image).*)"],
};
