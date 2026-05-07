/**
 * Glace en Seine — Newsletter test sender (CLI).
 *
 * Reads the variation pools from `newsletter/content.json` and sends one or
 * more rendered templates as test emails via Brevo (REST API by default,
 * SMTP fallback). The Vercel weekly cron uses the same content.json via
 * `lib/newsletter.ts`.
 *
 * Run:
 *   node newsletter/sendEmail.js                # all 4 templates, variant 0
 *   node newsletter/sendEmail.js --only=2       # only template id=2 / key=humour
 *   node newsletter/sendEmail.js --week=now     # auto-pick like the cron does today
 *   node newsletter/sendEmail.js --week=12      # preview week 12 (template + variant)
 *   node newsletter/sendEmail.js --to=foo@bar   # override recipient
 *   node newsletter/sendEmail.js --dry          # render to newsletter/out/, no send
 *
 * Edit pools in content.json — name lists, polls, fun facts, hook copy.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const nodemailer = require("nodemailer");

const CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname, "content.json"), "utf8"));
const TEMPLATES = CONFIG.templates;

const DEFAULT_RECIPIENT = "daitenkutarojurai@gmail.com";

// Use the verified `glaceenseine.fr` domain (DKIM/SPF authenticated in Brevo
// 2026-05-04). Do NOT use `@gmail.com` — Gmail's DMARC p=reject silently
// drops mail forged from gmail.com through a non-Gmail relay.
const DEFAULT_FROM = "Glaces en Seine <contact@glaceenseine.fr>";

// Reference epoch for week numbering. Sat 2026-05-02 00:00:00 Europe/Paris.
// Picks are deterministic from this anchor — week 0 is the first Saturday of
// May 2026 (start of the operating season).
const WEEK_EPOCH_MS = Date.UTC(2026, 4, 1, 22, 0, 0); // 2026-05-02 00:00 CEST = 2026-05-01 22:00Z

// ---------------------------------------------------------------------------
// Variant picking
// ---------------------------------------------------------------------------

/** Integer week index since the season epoch (can be negative before May 2026). */
function weekIndex(date = new Date()) {
  const ms = date.getTime() - WEEK_EPOCH_MS;
  return Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
}

/**
 * For a given week number, returns the template to send and the variant
 * indices for each pool. Cycles 1→2→3→4 every week. Each time a template
 * comes back, a new variant is picked from each of its pools.
 */
function pickForWeek(week) {
  const tIdx = ((week % TEMPLATES.length) + TEMPLATES.length) % TEMPLATES.length;
  const template = TEMPLATES[tIdx];
  const cycle = Math.floor(week / TEMPLATES.length);
  const pickFrom = (pool) => pool[((cycle % pool.length) + pool.length) % pool.length];
  return {
    template,
    week,
    variant: {
      hook: pickFrom(template.hooks),
      shoutout: pickFrom(template.shoutouts),
      poll: pickFrom(template.polls),
      funfact: pickFrom(template.funfacts),
    },
  };
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

function renderTemplate(template, variant) {
  const file = path.resolve(__dirname, template.file);
  let html = fs.readFileSync(file, "utf8");
  html = html
    .replace(/\{\{KICKER\}\}/g, variant.hook.kicker)
    .replace(/\{\{HOOK_TITLE\}\}/g, variant.hook.title)
    .replace(/\{\{HOOK_BODY\}\}/g, variant.hook.body)
    .replace(/\{\{NAME1\}\}/g, variant.shoutout[0])
    .replace(/\{\{NAME2\}\}/g, variant.shoutout[1])
    .replace(/\{\{NAME3\}\}/g, variant.shoutout[2])
    .replace(/\{\{POLL\}\}/g, variant.poll)
    .replace(/\{\{FUNFACT\}\}/g, variant.funfact)
    .replace(/\{\{MENU_BUTTON\}\}/g, template.menuButton);
  return html;
}

/** Helper used by tests / the API route — variant 0 across all pools. */
function variantZero(template) {
  return {
    hook: template.hooks[0],
    shoutout: template.shoutouts[0],
    poll: template.polls[0],
    funfact: template.funfacts[0],
  };
}

// ---------------------------------------------------------------------------
// SMTP / Brevo plumbing
// ---------------------------------------------------------------------------

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local");
  }
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: { user, pass },
  });
}

function parseFromHeader(header) {
  const m = header.match(/^\s*(.+?)\s*<(.+?)>\s*$/);
  if (m) return { name: m[1], email: m[2] };
  return { name: undefined, email: header.trim() };
}

