# n8n — Glace en Seine social automation

## Workflow: `glace-saturday-fb-ig.json`

Posts **one** image + a rotating caption to **Facebook Page** and
**Instagram Business Account** every Saturday at 09:00 UTC = 11:00 Paris
(CEST, May–Sept). The image is picked from a Google Drive folder
(`glaceenseine/n8n/`) and **never repeats** until the whole pool has
cycled through.

Pipeline:
```
[Saturday 09:00 UTC]   [Manual trigger (test)]
            \              /
             ↓            ↓
[Drive · list n8n folder]      ─── Drive API v3, OAuth2 auth
        ↓
[Pick image + caption]         ─── dedup via workflow staticData (no repeats)
        ↓                           4-week caption rotation
   ┌────┴────┐
   ↓         ↓
[IG container]  [FB Page photo]   (run in parallel)
   ↓
[Wait 20s]                         ─── container processing buffer
   ↓
[IG · check container status]      ─── GET /{container-id}?fields=status_code
   ↓
[IF status_code == FINISHED]
   ├── true → [IG · publish]
   └── false → [Stop & Error] (logs status_code + container id)
```

### How to fire it on demand

The **Manual trigger (test)** node lets you bypass the Saturday cron: open
the workflow in n8n and click **Execute Workflow** (top right). It runs
the exact same pipeline as the scheduled fire — picks the next Drive
image, posts to FB + IG, and consumes one slot in the dedup pool. Use it
to verify credentials, image URL reachability, and FB/IG token validity
without waiting a week.

### Image source — public Drive folder, read directly via HTTP

**Source: shared Drive folder `glaceenseine/n8n/`** (`1kIj62TL-IkmLSt_3qVvkkyiYSWi8B-VV`).

The workflow's first non-trigger node, `List Drive folder (public)`, hits
`https://drive.google.com/embeddedfolderview?id=<FOLDER_ID>#list` and
parses the returned HTML for `(file_id, filename)` pairs. The picker then
applies filename-based dedup, picks the next image alphabetically, and
builds the IG-fetchable URL as
`https://lh3.googleusercontent.com/d/<FILE_ID>=w2000`.

| What | Value |
|---|---|
| Drop images in | Drive folder `glaceenseine / n8n` (drag-and-drop in Drive UI) |
| Listed via | `drive.google.com/embeddedfolderview?id=...` (public, no auth) |
| Public CDN URL n8n uses | `https://lh3.googleusercontent.com/d/<FILE_ID>=w2000` |

**The Drive folder MUST be shared "Anyone with the link → Viewer"** —
otherwise both the folder listing AND the image URLs return Google's
sign-in HTML page (~900KB) instead of the actual content. To verify:
`curl -sI 'https://lh3.googleusercontent.com/d/<any-file-id>=w2000'`
should report `content-type: image/jpeg` (or similar), not `text/html`.

No rclone, no API key, no cron, no local sync. Always live.

### Dedup — no repeat until the pool exhausts

The `Pick image + caption` Code node uses
`$getWorkflowStaticData('global').postedNames` to remember which filenames
have already been published. Each Saturday it filters them out, sorts the
remaining pool by name (deterministic), picks the first, and pushes its
name into `postedNames`. Filenames are stable across Drive ID changes
(re-uploads), so this survives the occasional Drive churn.

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

### 2. Share the Drive folder publicly

Open the `n8n/` folder in Drive → **Share** → bottom "General access"
dropdown → set to **"Anyone with the link"** with role **Viewer**.
Required so Instagram's image fetcher can download via
`lh3.googleusercontent.com`, and so the workflow can list the folder
via the public embedded view.

Sanity check:
```
curl -sI 'https://lh3.googleusercontent.com/d/<any-file-id>=w2000' \
  | head -2
# Expect: HTTP/2 200 / content-type: image/jpeg (or similar)
# If you see content-type: text/html — sharing is still restricted.
```

### 3. Import the workflow

n8n: **Workflows → Import from File →** pick
`glace-saturday-fb-ig.json`.

### 4. Re-attach credentials

The JSON has placeholder credential IDs. After import, the four FB/IG
HTTP nodes (`IG · create container`, `IG · check container status`,
`IG · publish`, `FB Page · post photo`) need Authentication = Header Auth
→ pick `FB Graph — Glace en Seine`.

The `List Drive folder (public)` node is a plain HTTP Request to the
public embedded folder view — no credentials needed.

Save.

### 6. Test before activating

- **Dry-run the picker only**: right-click `Pick image + caption` →
  "Execute Node" (after firing `Load local pool` first). The output
  should show `{ pickedId, pickedName, imageUrl, caption, poolSize,
  postedCount, cycleReset }`. Open `imageUrl` in a private tab to confirm
  the image is reachable without authentication.

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
  folder. Picked up live on the next workflow run — no sync delay.
- **Reset rotation**: open the workflow, click the three-dot menu on the
  `Pick image + caption` node → "Clear static data". The next run will
  treat all files as unposted.
- **Inspect what's been posted**: each run logs `postedCount` /
  `poolSize` in the execution panel. For a full audit, n8n's database
  stores it under `workflow_static_data.global.postedNames`.

## Editing captions

Open the `Pick image + caption` node and edit the `captions` array.
Order is `[météo, humour, QR, crew]` — append more entries to extend the
rotation.
