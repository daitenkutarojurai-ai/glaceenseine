import { NextResponse } from "next/server";
import { sendMail, escapeHtml } from "@/lib/mailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: string; website?: string };

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (body.website?.trim()) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide." }, { status: 400 });
  }

  const result = await sendMail({
    subject: "📧 Nouvelle inscription newsletter — Glaces en Seine",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#2E8475">📧 Nouvelle inscription</h2>
        <p>L'adresse <strong>${escapeHtml(email)}</strong> souhaite être prévenue à l'ouverture de la saison.</p>
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glacesenseine.fr · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  // L'inscription est best-effort : on log la trace côté serveur pour rattraper
  // si SMTP est cassé, mais l'utilisateur n'a aucune action corrective possible.
  if (!result.ok) {
    console.error(`[newsletter] inscription enregistrée mais email non envoyé (${result.reason}) — adresse: ${email}`);
  }

  return NextResponse.json({ ok: true });
}
