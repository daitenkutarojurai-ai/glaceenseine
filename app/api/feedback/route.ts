import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

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

  await sendMail({
    subject: `⭐ Nouvel avis Glaces en Seine — ${stars}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto">
        <h2 style="color:#E26B5C">⭐ Nouvel avis reçu</h2>
        <p><strong>Note :</strong> ${stars} (${rating}/5)</p>
        ${emoji ? `<p><strong>Ressenti :</strong> ${emoji}</p>` : ""}
        ${comment ? `<p><strong>Commentaire :</strong><br>${comment.replace(/\n/g, "<br>")}</p>` : "<p><em>Pas de commentaire.</em></p>"}
        <hr style="margin:16px 0;border-color:#eee">
        <p style="color:#999;font-size:12px">Reçu via glacesenseine.fr · ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
      </div>`,
  });

  return NextResponse.json({ ok: true });
}
