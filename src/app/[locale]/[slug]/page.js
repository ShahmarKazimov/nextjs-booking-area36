import homes from "../../../components/data/homes";
import { notFound } from "next/navigation";
import HomeDetails from "../../../components/HomeDetails/HomeDetails";
import { MapPin, Home, UserRound } from "lucide-react";
import TransferSelect from "../../../components/TransferSelect/TransferSelect";
import { getTranslations } from "next-intl/server";
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
          <header className="mb-8 bg-white rounded-2xl shadow-sm p-6">
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
                  <span className="font-normal text-gray-500 italic">{t("about")}</span>{" "}
                  {tHome("title")}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {tHome("description")}
                </p>
              </article>

              {home.features && (
                <section className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t("propertyDetails")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {home.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-2 h-2 bg-gray-800 rounded-full"
                          aria-hidden="true"
                        />
                        <span className="text-gray-700 font-medium">
                          {tHome(`features.${feature}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </section>

            <aside className="lg:col-span-1" aria-label={t("reservationRequest")}>
              <div className="bg-white rounded-2xl shadow-sm px-6 py-6 sticky top-8 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {t("reservationRequest")}
                </h2>

                <div className="mb-6 space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} aria-hidden="true" />
                      <span>{t("location")}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {tHome("location")}, {t("azerbaijan")}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <UserRound size={18} aria-hidden="true" />
                      <span>{t("owner")}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {home.owner}
                    </span>
                  </div>
                </div>

                <TransferSelect homeTitle={tHome("title")} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}