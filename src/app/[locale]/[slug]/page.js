import homes from "../../../components/data/homes";
import { notFound } from "next/navigation";
import HomeDetails from "../../../components/HomeDetails/HomeDetails";
import {
  MapPin,
  Home,
  UserRound,
  Users,
  BedDouble,
  Bath,
  Waves,
  Flame,
  Mountain,
  Sun,
  Car,
  Wifi,
  UtensilsCrossed,
  Tv,
  Wind,
  Trees,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Coffee,
  Snowflake,
  Droplets,
  ShieldCheck,
  Umbrella,
  Armchair,
  Baby,
  PawPrint,
} from "lucide-react";
import BookingSidebar from "../../../components/Booking/BookingSidebar";
import { getTranslations } from "next-intl/server";

function getFeatureIcon(feature) {
  const f = (feature || "").toLowerCase();
  if (f.includes("bedroom") || f.includes("yataq")) return <BedDouble size={18} className="text-gray-900" />;
  if (f.includes("bathroom") || f.includes("hamam") || f.includes("vanna")) return <Bath size={18} className="text-gray-900" />;
  if (f.includes("sqm") || f.includes("sahə") || f.includes("kv")) return <Maximize2 size={18} className="text-gray-900" />;
  if (f.includes("wi-fi") || f.includes("wifi") || f.includes("internet")) return <Wifi size={18} className="text-gray-900" />;
  if (f.includes("netflix") || f.includes("channel") || f.includes("kanal") || f.includes("tv")) return <Tv size={18} className="text-gray-900" />;
  if (f.includes("iron") || f.includes("ütü")) return <Sparkles size={18} className="text-gray-900" />;
  if (f.includes("dryer") || f.includes("fen") || f.includes("air") || f.includes("kondisioner")) return <Wind size={18} className="text-gray-900" />;
  if (f.includes("water") || f.includes("su")) return <Droplets size={18} className="text-gray-900" />;
  if (f.includes("camera") || f.includes("kamera") || f.includes("security") || f.includes("təhlükəsizlik")) return <ShieldCheck size={18} className="text-gray-900" />;
  if (f.includes("refrigerator") || f.includes("soyuducu")) return <Snowflake size={18} className="text-gray-900" />;
  if (f.includes("coffee") || f.includes("tea") || f.includes("çay") || f.includes("qəhvə")) return <Coffee size={18} className="text-gray-900" />;
  if (f.includes("kitchen") || f.includes("mətbəx") || f.includes("microwave") || f.includes("soba") || f.includes("dishes") || f.includes("qab")) return <UtensilsCrossed size={18} className="text-gray-900" />;
  if (f.includes("fire") || f.includes("od") || f.includes("kamin") || f.includes("manqal") || f.includes("bbq")) return <Flame size={18} className="text-gray-900" />;
  if (f.includes("umbrella") || f.includes("çətir")) return <Umbrella size={18} className="text-gray-900" />;
  if (f.includes("furniture") || f.includes("mebel")) return <Armchair size={18} className="text-gray-900" />;
  if (f.includes("garden") || f.includes("bağ") || f.includes("yaşıllıq") || f.includes("tree")) return <Trees size={18} className="text-gray-900" />;
  if (f.includes("parking") || f.includes("avtomobil") || f.includes("dayanacaq")) return <Car size={18} className="text-gray-900" />;
  if (f.includes("mountain") || f.includes("view") || f.includes("mənzərə") || f.includes("dağ")) return <Mountain size={18} className="text-gray-900" />;
  if (f.includes("family") || f.includes("ailə") || f.includes("uşaq") || f.includes("children")) return <Baby size={18} className="text-gray-900" />;
  if (f.includes("pet") || f.includes("heyvan")) return <PawPrint size={18} className="text-gray-900" />;
  if (f.includes("pool") || f.includes("hovuz")) return <Waves size={18} className="text-gray-900" />;
  if (f.includes("guest") || f.includes("qonaq") || f.includes("occupancy")) return <Users size={18} className="text-gray-900" />;
  if (f.includes("terrace") || f.includes("terras") || f.includes("balcony") || f.includes("balkon")) return <Sun size={18} className="text-gray-900" />;
  return <CheckCircle2 size={18} className="text-gray-900" />;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['en', 'az'];
  return locales.flatMap((locale) =>
    homes.map((home) => ({
      locale,
      slug: home.slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const home = homes.find((h) => h.slug === slug);

  if (!home) {
    return {
      title: "Property Not Found",
      robots: { index: false, follow: false },
    };
  }

  const t = await getTranslations({ locale, namespace: "Details" });
  const tHome = await getTranslations({ locale, namespace: `Homes.${slug}` });

  const typeStr = tHome("type") || "Chalet";
  const locationStr = tHome("location");
  const azerbaijanStr = t("azerbaijan");
  const luxuryStr = t("luxury"); // YENİ: Details.json-a "luxury" key-i əlavə edilməlidir
  const title = `${tHome("title")} | ${luxuryStr} ${typeStr} ${t("in") ? t("in") + " " : ""}${locationStr}, ${azerbaijanStr}`;

  const rawDescription = tHome("description") || tHome("title");

  function truncateAtWord(str, maxLen) {
    if (!str || str.length <= maxLen) return str;
    const sliced = str.slice(0, maxLen);
    const lastSpace = sliced.lastIndexOf(" ");
    return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLen)}...`;
  }

  const description = truncateAtWord(rawDescription, 155);
  const image = home.images?.[0]
    ? `https://area36.az${home.images[0]}`
    : "https://area36.az/images/ui/area-image-hero.webp";

  const pathPrefix = locale === "az" ? "az/" : "";

  return {
    title,
    description,

    keywords: [
      tHome("title"),

      `${locationStr} villa rental`,
      `${locationStr} luxury villa`,
      `${locationStr} chalet rental`,
      `${locationStr} holiday home`,
      `${locationStr} vacation rental`,

      locale === "az"
        ? `${locationStr} villa kirayəsi`
        : `${locationStr} villa rental`,

      locale === "az"
        ? `${locationStr} günlük kirayə ev`
        : `${locationStr} daily rental house`,
    ],

    alternates: {
      canonical: `https://area36.az/${pathPrefix}${slug}`,
      languages: {
        en: `https://area36.az/${slug}`,
        az: `https://area36.az/az/${slug}`,
        "x-default": `https://area36.az/${slug}`,
      },
    },


    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: `${title} | Area36`,
      description,
      url: `https://area36.az/${pathPrefix}${slug}`,
      siteName: "Area36",
      locale: locale === "az" ? "az_AZ" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${tHome("title")} - Area36`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Area36`,
      description,
      images: [image],
    },
  };
}

export default async function HomeDetailPage({ params }) {
  const { locale, slug } = await params;
  const isAz = locale === "az";
  const home = homes.find((h) => h.slug === slug);

  if (!home) return notFound();

  const t = await getTranslations({ locale, namespace: "Details" });
  const tHome = await getTranslations({ locale, namespace: `Homes.${slug}` });

  const [lat, lng] = home.geo?.split(",").map(Number) ?? [];
  const pathPrefix = locale === "az" ? "az/" : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `https://area36.az/${pathPrefix}${slug}#property`,

    name: tHome("title"),
    description: tHome("description"),
    url: `https://area36.az/${pathPrefix}${slug}`,
    image: home.images?.map((img) => `https://area36.az${img}`),
    identifier: slug,

    address: {
      "@type": "PostalAddress",
      addressLocality: tHome("location"),
      addressRegion: "Qafqaz",
      addressCountry: "AZ",
    },

    ...(lat && lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
    }),

    containsPlace: {
      "@type": "Accommodation",
      additionalType: tHome("type") || "Chalet",

      ...(home.occupancy && {
        occupancy: {
          "@type": "QuantitativeValue",
          value: home.occupancy,
        },
      }),

      amenityFeature:
        home.features?.map((feature) => ({
          "@type": "LocationFeatureSpecification",
          name: tHome(`features.${feature}`),
          value: true,
        })) || [],
    },

    brand: {
      "@type": "Brand",
      name: "Area36",
    },

    publisher: {
      "@id": "https://area36.az/#organization",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen text-gray-900 bg-gray-50/50 py-8">
        <div className="max-w-7xl mx-auto p-4">
          <header className="mb-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home size={24} className="text-gray-700" aria-hidden="true" />
              {tHome("title")}
            </h1>

            <p className="text-lg text-gray-600 flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" aria-hidden="true" />
              <span>
                {tHome("type") && `${tHome("type")} ${t("in") ? t("in") + " " : ""}`}
                {tHome("location")}, {t("azerbaijan")}
              </span>
            </p>
          </header>

          <HomeDetails
            images={home.images}
            title={tHome("title")}
            location={`${tHome("location")}, ${t("azerbaijan")}`}
            villaRentalLabel={t("villaRental")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <section className="lg:col-span-2 space-y-8">
              <article className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {tHome("title")}
                  <span className="font-normal text-gray-500 italic lowercase pl-2">{t("about")}</span>{" "}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {tHome("description")}
                </p>
              </article>

              {home.features && (
                <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2.5">
                    <Sparkles size={20} className="text-gray-900" aria-hidden="true" />
                    <span>{t("propertyDetails")}</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {home.features.map((feature, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-3.5 p-3.5 bg-gray-50/70 hover:bg-gray-100/70 border border-gray-200/70 rounded-xl hover:border-black/20 hover:shadow-xs transition-all"
                      >
                        <div
                          className="w-9 h-9 rounded-lg bg-white border border-gray-200 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                          aria-hidden="true"
                        >
                          {getFeatureIcon(feature)}
                        </div>
                        <span className="text-gray-800 font-medium text-sm sm:text-base leading-snug">
                          {tHome(`features.${feature}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </section>

            <aside className="lg:col-span-1" aria-label={t("reservationRequest")}>
              <BookingSidebar
                homeTitle={tHome("title")}
                location={`${tHome("location")}, ${t("azerbaijan")}`}
                owner={home.owner}
                slug={slug}
                airbnbUrl={home.airbnbUrl}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}