// Brevo v3 REST helpers (contacts + transactional broadcast).
// Requires BREVO_API_KEY. Note: Brevo enforces IP whitelisting on the API by
// default — if calls return code "unauthorized" with a "unrecognised IP"
// message, add the calling IP at https://app.brevo.com/security/authorised_ips
// (or add Vercel's egress range, or disable the IP guard for the API key).

const API = "https://api.brevo.com/v3";

export type BrevoResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

function key(): string | null {
  return process.env.BREVO_API_KEY ?? null;
}

async function call<T>(
  path: string,
  init: RequestInit = {},
): Promise<BrevoResult<T>> {
  const k = key();
  if (!k) return { ok: false, status: 0, error: "BREVO_API_KEY not configured" };

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "api-key": k,
      "content-type": "application/json",
      accept: "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: unknown = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }

  if (!res.ok) {
    const msg = typeof parsed === "object" && parsed && "message" in parsed
      ? String((parsed as { message: unknown }).message)
      : text || res.statusText;
    return { ok: false, status: res.status, error: msg };
  }
  return { ok: true, data: parsed as T };
}

/** Add (or update) a contact and attach them to a Brevo list. Idempotent:
 *  if the email already exists, Brevo returns 400 "Contact already exist" —
 *  we then PUT /contacts/{email} to ensure the listId is attached. */
export async function addContactToList(
  email: string,
  listId: number,
  attributes: Record<string, unknown> = {},
): Promise<BrevoResult> {
  const create = await call<{ id: number }>("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email,
      listIds: [listId],
      attributes,
      updateEnabled: true,
    }),
  });
  return create;
}

type BrevoContact = { email: string; emailBlacklisted?: boolean };
type ListContactsPage = { contacts: BrevoContact[]; count: number };

/** Iterate every contact in the given list (paginated). */
export async function listContacts(listId: number): Promise<BrevoResult<BrevoContact[]>> {
  const all: BrevoContact[] = [];
  let offset = 0;
  const limit = 500;
  // Hard cap to avoid runaway loops.
  for (let i = 0; i < 50; i++) {
    const page = await call<ListContactsPage>(
      `/contacts/lists/${listId}/contacts?limit=${limit}&offset=${offset}`,
    );
    if (!page.ok) return page;
    const batch = page.data?.contacts ?? [];
    all.push(...batch);
    if (batch.length < limit) break;
    offset += limit;
  }
  return { ok: true, data: all };
}

/** Send one transactional email via Brevo's /smtp/email (no SMTP needed). */
export async function sendTransactional(opts: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { email: string; name?: string };
  replyTo?: { email: string; name?: string };
}): Promise<BrevoResult> {
  const fromHeader = process.env.SMTP_FROM ?? "Glaces en Seine <contact@glaceenseine.fr>";
  const m = fromHeader.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  const sender = opts.sender ?? (m
    ? { name: m[1] || undefined, email: m[2] }
    : { email: fromHeader });

  return call("/smtp/email", {
    method: "POST",
    body: JSON.stringify({
      sender,
      to: opts.to,
      subject: opts.subject,
      htmlContent: opts.htmlContent,
      replyTo: opts.replyTo,
    }),
  });
}
