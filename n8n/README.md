# n8n — Glace en Seine social automation

## Workflow: `glace-saturday-fb-ig.json`

Posts the same image (`affiche.jpeg`) + a rotating caption to **Facebook
Page** and **Instagram Business Account** every Saturday at 09:00 UTC =
11:00 Paris (CEST, May–Sept).

Pipeline:
```
[Saturday 09:00 UTC]
       ↓
[Pick caption (week-based)]      ─── 4 caption variants, cycles every 4 weeks
       ↓
   ┌───┴────┐
   ↓        ↓
[IG container]   [FB Page photo]   (run in parallel)
   ↓
[Wait 8s]                          ─── container processing buffer
   ↓
[IG publish]
```

Caption rotation matches the email newsletter — anchor week 0 = Sat
2026-05-02. Pool order: `météo → humour → QR → crew`, repeats every 4
weeks.

## Setup (one-time)

### 1. Create the credential in n8n

In n8n: **Credentials → New → Header Auth** (under "Generic Credential
Type"). Name it **`FB Graph — Glace en Seine`** and fill:

| Field | Value |
|---|---|
| Name  | `Authorization` |
| Value | `Bearer <PAGE_ACCESS_TOKEN>` |

Get a fresh non-expiring page token with this curl (uses the user
token + app credentials):

```bash
USER_TOKEN="<your-long-lived-user-token>"
curl -s "https://graph.facebook.com/v22.0/1147900985068771?fields=access_token&access_token=${USER_TOKEN}"
# → {"access_token":"EAA...","id":"1147900985068771"}
```

The page token returned has `expires_at: 0` (never expires) as long as the
parent user token is long-lived — verified.

### 2. Import the workflow

n8n: **Workflows → Import from File →** pick `glace-saturday-fb-ig.json`.

### 3. Re-attach the credential

The JSON has placeholder credential IDs (`REPLACE_WITH_CREDENTIAL_ID`).
After import, open each of the 3 HTTP Request nodes
(`IG · create container`, `IG · publish`, `FB Page · post photo`) and
under "Authentication" → "Credential" pick **`FB Graph — Glace en Seine`**.
Save.

### 4. Test before activating

- **Dry-run the caption picker only**: right-click `Pick caption
  (week-based)` → "Execute Node". You should see `{ week, caption,
  imageUrl }` in the output panel. The `caption` matches the current
  week's pool entry.

- **Full pipeline test** (this WILL publish to FB + IG immediately):
  click the workflow's "Execute Workflow" button. Verify both posts
  appear, then delete the test posts on FB and IG manually.

  Alternative — exercise only the IG container without publishing:
  temporarily disconnect `IG · publish` and `FB Page · post photo`, run
  Execute Workflow, confirm the IG container endpoint returns
  `{"id":"…"}`. Containers expire after 24h if not published, so this
  leaves no trace.

### 5. Activate

Toggle **Active** in the top-right of the workflow editor. The next firing
will be the upcoming Saturday at 09:00 UTC.

## Constants embedded in the workflow

| What | Value | Source |
|---|---|---|
| IG Business Account ID | `17841426669574462` | `/me/accounts → instagram_business_account.id` |
| FB Page ID             | `1147900985068771` | `/me/accounts` (the "Glace en seine" Ice Cream Shop entry) |
| Image URL              | `https://www.glaceenseine.fr/newsletter/affiche.jpeg` | served by Vercel from `public/newsletter/` |
| Schedule               | `0 9 * * 6` UTC | = 11h Paris CEST May–Sept (10h CET in winter) |
| Week anchor            | Sat 2026-05-02 = week 0 | shared with `lib/newsletter.ts` |

## Editing captions

Open the `Pick caption (week-based)` node in n8n and edit the `captions`
array. Order is `[météo, humour, QR, crew]` — add more entries to the
array to extend the rotation (each becomes a new month-of-the-year).

## Token renewal

The user-level access token expires every 60 days **only if the user
disengages** (`data_access_expires_at` slides forward each time Thomas
opens the FB app or logs in). The page token is non-expiring as long as
the user token is alive.

If the token does die (Thomas changes password, revokes app access, or
goes 90 days without engagement):

1. https://developers.facebook.com/tools/explorer
2. Pick app "glace en seine", "Get User Access Token", grant the same
   scopes (Insta + Pages).
3. Exchange to long-lived:
   ```bash
   curl "https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1228180942558046&client_secret=02847c790570e1e28072c76bd4d132f2&fb_exchange_token=<short-lived>"
   ```
4. Re-fetch the page token (curl above).
5. Update the n8n credential with the new `Bearer <page-token>`.

A monthly health-check workflow (call `/debug_token`, alert if
`expires_at` is non-zero or `is_valid` is false) is a good idea — easy to
add as a second n8n workflow.

## Threads — separate flow needed

The Threads app credentials you have (`1789496902015929` /
`acd33d6d01a3c8d88c2f60c38bb23894`) require their own OAuth flow against
`graph.threads.net` — the Facebook user token won't work there. When
you're ready to add Threads cross-posting, follow
https://developers.facebook.com/docs/threads/get-started to obtain a
Threads-specific access token, store it as a second credential
(`Threads — Glace en Seine`), and add a third HTTP Request branch:
- `POST /v1.0/me/threads` (text + media_url + media_type=IMAGE) → returns container_id
- `POST /v1.0/me/threads_publish` with that container_id

Same 2-step pattern as Instagram.
