import { Geist } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat/WhatsAppFloat";
import { WishlistProvider } from "../../components/Wishlist/WishlistProvider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Snowfall from "../../components/Winter/Snowfall";
import { SITE_URL, CONTACT, SOCIAL_LINKS, OG_IMAGE, localizedUrl, ogLocale, addressExtras, pick } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAz = locale === "az";

  const titleDefault = pick(locale, {
    en: "Area36 | Luxury Chalet & Villa Rentals in Gabala",
    az: "Area36 | Qəbələdə Lüks Chalet və Villa Kirayəsi",
    ru: "Area36 | Аренда роскошных шале и вилл в Габале",
  });

  const description = pick(locale, {
    en: "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala. Pool, BBQ area, and Caucasus mountain views. Premium vacation with Area36.",
    az: "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi. Hovuz, barbekü sahəsi və Qafqaz dağ mənzərəsi ilə unudulmaz istirahət. Area36 ilə Qəbələdə premium istirahət.",
    ru: "Посуточная и недельная аренда роскошных шале, горных домов и вилл в Габале. Бассейн, зона барбекю и вид на Кавказские горы. Премиальный отдых с Area36.",
  });

  const ruKeywords = [
    "аренда виллы в Габале",
    "аренда дома в Габале",
    "виллы в Габале с бассейном",
    "шале в Габале",
    "посуточная аренда Габала",
    "отдых в Габале",
    "где отдохнуть в Азербайджане",
    "аренда вилл в Азербайджане",
    "дом с бассейном Габала",
    "отдых в горах Азербайджана",
    "Габала жильё",
    "снять виллу в Азербайджане",
  ];

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
    keywords: locale === "ru" ? ruKeywords : keywords,

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
          alt: pick(locale, {
            en: "Area36 — luxury chalet and villa rentals in Gabala",
            az: "Area36 — Qəbələdə lüks chalet və villa kirayəsi",
            ru: "Area36 — аренда роскошных шале и вилл в Габале",
          }),
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
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
    sameAs: SOCIAL_LINKS,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "reservations",
      areaServed: "AZ",
      availableLanguage: ["az", "en", "ru"],
    },
    description: pick(locale, {
      en: "Daily and weekly luxury chalet, mountain cabin, and villa rentals in Gabala.",
      az: "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi.",
      ru: "Посуточная и недельная аренда роскошных шале, горных домов и вилл в Габале.",
    }),
    areaServed: {
      "@type": "City",
      name: pick(locale, { en: "Gabala", az: "Qəbələ", ru: "Габала" }),
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
    description: pick(locale, {
      en: "Luxury chalet and villa rentals in Gabala with pools and Caucasus mountain views.",
      az: "Qəbələdə hovuz və Qafqaz dağ mənzərəsi olan lüks chalet və villa kirayəsi.",
      ru: "Аренда роскошных шале и вилл в Габале с бассейнами и видом на Кавказские горы.",
    }),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: pick(locale, { en: "Gabala", az: "Qəbələ", ru: "Габала" }),
      addressCountry: "AZ",
      ...addressExtras(),
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: pick(locale, { en: "Pool", az: "Hovuz", ru: "Бассейн" }), value: true },
      { "@type": "LocationFeatureSpecification", name: pick(locale, { en: "Mountain views", az: "Dağ mənzərəsi", ru: "Вид на горы" }), value: true },
    ],
    currenciesAccepted: "AZN",
    image: OG_IMAGE.url,
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Dotted paths skip the middleware, so unknown "locales" (e.g. /foo.txt) must 404, not render the home page
  if (!routing.locales.includes(locale)) notFound();
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
            <WhatsAppFloat />
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