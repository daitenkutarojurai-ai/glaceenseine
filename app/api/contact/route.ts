import { NextResponse } from "next/server";

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

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

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

  // For now we just log — wire to SMTP / Resend / a Slack webhook later.
  console.log("[contact]", {
    name,
    email,
    subject: (body.subject ?? "").slice(0, 200),
    message: message.slice(0, 5000),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
