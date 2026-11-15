import { NextResponse } from "next/server";
import homes from "@/components/data/homes";
import { parseIcsCalendar } from "@/lib/ical";

export const dynamic = "force-dynamic";

/**
 * Live availability only. Dates come exclusively from the home's Airbnb iCal feed —
 * there is no hand-entered or demo data. If the feed is missing or unreachable,
 * no dates are invented: the response has `hasIcal: false` and an empty list.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const home = homes.find((h) => h.slug === slug);
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
