import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || name.length < 2)
    return NextResponse.json({ ok: false, message: "Votre nom est requis." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, message: "Email invalide." }, { status: 400 });
  if (!body.eventType)
    return NextResponse.json({ ok: false, message: "Merci de choisir un type d'événement." }, { status: 400 });

  const rows = [
    ["Type d'événement", body.eventType ?? "—"],
    ["Date envisagée",   body.date     || "Non précisée"],
    ["Nombre d'invités", body.guests   || "Non précisé"],
    ["Lieu",             body.location || "Non précisé"],
    ["Téléphone",        body.phone    || "Non précisé"],
  ];

  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#999;font-size:13px;white-space:nowrap">${k}</td><td style="padding:4px 0;font-size:14px;color:#221C12">${v}</td></tr>`)
    .join("");

  await sendMail({
    subject: `🎉 Demande de privatisation — ${name} (${body.eventType})`,
    replyTo: email,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#E26B5C">🎉 Nouvelle demande de privatisation</h2>
        <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
        <table style="border-collapse:collapse;margin:12px 0">${tableRows}</table>
        ${body.message ? `<p><strong>Message :</strong><br>${(body.message as string).replace(/\n/g, "<br>")}</p>` : ""}
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glacesenseine.fr/privatisation · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  return NextResponse.json({ ok: true });
}
