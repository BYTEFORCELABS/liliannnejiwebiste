import { Resend } from "resend";

// Attendee fields come straight from the public form
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Generate luxury dark/gold/blue HTML Admission Pass for attendee
export function generateTicketEmailHtml(attendee) {
  const ticketCode = escapeHtml(attendee.ticketCode);
  const fullName = escapeHtml(attendee.fullName);
  const gender = escapeHtml(attendee.gender);
  const city = escapeHtml(attendee.city || "Port Harcourt");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your REVERB 5.0 Admission Pass</title>
  <style>
    body { margin: 0; padding: 0; background-color: #070709; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; padding: 30px 15px; }
    .card { background: linear-gradient(180deg, #0d1633 0%, #080c1b 100%); border: 1px solid #28448a; border-radius: 20px; padding: 32px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
    .brand { color: #F88E14; font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px; }
    .title { color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 1px; margin: 0 0 6px 0; text-transform: uppercase; }
    .theme { color: #93c5fd; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .ticket-badge { background: #1e3a8a; border: 1px dashed #60a5fa; border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center; }
    .ticket-label { color: #93c5fd; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; margin-bottom: 4px; }
    .ticket-code { color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 3px; font-family: monospace; }
    .details { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #a1a1aa; }
    .detail-value { color: #ffffff; font-weight: 600; text-align: right; }
    .instructions { font-size: 12px; color: #a1a1aa; line-height: 1.6; text-align: center; margin: 20px 0; }
    .footer { text-align: center; font-size: 11px; color: #71717a; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.08); }
    .gold-text { color: #F88E14; font-weight: bold; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="brand">Minister Lilian Nneji Ministries</div>
        <h1 class="title">THE REVERB 5.0</h1>
        <div class="theme">The Sound of High Praise</div>
      </div>

      <div class="ticket-badge">
        <div class="ticket-label">Official Admission Pass</div>
        <div class="ticket-code">${ticketCode}</div>
        <div style="color: #34d399; font-size: 11px; font-weight: 700; margin-top: 4px;">● RESERVATION CONFIRMED</div>
      </div>

      <div class="details">
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px;">
          <tr>
            <td style="color: #a1a1aa;">Attendee:</td>
            <td style="color: #ffffff; font-weight: bold; text-align: right;">${fullName}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">Gender:</td>
            <td style="color: #ffffff; text-align: right;">${gender}</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">Date:</td>
            <td style="color: #F88E14; font-weight: bold; text-align: right;">Sunday, 1st November 2026</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">Time:</td>
            <td style="color: #ffffff; text-align: right;">4:00 PM (Doors Open 3:00 PM)</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">Venue:</td>
            <td style="color: #ffffff; text-align: right;">EUI Event Center, Port Harcourt</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">Address:</td>
            <td style="color: #cbd5e1; text-align: right; font-size: 12px;">Plot F11 Sani Abacha Road, GRA Phase 3, Port Harcourt</td>
          </tr>
          <tr>
            <td style="color: #a1a1aa;">City of Residence:</td>
            <td style="color: #ffffff; text-align: right;">${city}</td>
          </tr>
        </table>
      </div>

      <div class="instructions">
        Please present this digital pass on your phone or printout at the entrance for fast-track verification.<br>
        Admission is free, but space is limited. Early arrival is highly recommended.
      </div>

      <div class="footer">
        Enquiries & Sponsorship: <strong>+234 802 313 1871</strong> | <strong>+234 803 497 8751</strong> | <strong>Lilianamadi@yahoo.com</strong><br>
        &copy; 2026 Minister Lilian Nneji. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Send the ticket through Resend if it is configured, otherwise log it.
export async function sendReverbTicketEmail(attendee) {
  const subject = `Your Admission Pass for REVERB 5.0 (${attendee.ticketCode}) - Minister Lilian Nneji`;
  const htmlContent = generateTicketEmailHtml(attendee);
  const textContent = `Hello ${attendee.fullName},\n\nYour seat is reserved for REVERB 5.0 with Minister Lilian Nneji!\nTicket Code: ${attendee.ticketCode}\nDate: Sunday, 1st Nov 2026 at 4:00 PM\nVenue: EUI Event Center, Plot F11 Sani Abacha Road, GRA Phase 3, Port Harcourt.\n\nSee you there!`;

  // 1. Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Minister Lilian Nneji <onboarding@resend.dev>",
      to: attendee.email,
      replyTo: process.env.RESEND_REPLY_TO || undefined,
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (!error) {
      console.log("[Resend] Email sent successfully:", data.id);
      return { success: true, provider: "resend", messageId: data.id };
    }

    // The registration is already saved, so report the failure instead of throwing
    console.error("[Resend] Failed to send email:", error);
    return { success: false, provider: "resend", error: error.message };
  }

  // 2. Fallback: Mock Email (Logs to console in development)
  console.log("----------------------------------------------------------------");
  console.log("📨 [MOCK EMAIL DISPATCHED] (Set RESEND_API_KEY in .env.local to send for real)");
  console.log(`To: ${attendee.email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Attendee: ${attendee.fullName} | Ticket: ${attendee.ticketCode}`);
  console.log("----------------------------------------------------------------");

  return {
    success: true,
    provider: "mock",
    note: "Email simulated. Set RESEND_API_KEY in .env.local to send live emails.",
    error: null,
  };
}

// Check which email provider is currently configured
export function getEmailProviderStatus() {
  if (process.env.RESEND_API_KEY) {
    return {
      configured: true,
      provider: "Resend",
      from: process.env.RESEND_FROM || "onboarding@resend.dev (test sender)",
    };
  }
  return {
    configured: false,
    provider: "Dev Mock Mode (Console Log)",
    note: "Add RESEND_API_KEY in .env.local for live sending.",
  };
}
