import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Head from 'next/head';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://area36.az'),
  title: {
    default: 'Area36',
    template: '%s | Area36',
  },
  description:
    "Area36 offers luxury cabins, chalets, and villas for rent worldwide. Experience premium accommodations with breathtaking views and unforgettable stays with Area36's curated destinations.",
  keywords: [
    'Area36,Area 36,area 36,area36,Area36 luxury resorts,Area36 villa rental,Area36 azerbaijan,chalet bookings,luxury travel,Area36 Falcon Chalet,Area36 Family Chalet,Area36 Luxury Chalet,Area36 Milano Deluxe,Area36 Modern Harmony, Area36 Rolling Bungalow, Area36 Royal Chalet, Area36 Wooden Chalet,Area36 Magnolia Harmony,Area36 Golden Loft,Qafqaz Falcon Chalet,Qafqaz Family Chalet,Qafqaz Luxury Chalet,Qafqaz Milano Deluxe,Qafqaz Modern Harmony, Qafqaz Rolling Bungalow, Qafqaz Royal Chalet, Qafqaz Wooden Chalet,Qafqaz Magnolia Harmony,Qafqaz Golden Loft, real estate, villas, cabins, rentals, vacation homes',
  ],
  openGraph: {
    title: 'Area36 Luxury Chalets',
    icons: {
      icon: 'https://area36.az/favicon.ico',
    },
    description:
      "Area36 offers curated collection of luxury resorts, premium cabins, and exclusive villas. Book unforgettable stays at the world's most stunning destinations with Area36.",
    type: 'website',
    url: 'https://area36.az',
    siteName: 'Area36',
    images: [
      {
        url: 'https://area36.az/images/ui/area-image-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Area36 luxury resorts and travel destinations',
      },
      {
        url: "https://area36.az/images/blog/Area36%20Falcon%20Chalet/Area36%20Falcon%20Chalet.webp",
        alt: "Area36 Falcon Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Family%20Chalet/Area36%20Family%20Chalet-1.webp",
        alt: "Area36 Family Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Luxury%20Chalet/Area36%20Luxury%20Chalet.webp",
        alt: "Area36 Luxury Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Milano%20Deluxe/Area36%20Milano%20Deluxe.webp",
        alt: "Area36 Milano Deluxe",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Modern%20Harmony/Area36%20Modern%20Harmony.webp",
        alt: "Area36 Modern Harmony",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Rolling%20Bungalow/Area36%20Rolling%20Bungalow.webp",
        alt: "Area36 Rolling Bungalow",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Royal%20Chalet/Area36%20Royal%20Chalet.webp",
        alt: "Area36 Royal Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Wooden%20Chalet/Area36%20Wooden%20Chalet.webp",
        alt: "Area36 Wooden Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Magnolia%20Harmony/Area36%20Magnolia%20Harmony.webp",
        alt: "Area36 Magnolia Harmony",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Area36%20Golden%20Loft/Area36%20Golden%20Loft.webp",
        alt: "Area36 Golden Loft",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://area36.az',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="AR5g26tkAKJNaN2348DJhQ3LgguJAWJcY4ED1JgeyTU"
        />
      </Head>
      <body className={`${geistSans.variable} antialiased text-white`}>
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
