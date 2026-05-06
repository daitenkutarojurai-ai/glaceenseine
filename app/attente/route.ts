import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

export function GET() {
  const html = readFileSync(join(process.cwd(), "public/attente.html"), "utf-8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
