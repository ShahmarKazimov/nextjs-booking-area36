import { NextResponse } from "next/server";
import homes from "@/components/data/homes";

export const dynamic = "force-dynamic";

const API = "https://beds24.com/api/v2";
const ymd = (d) => d.toISOString().slice(0, 10);

/**
 * GET /api/prices
 * Lowest nightly rate (Beds24 `price1`, AZN) over the next 12 months for every Beds24 home,
 * used for the "from" price on the home-page cards. Rates differ by weekday/weekend/holiday,
 * so the cards show "from X". Only nights that are still free count; if none are free, all nights do.
 */
export async function GET() {
  const token = process.env.BEDS24_TOKEN;
  if (!token) return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 365);
  const connected = homes.filter((h) => h.beds24RoomId);

  const entries = await Promise.all(
    connected.map(async (home) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9000);
        const res = await fetch(
          `${API}/inventory/rooms/calendar?roomId=${encodeURIComponent(home.beds24RoomId)}` +
            `&startDate=${ymd(start)}&endDate=${ymd(end)}&includePrices=true&includeNumAvail=true`,
          { signal: controller.signal, headers: { token, Accept: "application/json" }, cache: "no-store" }
        );
        clearTimeout(timeoutId);
        if (res.status === 401 || res.status === 403) {
          console.error(`BEDS24_AUTH_FAILED: Beds24 returned ${res.status}. Create a new long life token and update BEDS24_TOKEN.`);
        }
        if (!res.ok) throw new Error(`Beds24 responded with ${res.status}`);
        const rows = (await res.json())?.data?.[0]?.calendar || [];
        let minFree = Infinity;
        let minAll = Infinity;
        for (const row of rows) {
          const p = Number(row.price1);
          if (!(p > 0)) continue;
          minAll = Math.min(minAll, p);
          if (row.numAvail > 0) minFree = Math.min(minFree, p);
        }
        const from = Number.isFinite(minFree) ? minFree : Number.isFinite(minAll) ? minAll : null;
        return [home.slug, from];
      } catch (err) {
        console.warn(`Beds24 prices failed for ${home.slug}:`, err.message);
        return [home.slug, null];
      }
    })
  );

  return NextResponse.json(
    { success: true, currency: "AZN", prices: Object.fromEntries(entries) },
    { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } }
  );
}
