# Glace en Seine — Public site (glaceenseine.fr)

Next.js 14 site for the food caravan: menu, contact, attente, mentions, etc.
SMTP via Brevo (`.env.local` + Vercel env). The Sunday-briefing dashboard
lives in a separate repo (`/home/flammeur/glaceensein`) and is a different
project — do not mix them.

---

## Newsletter system

Folder: `newsletter/`

```
newsletter/
  templates/
    template1-meteo.html    # météo / rassemblement
    template2-humour.html   # humour chill
    template3-qr.html       # jeu QR / focus produit
    template4-crew.html     # communauté / crew
  sendEmail.js              # renderer + nodemailer sender (test mode)
public/newsletter/
  affiche.jpeg              # light hero image used as background in all 4 templates
```

### Tone

- French, fun, light, non-serious, community-driven.
- Short paragraphs, no corporate tone, no emoji.
- Brand voice: warm, local, slightly cheeky.

### Design system (image-free, fully email-compatible)

Templates use **no images at all** — Gmail blocks remote images by default
and strips data URIs in some clients, so the previous hero + icon designs
appeared broken. Everything is now CSS-styled HTML blocks with inline
`background-color`s, which render identically in Gmail web/mobile, Outlook,
Apple Mail and Yahoo. Total rendered size per email ≈ **8 KB**.

**Palette (eye-catchy):**

| Token        | Hex       | Use                                      |
|--------------|-----------|------------------------------------------|
| Hot pink     | `#FF5A8C` | Hero band, CTA card, kicker text         |
| Sunny yellow | `#FFD93D` | QR card (T3), Fun fact card, name chips, footer link |
| Mint         | `#7DD8B0` | Poll card                                |
| Deep teal    | `#1F5B5F` | Event card bg, dark text, footer bg, menu button |
| Cream        | `#FFF8E8` | Page background                          |
| White        | `#FFFFFF` | Card surface, hot-pink CTA text          |
| Slate        | `#2A3132` | Body copy                                |

Visual rhythm alternates bold colored blocks (hero / event / QR / CTA / poll
/ fun fact) with neutral white sections (hook / shoutout) so it's energetic
without becoming a wall of color.

### Shared structure (all 4 templates)

1. **Hero band** — solid hot-pink block with white wordmark `GLACE EN
   SEINE`, kicker `Crêpes · Gaufres · Glaces`, location strap. No image.
