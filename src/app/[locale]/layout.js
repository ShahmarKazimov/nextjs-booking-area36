import { Geist } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const titleDefault = isAz
    ? "Area36 | Qəbələdə Lüks Chalet və Villa Kirayəsi"
    : "Area36 | Luxury Chalet & Villa Rentals in Gabala";

  const description = isAz
    ? "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi. Hovuz, sauna, barbekü və Qafqaz dağ mənzərəsi ilə unudulmaz istirahət. Area36 ilə Qəbələdə premium istirahət."
    : "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala. Pool, sauna, BBQ, and Caucasus mountain views. Premium vacation with Area36.";

  const keywords = isAz
    ? [
        "Qəbələdə günlük kirayə ev",
        "Qəbələdə villa kirayəsi",
        "Qəbələdə chalet kirayəsi",
        "Qəbələdə dağ evi kirayəsi",
        "Qəbələdə həftəlik kirayə villa",
        "Qəbələdə hovuzlu villa",
        "Qəbələdə lüks istirahət evi",
        "Qəbələdə saunalı dağ evi",
        "Qəbələdə barbekülü villa",
        "Qəbələdə ailə üçün kirayə ev",
        "Qəbələdə dağ mənzərəli chalet",
        "Qəbələdə şənlik üçün villa",
        "Qafqaz mənzərəli kirayə ev Qəbələ",
        "Area36"
      ]
    : [
        "Gabala chalet rental Azerbaijan",
        "luxury villa Gabala Azerbaijan",
        "daily chalet rental Gabala",
        "mountain villa Qabala with pool",
        "Qabala vacation rental",
        "chalet with sauna Qabala",
        "Caucasus mountain chalet Azerbaijan",
        "private villa rental Qabala weekly",
        "Area36 luxury stays Azerbaijan"
      ];

  const canonicalUrl = isAz ? "https://area36.az/az" : "https://area36.az";

  return {
    metadataBase: new URL("https://area36.az"),

    title: {
      default: titleDefault,
      template: "%s | Area36",
    },

    description,
    applicationName: "Area36",
    keywords,

    authors: [{ name: "Area36", url: "https://area36.az" }],
    creator: "Area36",
    publisher: "Area36",

    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: "https://area36.az",
        az: "https://area36.az/az",
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
      type: "website",
      url: canonicalUrl,
      siteName: "Area36",
      title: titleDefault,
      description,
      locale: isAz ? "az_AZ" : "en_US",
      images: [
        {
          url: "https://area36.az/images/ui/area-image-hero.webp",
          width: 1200,
          height: 630,
          alt: isAz ? "Area36 — Qəbələdə lüks chalet və villa kirayəsi" : "Area36 — luxury chalet and villa rentals in Gabala",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: ["https://area36.az/images/ui/area-image-hero.webp"],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },

    verification: {
      google: "AR5g26tkAKJNaN2348DJhQ3LgguJAWJcY4ED1JgeyTU",
    },
  };
}

function getOrganizationSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://area36.az/#organization",
    name: "Area36",
    url: "https://area36.az",
    logo: {
      "@type": "ImageObject",
      url: "https://area36.az/favicon.ico",
    },
    description: locale === "az"
      ? "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi."
      : "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala.",
    areaServed: {
      "@type": "City",
      name: locale === "az" ? "Qəbələ" : "Gabala",
      addressCountry: "AZ",
    },
    sameAs: [],
  };
}

function getWebsiteSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://area36.az/#website",
    name: "Area36",
    url: "https://area36.az",
    inLanguage: locale,
    publisher: {
      "@id": "https://area36.az/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://area36.az/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function getLodgingSchema(locale) {
  const isAz = locale === "az";
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://area36.az/#lodging",
    name: "Area36",
    url: "https://area36.az",
    description: isAz
      ? "Qəbələdə hovuz, sauna, barbekü və Qafqaz dağ mənzərəsi olan lüks chalet və villa kirayəsi."
      : "Luxury chalet and villa rentals in Gabala with pool, sauna, BBQ and Caucasus mountain views.",
    address: {
      "@type": "PostalAddress",
      addressLocality: isAz ? "Qəbələ" : "Gabala",
      addressCountry: "AZ",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: isAz ? "Hovuz" : "Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: isAz ? "Sauna" : "Sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: isAz ? "Barbekü" : "BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: isAz ? "Dağ mənzərəsi" : "Mountain views", value: true },
      { "@type": "LocationFeatureSpecification", name: isAz ? "Meşəlik ərazi" : "Forest area", value: true },
    ],
    priceRange: "$$-$$$",
    currenciesAccepted: "AZN",
    paymentAccepted: "Cash, Bank Transfer",
    image: "https://area36.az/images/ui/area-image-hero.webp",
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased text-white`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                getOrganizationSchema(locale),
                getWebsiteSchema(locale),
                getLodgingSchema(locale),
              ]),
            }}
          />
          <Header />
          <main role="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}