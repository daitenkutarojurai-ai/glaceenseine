# n8n — Glace en Seine social automation

## Workflow: `glace-saturday-fb-ig.json`

Posts **one** image + a rotating caption to **Facebook Page** and
**Instagram Business Account** every Saturday at 09:00 UTC = 11:00 Paris
(CEST, May–Sept). The image is picked from a Google Drive folder
(`glaceenseine/n8n/`) and **never repeats** until the whole pool has
cycled through.

Pipeline:
```
[Saturday 09:00 UTC]
        ↓
[Drive · list n8n folder]      ─── Drive API v3, OAuth2 auth
        ↓
[Pick image + caption]         ─── dedup via workflow staticData (no repeats)
        ↓                           4-week caption rotation
   ┌────┴────┐
   ↓         ↓
[IG container]  [FB Page photo]   (run in parallel)
   ↓
[Wait 8s]                          ─── container processing buffer
   ↓
[IG publish]
```

### Image source — Google Drive folder

| What | Value |
|---|---|
| Drive folder | `glaceenseine / n8n` |
| Folder ID    | `1kIj62TL-IkmLSt_3qVvkkyiYSWi8B-VV` |
| Public CDN URL pattern | `https://lh3.googleusercontent.com/d/<FILE_ID>=w2000` |

The workflow lists every image (`mimeType contains 'image/'`) directly
under the `n8n/` folder. New files dropped in the folder are picked up
automatically on the next run.

**Folder must be shared "Anyone with the link → Viewer"**, otherwise
Instagram's `image_url` fetcher will get 403'd. Done once, in Drive UI.

### Dedup — no repeat until the pool exhausts

The `Pick image + caption` Code node uses
`$getWorkflowStaticData('global').postedIds` to remember which Drive file
IDs have already been published. Each Saturday it filters them out, sorts
the remaining pool by name (deterministic), picks the first, and pushes
its ID into `postedIds`.

When the pool is empty (every image has been posted once), the list resets
to the full folder and the rotation starts over. The output flag
`cycleReset: true` is visible in the execution log when this happens — a
good moment to drop fresh images into the Drive folder.

### Caption rotation

4 captions cycling weekly, anchored on Sat 2026-05-02 = week 0 (matches
`newsletter/sendEmail.js`). Order: `météo → humour → QR → crew`. Edit
inside the `Pick image + caption` node.

## Setup (one-time)

### 1. Create the FB credential in n8n

**Credentials → New → Header Auth** (under "Generic Credential Type").
Name it **`FB Graph — Glace en Seine`** and fill:

| Field | Value |
|---|---|
| Name  | `Authorization` |
| Value | `Bearer <PAGE_ACCESS_TOKEN>` |

Get a fresh non-expiring page token:
```bash
USER_TOKEN="<your-long-lived-user-token>"
curl -s "https://graph.facebook.com/v22.0/1147900985068771?fields=access_token&access_token=${USER_TOKEN}"
# → {"access_token":"EAA...","id":"1147900985068771"}
```

### 2. Create the Google Drive credential in n8n

**Credentials → New → Google Drive OAuth2 API**. Name it
**`Google Drive — Glace en Seine`**. Authorise with the Google account
that owns the `glaceenseine/n8n/` folder (`diyfunproject@gmail.com`).
Required scope: `https://www.googleapis.com/auth/drive.readonly` (the
default Drive OAuth2 scope is fine).

### 3. Share the Drive folder publicly

Open the `n8n/` folder in Drive → **Share** → "General access" → set to
**"Anyone with the link"** with role **Viewer**. This is required so that
Instagram's image fetcher can download the file from the
`lh3.googleusercontent.com` CDN.

### 4. Import the workflow

n8n: **Workflows → Import from File →** pick
`glace-saturday-fb-ig.json`.

### 5. Re-attach credentials

The JSON has placeholder credential IDs. After import:

- **`Drive · list n8n folder`** → Authentication = Predefined Credential
  Type → Google Drive OAuth2 API → pick `Google Drive — Glace en Seine`.
- **`IG · create container`**, **`IG · publish`**,
  **`FB Page · post photo`** → Authentication = Header Auth → pick
  `FB Graph — Glace en Seine`.

Save.

### 6. Test before activating

- **Dry-run the picker only**: right-click `Pick image + caption` →
  "Execute Node" (after firing `Drive · list n8n folder` first). The
  output should show `{ pickedId, pickedName, imageUrl, caption,
  poolSize, postedCount, cycleReset }`. Open `imageUrl` in a private tab
  to confirm the image is reachable without authentication.

- **Full pipeline test** (publishes immediately): click
  "Execute Workflow". Verify both posts appear, then delete the test
  posts on FB and IG manually. **Note:** the test consumes one slot in
  the dedup list — that picture won't be picked again on Saturday.

  Alternative — exercise IG container without publishing: temporarily
  disconnect `IG · publish` and `FB Page · post photo`, run Execute
  Workflow, confirm the IG container endpoint returns `{"id":"…"}`.
  Containers expire after 24h if not published.

### 7. Activate

Toggle **Active** in the top-right of the workflow editor. The next
firing will be the upcoming Saturday at 09:00 UTC.

## Constants embedded in the workflow

| What | Value | Source |
|---|---|---|
| IG Business Account ID | `17841426669574462` | `/me/accounts → instagram_business_account.id` |
| FB Page ID             | `1147900985068771` | `/me/accounts` (the "Glace en seine" Ice Cream Shop entry) |
| Drive folder ID        | `1kIj62TL-IkmLSt_3qVvkkyiYSWi8B-VV` | `glaceenseine/n8n/` in Drive |
| Schedule               | `0 9 * * 6` UTC | = 11h Paris CEST May–Sept (10h CET in winter) |
| Week anchor            | Sat 2026-05-02 = week 0 | shared with `lib/newsletter.ts` |

## Maintenance

- **Add new images**: drop them into the `glaceenseine/n8n/` Drive
  folder. Picked up on the next run, automatically.
- **Reset rotation**: open the workflow, click the three-dot menu on the
  `Pick image + caption` node → "Clear static data". The next run will
  treat all files as unposted.
- **Inspect what's been posted**: each run logs `postedCount` /
  `poolSize` in the execution panel. For a full audit, n8n's database
  stores it under `workflow_static_data.global.postedIds`.

## Editing captions

Open the `Pick image + caption` node and edit the `captions` array.
Order is `[météo, humour, QR, crew]` — append more entries to extend the
rotation.
