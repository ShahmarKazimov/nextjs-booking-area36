import Carousel from "./components/ui/Carousel/Carousel";
import Cards from "./components/Cards/allCards/page";
import HeroSection from "./components/HeroSection/page";

// Homepage specific metadata
export const metadata = {
  title: 'Area36 – Luxury Resorts & Premium Vacation Rentals Worldwide',
  description: 'Book luxury cabins, exclusive chalets, and premium villas with Area36. Discover handpicked accommodations with stunning views and world-class amenities for your perfect getaway with Area36.',
  keywords: [
    'Area36',
    'Area 36',
    'Area36 booking',
    'Area36 luxury resorts',
    'luxury vacation rentals',
    'premium cabins for rent',
    'exclusive chalets',
    'luxury villa bookings'
  ],
  openGraph: {
    title: 'Area36 – Book Luxury Resorts & Premium Vacation Rentals',
    description: 'Area36 offers handpicked luxury accommodations worldwide. From mountain chalets to lakeside cabins, find your perfect premium getaway with Area36.',
    url: 'https://area36.com',
    images: [
      {
        url: '/homepage-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Area36 luxury resort destinations and premium vacation rentals',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <header>
        <HeroSection />
      </header>

      <section aria-label="Featured Luxury Destinations">
        <Carousel />
      </section>

      <section aria-label="Premium Accommodation Collection" className="max-w-7xl mx-auto">
        <Cards />
      </section>
    </main>
  );
}