import homes from "../../../components/data/homes";
import { SITE_URL, OG_IMAGE, buildAlternates, localizedUrl, ogLocale } from "@/lib/seo";
import { notFound } from "next/navigation";
import HomeDetails from "../../../components/HomeDetails/HomeDetails";
import {
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
import ExpandableText from "../../../components/ExpandableText/ExpandableText";
import ExpandableFeatures from "../../../components/ExpandableFeatures/ExpandableFeatures";
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
  // Optional hand-written SEO fields (Homes.<slug>.metaTitle / metaDescription) override the generated ones
  const title = tHome.has("metaTitle")
    ? tHome("metaTitle")
    : `${tHome("title")} | ${luxuryStr} ${typeStr} ${t("in") ? t("in") + " " : ""}${locationStr}, ${azerbaijanStr}`;

  const rawDescription = tHome.has("metaDescription")
    ? tHome("metaDescription")
    : tHome("description") || tHome("title");

  function truncateAtWord(str, maxLen) {
    if (!str || str.length <= maxLen) return str;
    const sliced = str.slice(0, maxLen);
    const lastSpace = sliced.lastIndexOf(" ");
    return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLen)}...`;
  }

  const description = truncateAtWord(rawDescription, 155);
  // Absolute title: skips the layout's "%s | Area36" template so titles stay under ~60 chars
  const fullTitle = tHome.has("metaTitle") ? title : `${title} | Area36`;
  const ogTitle = fullTitle;
  const image = home.images?.[0]
    ? `${SITE_URL}${home.images[0]}`
    : OG_IMAGE.url;

  const pageUrl = localizedUrl(locale, `/${slug}`);

  return {
    title: { absolute: fullTitle },
    description,

    keywords: [
      tHome("title"),

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

    alternates: buildAlternates(locale, `/${slug}`),

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
      title: ogTitle,
      description,
      url: pageUrl,
      siteName: "Area36",
      locale: ogLocale(locale),
      type: "website",
      images: [
        {
          url: image,
          alt: `${tHome("title")} - Area36`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
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
  const pageUrl = localizedUrl(locale, `/${slug}`);

  const countFeature = (pattern) => {
    const match = home.features?.map((f) => f.match(pattern)).find(Boolean);
    return match ? Number(match[1]) : null;
  };
  const bedrooms = countFeature(/^(\d+)\s+bedrooms?/i);
  const bathrooms = countFeature(/^(\d+)\s+bathrooms?/i);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${pageUrl}#property`,

    name: tHome("title"),
    description: tHome("description"),
    url: pageUrl,
    inLanguage: locale,
    image: home.images?.map((img) => `${SITE_URL}${img.split("?")[0]}`),
    identifier: slug,

    address: {
      "@type": "PostalAddress",
      addressLocality: tHome("location"),
      addressRegion: "Qafqaz",
      addressCountry: "AZ",
      ...(home.address || {}),
    },

    ...(lat && lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
    }),

    ...(!home.isPartner && home.price && {
      priceRange: `${home.price} AZN / ${isAz ? "gecə" : "night"}`,
    }),

    containsPlace: {
      "@type": "Accommodation",
      additionalType: tHome("type") || "Chalet",
      ...(bedrooms && { numberOfBedrooms: bedrooms }),
      ...(bathrooms && { numberOfBathroomsTotal: bathrooms }),

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
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAz ? "Ana səhifə" : "Home",
        item: localizedUrl(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tHome("title"),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([structuredData, breadcrumbData]),
        }}
      />

      <div className="min-h-screen text-gray-900 pt-4 pb-0 lg:py-8">
        <div className="max-w-7xl mx-auto pt-4 pr-4 pl-4 pb-2">
          <h1 className="sr-only">{tHome("title")}</h1>

          <HomeDetails
            images={home.images}
            title={tHome("title")}
            location={`${tHome("location")}, ${t("azerbaijan")}`}
            villaRentalLabel={t("villaRental")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-8">
            <section className="lg:col-span-2 space-y-4 sm:space-y-8">
              <article className="bg-white rounded-2xl shadow-sm p-4 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-start">
                  {tHome("title")}
                </h2>
                <ExpandableText text={tHome("description")} lines={4} linesDesktop={5} />
              </article>

              {home.features && (
                <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-8 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 sm:mb-6">
                    {t("propertyDetails")}
                  </h2>
                  <ExpandableFeatures
                    items={home.features.map((feature, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 bg-gray-50/70 hover:bg-gray-100/70 border border-gray-200/70 rounded-xl hover:border-black/20 hover:shadow-xs transition-all"
                      >
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-gray-200 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                          aria-hidden="true"
                        >
                          {getFeatureIcon(feature)}
                        </div>
                        <span className="text-gray-800 font-medium text-[13px] sm:text-base leading-snug">
                          {tHome(`features.${feature}`)}
                        </span>
                      </div>
                    ))}
                  />
                </section>
              )}
            </section>

            <aside className="lg:col-span-1 max-lg:contents" aria-label={t("reservationRequest")}>
              <BookingSidebar
                homeTitle={tHome("title")}
                location={`${tHome("location")}, ${t("azerbaijan")}`}
                slug={slug}
                airbnbUrl={home.airbnbUrl}
                hasBeds24={Boolean(home.beds24PropId)}
                pricePerNight={home.price}
              />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}