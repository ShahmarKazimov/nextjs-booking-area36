import { NextResponse } from "next/server";
import homes from "@/components/data/homes";

export const dynamic = "force-dynamic";

/** Final stay price straight from Beds24 (rate rules, extra guests, etc. included). */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");
  const adults = parseInt(searchParams.get("adults"), 10);
  const children = parseInt(searchParams.get("children") || "0", 10);

  const home = homes.find((h) => h.slug === slug);
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !home?.beds24RoomId ||
    !dateRe.test(arrival || "") ||
    !dateRe.test(departure || "") ||
    !(adults >= 1 && adults <= 30) ||
    !(children >= 0 && children <= 30)
  ) {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }

  const token = process.env.BEDS24_TOKEN;
  if (!token) return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(
      `https://beds24.com/api/v2/inventory/rooms/offers?roomId=${encodeURIComponent(home.beds24RoomId)}` +
        `&arrival=${arrival}&departure=${departure}&numAdults=${adults}&numChildren=${children}`,
      { signal: controller.signal, headers: { token, Accept: "application/json" }, cache: "no-store" }
    );
    clearTimeout(timeoutId);
    const json = await res.json();
    if (!res.ok || json?.success === false) {
      return NextResponse.json({ success: true, available: false, price: null });
    }
    const offer = json?.data?.[0]?.offers?.[0];
    return NextResponse.json({
      success: true,
      available: Boolean(offer),
      price: offer ? offer.price : null,
      currency: "AZN",
    });
  } catch (err) {
    console.warn("Beds24 offer fetch failed:", err.message);
    return NextResponse.json({ success: false, error: "unavailable" }, { status: 502 });
  }
}
