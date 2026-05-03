import nodemailer from "nodemailer";

// Configure via env vars on Vercel:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
// Without these the function logs to console only (dev fallback).

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
}) {
  const from = process.env.SMTP_FROM ?? "Glaces en Seine <noreply@glacesenseine.fr>";
  const to   = process.env.SMTP_TO   ?? "glacesenseine@gmail.com";

  const transport = getTransport();
  if (!transport) {
    console.error(
      "[mailer] SMTP non configuré. Ajoutez SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS dans les variables d'environnement Vercel.\n" +
      "Pour Gmail : SMTP_HOST=smtp.gmail.com | SMTP_PORT=587 | SMTP_USER=votre@gmail.com | SMTP_PASS=mot-de-passe-application"
    );
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  await transport.sendMail({ from, to, replyTo: opts.replyTo, subject: opts.subject, html: opts.html });
}
