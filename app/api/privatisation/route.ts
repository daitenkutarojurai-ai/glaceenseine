import { NextResponse } from "next/server";
import { sendMail, escapeHtml } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SHORT = 200;
const MAX_MESSAGE = 4000;
const ALLOWED_EVENT_TYPES = new Set([
  "Mariage / PACS",
  "Événement entreprise",
  "Anniversaire / fête",
  "Fête de quartier / brocante",
  "Autre",
]);
const trim = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  date?: string;
  guests?: string;
  location?: string;
  message?: string;
  website?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (body.website?.trim()) return NextResponse.json({ ok: true });

  const name = trim(body.name, MAX_SHORT);
  const email = trim(body.email, MAX_SHORT);
  const phone = trim(body.phone, MAX_SHORT);
  const date = trim(body.date, MAX_SHORT);
  const guests = trim(body.guests, MAX_SHORT);
  const location = trim(body.location, MAX_SHORT);
  const eventType = trim(body.eventType, MAX_SHORT);
  const message = trim(body.message, MAX_MESSAGE);

  if (!name || name.length < 2)
    return NextResponse.json({ ok: false, message: "Votre nom est requis." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, message: "Email invalide." }, { status: 400 });
  if (!eventType || !ALLOWED_EVENT_TYPES.has(eventType))
    return NextResponse.json({ ok: false, message: "Merci de choisir un type d'événement." }, { status: 400 });

  const rows: [string, string][] = [
    ["Type d'événement", eventType],
    ["Date envisagée",   date     || "Non précisée"],
    ["Nombre d'invités", guests   || "Non précisé"],
    ["Lieu",             location || "Non précisé"],
    ["Téléphone",        phone    || "Non précisé"],
  ];

  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#999;font-size:13px;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:4px 0;font-size:14px;color:#221C12">${escapeHtml(v)}</td></tr>`)
    .join("");

  const result = await sendMail({
    subject: `🎉 Demande de privatisation — ${name} (${eventType})`,
    replyTo: email,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#E26B5C">🎉 Nouvelle demande de privatisation</h2>
        <p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <table style="border-collapse:collapse;margin:12px 0">${tableRows}</table>
        ${message ? `<p><strong>Message :</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glaceenseine.fr/privatisation · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "L'envoi a échoué. Réessayez dans un instant ou écrivez-nous sur Instagram @glaceenseine." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
