import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://area36.az'),
  title: {
    default: 'Area36 – Luxury Resorts & Premium Travel Destinations',
    template: '%s | Area36',
  },
  description:
    "Area36 offers luxury cabins, chalets, and villas for rent worldwide. Experience premium accommodations with breathtaking views and unforgettable stays with Area36's curated destinations.",
  keywords: [
    'Area36',
    'Area 36',
    'area 36',
    'area36',
    'Area36 luxury resorts',
    'Area36 villa rental',
    'Area36 azerbaijan',
    'luxury resorts',
    'premium cabins',
    'villa rentals',
    'chalet bookings',
    'luxury travel',
  ],
  openGraph: {
    title: 'Area36 – Luxury Resorts & Premium Travel Destinations Worldwide',
    description:
      "Area36 offers curated collection of luxury resorts, premium cabins, and exclusive villas. Book unforgettable stays at the world's most stunning destinations with Area36.",
    type: 'website',
    url: 'https://area36.az',
    siteName: 'Area36',
    images: [
      {
        url: 'https://area36.az/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Area36 luxury resorts and travel destinations',
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
