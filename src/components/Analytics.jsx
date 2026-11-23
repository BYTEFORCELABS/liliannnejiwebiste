"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/site";

// Google Analytics 4 for the public site only. The admin dashboard
// (admin.liliannneji.com) and local development are skipped so staff
// visits never show up as fan traffic. GoogleAnalytics loads gtag.js
// after hydration anyway, so waiting for the host check costs nothing.
const SKIP_HOSTS = /^(admin\.|localhost$|127\.0\.0\.1$)/;

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const { hostname, pathname } = window.location;
    setEnabled(!SKIP_HOSTS.test(hostname) && !pathname.startsWith("/admin"));
  }, []);

  if (!GA_MEASUREMENT_ID || !enabled) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