function brevoApiSend({ apiKey, from, to, subject, html, templateKey }) {
  return new Promise((resolve, reject) => {
    const sender = parseFromHeader(from);
    const payload = JSON.stringify({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent: html,
      headers: { "X-Newsletter-Template": templateKey },
    });
    const req = https.request(
      {
        method: "POST",
        hostname: "api.brevo.com",
        path: "/v3/smtp/email",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
          "content-length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try { resolve({ status: res.statusCode, ...JSON.parse(body) }); }
            catch { resolve({ status: res.statusCode, raw: body }); }
          } else {
            reject(new Error(`Brevo API ${res.statusCode}: ${body}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function sendOne({ template, variant, recipient, fromOverride }) {
  const html = renderTemplate(template, variant);
  const from = fromOverride || process.env.NEWSLETTER_FROM || DEFAULT_FROM;
  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
    return brevoApiSend({ apiKey, from, to: recipient, subject: template.subject, html, templateKey: template.key });
  }
  const transport = getTransport();
  return transport.sendMail({
    from,
    to: recipient,
    subject: template.subject,
    html,
    headers: { "X-Newsletter-Template": template.key },
  });
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const out = { only: null, to: DEFAULT_RECIPIENT, dry: false, from: null, week: null };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--only=")) out.only = arg.slice("--only=".length);
    else if (arg.startsWith("--to=")) out.to = arg.slice("--to=".length);
    else if (arg.startsWith("--from=")) out.from = arg.slice("--from=".length);
    else if (arg.startsWith("--week=")) out.week = arg.slice("--week=".length);
    else if (arg === "--dry" || arg === "--dry-run") out.dry = true;
  }
  return out;
}

function writeDryRun(template, variant) {
  const outDir = path.resolve(__dirname, "out");
  fs.mkdirSync(outDir, { recursive: true });
  const html = renderTemplate(template, variant);
  const outPath = path.join(outDir, `${template.id}-${template.key}.html`);
  fs.writeFileSync(outPath, html, "utf8");
  return { path: outPath, bytes: Buffer.byteLength(html, "utf8") };
}

function resolveTargets(args) {
  // --week=now / --week=<int> → single template + variant for that week.
  if (args.week !== null) {
    const wk = args.week === "now" ? weekIndex() : Number(args.week);
    if (!Number.isFinite(wk)) throw new Error(`Invalid --week value: ${args.week}`);
    const pick = pickForWeek(wk);
    return [pick];
  }
  // --only=<id|key> → that one template, variant 0.
  if (args.only) {
    const t = TEMPLATES.find((x) => String(x.id) === args.only || x.key === args.only);
    if (!t) throw new Error(`No template matched --only=${args.only}`);
    return [{ template: t, variant: variantZero(t), week: null }];
  }
  // Default: all 4 templates, variant 0 (preview / regression test).
  return TEMPLATES.map((t) => ({ template: t, variant: variantZero(t), week: null }));
}

async function main() {
  loadEnvLocal();
  const args = parseArgs(process.argv);
  const targets = resolveTargets(args);

  if (args.dry) {
    console.log(`Dry run — rendering ${targets.length} variant(s) to newsletter/out/`);
    for (const { template, variant, week } of targets) {
      const info = writeDryRun(template, variant);
      const tag = week !== null ? `[week ${week}] ` : "";
      console.log(`  [render] ${tag}#${template.id} ${template.key} — ${template.subject}`);
      console.log(`           kicker="${variant.hook.kicker}"`);
      console.log(`           ${info.path}  (${info.bytes} bytes)`);
    }
    console.log("\nOpen the .html files in a browser to preview. No email was sent.");
    return;
  }

  const fromAddr = args.from || process.env.NEWSLETTER_FROM || DEFAULT_FROM;
  const route = process.env.BREVO_API_KEY ? "Brevo REST API" : "SMTP";
  console.log(`Sending ${targets.length} variant(s) to ${args.to} from ${fromAddr} via ${route}`);
  for (const { template, variant, week } of targets) {
    const tag = week !== null ? `[week ${week}] ` : "";
    try {
      const info = await sendOne({ template, variant, recipient: args.to, fromOverride: fromAddr });
      const id = info.messageId || info.response || "(no id)";
      console.log(`  [ok] ${tag}#${template.id} ${template.key} — ${template.subject}`);
      console.log(`        kicker="${variant.hook.kicker}"  ${id}`);
    } catch (err) {
      console.error(`  [fail] ${tag}#${template.id} ${template.key}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  TEMPLATES,
  WEEK_EPOCH_MS,
  weekIndex,
  pickForWeek,
  renderTemplate,
  variantZero,
};
