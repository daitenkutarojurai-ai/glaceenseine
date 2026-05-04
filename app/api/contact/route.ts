import { NextResponse } from "next/server";
import { sendMail, escapeHtml } from "@/lib/mailer";

const MAX_NAME = 120;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 4000;

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requête invalide." },
      { status: 400 },
    );
  }

  // Honeypot — silently accept (don't tip off bots)
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, MAX_NAME);
  const email = (body.email ?? "").trim().slice(0, MAX_NAME);
  const message = (body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Votre prénom est un peu court." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "L'email ne semble pas valide." },
      { status: 400 },
    );
  }
  if (!message || message.length < 5) {
    return NextResponse.json(
      { ok: false, message: "Votre message est trop court." },
      { status: 400 },
    );
  }

  const subject = (body.subject ?? "").trim().slice(0, MAX_SUBJECT) || "Message sans sujet";

  const result = await sendMail({
    subject: `✉️ Message de ${name} — Glaces en Seine`,
    replyTo: email,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto">
        <h2 style="color:#E26B5C">✉️ Nouveau message reçu</h2>
        <p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
        <hr style="margin:16px 0;border-color:#eee">
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glacesenseine.fr · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "L'envoi a échoué. Réessayez dans un instant ou écrivez-nous sur Instagram @glacesenseine." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
