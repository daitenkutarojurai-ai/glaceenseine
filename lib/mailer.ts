import nodemailer from "nodemailer";

// Configure via env vars on Vercel:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
// Without these `sendMail` returns { ok: false, reason: "not_configured" }
// — routes decide whether to surface that as an error or absorb it silently.

export type SendMailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; error?: unknown };

/** Escape user-controlled text before embedding in an HTML email body. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF and other ASCII control characters that could be used to
 *  forge new headers (Bcc:, X-Custom:, etc.) via newline injection. */
function sanitizeHeader(s: string | undefined): string | undefined {
  if (s === undefined) return undefined;
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, 320);
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: { user, pass },
  });
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendMailResult> {
  const from = process.env.SMTP_FROM ?? "Glaces en Seine <noreply@glacesenseine.fr>";
  const to   = process.env.SMTP_TO   ?? "glacesenseine@gmail.com";

  const transport = getTransport();
  if (!transport) {
    console.error(
      "[mailer] SMTP non configuré. Ajoutez SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS dans les variables d'environnement Vercel.\n" +
      "Pour Gmail : SMTP_HOST=smtp.gmail.com | SMTP_PORT=587 | SMTP_USER=votre@gmail.com | SMTP_PASS=mot-de-passe-application"
    );
    return { ok: false, reason: "not_configured" };
  }

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: sanitizeHeader(opts.replyTo),
      subject: sanitizeHeader(opts.subject) ?? "(sans sujet)",
      html: opts.html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[mailer] sendMail failed:", error);
    return { ok: false, reason: "send_failed", error };
  }
}
