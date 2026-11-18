import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import homes from "../../../../components/data/homes";
import Beds24Embed from "../../../../components/Booking/Beds24Embed";
import { Link } from "@/i18n/routing";

export const metadata = { robots: { index: false, follow: false } };

export default async function BookPage({ params, searchParams }) {
  const { locale, slug } = await params;
  const { checkin, numnight, numadult, numchild } = await searchParams;
  const home = homes.find((h) => h.slug === slug);
  if (!home || !home.beds24PropId) notFound();

  const tHome = await getTranslations({ locale, namespace: `Homes.${slug}` });
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(checkin || "");
  const nights = parseInt(numnight, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href={`/${slug}`} className="text-sm text-gray-600 hover:text-black underline">
        ← {tHome("title")}
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-4">{tHome("title")}</h1>
      <Beds24Embed
        propId={home.beds24PropId}
        roomId={home.beds24RoomId}
        locale={locale}
        title={tHome("title")}
        checkin={validDate ? checkin : undefined}
        numnight={nights > 0 && nights <= 60 ? nights : undefined}
        numadult={parseInt(numadult, 10) >= 1 ? parseInt(numadult, 10) : undefined}
        numchild={parseInt(numchild, 10) >= 0 ? parseInt(numchild, 10) : undefined}
      />
    </div>
  );
}