2. Hook — kicker label + bold deep-teal title + body. Varies per template.
   **No exact-day references** (newsletter isn't always sent on a Sunday).
3. Event card — deep-teal block, yellow accent for "14h–19h · samedi &
   dimanche".
4. *(T3 only)* QR mode-d'emploi — sunny-yellow block with 3-step list. T1 /
   T2 / T4 do **not** have a QR section.
5. CTA card — hot-pink block with white text. Three social pills in their
   brand colors on white pill backgrounds:
   - **Instagram** → Insta pink `#E1306C` text
   - **Facebook** → FB blue `#1877F2` text
   - **Avis Google** → Google red `#EA4335` text, links to
     `https://g.page/r/CcKQvU-g5mpzEBM/review`
   Yellow `#glaceenseine` chip + "Tag-nous sur ta story **ou envoie-nous ta
   photo en DM**" + dark teal "VOIR LE MENU" button.
6. Shoutout — 3 first names (placeholders `{{NAME1}} {{NAME2}} {{NAME3}}`)
   highlighted with yellow `#FFD93D` chip backgrounds. Footer line:
   "Ton nom manque ? Dis-le-nous à ta prochaine crêpe".
7. Poll — mint-green block, `{{POLL}}` placeholder. Tail: "Viens nous le
   dire de vive voix."
8. Fun fact — sunny-yellow block, `{{FUNFACT}}` placeholder.
9. Footer — deep-teal bar, brand wordmark + address + hours + site link.

Placeholders are filled at send time by `sendEmail.js`. The `.html` files
are also viewable standalone in a browser (no external assets needed).

### Templates

| # | Key      | Subject                                                    |
|---|----------|------------------------------------------------------------|
| 1 | meteo    | Ce week-end, on prend le quai (et un cornet)               |
| 2 | humour   | On t'a pas oublié — y'a une glace qui t'attend             |
| 3 | qr       | Scanne, joue, choisis ta glace les yeux fermés             |
| 4 | crew     | Le gang Glace en Seine te cherche ce week-end              |

### Variation pools — single source of truth: `newsletter/content.json`

Every variable bit of copy lives in `content.json`. Each template carries
**4 pools of 4 entries** — `hooks` (kicker + title + body), `shoutouts` (3
names per entry), `polls`, `funfacts`. Both the CLI (`newsletter/sendEmail.js`)
and the Vercel cron (`lib/newsletter.ts` → `app/api/newsletter/weekly/route.ts`)
read this same file. Edit pools freely; longer pools = more weeks before any
combo repeats.

### Weekly rotation (deterministic)

Anchor: **Sat 2026-05-02 00:00 Europe/Paris = week 0.** Each Saturday
increments the week index by 1.

For week `w`:

```
template_id = (w mod 4) + 1
cycle       = floor(w / 4)
hook        = template.hooks   [cycle mod hooks.length]
shoutout    = template.shoutouts[cycle mod shoutouts.length]
poll        = template.polls   [cycle mod polls.length]
funfact     = template.funfacts[cycle mod funfacts.length]
```

So T1 returns every 4 weeks with a fresh hook + names + poll + fun fact.
With 4 entries per pool, **16 weeks (~4 months) elapse before any
template+variant combo repeats.**

| Week | Template | Hook kicker            |
|-----:|----------|------------------------|
|    0 | meteo    | Briefing du week-end   |
|    1 | humour   | Petit message tranquille|
|    2 | qr       | Un nouveau jeu         |
|    3 | crew     | Lettre du crew         |
|    4 | meteo    | Bulletin météo maison  |
|    5 | humour   | Niveau d'effort requis : zéro |
|    … | …        | …                      |
|   16 | meteo    | Briefing du week-end (loop) |

### Cron schedule

`vercel.json`: `"schedule": "0 9 * * 6"` — every **Saturday at 09:00 UTC =
11:00 Paris (CEST, May–Sept)**. In winter (CET) that becomes 10:00 Paris,
which is fine since the caravan only operates May–September.

The cron hits `/api/newsletter/weekly` with the `Authorization: Bearer
${CRON_SECRET}` header. The route:
1. Verifies the secret.
2. Computes the current week index (or honors `?week=<int>`).
3. Picks the template + variant.
4. Renders HTML from `newsletter/templates/...` with placeholders filled.
5. Pulls subscribers from Brevo list `${BREVO_LIST_ID}` (id 3) — paginated.
6. Sends one transactional `/v3/smtp/email` per recipient (so addresses
   stay private; no shared `to` header).
7. Returns a JSON summary `{ ok, mode, listId, total, sent, failed,
   week, template, kicker }`.

`?dry=1` mode sends only to `SMTP_TO` via SMTP for visual sanity-checking
without spamming subscribers.

`next.config.js` has `experimental.outputFileTracingIncludes` for the
weekly route so Vercel bundles `newsletter/templates/*.html` and
`content.json` into the serverless function.

### How to run (CLI, ad-hoc tests)

```bash
# All 4 templates with variant 0 (regression-style preview)
node newsletter/sendEmail.js

# Auto-pick what the cron would send right now
node newsletter/sendEmail.js --week=now

# Preview a future / past week (template + variant)
node newsletter/sendEmail.js --week=12 --dry

# Single template (by id or key), variant 0
node newsletter/sendEmail.js --only=qr

# Override recipient and/or From
node newsletter/sendEmail.js --to=someone@example.com
node newsletter/sendEmail.js --from='Glace en Seine <glacesenseine@gmail.com>'
```

### How to run (cron behavior, manually)

```bash
# Dry-run via the route (sends only to SMTP_TO, no subscribers touched)
curl "https://glaceenseine.fr/api/newsletter/weekly?dry=1&secret=${CRON_SECRET}"

# Force a specific week (still requires the secret; use sparingly)
curl "https://glaceenseine.fr/api/newsletter/weekly?dry=1&week=5&secret=${CRON_SECRET}"
```

Reads credentials from `.env.local` (no `dotenv` dependency — the script
parses it itself):
- **Preferred:** `BREVO_API_KEY` → uses Brevo's HTTPS REST API
  (`/v3/smtp/email`). Bypasses SMTP IP rate-limits, surfaces sender-rejection
  errors immediately. **This is what runs by default.**
- **Fallback:** `SMTP_HOST/PORT/USER/PASS` → nodemailer SMTP (only used if
  `BREVO_API_KEY` is unset).

### Verified-sender gotcha (important)

Brevo silently drops mail whose `From` address isn't a verified sender on the
account. As of 2026-05-07 the only verified sender is
`glacesenseine@gmail.com` (id 1). The script defaults `From` to
`Glace en Seine <glacesenseine@gmail.com>` for that reason — even though
`.env.local` has `SMTP_FROM=…<contact@glaceenseine.fr>` for the public site's
contact route.

**If you change the From address**, verify it first in Brevo (Senders &
domains) or the email will be silently quarantined. The previous symptom was
SMTP returning `[ok]` with a fake messageId while nothing reached the inbox.

### How to edit names / polls / fun facts / subjects

Two options:

1. **Direct edit** — change the `TEMPLATES` array at the top of
   `newsletter/sendEmail.js`. Each entry has `subject`, `shoutout` (array of
   3), `poll`, `funfact`.

2. **Programmatic** — import the helpers and override before calling main:

   ```js
   const { setShoutout, setPoll, setFunFact, setSubject } = require("./newsletter/sendEmail");
   setShoutout("meteo", ["Anna", "Karim", "Léo"]);
   setPoll("crew", "Tu viens à pied, à vélo ou en poussette ?");
   setFunFact("qr", "Le QR du menu te répond plus vite qu'un ado un dimanche matin.");
   setSubject("humour", "Y'a une glace à ton nom (sans pression)");
   ```

### Why no images

Earlier iterations used a hero JPEG (`affiche-email.jpeg`) and three social
PNG icons inlined as base64 data URIs. In practice they rendered as broken
placeholders in Gmail — Gmail blocks remote images by default until the user
clicks "show images", and Gmail mobile + Outlook desktop strip data URIs
entirely. The CSS-only design above is bulletproof.

The original assets are still in `public/newsletter/` (`affiche.jpeg`,
`affiche-email.jpeg`, `icons/{instagram,facebook,google}.png`) in case
they're useful for the website or future iterations, but the templates and
`sendEmail.js` no longer reference them.

### When to evolve

- Refresh the affiche each season (current one is "début mai à fin septembre").
- Drop in a real "winners" QR game once the on-site jeu is wired up.
- Plug into the Brevo list (`BREVO_LIST_ID=3`) for a proper newsletter send
  rather than test mode — currently the script only fires to a single test
  recipient.
