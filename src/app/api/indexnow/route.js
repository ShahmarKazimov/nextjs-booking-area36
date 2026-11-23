import { SITE_URL } from "@/lib/seo";
import sitemap from "../../sitemap";

// IndexNow (Bing, Yandex, Seznam, Naver). Google does not use it; Google reads sitemap.xml.
// Called daily by the Vercel cron in vercel.json. The key file lives at /public/<KEY>.txt.
const KEY = "f5fc080490761fcbcf1ec3400fc6aae0";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const ua = request.headers.get("user-agent") || "";
  const allowed = secret ? auth === `Bearer ${secret}` : ua.startsWith("vercel-cron");
  if (!allowed) return Response.json({ ok: false }, { status: 401 });

  const urlList = [...new Set(sitemap().map((e) => e.url))];

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  return Response.json({ ok: res.ok, status: res.status, submitted: urlList.length });
}
