import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { listContacts, sendTransactional } from "@/lib/brevo";
import { prepareWeeklySend, weekIndex } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(req: Request) {
  const url = new URL(req.url);
  const auth = req.headers.get("authorization") ?? "";
  const provided = url.searchParams.get("secret") ?? auth.replace(/^Bearer\s+/i, "");
  const expected = process.env.CRON_SECRET;

  const { timingSafeEqual } = await import("crypto");
  const valid =
    !!expected &&
    provided.length === expected.length &&
    timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!valid) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const isDry = url.searchParams.get("dry") === "1";

  // ?week=<int> is a manual override for testing — otherwise the cron picks
  // the current week deterministically. Same rotation as the CLI in
  // newsletter/sendEmail.js.
  const weekParam = url.searchParams.get("week");
  const week = weekParam !== null ? Number(weekParam) : weekIndex(now);
  if (!Number.isFinite(week)) {
    return NextResponse.json({ ok: false, error: "Invalid week parameter" }, { status: 400 });
  }

  const pick = prepareWeeklySend(weekParam !== null
    ? new Date(Date.UTC(2026, 4, 1, 22, 0, 0) + week * 7 * 24 * 60 * 60 * 1000)
    : now);

  const subject = isDry ? `[TEST] ${pick.template.subject}` : pick.template.subject;
  const meta = {
    week: pick.week,
    template: { id: pick.template.id, key: pick.template.key },
    kicker: pick.variant.hook.kicker,
  };

  // Dry mode → only the ops mailbox (SMTP_TO) via SMTP relay. Lets us
  // sanity-check the rendered HTML without spamming subscribers.
  if (isDry) {
    const r = await sendMail({ subject, html: pick.html });
    if (!r.ok) {
      return NextResponse.json({ ok: false, reason: r.reason, ...meta }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: "dry", sentTo: 1, sentAt: now.toISOString(), ...meta });
  }

  // Real broadcast: pull subscribers from the configured Brevo list, then
  // send each one a transactional email via Brevo's /smtp/email (one call
  // per recipient — keeps each subscriber's address private).
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!Number.isFinite(listId) || listId <= 0) {
    return NextResponse.json({ ok: false, error: "BREVO_LIST_ID not configured" }, { status: 500 });
  }

  const contacts = await listContacts(listId);
  if (!contacts.ok) {
    return NextResponse.json({ ok: false, error: contacts.error, ...meta }, { status: 502 });
  }

  const recipients = contacts.data.filter((c) => !c.emailBlacklisted);
  let sent = 0;
  const failures: { email: string; error: string }[] = [];

  for (const c of recipients) {
    const r = await sendTransactional({
      to: [{ email: c.email }],
      subject,
      htmlContent: pick.html,
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
    ...meta,
  });
}

export const GET = handle;
export const POST = handle;
