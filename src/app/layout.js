import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // CLS azaltmaq üçün
});

export const metadata = {
  metadataBase: new URL("https://area36.az"),

  title: {
    default: "Area36 | Luxury Chalets, Cabins & Villas in Azerbaijan",
    template: "%s | Area36",
  },

  description:
    "Book luxury chalets, cabins, and villas in Azerbaijan with Area36. Premium mountain accommodations in Qafqaz region with breathtaking views, modern amenities, and unforgettable stays.",

  applicationName: "Area36",

  keywords: [
    "luxury chalets Azerbaijan",
    "Qafqaz chalet rental",
    "villa rental Azerbaijan",
    "mountain cabin Azerbaijan",
    "premium accommodation Qafqaz",
    "Area36 luxury stays",
    "chalet booking Azerbaijan",
    "vacation rental Azerbaijan",
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
    title: "Area36 | Luxury Chalets & Villas in Azerbaijan",
    description:
      "Discover premium chalets, cabins, and villas in Azerbaijan. Book exclusive mountain stays with Area36.",
    locale: "en_US",
    images: [
      {
        url: "https://area36.az/images/ui/area-image-hero.webp",
        width: 1200,
        height: 630,
        alt: "Area36 luxury chalets and villas in Azerbaijan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Area36 | Luxury Chalets & Villas in Azerbaijan",
    description:
      "Book premium chalets, cabins, and villas in Azerbaijan with Area36.",
    images: ["https://area36.az/images/ui/area-image-hero.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  // google-site-verification buraya gəlir, <Head> yox
  verification: {
    google: "AR5g26tkAKJNaN2348DJhQ3LgguJAWJcY4ED1JgeyTU",
  },
};

// Organization schema bütün səhifələrə aid olduğu üçün layout-da qalır
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
    "Premium luxury chalet, cabin and villa rental platform in Azerbaijan.",
  sameAs: [], // sosial media linklərini buraya əlavə et
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://area36.az/#website",
  name: "Area36",
  url: "https://area36.az",
  publisher: {
    "@id": "https://area36.az/#organization",
  },
  // Sitelinks searchbox üçün (Google-da axtarış qutusu göstərə bilər)
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://area36.az/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}