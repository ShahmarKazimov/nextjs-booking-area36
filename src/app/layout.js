import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
    'Area36,Area 36,area 36,area36,Area36 luxury resorts,Area36 villa rental,Area36 azerbaijan,chalet bookings,luxury travel,Qafqaz Falcon Chalet,Qafqaz Family Chalet,Qafqaz Luxury Chalet,Qafqaz Milano Deluxe,Qafqaz Modern Harmony, Qafqaz Rolling Bungalow, Qafqaz Royal Chalet, Qafqaz Wooden Chalet,Qafqaz Magnolia Harmony,Qafqaz Golden Loft, real estate, villas, cabins, rentals, vacation homes',
  ],
  openGraph: {
    title: 'Area36 – Luxury Resorts & Premium Travel Destinations Worldwide',
    icons: {
      icon: '/favicon.ico',
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
        url: "https://area36.az/images/blog/Qafqaz%20Falcon%20Chalet/Qafqaz%20Falcon%20Chalet.webp",
        alt: "Qafqaz Falcon Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Family%20Chalet/Qafqaz%20Family%20Chalet-1.webp",
        alt: "Qafqaz Family Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Luxury%20Chalet/Qafqaz%20Luxury%20Chalet.webp",
        alt: "Qafqaz Luxury Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Milano%20Deluxe/Qafqaz%20Milano%20Deluxe.webp",
        alt: "Qafqaz Milano Deluxe",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Modern%20Harmony/Qafqaz%20Modern%20Harmony.webp",
        alt: "Qafqaz Modern Harmony",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Rolling%20Bungalow/Qafqaz%20Rolling%20Bungalow.webp",
        alt: "Qafqaz Rolling Bungalow",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Royal%20Chalet/Qafqaz%20Royal%20Chalet.webp",
        alt: "Qafqaz Royal Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Wooden%20Chalet/Qafqaz%20Wooden%20Chalet.webp",
        alt: "Qafqaz Wooden Chalet",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Magnolia%20Harmony/Qafqaz%20Magnolia%20Harmony.webp",
        alt: "Qafqaz Magnolia Harmony",
        width: 1200,
        height: 630,
      },
      {
        url: "https://area36.az/images/blog/Qafqaz%20Golden%20Loft/Qafqaz%20Golden%20Loft.webp",
        alt: "Qafqaz Golden Loft",
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
      <body className={`${geistSans.variable} antialiased text-white`}>
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
