import { NextResponse } from "next/server";
import homes from "@/components/data/homes";
import { parseIcsCalendar } from "@/lib/ical";

export const dynamic = "force-dynamic";

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

/**
 * Beds24 API v2 calendar (read-only token in BEDS24_TOKEN). A night with numAvail = 0
 * is occupied. Also returns per-night price and minimum stay.
 */
async function fetchBeds24Calendar(roomId) {
  const token = process.env.BEDS24_TOKEN;
  if (!token) throw new Error("BEDS24_TOKEN is not set");

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 365);

  const url =
    `https://beds24.com/api/v2/inventory/rooms/calendar?roomId=${encodeURIComponent(roomId)}` +
    `&startDate=${ymd(start)}&endDate=${ymd(end)}` +
    `&includeNumAvail=true&includePrices=true&includeMinStay=true`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { token, Accept: "application/json" },
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`Beds24 responded with ${res.status}`);
    const json = await res.json();
    const rows = json?.data?.[0]?.calendar || [];

    const bookedDates = [];
    const minStays = {};
    const prices = {};
    for (const row of rows) {
      const cursor = new Date(`${row.from}T00:00:00Z`);
      const last = new Date(`${row.to}T00:00:00Z`);
      while (cursor <= last) {
        const day = ymd(cursor);
        if (row.numAvail === 0) bookedDates.push(day);
        if (row.minStay > 1) minStays[day] = row.minStay;
        if (row.price1 != null) prices[day] = row.price1;
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    }
    return { bookedDates, minStays, prices };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Live availability only. Dates come exclusively from the home's Airbnb iCal feed —
 * there is no hand-entered or demo data. If the feed is missing or unreachable,
 * no dates are invented: the response has `hasIcal: false` and an empty list.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const home = homes.find((h) => h.slug === slug);

  if (home?.beds24RoomId && process.env.BEDS24_TOKEN) {
    try {
      const data = await fetchBeds24Calendar(home.beds24RoomId);
      return NextResponse.json({
        success: true,
        slug,
        hasIcal: true,
        source: "beds24",
        lastSynced: new Date().toISOString(),
        ...data,
      });
    } catch (err) {
      console.warn("Beds24 calendar fetch failed, falling back to iCal:", err.message);
    }
  }

  let icalUrl = home?.icalUrl;

  if (!icalUrl && home?.airbnbListingId) {
    icalUrl = `https://www.airbnb.com/calendar/ical/${home.airbnbListingId}.ics`;
  }

  const hasToken = icalUrl && /[?&][ts]=/.test(icalUrl);

  if (!hasToken) {
    return NextResponse.json({
      success: true,
      slug,
      hasIcal: false,
      source: "none",
      bookedRanges: [],
      bookedDates: [],
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(icalUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Area36-CalendarSync/1.0",
        Accept: "text/calendar, text/plain, */*",
      },
      next: { revalidate: 300 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`iCal responded with ${res.status}`);

    const parsed = parseIcsCalendar(await res.text());

    return NextResponse.json({
      success: true,
      slug,
      hasIcal: true,
      source: "live",
      lastSynced: new Date().toISOString(),
      ...parsed,
    });
  } catch (err) {
    console.warn("Live iCal fetch failed:", err.message);
    return NextResponse.json(
      {
        success: false,
        slug,
        hasIcal: false,
        source: "unavailable",
        error: err.message,
        bookedRanges: [],
        bookedDates: [],
      },
      { status: 502 }
    );
  }
}
