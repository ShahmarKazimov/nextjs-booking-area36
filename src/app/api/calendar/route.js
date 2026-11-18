import { NextResponse } from "next/server";
import homes from "@/components/data/homes";

export const dynamic = "force-dynamic";

const API = "https://beds24.com/api/v2";

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

async function beds24Get(path) {
  const token = process.env.BEDS24_TOKEN;
  if (!token) throw new Error("BEDS24_TOKEN is not set");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API}${path}`, {
      signal: controller.signal,
      headers: { token, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 401 || res.status === 403) {
      // Token revoked/expired: search Vercel logs for this marker and issue a new Beds24 token.
      console.error(`BEDS24_AUTH_FAILED: Beds24 returned ${res.status}. Create a new long life token and update BEDS24_TOKEN.`);
    }
    if (!res.ok) throw new Error(`Beds24 responded with ${res.status}`);
    const json = await res.json();
    if (json?.success === false) throw new Error(json.error || "Beds24 error");
    return json;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Availability comes only from Beds24 (read-only token in BEDS24_TOKEN).
 * A night with numAvail = 0 is occupied. There is no fallback source: on any
 * failure the response is success:false and the UI shows "calendar temporarily unavailable".
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const home = homes.find((h) => h.slug === slug);

  if (!home?.beds24RoomId) {
    return NextResponse.json({ success: true, slug, hasCalendar: false, bookedDates: [] });
  }

  try {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 365);

    const [cal, prop] = await Promise.all([
      beds24Get(
        `/inventory/rooms/calendar?roomId=${encodeURIComponent(home.beds24RoomId)}` +
          `&startDate=${ymd(start)}&endDate=${ymd(end)}&includeNumAvail=true&includeMinStay=true`
      ),
      beds24Get(`/properties?id=${encodeURIComponent(home.beds24PropId)}&includeAllRooms=true`).catch(
        () => null
      ),
    ]);

    const rows = cal?.data?.[0]?.calendar || [];
    const bookedDates = [];
    const minStays = {};
    for (const row of rows) {
      const cursor = new Date(`${row.from}T00:00:00Z`);
      const last = new Date(`${row.to}T00:00:00Z`);
      while (cursor <= last) {
        const day = ymd(cursor);
        if (row.numAvail === 0) bookedDates.push(day);
        if (row.minStay > 1) minStays[day] = row.minStay;
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    }

    const room = prop?.data?.[0]?.roomTypes?.find((r) => String(r.id) === String(home.beds24RoomId));

    return NextResponse.json({
      success: true,
      slug,
      hasCalendar: true,
      source: "beds24",
      lastSynced: new Date().toISOString(),
      bookedDates,
      minStays,
      maxPeople: room?.maxPeople ?? null,
    });
  } catch (err) {
    console.warn("Beds24 calendar fetch failed:", err.message);
    return NextResponse.json(
      { success: false, slug, hasCalendar: false, error: "calendar_unavailable", bookedDates: [] },
      { status: 502 }
    );
  }
}
