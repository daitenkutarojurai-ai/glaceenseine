import { NextResponse } from "next/server";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { gcBuckets, getClientIp, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

type Payload = {
  rating?: number;
  emoji?: string;
  comment?: string;
  website?: string; // honeypot
};

const EMOJIS: Record<string, string> = {
  love: "😍 Coup de cœur",
  good: "😊 Bien",
  meh:  "😐 Moyen",
  bad:  "😕 Décevant",
};

export async function POST(req: Request) {
  gcBuckets();
  const ip = getClientIp(req);
  const rl = rateLimit(`feedback:${ip}`, { windowMs: 60_000, max: 5 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: "Trop d'avis envoyés — réessayez dans une minute." },
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

  const rating  = Number(body.rating ?? 0);
  const emoji   = EMOJIS[body.emoji ?? ""] ?? "";
  const comment = (body.comment ?? "").trim().slice(0, 2000);

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, message: "Merci de donner une note." }, { status: 400 });
  }

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const result = await sendMail({
    subject: `⭐ Nouvel avis Glaces en Seine — ${stars}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto">
        <h2 style="color:#E26B5C">⭐ Nouvel avis reçu</h2>
        <p><strong>Note :</strong> ${stars} (${rating}/5)</p>
        ${emoji ? `<p><strong>Ressenti :</strong> ${escapeHtml(emoji)}</p>` : ""}
        ${comment ? `<p><strong>Commentaire :</strong><br>${escapeHtml(comment).replace(/\n/g, "<br>")}</p>` : "<p><em>Pas de commentaire.</em></p>"}
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glacesenseine.fr · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  // L'avis est best-effort : l'utilisateur a fait sa part, on ne le bloque pas
  // si le mail ne part pas — on log côté serveur pour surveillance.
  return NextResponse.json({ ok: true, emailFailed: !result.ok });
}
