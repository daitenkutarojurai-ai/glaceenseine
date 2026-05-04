import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { listContacts, sendTransactional } from "@/lib/brevo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildHtml(now: Date) {
  const dateFr = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto;color:#222">
      <h1 style="color:#2E8475;margin-bottom:4px">Glaces en Seine — la lettre de la semaine</h1>
      <p style="color:#666;margin-top:0">${dateFr}</p>
      <p>Bonjour 👋</p>
      <p>
        On vous attend ce week-end sur le quai de Seine, entre La Frette et
        Cormeilles-en-Parisis. Au programme : crêpes, gaufres, glaces et
        boissons fraîches, samedi et dimanche de 14h à 19h.
      </p>
      <p style="margin:24px 0">
        <a href="https://www.glaceenseine.fr/menu"
           style="background:#2E8475;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;display:inline-block">
          Voir le menu
        </a>
      </p>
      <p style="color:#888;font-size:12px;margin-top:32px">
        Vous recevez cet email car vous êtes inscrit·e à la lettre Glaces en Seine.
        Pour vous désinscrire, répondez « stop ».
      </p>
    </div>`;
}

async function handle(req: Request) {
  const url = new URL(req.url);
  const auth = req.headers.get("authorization") ?? "";
  const provided = url.searchParams.get("secret") ?? auth.replace(/^Bearer\s+/i, "");
  const expected = process.env.CRON_SECRET;

  if (!expected || provided !== expected) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const isDry = url.searchParams.get("dry") === "1";
  const html = buildHtml(now);
  const subject = isDry
    ? "[TEST] Lettre hebdo — Glaces en Seine"
    : "Glaces en Seine — la lettre de la semaine";

  // Dry mode → only the ops mailbox (SMTP_TO), via SMTP relay. Lets us validate
  // formatting without spamming real subscribers and without hitting the Brevo
  // REST API (which is IP-restricted).
  if (isDry) {
    const r = await sendMail({ subject, html });
    if (!r.ok) {
      return NextResponse.json({ ok: false, reason: r.reason }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: "dry", sentTo: 1, sentAt: now.toISOString() });
  }

  // Real broadcast: pull subscribers from the configured Brevo list, then send
  // each one a transactional email via Brevo's /smtp/email (BCC-style privacy).
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!Number.isFinite(listId) || listId <= 0) {
    return NextResponse.json({ ok: false, error: "BREVO_LIST_ID not configured" }, { status: 500 });
  }

  const contacts = await listContacts(listId);
  if (!contacts.ok) {
    return NextResponse.json({ ok: false, error: contacts.error }, { status: 502 });
  }

  const recipients = contacts.data.filter((c) => !c.emailBlacklisted);
  let sent = 0;
  const failures: { email: string; error: string }[] = [];

  for (const c of recipients) {
    const r = await sendTransactional({
      to: [{ email: c.email }],
      subject,
      htmlContent: html,
      replyTo: { email: "contact@glaceenseine.fr", name: "Glaces en Seine" },
    });
    if (r.ok) sent++;
    else failures.push({ email: c.email, error: r.error });
  }

  return NextResponse.json({
    ok: failures.length === 0,
    mode: "broadcast",
    listId,
    total: recipients.length,
    sent,
    failed: failures.length,
    failures: failures.slice(0, 5),
    sentAt: now.toISOString(),
  });
}

export const GET = handle;
export const POST = handle;
