import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://area36.az"),

  title: {
    default: "Area36 | Qəbələdə Lüks Chalet və Villa Kirayəsi",
    template: "%s | Area36",
  },

  description:
    "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi. Hovuz, sauna, barbekü və Qafqaz dağ mənzərəsi ilə unudulmaz istirahət. Area36 ilə Qəbələdə premium istirahət.",

  applicationName: "Area36",

  keywords: [
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
    "Qabala chalet rental Azerbaijan",
    "luxury villa Qabala Azerbaijan",
    "daily chalet rental Qabala",
    "mountain villa Qabala with pool",
    "Qabala vacation rental",
    "chalet with sauna Qabala",
    "Caucasus mountain chalet Azerbaijan",
    "private villa rental Qabala weekly",
    "Area36 luxury stays Azerbaijan",
  ],

  authors: [{ name: "Area36", url: "https://area36.az" }],
  creator: "Area36",
  publisher: "Area36",

  alternates: {
    canonical: "https://area36.az",
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
    url: "https://area36.az",
    siteName: "Area36",
    title: "Area36 | Qəbələdə Lüks Chalet, Dağ Evi və Villa Kirayəsi",
    description:
      "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi. Hovuz, sauna, barbekü və Qafqaz mənzərəsi ilə premium istirahət.",
    locale: "az_AZ",
    images: [
      {
        url: "https://area36.az/images/ui/area-image-hero.webp",
        width: 1200,
        height: 630,
        alt: "Area36 — Qəbələdə lüks chalet və villa kirayəsi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Area36 | Qəbələdə Lüks Chalet və Villa Kirayəsi",
    description:
      "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi — Area36.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://area36.az/#organization",
  name: "Area36",
  url: "https://area36.az",
  logo: {
    "@type": "ImageObject",
    url: "https://area36.az/favicon.ico",
  },
  description:
    "Qəbələdə günlük və həftəlik lüks chalet, dağ evi və villa kirayəsi.",
  areaServed: {
    "@type": "City",
    name: "Qəbələ",
    addressCountry: "AZ",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://area36.az/#website",
  name: "Area36",
  url: "https://area36.az",
  inLanguage: "az",
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

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://area36.az/#lodging",
  name: "Area36",
  url: "https://area36.az",
  description:
    "Qəbələdə hovuz, sauna, barbekü və Qafqaz dağ mənzərəsi olan lüks chalet və villa kirayəsi.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Qəbələ",
    addressCountry: "AZ",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Hovuz", value: true },
    { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
    { "@type": "LocationFeatureSpecification", name: "Barbekü", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dağ mənzərəsi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Meşəlik ərazi", value: true },
  ],
  priceRange: "$$-$$$",
  currenciesAccepted: "AZN",
  paymentAccepted: "Cash, Bank Transfer",
  image: "https://area36.az/images/ui/area-image-hero.webp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className={`${geistSans.variable} antialiased text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              lodgingSchema,
            ]),
          }}
        />
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}