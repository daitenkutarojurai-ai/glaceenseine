import { NextResponse } from "next/server";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { addContactToList } from "@/lib/brevo";
import { gcBuckets, getClientIp, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: string; website?: string };

export async function POST(req: Request) {
  gcBuckets();
  const ip = getClientIp(req);
  const rl = rateLimit(`newsletter:${ip}`, { windowMs: 60_000, max: 5 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: "Trop d'inscriptions d'affilée — réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }
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

  // Best-effort: push to Brevo list, then notify ops by email. We don't surface
  // partial failures to the user — they did their part.
  const listId = Number(process.env.BREVO_LIST_ID);
  if (Number.isFinite(listId) && listId > 0) {
    const r = await addContactToList(email, listId, { OPTIN_SOURCE: "site" });
    if (!r.ok) {
      console.error(`[newsletter] Brevo addContact failed (${r.status}): ${r.error} — email: ${email}`);
    }
  }

  const result = await sendMail({
    subject: "📧 Nouvelle inscription newsletter — Glaces en Seine",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#2E8475">📧 Nouvelle inscription</h2>
        <p>L'adresse <strong>${escapeHtml(email)}</strong> souhaite être prévenue à l'ouverture de la saison.</p>
        <p>Ajoutée à la liste Brevo #${listId || "(non configurée)"}.</p>
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glaceenseine.fr · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  if (!result.ok) {
    console.error(`[newsletter] inscription enregistrée mais email non envoyé (${result.reason}) — adresse: ${email}`);
  }

  return NextResponse.json({ ok: true });
}
