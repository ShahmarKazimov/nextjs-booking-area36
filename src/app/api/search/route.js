import { NextResponse } from "next/server";
import homes from "@/components/data/homes";

export const dynamic = "force-dynamic";

const API = "https://beds24.com/api/v2";
const MAX_NIGHTS = 60;

const ymd = (d) => d.toISOString().slice(0, 10);
const addDays = (str, n) => {
  const d = new Date(`${str}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return ymd(d);
};
const diffDays = (a, b) => Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 86400000);

async function beds24Get(path) {
  const token = process.env.BEDS24_TOKEN;
  if (!token) throw new Error("BEDS24_TOKEN is not set");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(`${API}${path}`, {
      signal: controller.signal,
      headers: { token, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 401 || res.status === 403) {
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

async function loadCalendar(home, today) {
  const end = addDays(today, 365);
  const cal = await beds24Get(
    `/inventory/rooms/calendar?roomId=${encodeURIComponent(home.beds24RoomId)}` +
      `&startDate=${today}&endDate=${end}&includeNumAvail=true&includeMinStay=true`
  );
  const booked = new Set();
  const minStays = {};
  for (const row of cal?.data?.[0]?.calendar || []) {
    let day = row.from;
    while (day <= row.to) {
      if (row.numAvail === 0) booked.add(day);
      if (row.minStay > 1) minStays[day] = row.minStay;
      day = addDays(day, 1);
    }
  }
  return { booked, minStays };
}

/** First free windows (up to `limit`) at or after `from`, each at least `nights` long (respecting min stay). */
function nearestWindows({ booked, minStays }, from, nights, today, limit = 2) {
  const result = [];
  let day = from < today ? today : from;
  const horizon = addDays(today, 360);
  while (day <= horizon && result.length < limit) {
    const need = Math.max(nights, minStays[day] || 1);
    let ok = true;
    for (let k = 0; k < need; k++) {
      if (booked.has(addDays(day, k))) {
        ok = false;
        break;
      }
    }
    if (ok) {
      result.push({ arrival: day, departure: addDays(day, need), nights: need });
      day = addDays(day, need + 1);
    } else {
      day = addDays(day, 1);
    }
  }
  return result;
}

/**
 * GET /api/search?arrival&departure&adults&children
 * For every home connected to Beds24: is it free for these dates (and guest count / min stay),
 * the Beds24 price if free, and the nearest free windows if not. Homes without a calendar are omitted.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const arrival = searchParams.get("arrival") || "";
  const departure = searchParams.get("departure") || "";
  const adults = parseInt(searchParams.get("adults") || "2", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const today = ymd(new Date());

  if (
    !dateRe.test(arrival) ||
    !dateRe.test(departure) ||
    arrival < today ||
    !(adults >= 1 && adults <= 30) ||
    !(children >= 0 && children <= 30)
  ) {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }
  const nights = diffDays(arrival, departure);
  if (nights < 1 || nights > MAX_NIGHTS) {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }
  const guests = adults + children;

  const connected = homes.filter((h) => h.beds24RoomId && h.beds24PropId);
  const propIds = [...new Set(connected.map((h) => h.beds24PropId))];

  try {
    const maxPeopleByRoom = {};
    await Promise.all(
      propIds.map(async (id) => {
        const prop = await beds24Get(`/properties?id=${encodeURIComponent(id)}&includeAllRooms=true`).catch(() => null);
        for (const r of prop?.data?.[0]?.roomTypes || []) maxPeopleByRoom[String(r.id)] = r.maxPeople ?? null;
      })
    );

    const entries = await Promise.all(
      connected.map(async (home) => {
        try {
          const cal = await loadCalendar(home, today);
          const maxPeople = maxPeopleByRoom[String(home.beds24RoomId)] ?? null;

          let reason = null;
          for (let k = 0; k < nights; k++) {
            if (cal.booked.has(addDays(arrival, k))) {
              reason = "booked";
              break;
            }
          }
          if (!reason && (cal.minStays[arrival] || 1) > nights) reason = "minStay";
          if (!reason && maxPeople && guests > maxPeople) reason = "capacity";

          if (reason) {
            const minNights = cal.minStays[arrival] || null;
            return [
              home.slug,
              {
                status: "unavailable",
                reason,
                minNights: reason === "minStay" ? minNights : null,
                maxPeople: reason === "capacity" ? maxPeople : null,
                nearest: reason === "capacity" ? [] : nearestWindows(cal, arrival, nights, today),
              },
            ];
          }

          let price = null;
          try {
            const offerJson = await beds24Get(
              `/inventory/rooms/offers?roomId=${encodeURIComponent(home.beds24RoomId)}` +
                `&arrival=${arrival}&departure=${departure}&numAdults=${adults}&numChildren=${children}`
            );
            const offer = offerJson?.data?.[0]?.offers?.[0];
            price = offer?.price > 0 ? offer.price : null;
          } catch {
            price = null;
          }
          return [home.slug, { status: "available", price, nights }];
        } catch (err) {
          console.warn(`Beds24 search failed for ${home.slug}:`, err.message);
          return [home.slug, { status: "unknown" }];
        }
      })
    );

    return NextResponse.json({
      success: true,
      arrival,
      departure,
      nights,
      adults,
      children,
      results: Object.fromEntries(entries),
    });
  } catch (err) {
    console.warn("Beds24 search failed:", err.message);
    return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });
  }
}
