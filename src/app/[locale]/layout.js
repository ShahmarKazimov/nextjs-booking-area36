import { Geist } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { WishlistProvider } from "../../components/Wishlist/WishlistProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Snowfall from "../../components/Winter/Snowfall";
import { SITE_URL, CONTACT, OG_IMAGE, localizedUrl, ogLocale } from "@/lib/seo";

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
    ? "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi. Hovuz, barbekü sahəsi və Qafqaz dağ mənzərəsi ilə unudulmaz istirahət. Area36 ilə Qəbələdə premium istirahət."
    : "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala. Pool, BBQ area, and Caucasus mountain views. Premium vacation with Area36.";

  const keywords = isAz ?
    [
      // CORE HIGH-INTENT (AZ)
      "Qəbələdə ev kirayəsi",
      "Qəbələ ev kirayə",
      "Qəbələdə günlük ev kirayəsi",
      "Qəbələdə villa kirayəsi",
      "Qəbələdə chalet kirayəsi",
      "Qəbələdə dağ evi kirayəsi",
      "Qəbələ kirayə evlər",
      "Qəbələdə kirayə evlər",
      "Qəbələ günlük kirayə ev",
      "Qəbələ villa kirayə",

      // DIACRITIC-FREE (AZ)
      "Qebele kiraye ev",
      "Qebele ev kirayesi",
      "Qebele gunluk kiraye ev",
      "Qebele villa kirayesi",
      "Qebele chalet kirayesi",
      "Qebele dag evi kirayesi",
      "Qebele kiraye evler",
      "Qebelede kiraye ev",
      "Qebelede evler kiraye",

      // INTENT / CONVERSATIONAL (AZ)
      "Qəbələdə kirayə evlər",
      "Qəbələdə kirayə ev qiymətləri",
      "Qəbələdə villa qiymətləri",
      "Qəbələdə günlük ev neçəyədir",
      "Qəbələdə hovuzlu ev kirayəsi",
      "Qəbələdə ailə üçün ev kirayəsi",
      "Qəbələdə rahat evlər kirayə",

      // PREMIUM / LUXURY (AZ + MIX)
      "Qəbələdə lüks villa kirayəsi",
      "Qəbələdə premium villa",
      "Qəbələdə hovuzlu villa kirayə",
      "Qəbələdə dağ mənzərəli villa",
      "Qəbələdə private villa rental",
      "Gabala luxury villa rental",
      "Gabala chalet with pool",
    ]
    : [
      "Gabala villa for rent",
      "Gabala villas for rent",
      "villa rental Gabala",
      "luxury villas in Gabala",
      "Gabala house for rent",
      "houses for rent in Gabala",
      "Gabala holiday homes",
      "Gabala vacation rentals",
      "vacation rentals Gabala Azerbaijan",
      "Gabala chalet rental",
      "chalet rental in Gabala",
      "mountain chalet Gabala",
      "cabin rentals Gabala",
      "Gabala cabins for rent",
      "Gabala accommodation",
      "places to stay in Gabala",
      "Gabala Airbnb villas",
      "private villa rental Gabala",
      "family villa Gabala rental",
      "pool villa Gabala Azerbaijan",
    ];

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
      siteName: "Area36",
      title: titleDefault,
      description,
      locale: ogLocale(locale),
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: isAz ? "Area36 — Qəbələdə lüks chalet və villa kirayəsi" : "Area36 — luxury chalet and villa rentals in Gabala",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: [OG_IMAGE.url],
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

function getOrganizationSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Area36",
    url: localizedUrl(locale),
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/ui/logo.svg`,
    },
    email: CONTACT.email,
    telephone: CONTACT.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "reservations",
      areaServed: "AZ",
      availableLanguage: ["az", "en"],
    },
    description: locale === "az"
      ? "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi."
      : "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala.",
    areaServed: {
      "@type": "City",
      name: locale === "az" ? "Qəbələ" : "Gabala",
      addressCountry: "AZ",
    },
  };
}

function getWebsiteSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Area36",
    url: localizedUrl(locale),
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function getLodgingSchema(locale) {
  const isAz = locale === "az";
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: "Area36",
    url: localizedUrl(locale),
    description: isAz
      ? "Qəbələdə hovuz və Qafqaz dağ mənzərəsi olan lüks chalet və villa kirayəsi."
      : "Luxury chalet and villa rentals in Gabala with pools and Caucasus mountain views.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: isAz ? "Qəbələ" : "Gabala",
      addressCountry: "AZ",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: isAz ? "Hovuz" : "Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: isAz ? "Dağ mənzərəsi" : "Mountain views", value: true },
    ],
    currenciesAccepted: "AZN",
    image: OG_IMAGE.url,
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased text-white`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <WishlistProvider>
            <Header />
            <main role="main">{children}</main>
            <Footer />
          </WishlistProvider>
          <Snowfall />
        </NextIntlClientProvider>
        {/* Script body-nin sonuna keç */}
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
      </body>
    </html>
  );
}